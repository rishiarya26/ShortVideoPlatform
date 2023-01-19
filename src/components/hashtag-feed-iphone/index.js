/*eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import { withRouter } from 'next/router';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Seekbar from '../seekbar';
import SeekbarLoading from '../seekbar/loader.js';
import { canShop } from '../../sources/can-shop';
import { Back } from '../commons/svgicons/back_white';
import useWindowSize from '../../hooks/use-window-size';
import { getHashTagVideos } from '../../sources/explore/hashtags-videos';
import CircularProgress from '../commons/circular-loader'
import Mute from '../commons/svgicons/mute';
import usePreviousValue from '../../hooks/use-previous';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import useDrawer from '../../hooks/use-drawer';
import dynamic from 'next/dynamic';
import SwipeUp from '../commons/svgicons/swipe-up';
import { getOneLink, viewEvents } from '../../sources/social';
import { getBrand, getCanonicalUrl } from '../../utils/web';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { toTrackReco, viewEventsCall } from '../../analytics/view-events';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';
import Landscape from '../landscape';
import { incrementCountVideoView } from '../../utils/events';
import OpenAppStrip from '../commons/user-experience';
import SnackBar from '../commons/snackbar';
import SnackCenter from '../commons/snack-bar-center';
import { toTrackClevertap } from '../../analytics/clevertap/events';

SwiperCore.use([Mousewheel]);

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loading />);

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

// const AppBanner = dynamic(
//   () => import('../app-banner'),
//   {
//     loading: () => <div />,
//     ssr: false
//   }
// );


function HashTagFeedIphone({ router }) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [items, setItems] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [videoActiveIndex, setVideoActiveIndex] = useState(0);
  const [saveLook, setsaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [initialPlayStarted, setInitialPlayStarted] = useState(false)
  const [videoDurationDetails, setVideoDurationDetails] = useState({totalDuration: null, currentT:0})
  const [offset, setOffset] = useState(2);
  const [toInsertElements, setToInsertElements] = useState(4);
  const [toShowItems, setToShowItems] = useState([]);
  const [deletedTill, setDeletedTill] = useState();
  const [showSwipeUp, setShowSwipeUp] = useState({count : 0 , value : false});
  // const [ShowAppBanner, setShowAppBanner]=useState(false);
  // const notNowClick=()=>{
  //   setShowAppBanner(false)
  // }
  // const showBanner=()=>{
  //   setShowAppBanner(true)
  // }
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [noSound, setNoSound] = useState(false);

  const checkNoSound =()=>{
    if(!items?.[videoActiveIndex]?.videoSound){
      setNoSound(true);
      setTimeout(()=>{setNoSound(false)},2000)
    }
  }

  const preVideoDurationDetails = usePreviousValue({videoDurationDetails});
  const preActiveVideoId = usePreviousValue({videoActiveIndex});
  const pretoInsertElemant = usePreviousValue({toInsertElements});


  const { item } = router?.query;
  const { videoId = items?.[0]?.content_id } = router?.query;
  // const { type = 'all' } = router?.query;
  const {show} = useDrawer();

  const pageName = 'Hashtag Details'

  const loaded = () => {
    setLoading(false);
  };

  const loadMoreItems = async() =>{
    let videos = [...items]
    try {
    const resp = await getHashTagVideos({ keyword : item, offset: offset, limit:6 });
    if(resp?.data?.length > 0){
      console.log("innn",resp)
      // const index = resp.data.findIndex((data)=>(data?.id === videoId))
      // if(index !== -1){
      //   resp.data.splice(index,1);
      // }
      videos = videos?.concat(resp?.data);
      console.log("concat",videos)
      setItems(videos);
      setOffset(offset+1);
      return resp?.data
    }
  }catch(e){
    console.log('data fetch error',e)
  }
  }

  const incrementShowItems = async() =>{
    console.log("in increment")
    try{ 
     let updateShowItems = [...toShowItems];
     let deletedTill = pretoInsertElemant?.toInsertElements-12;
     let dataItem = [...items];
     const arr = await loadMoreItems();
     arr && (dataItem = dataItem?.concat(arr));
    
     //add
     for(let i=0;i<=5;i++){
       if(dataItem?.[videoActiveIndex+i+2]){ 
         updateShowItems.push(dataItem[videoActiveIndex+i+2])
       }
     }
     //delete
     if(videoActiveIndex >= 10)
     { for(let i=0;i<=pretoInsertElemant?.toInsertElements-6-1;i++){
       updateShowItems[i] && (updateShowItems[i] = null);
     }
     }
     deletedTill = pretoInsertElemant?.toInsertElements-6-1;
     setDeletedTill(deletedTill);
     setMuted(true);
     show('', detectDeviceModal, 'extraSmall', {text: "see more", setMuted:setMuted});
    // setShowAppBanner(true);
     setToShowItems(updateShowItems);
   }
     catch(e){
   console.log('erroree',e)
     }
   }
   
    const decrementingShowItems = async() =>{
   
     let updateShowItems = [...toShowItems];
     const dataItem = [...items];
     for(let i=0;i<=5;i++){
       updateShowItems[deletedTill-i] = dataItem[deletedTill-i];
     }
     setMuted(true);
     show('', detectDeviceModal, 'extraSmall', {text: "see more", setMuted:setMuted});
     setDeletedTill(deletedTill-5);
     setToShowItems(updateShowItems);
    }
   
     useEffect(()=>{
       if(videoActiveIndex > preActiveVideoId?.videoActiveIndex){
         //swipe-down
         if(toShowItems.length > 0 && toInsertElements === videoActiveIndex){
          console.log('increment called', 'insertIndex Incremented to :',toInsertElements+6);
           incrementShowItems();
           setToInsertElements(toInsertElements +6);
         }
       }
       else{
         //swipe-up
         if(toShowItems.length > 0 && deletedTill === videoActiveIndex){
          decrementingShowItems();
         }
       }
       checkNoSound();
     },[videoActiveIndex])

     useEffect(()=>{
      if(initialLoadComplete){
        toTrackMixpanel('impression',{pageName:pageName, hashtagName: item, isShoppable: items?.[videoActiveIndex]?.shoppable, playlistId: items?.[videoActiveIndex]?.playlistId, playlistName: items?.[videoActiveIndex]?.playlistName},items?.[videoActiveIndex]);
        toTrackClevertap('impression',{pageName:pageName, hashtagName: item},items?.[videoActiveIndex]);
      }
    },[initialLoadComplete])
  
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false);
      // inject(CHARMBOARD_PLUGIN_URL, null, loaded);
      // const guestId = getItem('guest-token');
      //fbq.event('Screen View')
      ToTrackFbEvents('screenView');
      //trackEvent('Screen_View',{'Page Name' :'Hashtag Feed'})
      toTrackFirebase('screenView',{'page' :'Hashtag Feed'});
      toTrackMixpanel('screenView',{pageName:pageName, hashtagName: item});
      toTrackClevertap('screenView',{pageName:pageName, hashtagName: item});
    },500);
  }, []);


  useEffect(()=>{
    if(initialPlayStarted === true){
      toTrackMixpanel('play',{pageName : pageName, hashtagName: item, isShoppable: items[videoActiveIndex]?.shoppable, playlistId: items?.[videoActiveIndex]?.playlistId, playlistName: items?.[videoActiveIndex]?.playlistName},items?.[videoActiveIndex]);
      toTrackClevertap('play',{pageName : pageName, hashtagName: item},items?.[videoActiveIndex]);
      ToTrackFbEvents('play',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Hashtag Feed'})
      toTrackFirebase('play',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Hashtag Feed'})
      viewEventsCall(activeVideoId, 'user_video_start');
      checkNoSound();
    }
  },[initialPlayStarted])

//   const viewEventsCall = async(id, event, info)=>{
//  try{   console.log("event to send", id, event)
//    await viewEvents({id:id, event:event})
//   }catch(e){
//     console.log("issue in view events",e)
//   }
//   }


  const dataFetcher = () => getHashTagVideos({ keyword : item, videoId: videoId && videoId, limit:6 });
  const onDataFetched = (data) => {
  let videos = data?.data;
    data && setItems(videos);
    setInitialLoadComplete(true);
    data && setToShowItems(videos);
    console.log("before",activeVideoId)
    !activeVideoId && data && setActiveVideoId(videos?.[0]?.content_id);
    setToInsertElements(4);
    // checkNoSound();
  };

    /* mixpanel - monetization cards impression */
    useEffect(()=>{
      // console.log("aAAAADDD",shop?.adData)
      shop?.adData?.monitisation && shop?.adData?.monitisationCardArray?.length > 0 &&   shop?.adData?.monitisationCardArray?.map((data)=> { 
        toTrackMixpanel('monetisationProductImp',{pageName:pageName, hashtagName: item},{content_id: items?.[videoActiveIndex]?.content_id,productId:data?.card_id, productUrl:data?.product_url, brandName: getBrand(data?.product_url), campaignId: shop?.campaignId, category: data?.category, subCategory: data?.sub_category, subSubCategory: data?.subsub_category, mainCategory: data?.main_category});
        toTrackClevertap('monetisationProductImp',{pageName:pageName, hashtagName: item},{content_id:videoId,productId:data?.card_id, productUrl:data?.product_url, brandName: getBrand(data?.product_url), campaignId: shop?.campaignId})
      });
    },[shop])
   /************************ */ 
  
  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;
  // const validItemsLength = items?.length > 0;
  const validItemsLength = toShowItems?.length > 0;

  const updateSeekbar = (percentage, currentTime, duration) => {
    if(percentage > 0){
      setInitialPlayStarted(true);
    }
    const videoDurationDetail = {
      currentT : currentTime,
      totalDuration : duration
    }
    if(currentTime > 6.8 && currentTime < 7.1){
      viewEventsCall(activeVideoId,'view')
    }
    setVideoDurationDetails(videoDurationDetail);
    setSeekedPercentage(percentage);
    /********** Mixpanel ***********/
    if(currentTime >= duration-0.2){
      toTrackMixpanel('watchTime',{pageName:pageName, watchTime : 'Complete', duration : duration, durationWatchTime: duration, hashtagName: item, isShoppable: items?.[videoActiveIndex]?.shoppable, playlistId: items?.[videoActiveIndex]?.playlistId, playlistName: items?.[videoActiveIndex]?.playlistName},items?.[videoActiveIndex])
      toTrackClevertap('watchTime',{pageName:pageName, watchTime : 'Complete', duration : duration, durationWatchTime: duration, hashtagName: item},items?.[videoActiveIndex])
      toTrackMixpanel('replay',{pageName:pageName, duration : duration, durationWatchTime: duration, hashtagName: item, isShoppable: items?.[videoActiveIndex]?.shoppable, playlistId: items?.[videoActiveIndex]?.playlistId, playlistName: items?.[videoActiveIndex]?.playlistName},items?.[videoActiveIndex])
      toTrackFirebase('watchTime',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Hashtag Feed'},{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
      toTrackFirebase('replay',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Hashtag Feed'},{  duration : duration, durationWatchTime: duration})

      ToTrackFbEvents('ugcPlayedComplete');
      //fbq.event('UGC_Played_Complete')
      ToTrackFbEvents('replay',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Hashtag Feed'},{  duration : duration, durationWatchTime: duration})
      /*** view events ***/
      viewEventsCall(activeVideoId, 'completed', {duration : duration} );
      viewEventsCall(activeVideoId, 'user_video_start');
      if(showSwipeUp.count < 1 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}

      // try{
      //   const videosCompleted = parseInt(window.sessionStorage.getItem('videos-completed'));
      //   window.sessionStorage.setItem('videos-completed',videosCompleted+1);
      //  }catch(e){
      //    console.error('error in video comp increment',e)
      //  }
    }
    /******************************/
    if(currentTime >= duration-0.4){
     if(showSwipeUp.count === 0 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
   }
    /******************************/
  };

  const handleBackClick = () => {
    router?.back();
  };

  const getCanShop = async () => {
    const shopContent = { ...shop };
    shopContent.isShoppable = 'fail';
    try {
      const response = await canShop({ videoId: activeVideoId });
      response?.isShoppable ? shopContent.isShoppable = 'success' : shopContent.isShoppable = 'fail';
      shopContent.data = response?.data;
      shopContent.type = response?.type;
      shopContent.charmData = response?.charmData;
      shopContent.adData = response?.adData;
      shopContent.campaignId = response?.campaignId;
    } catch (e) {
      console.log('error in canShop');
    }
    setShop(shopContent);
  };

  useEffect(() => {
    setShop({});
    items?.[videoActiveIndex]?.shoppable && getCanShop();
    setsaveLook(true);
  }, [activeVideoId]);

  const handleSaveLook = () => {
    const data = [...items];
    data.forEach(item => {
      if (item.content_id === activeVideoId) item.saveLook = true;
    });
    setItems(data);
    setsaveLook(!saveLook);
  };

  const size = useWindowSize();
  const videoHeight = `${size.height}`;

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <>
      <SeoMeta
        data={{
          title: `#${item} Hashtag videos on Hipi - Indian Short Video App`,
          // image: item?.thumbnail,
          description: `#${item} videos on Hipi. Checkout latest trending videos for #${item} hashtag that you can enjoy and share with your friends.`,
          canonical: getCanonicalUrl && getCanonicalUrl(),        
        }}
     />
        <div className="overflow-hidden relative" style={{ height: `${videoHeight}px` }}>

        <OpenAppStrip
          pageName={pageName}
          item={items?.[videoActiveIndex]}
          activeVideoId={activeVideoId}
          creatorId={items?.[videoActiveIndex]?.videoOwnersId}
          playlistId={items?.[videoActiveIndex]?.playlistId}
          playlistName={items?.[videoActiveIndex]?.playlistName}
        />

          <div onClick={handleBackClick} className="fixed z-10 w-full p-4 mt-4 w-1/2">
            <Back />
          </div>
          <Swiper
            className="max-h-full"
            direction="vertical"
            onSwiper={swiper => {
              // const slideToId = swiper?.slides?.findIndex(data => data?.id === videoId);
              // swiper?.slideTo(slideToId, 0);
              router?.replace(`/hashtag-feed/${item}`);
              setInitialPlayStarted(false);
            }}
            draggable="true"
            spaceBetween={0}
            calculateheight="true"
            mousewheel
            scrollbar={{ draggable: true }}
            onSlideChange={swiperCore => {
              const {
                activeIndex, slides
              } = swiperCore;
              setVideoDurationDetails({totalDuration: null, currentT:0})
              setSeekedPercentage(0)
              setInitialPlayStarted(false);
              setShowSwipeUp({count : 1, value:false});
              toTrackMixpanel('impression',{pageName:pageName, hashtagName: item, isShoppable: items?.[videoActiveIndex]?.shoppable, playlistId: items?.[videoActiveIndex]?.playlistId, playlistName: items?.[videoActiveIndex]?.playlistName},items?.[videoActiveIndex]);
              toTrackClevertap('impression',{pageName:pageName, hashtagName: item},items?.[videoActiveIndex]);
              // toTrackMixpanel(videoActiveIndex, 'swipe',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration});
              preVideoDurationDetails?.videoDurationDetails?.currentT > 0 && toTrackMixpanel('watchTime',{pageName:pageName, durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration, hashtagName: item, isShoppable: items?.[videoActiveIndex]?.shoppable, playlistId: items?.[videoActiveIndex]?.playlistId, playlistName: items?.[videoActiveIndex]?.playlistName},items?.[videoActiveIndex])
              ToTrackFbEvents('watchTime',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Hashtag Feed'},{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
              toTrackFirebase('watchTime',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Hashtag Feed'},{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})

              /** Mixpanel - increment view count **/
              preVideoDurationDetails?.videoDurationDetails?.currentT > 0 && incrementCountVideoView(items?.[videoActiveIndex]?.content_id);

                /*** video events ***/
                if(preVideoDurationDetails?.videoDurationDetails?.currentT < 3){
                  toTrackMixpanel('skip',{pageName:pageName,durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration, hashtagName: item},items?.[videoActiveIndex])
                  toTrackClevertap('skip',{pageName:pageName,durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration, hashtagName: item},items?.[videoActiveIndex])
                  viewEventsCall(activeVideoId,'skip')
                }else if(preVideoDurationDetails?.videoDurationDetails?.currentT < 7){
                  viewEventsCall(activeVideoId,'no decision')
                }
                viewEventsCall(activeVideoId, 'user_video_end', 
                {timeSpent: preVideoDurationDetails?.videoDurationDetails?.currentT,
                 duration : toShowItems[videoActiveIndex]?.videoDuration});

                /***************/

              if(slides[activeIndex]?.firstChild?.firstChild?.currentTime > 0){
                slides[activeIndex].firstChild.firstChild.currentTime = 0
              }
              const activeId = slides[activeIndex]?.id;
              setVideoActiveIndex(activeIndex);
              setActiveVideoId(activeId);
            }}
          >
            {
              validItemsLength &&  toShowItems?.map(
                (item,id) => (
                  <SwiperSlide
                    key={id}
                    id={item?.content_id}
                  >
                    <Video
                      updateSeekbar={updateSeekbar}
                      socialId={item?.getSocialId}
                      url={item?.video_url}
                      id={item?.content_id}
                      comments={item?.commentsCount}
                      likes={item?.likesCount}
                      music={item?.musicCoverTitle}
                      musicTitle={item?.music_title}
                      profilePic={item?.userProfilePicUrl}
                      userName={item?.userName}
                      musicCoverTitle={item?.musicCoverTitle}
                      videoid={item?.content_id}
                      hashTags={item?.hashTags}
                      videoOwnersId={item?.videoOwnersId}
                      thumbnail={item?.firstFrame}
                      canShop={shop?.isShoppable === "success" || false}
                      shopCards={shop?.data}
                      shopType={shop?.type}
                      handleSaveLook={handleSaveLook}
                      saveLook={saveLook}
                      saved={item?.saveLook}
                      activeVideoId={activeVideoId}
                      comp="profile"
                      profileFeed
                      loading={loading}
                      muted={item?.[videoActiveIndex]?.videoSound === false ? true : muted}
                      initialPlayStarted={initialPlayStarted}
                      firstFrame={item?.firstFrame}
                      player={'multi-player-muted'}
                      description={item?.content_description}
                      adData = {shop?.adData}
                      // showBanner={showBanner}
                      pageName={pageName}
                      userVerified = {item?.verified}
                      videoSound={item?.videoSound}
                      campaignId={shop?.campaignId}
                    />

                  </SwiperSlide>
                )
              )
            }
              <div
                className="absolute top-1/2 justify-center w-screen flex"
                style={{ display: (validItemsLength && seekedPercentage > 0) ? 'none' : 'flex text-white' }}
              >
             <CircularProgress/>
              </div>
              {!(items?.[videoActiveIndex]?.videoSound) && initialPlayStarted && <SnackCenter showSnackbar={noSound}/>}

              {validItemsLength &&  <div onClick={()=>setShowSwipeUp({count : 1, value : false})} id="swipe_up" className={showSwipeUp.value ? "absolute flex flex-col justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full" : 
          "absolute hidden justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full"}>
               <div className="p-1 relative">
                <SwipeUp/>
               <div className="w-4 h-16 bg-white bg-opacity-20 rounded-full absolute top-1 left-1"></div>
              </div>
              <div className="flex py-2 px-4 bg-gray text-white font-medium mt-12">Swipe up for next video</div>
              </div>}

              {<div
                onClick={()=>setMuted(false)}
                className="absolute top-0 right-4  mt-4 items-center flex justify-center p-4"
                style={{ display: initialPlayStarted && (items?.[videoActiveIndex]?.videoSound && muted) ? 'flex' : 'none' }}
              >
               <div className="stretch-y"><div className="stretch-z"></div></div>
               <div className='z-9'>
                <Mute/>
                </div>
              </div>}
          </Swiper>
          {validItemsLength ? seekedPercentage
            ? <Seekbar seekedPercentage={seekedPercentage} type={'onBottom'}/>
            : <SeekbarLoading type={'onBottom'}/>
            : ''}
          <div id="cb_tg_d_wrapper">
            <div className="playkit-player" />
          </div>
        </div>
        {/* {ShowAppBanner ? <AppBanner notNowClick={notNowClick} videoId={activeVideoId}/>:''} */}
        <Landscape />
      </>
    </ComponentStateHandler>
  );
};

export default withRouter(HashTagFeedIphone);
