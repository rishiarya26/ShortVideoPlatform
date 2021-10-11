/*eslint-disable react/no-unescaped-entities */
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

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

function HashTag({router}) {
  const [items,setItems] = useState([]);
  const [details, setDetails] = useState({})
  const [isFetching, setIsFetching] = useInfiniteScroll(showPopUp);
  const [showLoading, setShowLoading] = useState(isFetching)
  const [offset, setOffset] = useState(2)

  const {item = ''} = router?.query;
  const {show} = useDrawer();

  async function showPopUp(){
    show('', detectDeviceModal, 'extraSmall');
    setIsFetching(false);
  }

  useEffect(()=>{
    window.onunload = function () {
      window?.scrollTo(0, 1);
    }
  },[])

  // async function fetchMoreListItems() {
  //   try{
  //    const response = item && await getHashTagVideos({ keyword:  item , offset: `${offset}` });
  //    console.log("resp1",response)
  //    if(response?.data?.length > 0){
  //      console.log("resp",response?.data)
  //      let updateData = [...items];
  //      updateData = updateData?.concat(response?.data);
  //      console.log("items",updateData)
  //      setItems(updateData);
  //      setOffset(offset+1);
  //      setIsFetching(false);
  //    }
  //    setShowLoading(false)
  //   }
  //   catch(e){
  //     console.log("e",e)
  //   }
  //  }

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
    <div>
      <div onClick={()=>router.back()} className="headbar w-full flex h-16 shadow-md bg-white items-center p-4">
        <Back />
      </div>
      <div className="w-full h-full flex flex-col p-4"> 
        <div className="flex w-full">
          <div className="w-28v flex h-28v bg-gray-300 relative rounded-full" >
            <Img data={details?.hashTagImage} alt='img' fallback={withBasePath('images/hashtag.png')}/> 
          </div>
          <div className="flex flex-col px-4 justify-between">
            <div className="flex flex-col">
              <p className="font-medium text-lg">{details?.hashtagName}</p>
              <p className="text-sm text-gray-400">{details?.hashTagVideoCount}</p>
            </div>
            <div className="flex items-center border-2 border-gray-300 p-1">
              <Save />
              <p className="pl-2 text-sm font-medium">Add to favorites</p>
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
        isFetching={isFetching}
      />
    </div>
    </ComponentStateHandler>
  );
}
export default withRouter(HashTag);
