/*eslint-disable react/display-name */
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Hash from '../commons/svgicons/hash';
import RightArrow from '../commons/svgicons/right-arrow';
import { getSearchData } from '../../sources/explore';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Error from './error';
import Loader from './loader';
import Img from '../commons/image';
import FooterMenu from '../footer-menu';
import { useRouter } from 'next/router';
import SearchItems from '../search-items';
import useInfiniteScroll from '../../hooks/use-infinite-scroll';
import DynamicImg from '../commons/image-dynamic';
import Play from '../commons/svgicons/play-outlined';
import Like from '../commons/svgicons/like-outlined';
import { numberFormatter } from '../../utils/convert-to-K';
import detectDeviceModal from "../open-in-app";
import useDrawer from '../../hooks/use-drawer';
import { debounce, toLower } from 'lodash';
import dynamic from 'next/dynamic';
import fallbackUsers from '../../../public/images/users.png';
import fallbackVideos from '../../../public/images/video.png';
import { trimHash } from '../../utils/string';
import Cart from '../commons/svgicons/cart';
import 'swiper/swiper.min.css'
import Refresh from '../commons/svgicons/refresh';

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

import SwiperCore, {
  Autoplay,Pagination,Navigation
} from 'swiper';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import { commonEvents, toTrackMixpanel } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';
import * as fbq from '../../analytics/fb-pixel'
import { trackEvent } from '../../analytics/firebase';
import { getCanonicalUrl } from '../../utils/web';

// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);


let toRetry;
const ErrorComp = () => (<Error  retry={toRetry && toRetry}/>);
const LoadComp = () => (<Loader />);

