/*eslint-disable react/no-unescaped-entities */
/*eslint-disable react/display-name */

import Save from '../commons/svgicons/save';
import { Back } from '../commons/svgicons/back';
import { withRouter } from 'next/router';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Error from './error';
import Loading from './loader';
import { useEffect, useState } from 'react';
import { getHashTagVideos } from '../../sources/explore/hashtags-videos';
import VideoGallery from '../video-gallery';
import Img from '../commons/image';
import useInfiniteScroll from '../../hooks/use-infinite-scroll';
import { withBasePath } from '../../config';
import useDrawer from '../../hooks/use-drawer';
import detectDeviceModal from "../open-in-app"
import { SeoMeta } from '../commons/head-meta/seo-meta';
import dynamic from 'next/dynamic';
import { track } from '../../analytics';
import * as fbq from '../../analytics/fb-pixel'
import { commonEvents, toTrackMixpanel } from '../../analytics/mixpanel/events';
import { trackEvent } from '../../analytics/firebase';
import { getCanonicalUrl } from '../../utils/web';
import { getItem } from '../../utils/cookie';

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

const AppBanner = dynamic(
  () => import('../app-banner'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function HashTag({router}) {
  const [items,setItems] = useState([]);
  const [details, setDetails] = useState({})
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [showLoading, setShowLoading] = useState(isFetching);
  const [offset, setOffset] = useState(2);
  const [showAppBanner, setShowAppBanner] = useState(false);

  const device = getItem('device-info')

  const notNowClick = () =>{
    setShowAppBanner(false);
  }

  const {item = ''} = router?.query;
  const {show} = useDrawer();

  const pageName = 'Hashtag Details'

  // async function showPopUp(){
  //   show('', detectDeviceModal, 'extraSmall');
  //   setIsFetching(false);
  // }

  useEffect(()=>{
    setTimeout(()=>{
      fbq.event('Screen View')
      trackEvent('Screen_View',{'Page Name' :'Hashtag'})
      toTrackMixpanel('screenView',{pageName:pageName})
    },[500])
    window.onunload = function () {
      window?.scrollTo(0, 1);
    }
  },[])

  useEffect(()=>{setShowLoading(isFetching)},[isFetching])


  async function fetchMoreListItems() {
    try{
     const response = item && await getHashTagVideos({ keyword: item , offset: `${offset}` });
     if(response?.data?.length > 0){
       let updateData = [...items];
       updateData = updateData?.concat(response?.data);
       setItems(updateData);
       setOffset(offset+1);
       setIsFetching(false);
       setShowLoading(false)
     }else{
      setShowLoading(false)
     }
     setShowLoading(false)
    }
    catch(e){
      console.log("e",e)
    }
   }

  const onDataFetched = data => {
      setDetails(data?.details);
      setItems(data?.data);
  }

  const dataFetcher = () => item && getHashTagVideos({ keyword:  item });
  let [fetchState, retry, data] = useFetcher(dataFetcher, onDataFetched);
  setRetry = retry;

  return (
    <ComponentStateHandler
    state={fetchState}
    Loader={LoadComp}
    ErrorComp={ErrorComp}
  >
    <SeoMeta
        data={{
          title: `#${item} Hashtag videos on Hipi - Indian Short Video App`,
          // image: item?.thumbnail,
          description: `#${item} videos on Hipi. Checkout latest trending videos for #${item} hashtag that you can enjoy and share with your friends.`,
          canonical: getCanonicalUrl && getCanonicalUrl()?.toLowerCase(),        
        }}
     />
    <div>
      <div onClick={()=>router?.back()} className="headbar w-full flex h-16 shadow-md bg-white items-center p-4">
        <Back />
      </div>
      <div className="w-full h-full flex flex-col p-4"> 
        <div className="flex w-full">
          <div className="w-28v flex h-28v bg-gray-300 relative rounded-full" >
            <Img data={details?.hashTagImage} alt='img' fallback={withBasePath('images/hashtag.png')}/> 
          </div>
          <div className="flex flex-col justify-between px-4 ">
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold">{details?.hashtagName}</h1>
              {/* <p className="text-sm text-gray-400">{details?.hashTagVideoCount}</p> */}
            </div>
            <div onClick={()=>{
               device === 'ios' && show('', detectDeviceModal, 'extraSmall');
               device === 'android' && setShowAppBanner(true)}} className="flex items-center border-2 border-gray-300 p-1 mt-2 max-w-38v">
              <Save />
              <p className="pl-2 text-xs font-medium">Add to favorites</p>
            </div>
          </div>
        </div>
        <div className="flex text-sm text-gray-400 py-2">
          <p>
            {details?.hashTagDesc}
            {/* <span className="font-medium text-gray-500">#hashtag</span> */}
         </p>
        </div>
      </div>
      <VideoGallery
        items={items}
        status={fetchState}
        retry={retry && retry}
        hashTag={item}
        page='hashTag'
        showLoading={showLoading}
        fetchMoreListItems={fetchMoreListItems}
      />
     {(device === 'android' && showAppBanner) ? <AppBanner notNowClick={notNowClick}/> : ''}
    </div>
    </ComponentStateHandler>
  );
}
export default withRouter(HashTag);
