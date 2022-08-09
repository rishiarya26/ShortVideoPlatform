/*eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Video from '../video';
import Error from './error';
import dynamic from 'next/dynamic';
import Loading from './loader';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Seekbar from '../seekbar';
import SeekbarLoading from '../seekbar/loader.js';
import FeedTabs from '../commons/tabs/feed-tab';
import useTranslation from '../../hooks/use-translation';
import useWindowSize from '../../hooks/use-window-size';
import FooterMenu from '../footer-menu';
import usePreviousValue from '../../hooks/use-previous';
import useAuth from '../../hooks/use-auth';
import useDrawer from '../../hooks/use-drawer';
import CircularProgress from '../commons/circular-loader'
import HamburgerMenu from '../hamburger-menu';
import {  getHomeFeed, getHomeFeedWLogin } from '../../sources/feed';
import { canShop } from '../../sources/can-shop';
import { viewEventsCall } from '../../analytics/view-events';
import { localStorage } from '../../utils/storage';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { ONE_TAP_DOWNLOAD } from '../../constants';
import { getOneLink } from '../../sources/social';
import { commonEvents } from '../../analytics/mixpanel/events';
import { getItem } from '../../utils/cookie';
import UserExperience from '../commons/user-experience';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';
import SwipeUp from "../commons/svgicons/swipe-up";
import Mute from '../commons/svgicons/mute';
import Landscape from '../landscape';


SwiperCore?.use([Mousewheel]);

const LoginFollowing = dynamic(()=> import('../login-following'),{
  loading: () => <div />,
  ssr: false
})
// const LandscapeView = dynamic(() => import('../landscape'),{
//   loading: () => <div />,
//   ssr: false
// });

SwiperCore?.use([Mousewheel]);

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);


// const AppBanner = dynamic(
//   () => import('../app-banner'),
//   {
//     loading: () => <div />,
//     ssr: false
//   }
// );

//TO-DO segregate SessionStorage
function FeedIphone({ router }) {
  const [items, setItems] = useState([]);
  const [toShowItems, setToShowItems] = useState([])
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [videoActiveIndex, setVideoActiveIndex] = useState(0)
  const [saveLook, setSaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });
  const [initialPlayButton, setInitialPlayButton] = useState(true)
  const [initialPlayStarted, setInitialPlayStarted] = useState(false)
  const [currentTime, setCurrentTime] = useState(null)
  const [muted, setMuted] = useState(true);
  const [toInsertElements, setToInsertElements] = useState(4);
  const [deletedTill, setDeletedTill] = useState();
  const [loading, setLoading] = useState(true);
  const [videoDurationDetails, setVideoDurationDetails] = useState({totalDuration: null, currentT:0})
  const [showSwipeUp, setShowSwipeUp] = useState({count : 0 , value : false});
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [onCloseChamboard, setOnCloseChamboard] = useState('')
  // const [showAppBanner, setShowAppBanner] = useState(false);
  const [toSuspendLoader, setToSuspendLoader] = useState(false);

  const { t } = useTranslation();
  const { id } = router?.query;
  const { videoId } = router?.query;
  let { campaign_id = null} = router?.query;
  campaign_id = campaign_id ? campaign_id : (localStorage?.get('campaign_id') || null);

  const {show} = useDrawer();

  const pageName = 'Feed';
  const tabName = id && (id === 'following') ? 'Following' : 'ForYou';

  const setClose = (value)=>{
    setOnCloseChamboard(value)
}
// const showBanner=()=>{
//   setShowAppBanner(true);
// }
// const notNowClick = ()=>{
//   setShowAppBanner(false);
// }
  useEffect(() => {
    setTimeout(()=>{
      if(initialLoadComplete === true){
        const mixpanelEvents = commonEvents();
        toTrackMixpanel('screenView',{pageName:pageName, tabName:tabName});
        toTrackMixpanel('impression',{pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);  
        // trackEvent('Screen_View',{'Page Name' :'Feed'})
        toTrackFirebase('screenView',{'page' :'Feed'});
        setLoading(false);
      }
    },1500);
  }, [initialLoadComplete]);

  const preActiveVideoId = usePreviousValue({videoActiveIndex});
  const pretoInsertElemant = usePreviousValue({toInsertElements});
  
  const preVideoActiveIndex = usePreviousValue({videoActiveIndex});
  const preVideoDurationDetails = usePreviousValue({videoDurationDetails});
  const preShopData = usePreviousValue({shop});

  const onDataFetched = data => {
    if(data){  
        let toUpdateShowData = [];
        const videoIdInitialItem = data?.data?.[0]?.content_id
        const videos = data?.data;
        /* show pop up & call api for next items after specified index */
        const insertItemsIndex = videoId ? 5 : 4
        setItems(videos);
        setToShowItems(videos);
        setActiveVideoId(videoIdInitialItem);
        setToInsertElements(insertItemsIndex);
        setInitialLoadComplete(true);
        setFirstApiCall(false);
    }
  }

  /* mixpanel - monetization cards impression */
  useEffect(()=>{
    // console.log("aAAAADDD",shop?.adData)
    shop?.adData?.monitisation && shop?.adData?.monitisationCardArray?.length > 0 &&   shop?.adData?.monitisationCardArray?.map((data)=> { toTrackMixpanel('monetisationProductImp',{pageName:pageName, tabName:tabName},{content_id:videoId,productId:data?.card_id, brandUrl:data?.product_url})});
  },[shop])
  /************************ */ 

  useEffect(()=>{
    if(initialPlayStarted === true){
      toTrackMixpanel('play',{pageName : pageName,tabName:tabName},items?.[videoActiveIndex]);
      ToTrackFbEvents('play',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'})
      toTrackFirebase('play',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'});
      viewEventsCall(activeVideoId, 'user_video_start');
    }
  },[initialPlayStarted])


  // selecting home feed api based on before/after login
  const dataFetcher = () => getHomeFeed({ type: id, videoId:videoId, firstApiCall:firstApiCall,campaign_id:campaign_id });
  const dataFetcherWLogin = () => getHomeFeedWLogin({ type: id, videoId: videoId, firstApiCall: firstApiCall, campaign_id:campaign_id });

  const fetchData =  useAuth(dataFetcher,dataFetcherWLogin);

  const getFeedData = async() =>{
    let updateItems = [...items];
    let data = []
     try{
       data =  await fetchData({ type: id });
       updateItems = updateItems.concat(data?.data);
      //  setOffset(offset+1)
       setItems(updateItems);
      }
     catch(err){
     }
     return data?.data;
  } 

  let [fetchState, retry, data] = useFetcher(fetchData, onDataFetched, id);
  setRetry = retry && retry

  useEffect(()=>{
    setToShowItems([]),
    setItems([])
    setVideoActiveIndex(0)
    setActiveVideoId(null)
    ToTrackFbEvents('screenView');
    //fbq.event('Screen View')
    toTrackMixpanel('tabView',{pageName:pageName, tabName:tabName});
  },[id])

  

  if (id === 'for-you') {
    const status = fetchState === 'success';
    const dataLength = data?.data?.length;
    fetchState = (status && !dataLength > 0) ? 'fail' : fetchState;
    data = (status && dataLength > 0) && data;
    retry = (status && !dataLength > 0) && retry;
  }

  const validItemsLength = toShowItems?.length > 0;
  // setRetry = retry && retry;

  const updateSeekbar = (percentage, currentTime, duration) => {
    setInitialPlayButton(false)
    setSeekedPercentage(percentage);
    const videoDurationDetail = {
      currentT : currentTime,
      totalDuration : duration
    }
    if(currentTime > 6.8 && currentTime < 7.1){
      viewEventsCall(activeVideoId,'view')
    }
    setVideoDurationDetails(videoDurationDetail);
    // setCurrentT(currentTime);
    if(percentage > 0){
      setInitialPlayStarted(true);
     }
    /********** Mixpanel ***********/
    if(currentTime >= duration-0.2){
      toTrackMixpanel('watchTime',{pageName:pageName,tabName:tabName, watchTime : 'Complete', duration : duration, durationWatchTime: duration},items?.[videoActiveIndex])
      toTrackMixpanel('replay',{pageName:pageName,tabName:tabName,  duration : duration, durationWatchTime: duration},items?.[videoActiveIndex])

      toTrackFirebase('watchTime',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'}, { watchTime : 'Complete', duration : duration, durationWatchTime: duration})
      toTrackFirebase('replay', {userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'},{  duration : duration, durationWatchTime: duration})
      
      ToTrackFbEvents('ugcUploadComplete');
      // fbq.event('UGC_Played_Complete')
      ToTrackFbEvents('replay',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'},{  duration : duration, durationWatchTime: duration})
      /*** view events ***/
      // viewEventsCall(activeVideoId, 'completed');
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

  const getCanShop = async () => {
    let isShoppable = false;
    const shopContent = { ...shop };
    try {
      const response = await canShop({ videoId: activeVideoId });
      isShoppable = response?.isShoppable;
      shopContent.data = response?.data;
      shopContent.type = response?.type;
      shopContent.charmData = response?.charmData;
      shopContent.adData = response?.adData;
    } catch (e) {
      isShoppable = false;
    }
    isShoppable ? shopContent.isShoppable = 'success' : shopContent.isShoppable = 'fail';
    setShop(shopContent);
  };

 const incrementShowItems = async() =>{
 try{ 
  let updateShowItems = [...toShowItems];
  let deletedTill = pretoInsertElemant?.toInsertElements-12;
  let dataItem = [...items];

  const arr = await getFeedData();
  arr && (dataItem = dataItem?.concat(arr));
  //add
  for(let i=0;i<=5;i++){
    if(dataItem?.[videoActiveIndex+i+2]){ 
      updateShowItems.push(dataItem[videoActiveIndex+i+2])
    }
    // else{

    // updateShowItems.push(dataItem[videoActiveIndex+i+2]);
    // }
  }
  //delete
  if(videoActiveIndex >= 10)
  { for(let i=0;i<=pretoInsertElemant?.toInsertElements-6-1;i++){
    updateShowItems[i] && (updateShowItems[i] = null);
   
    // items?.[videoActiveIndex+i+2] && updateShowItems.push(items[videoActiveIndex+i+2]);
  }
  }
  deletedTill = pretoInsertElemant?.toInsertElements-6-1;
  setDeletedTill(deletedTill);
  setMuted(true);
  // setShowAppBanner(true);
  show('', detectDeviceModal, 'extraSmall', {text: "see more", setMuted:setMuted});
  // arr && console.log(updateShowItems,updateShowItems?.concat(arr))
  // arr && (updateShowItems = updateShowItems?.concat(arr));
  setToShowItems(updateShowItems);
}
  catch(e){
console.log('errorrr',e)
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
  // setShowAppBanner(true);
  setDeletedTill(deletedTill-5);
  setToShowItems(updateShowItems);
 }

  useEffect(()=>{
    // if(preVideoActiveIndex?.videoActiveIndex){
    //   toTrackMixpanel(preVideoActiveIndex?.videoActiveIndex,'durationWatchTime',{watchTime : preCurrentT?.currentT}) 
    // }
    if(videoActiveIndex > preActiveVideoId?.videoActiveIndex){
      //swipe-down
      if(toShowItems.length > 0 && toInsertElements === videoActiveIndex){
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
    // if(videoActiveIndex === 6) showAppBanner===false && setShowAppBanner(true);
  },[videoActiveIndex])

  useEffect(() => {
    setShop({});
    items?.[videoActiveIndex]?.shoppable && getCanShop();
    setSaveLook(true);
  }, [activeVideoId]);

  const setToSuspendLoaderCb = (val) => {
    setToSuspendLoader(val);
  }

  const toggleSaveLook = (value) => {
    // /********* Mixpanel ***********/
    // saveLook === true && toTrackMixpanel(videoActiveIndex,'savelook')
    // ToTrackFbEvents(videoActiveIndex,'savelook')
    // /*****************************/

    // const data = [...toShowItems];
    // const resp = data.findIndex(item => (item?.content_id === activeVideoId));
    // data[resp].saveLook = true;
    // setToShowItems(data);
    setSaveLook(value);
  };

  const tabs = [
    { display: `${t('FOLLOWING')}`, path: `${t('SFOLLOWING')}` },{ display: `${t('FORYOU')}`, path: `${t('FOR-YOU')}` }];

  const size = useWindowSize();
  const videoHeight = `${size.height}`;

  const swiper = <Swiper
              className="max-h-full"
              direction="vertical"
              draggable="true"
              spaceBetween={0}
              calculateheight="true"
              slidesPerView={1}
              mousewheel
              scrollbar={{ draggable: true }}
              // autoplay= {{
              //     disableOnInteraction: false
              // }}
              onSwiper={swiper => {
                const {
                  activeIndex, slides
                } = swiper;
                //Mixpanel
                // toTrackMixpanel(activeIndex,'duration',{duration: slides[0]?.firstChild?.firstChild?.duration}) 
                setInitialPlayStarted(false);
                // router?.replace(`/feed/${id}`);
                // toTrackMixpanel(0, 'impression');
              }}
              onSlideChange={swiperCore => {
                const {
                  activeIndex, slides
                } = swiperCore;

                setShowSwipeUp({count : 1, value:false});

                //Mixpanel
                setInitialPlayStarted(false);
                toTrackMixpanel('impression',{pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);
                // toTrackMixpanel(videoActiveIndex, 'swipe',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration});
                preVideoDurationDetails?.videoDurationDetails?.currentT > 0 && toTrackMixpanel('watchTime',{pageName:pageName,tabName:tabName, durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration},items?.[videoActiveIndex])

                ToTrackFbEvents('watchTime',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'},{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
                toTrackFirebase('watchTime', {userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'},{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})

                /*** video events ***/
                if(preVideoDurationDetails?.videoDurationDetails?.currentT < 3){
                  toTrackMixpanel('skip',{pageName:pageName,tabName:tabName,durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration},items?.[videoActiveIndex])
                  viewEventsCall(activeVideoId,'skip')
                }else if(preVideoDurationDetails?.videoDurationDetails?.currentT < 7){
                  viewEventsCall(activeVideoId,'no decision')
                }
                viewEventsCall(activeVideoId, 'user_video_end', 
                {timeSpent: preVideoDurationDetails?.videoDurationDetails?.currentT,
                 duration :  preVideoDurationDetails?.videoDurationDetails?.totalDuration});
                /***************/

                if(slides[activeIndex]?.firstChild?.firstChild?.currentTime > 0){
                  slides[activeIndex].firstChild.firstChild.currentTime = 0
                }    
                const activeId = slides[activeIndex]?.attributes?.itemid?.value;
                // const dataItems = [...items];
                // const seoItem = dataItems?.find(item => item?.content_id === activeId);
                // seoItem && setSeoItem(seoItem);
                activeIndex && setVideoActiveIndex(activeIndex);
                if(activeIndex === 0){
                  setVideoActiveIndex(0);
                }
                activeId && setActiveVideoId(activeId);
              }}
            >
              {
                (validItemsLength ? toShowItems.map((
                  item, id
                ) => (
                  <SwiperSlide
                    key={id}
                    id={item?.watchId}
                    itemID={item?.content_id}
                  >
                  {item !==null &&  <Video
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
                      // videoid={item.content_id}
                      hashTags={item?.hashtags}
                      videoOwnersId={item?.videoOwnersId}
                      thumbnail={item?.firstFrame}
                      // thumbnail={item.poster_image_url}
                      canShop={item?.shoppable}
                      charmData = {shop?.charmData}
                      shopCards={shop?.data}
                      shopType={shop?.type}
                      handleSaveLook={toggleSaveLook}
                      saveLook={saveLook}
                      saved={item?.saveLook}
                      activeVideoId={activeVideoId}
                      comp="feed"
                      currentTime={currentTime}
                      initialPlayButton={initialPlayButton}
                      muted={muted}
                      loading={loading}
                      videoActiveIndex={videoActiveIndex}
                      initialPlayStarted={initialPlayStarted}
                      currentT={videoDurationDetails?.currentT}
                      player={'multi-player-muted'}
                      description={item?.content_description}
                      onCloseChamboard={onCloseChamboard}
                      setClose={setClose}
                      adData={shop?.adData}
                      pageName={pageName}
                      tabName={tabName}
                      suspendLoader={setToSuspendLoaderCb && setToSuspendLoaderCb}
                      // showBanner={showBanner}
                      // setMuted={setMuted}
                    />}
                  </SwiperSlide>
                )) : (
                  <div className="h-screen bg-black flex justify-center items-center">
                    <span className="mt-10 text-white">{t('NO_VIDEOS')}</span>
                  </div>
                ))
              }
              {validItemsLength && <div
                className="absolute top-1/2 justify-center w-screen flex"
                style={{ display: (toSuspendLoader || seekedPercentage > 0) ? 'none' : 'flex text-white' }}
              >
                <CircularProgress/>
              </div>}
              {validItemsLength &&  <div onClick={()=>setShowSwipeUp({count : 1, value : false})} id="swipe_up" className={showSwipeUp.value ? "absolute flex flex-col justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full" : 
          "absolute hidden justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full"}>
               <div className="p-1 relative">
                <SwipeUp/>
               <div className="w-4 h-16 bg-white bg-opacity-20 rounded-full absolute top-1 left-1"></div>
              </div>
              <div className="flex py-2 px-4 bg-gray text-white font-medium mt-12">Swipe up for next video</div>
              </div>}
              {/* <div
                onClick={()=>setInitialPlayButton(false)}
                className="absolute top-1/2 justify-center w-screen"
                style={{ display: initialPlayButton ? 'flex' : 'none' }}
              >
                <Play/>
              </div> */}
              {validItemsLength && <div
                onClick={()=>setMuted(false)}
                className="absolute top-0 right-4  mt-4 items-center flex justify-center p-4"
                style={{ display: !initialPlayButton && muted ? 'flex' : 'none' }}
              >
                <div className="stretch-y"><div className="stretch-z"></div></div>
                <div className="z-9">
                <Mute/>
                </div>
              </div>}
              {validItemsLength ? seekedPercentage > 0
              ? <Seekbar seekedPercentage={seekedPercentage} type={'aboveFooterMenu'} />
              : !toSuspendLoader && <SeekbarLoading type={'aboveFooterMenu'}/>
              : ''}
              <FooterMenu 
              videoId={activeVideoId}
              canShop={items?.[videoActiveIndex]?.shoppable}
              type="shop"
              selectedTab="home"
              shopType = {shop?.type}
              setClose={setClose}
              onCloseChamboard={onCloseChamboard}
              pageName={pageName}
              tabName={tabName}
              // showBanner={showBanner}
              />
            </Swiper>

  const showLoginFollowing = <LoginFollowing toTrackMixpanel={toTrackMixpanel} videoActiveIndex={videoActiveIndex}/>;
  
  const toShowFollowing = useAuth(showLoginFollowing, swiper);

  const info = {
    'for-you' : swiper,
    'following' : toShowFollowing
  }

  let hostname;
  if (typeof window !== 'undefined') {
    hostname = window?.location?.hostname;
 }


 const onStoreRedirect = async ()=>{

  // fbq.event('App Open CTA');
  // trackEvent('App_Open_CTA')
  toTrackFirebase('appOpenCTA');
  ToTrackFbEvents('appOpenCTA');
   toTrackMixpanel('cta',{pageName:pageName,tabName:tabName, name: 'Open', type: 'Button'},items?.[videoActiveIndex]);
  let link = ONE_TAP_DOWNLOAD;
  const device = getItem('device-info');
  console.log(device)
try{  
 if(activeVideoId){ 
   try{ const resp = await getOneLink({videoId : activeVideoId});
    link = resp?.data;
    console.log("one link resp",resp);}
    catch(e){
      console.log('error android onelink',e)
    }
  }
 }
  catch(e){
  }
  console.log("final onelink",link);
  window?.open(link);
}


  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
    <>
      <div className="feed_screen overflow-hidden relative" style={{ height: `${videoHeight}px` }}>
         <UserExperience
          pageName={pageName}
          tabName={tabName}
          items={items}
          videoActiveIndex={videoActiveIndex}
          activeVideoId={activeVideoId}
        />
        <HamburgerMenu/>
        <div className="fixed mt-10 z-10 w-full">
          <FeedTabs items={tabs} />
        </div>
        {info?.[id]}
        <div id="cb_tg_d_wrapper">
          <div className="playkit-player" />
        </div>
      </div>
      {/* {showAppBanner ? <AppBanner notNowClick={notNowClick} videoId={activeVideoId}/> : ''} */}
      <Landscape/>
    </>
    </ComponentStateHandler>

  );
}

export default withRouter(FeedIphone);