const LandscapeView = dynamic(
  () => import('../landscape'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function Explore() {
  const [data, setData] = useState([]);
  const [crousalItems, setCrousalItems] = useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [showLoading, setShowLoading] = useState(isFetching)
  const [offset, setOffset] = useState(2);
  // const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 })

  // useEffect(() => {
  //  function updatePosition() {
  //      setPosition({ scrollX: window.scrollX, scrollY: window.scrollY })
  //  }

  //  window.addEventListener('scroll', updatePosition)
  //  updatePosition()

  //  return () => window.removeEventListener('scroll', updatePosition)
  // }, [])

  const {show} = useDrawer();

  const pageName = 'Discover';

  useEffect(()=>{setShowLoading(isFetching)},[isFetching])

  // async function showPopUp() {
  //     show('', detectDeviceModal, 'extraSmall');
  //     setIsFetching(false);
  //  }

  async function fetchMoreListItems() {
    try{
     const response = await getSearchData({ offset: `${offset}` });
     if(response?.data?.length > 0){
       let updateData = [...data];
       updateData = updateData?.concat(response?.data);
       let sessionData = JSON.parse(window?.sessionStorage?.getItem("searchList"));
       sessionData = sessionData?.concat(response?.data);
       window.sessionStorage.setItem("searchList",JSON.stringify(sessionData));
       setData(updateData);
       setOffset(offset+1);
       setIsFetching(false);
       setShowLoading(false);
     }else{
      console.log("inelse",response.data.length)
      setShowLoading(false);
      // setIsFetching(false);
      // show('', detectDeviceModal, 'extraSmall');
     }
    //  console.log(showLoading)
    //  setIsFetching(false);
     setShowLoading(false)
    }
    catch(e){
      // setIsFetching(false);

      // setShowLoading(false);
      console.log("error",e)
    }
   }

  const router = useRouter();

  const onDataFetched = data => {
    const crousalDataIndex = data?.data?.findIndex((item)=>(item?.widgetContentType === 'banner'))
    const crousalData = data?.data?.[crousalDataIndex]?.widgetList;
    window.sessionStorage.removeItem('search-feed');
    window.sessionStorage.setItem("searchList",JSON.stringify(data?.data));
    // const additionalBanner = data?.data?.additionalBanner;
    // console.log(data,additionalBanner, crousalData)
    // console.log("8787878",additionalBanner, crousalData)
    // crousalData.shift(additionalBanner.data);
    // console.log(crousalData)
    setCrousalItems(crousalData);
    setData(data?.data);
  };

  const dataFetcher = () => getSearchData();
  const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);
  toRetry = retry;
  const validateData = data?.length > 0;

  // const trimHash = (hashTag) =>{
  //   hashTag = hashTag.replace(/^\#+|\#+$/g, '');
  //   return hashTag
  // }

  const toUserList = (value)=>{
    const hashTag = trimHash(value);
    router?.push(`/user-list?ref=${hashTag}`);
  }

  const toSearchFeed = (e, videoId)=>{
    let hashTag = e.currentTarget.id;   
    hashTag = trimHash  (hashTag);
    router?.push(`/search-feed/${videoId}?ref=${hashTag}&type=withHash`);
  }

  const toHashtagDetails = (hashTag)=>{
    console.log("R-hashtag",hashTag)
    let tHashtag = trimHash(hashTag);
    tHashtag = toLower(tHashtag);
    router.push({pathname: '/hashtag/[pid]',query: { pid: tHashtag }})
  }

  const toUserDetail = (userHandle)=>{
    router.push(`/@${userHandle}`);
  }

  const toVideoDetail = (id)=>{
    router.push(`/single-video/${id}`);
  }

  const redirectToUrl = (url) =>{
    router.push(url);
  }

  const toRedirect = {
    'User' : toUserDetail,
    'Video' : toVideoDetail,
    'Hashtag' : toHashtagDetails,
    'useUrl' : redirectToUrl
  }

  useEffect(()=>{
      // const mixpanelEvents = commonEvents();
      // mixpanelEvents['Page Name'] = 'Discover';
      fbq.event('Screen View');
      // track('Screen View',mixpanelEvents );
      toTrackMixpanel('screenView',{pageName:pageName})
      trackEvent('Screen_View',{'Page Name' : 'Explore'})
      window.onunload = function () {
      window?.scrollTo(0, 1);
    }
  },[])

  const debounceScroll = debounce((e,content,type)=>{
    // console.log("WWWWWW", e, scrollPosition)
    toTrackMixpanel('contentBucketSwipe',{pageName:pageName},{verticalIndex:content?.position+1,horizontalIndex:'NA',carousalId:content?.widgetHashtag?.id || content?.widgetId,carousalName:content?.widgetHashtag?.name || content?.widgetName,carousalType:type})},100)

  const onBannerClick =(contentType, id, index)=>{
    const item = crousalItems?.length>0 && crousalItems?.[index];
    toTrackMixpanel('carousalBannerClick',{pageName:pageName},{bannerType:item?.contentType,carousalId:item?.id,carousalName:item?.displayName})
    toRedirect?.[contentType](id);
    // (data?.redirectUrl && router.push(data.redirectUrl)) || toHashtagDetails(data?.displayName)
  }

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
        <SeoMeta
        data={{
          title: 'Discover Popular Videos |  Hipi - Indian Short Video App',
          // image: item?.thumbnail,
          description: 'Hipi is a short video app that brings you the latest trending videos that you can enjoy and share with your friends or get inspired to make awesome videos. Hipi karo. More karo.',
          canonical: getCanonicalUrl && getCanonicalUrl(),
        }}
     />
      <div className="h-full  w-screen flex flex-col relative overflow-scroll pb-16">
        <div className="search_box w-full z-10 fixed top-0">
        <SearchItems type='explore'/>
          <div />
        </div>
        {/* <div className="poster w-full mt-40" />  */}
        <div className="explore_carousel flex min-w-full overflow-x-auto h-56v no_bar mt-16 overflow-y-hidden">
        <Swiper
              draggable="true"
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides={true} 
              autoplay={{
                "delay": 2500,
                "disableOnInteraction": false
              }} 
              pagination={{"clickable": true}} 
              className="mySwiper crousal-swiper"
              onSwiper={swiper => {
                const {
                  activeIndex, slides
                } = swiper;
                const item = crousalItems?.length>0 && crousalItems?.[0];
                toTrackMixpanel('carousalBannerImp',{pageName:pageName},{bannerType:item?.contentType,carousalId:item?.id,carousalName:item?.displayName})
              }}
              onSlideChange={swiperCore => {
                const {
                  activeIndex, slides
                } = swiperCore;
                const item = crousalItems?.length>0 && crousalItems?.[activeIndex];
                toTrackMixpanel('carousalBannerImp',{pageName:pageName},{bannerType:item?.contentType,carousalId:item?.id,carousalName:item?.displayName})
              }
              }
            > 
              {crousalItems?.length > 0  && crousalItems.map((data,id)=>
                 (
                  data?.id !== '1892afcb-b35e-4385-9a59-278168c9d46f' && <SwiperSlide
                    key={id}
                  >
                    <div 
                     key={id} 
                     id={id} 
                     onClick={()=> data?.contentType === 'User' ?
                      onBannerClick(data?.contentType, data?.user?.userName, id) :
                    data?.contentType === 'Hashtag' ? onBannerClick(data?.contentType, data?.displayName, id) :
                    onBannerClick(data?.contentType, data?.id, id)
                  } 
                     className="carousel_item bg-gray-300 min-w-full relative">
                       <Img data={data?.bannerUrl} title={data?.name || data?.displayName}/>
                    </div>
                  </SwiperSlide>
               ))}
          </Swiper>
           {/* {crousalItems?.length > 0  && crousalItems.map((data,id)=>{
             return(
            <div key={id} id={id} onClick={()=>toHashtagDetails(data?.displayName)} className="carousel_item bg-gray-300 m-0.5 min-w-full relative">
                 <Img data={data?.thumbnail} title={data?.name || data?.displayName}/>
            </div>
           )})} */}
            {/* <div className=" carousel_item bg-green-300 m-0.5 min-w-full min-h-38 relative">

            </div>
            <div className=" carousel_item bg-red-300 m-0.5 min-w-full min-h-38 relative">

            </div> */}
        </div>

        {validateData && data?.map((content, id) => {
          return (
            content?.widgetContentType === 'Video' ? (
              <div key={id} className="p-2 tray">
                <div onClick={()=>{
                  toTrackMixpanel('viewMoreSelected',{pageName:pageName},{carousalType:content?.widgetContentType,carousalId:content?.widgetHashtag?.id||content?.widgetId,carousalName:content?.widgetHashtag?.name||content?.widgetName})
                  toHashtagDetails(content?.widgetHashtag?.name || content?.widgetName)}} className="w-full flex mb-2 justify-between">
                  <div className="flex">
                    <div className="p-2 rounded-full border-2 border-gray-300 mr-2">
                      <Hash />
                    </div>
                    <div className="head flex flex-col">
                      <p className="text-sm font-medium text-gray-600">{content?.widgetName}</p>
                      <p className="text-xs text-gray-400">Trending</p>
                    </div>
                  </div>
                  <div  className="flex items-center justify-center">
                    <RightArrow />
                  </div>
                </div>

                <div onScroll={(e)=>debounceScroll(e,content, 'Video')} className="flex min-w-full overflow-x-auto min-h-38 no_bar">
                  {content?.widgetList?.length > 0 && content.widgetList.map((d, id) => {
                     if(id > 5) return null;
                    return (
                      <div   key={id} id={content?.widgetName} 
                      onClick={(e)=>{
                        toTrackMixpanel('thumbnailClick',{pageName:pageName},{verticalIndex:content?.position+1,horizontalIndex:id+1,carousalId:content?.widgetHashtag?.id || content?.widgetId,carousalName:content?.widgetHashtag?.name || content?.widgetName,carousalType:'Video', ugcId:d?.video?.id, creatorId:d?.video?.videoOwners?.id, creatorName:`${d?.video?.videoOwners?.firstName || ''} ${d?.video?.videoOwners?.lastName || ''}`})
                        toSearchFeed(e, d?.video?.id )}} className="trending_card bg-gray-300 m-0.5 min-w-28 min-h-38 relative">
                        <DynamicImg data={d?.video?.thumbnailUrl} title={d?.videoTitle} width='w_120' fallback={fallbackVideos?.src}/>
                        {d?.video?.shoppable === true && <div className="absolute top-2 right-2 z-1">
                           <Cart/>
                         </div>}
                        <div className="absolute bottom-1 left-1 text-white text-xs flex items-center">
                          <Play/>{numberFormatter(d?.video?.vCount) || numberFormatter(d?.video?.viewCount)}
                        </div>
                        <div className="absolute bottom-1 right-1 text-white flex text-xs items-center">
                          <Like/>{numberFormatter(d?.video?.lCount) || numberFormatter(d?.video?.likeCount)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
              : content?.widgetContentType === 'User' &&  (
                <div key={id} className="p-2 circle_tray">
                  <div className="w-full flex justify-between">
                    <p className="text-sm font-medium">{content?.widgetName}</p>
                    <div onClick={()=> {
                      toTrackMixpanel('viewMoreSelected',{pageName:pageName},{carousalType:'Creator Profile',carousalId:content?.widgetId,carousalName:content?.widgetName})
                      // toUserList(content?.widgetName)
                    }}
                       className="flex items-center justify-center">
    
                      <RightArrow />
                    </div>
                  </div>
                  <div onScroll={(e)=>debounceScroll(e,content,'Creator Profile')} className="flex min-w-full overflow-x-auto min-h-32 no_bar pt-2">
                      { content?.widgetList?.length > 0 && content.widgetList.map((d, id) => {
                         if(id > 5) return null;
                        return (
                          // <>
                          <div key={id} 
                          onClick={()=>{
                            toTrackMixpanel('thumbnailClick',{pageName:pageName},{verticalIndex:content?.position+1,horizontalIndex:id+1,carousalId:content?.widgetId,carousalName:content?.widgetName,carousalType:'Creator Profile', creatorId:d?.id, creatorName:`${d?.firstName || ''} ${d?.lastName || ''}`})
                            router?.push(`/@${d?.user?.userName}`)
                          }} className="my-1 px-2 flex flex-col justify-center items-center">
                                <div className="bg-gray-300 w-16.6v overflow-hidden  h-16.6v rounded-full relative">
                                 <DynamicImg data={d?.user?.profilePicImgUrl} title={`${d?.user?.firstName} ${d?.user?.lastName}`}  width='w_120' fallback={fallbackUsers?.src}/>
                                 </div>
                                <p className="text-xs pt-2 truncate max-w-20v  text-center">{`${d?.user?.firstName} ${d?.user?.lastName}`}</p>
                          </div>
                          // </>
                        );
                      })}
                  </div>
                </div>
              ));
        })}
        {showLoading &&  
        <div onClick={fetchMoreListItems} className="w-full flex justify-center py-2">
          <Refresh/>
        </div>
        }
           
      </div>
      <FooterMenu selectedTab="search"/>
      <LandscapeView/>
    </ComponentStateHandler>
  );
}
export default Explore;
