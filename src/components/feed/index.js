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
import FeedTabs from '../commons/tabs/feed-tab';
import useTranslation from '../../hooks/use-translation';
import { getHomeFeed, getHomeFeedWLogin } from '../../sources/feed';
import { canShop } from '../../sources/can-shop';
import useWindowSize from '../../hooks/use-window-size';
import FooterMenu from '../footer-menu';
import dynamic from 'next/dynamic';
import Mute from '../commons/svgicons/mute';
import usePreviousValue from '../../hooks/use-previous';
import useAuth from '../../hooks/use-auth';
import LoginFollowing from '../login-following';
import { ONE_TAP_DOWNLOAD } from '../../constants';
import { getOneLink } from '../../sources/social';
import CircularProgress from '../commons/circular-loader'
import { getItem } from '../../utils/cookie';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import SwipeUp from '../commons/svgicons/swipe-up';
import { localStorage } from '../../utils/storage';
import * as fbq from '../../analytics/fb-pixel'
import HamburgerMenu from '../hamburger-menu';
import {trackEvent} from '../../analytics/firebase'
import { viewEventsCall } from '../../analytics/view-events';
 
SwiperCore?.use([Mousewheel]);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

const LandscapeView = dynamic(
  () => import('../landscape'),
  {
    loading: () => <div />,
    ssr: false
  }
);

//TO-DO segregate SessionStorage
function Feed({ router }) {
  const [items, setItems] = useState([]);
  const [toShowItems, setToShowItems] = useState([])
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [videoActiveIndex, setVideoActiveIndex] = useState(0)
  const [saveLook, setSaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });
  const [initialPlayButton, setInitialPlayButton] = useState(true)
  const [initialPlayStarted, setInitialPlayStarted] = useState(false)
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [videoDurationDetails, setVideoDurationDetails] = useState({totalDuration: null, currentT:0})
  const [showSwipeUp, setShowSwipeUp] = useState({count : 0 , value : false});
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [onCloseChamboard, setOnCloseChamboard] = useState('')
  const [initailShopContentAdded, setInitalShopContentAdded] = useState(false);

  const { t } = useTranslation();
  const { id } = router?.query;
  const { videoId } = router?.query;
  let { campaign_id = null} = router?.query;
  campaign_id = campaign_id ? campaign_id :  (localStorage?.get('campaign_id') || null);

  const pageName = 'Feed';
  const tabName = id && (id === 'following') ? 'Following' : 'ForYou';

  const setClose = (value)=>{
      setOnCloseChamboard(value)
  }

  useEffect(() => {
     setTimeout(()=>{
    if(initialLoadComplete === true){
      toTrackMixpanel('screenView',{pageName:pageName, tabName:tabName});
      toTrackMixpanel('impression',{pageName:pageName,tabName:tabName},items?.[videoActiveIndex]); 
      fbq.event('Screen View')
      trackEvent('Screen_View',{'Page Name' :'Feed'});
    }
  },1500);
  }, [initialLoadComplete]);

  useEffect(()=>{    
    shop?.isShoppable == 'success' && setInitalShopContentAdded(true)
},[shop])

  useEffect(()=>{
     initailShopContentAdded && 
    toTrackMixpanel('impression',{pageName:pageName,tabName:tabName,isShoppable:shop?.isShoppable !== 'pending' ? shop?.isShoppable : 'fail', isMonetization : shop?.adCards?.monitisation || false},items?.[videoActiveIndex]);  
  },[initailShopContentAdded])

  const preActiveVideoId = usePreviousValue({videoActiveIndex});
  const preVideoActiveIndex = usePreviousValue({videoActiveIndex});
  const preVideoDurationDetails = usePreviousValue({videoDurationDetails});
  const preShopData = usePreviousValue({shop});

  const onDataFetched = data => {
    if(data?.data?.length > 0){
        let toUpdateShowData = [];
        const videoIdInitialItem = data?.data?.[0]?.content_id
        //set first three item in showItems
        data?.data?.[0] && toUpdateShowData.push(data?.data?.[0]);
        data?.data?.[1] && toUpdateShowData.push(data?.data?.[1]);
        data?.data?.[2] && toUpdateShowData.push(data?.data?.[2]);
        setItems(data?.data);
        setToShowItems(toUpdateShowData);
        setInitialLoadComplete(true);
        setFirstApiCall(false);
        setActiveVideoId(videoIdInitialItem);
        // setFirstItemLoaded(true);
        // setSeoItem(data?.data[0]);
    }else{
      setItems([]);
      setToShowItems([]);
      setActiveVideoId(null);
      setFirstApiCall(false);
    }
  }

/* mixpanel - monetization cards impression */
  useEffect(()=>{
    shop?.adData?.monitisation && shop?.adData?.monitisationCardArray?.length > 0 &&   shop?.adData?.monitisationCardArray?.map((data)=> { toTrackMixpanel('monetisationProductImp',{pageName:pageName, tabName:tabName},{content_id:videoId,productId:data?.card_id, brandUrl:data?.product_url})});
  },[shop])
 /************************ */ 

  useEffect(()=>{
    if(initialPlayStarted === true){
      toTrackMixpanel('play',{pageName : pageName,tabName:tabName},items?.[videoActiveIndex]);
      ToTrackFbEvents(videoActiveIndex,'play');
      toTrackFirebase(videoActiveIndex,'play');
      viewEventsCall(activeVideoId, 'user_video_start');
    }
  },[initialPlayStarted])

  // selecting home feed api based on before/after login
  const dataFetcher = () => getHomeFeed({ type: id, videoId: videoId, firstApiCall:firstApiCall, campaign_id: campaign_id });
  const dataFetcherWLogin = () => getHomeFeedWLogin({ type: id,videoId: videoId, firstApiCall: firstApiCall, campaign_id:campaign_id });

  const fetchData =  useAuth(dataFetcher,dataFetcherWLogin);

  const getFeedData = async() =>{
    let updateItems = [...items];
     try{
       const data =  await fetchData({ type: id });
       updateItems = updateItems.concat(data?.data);
       setItems(updateItems);
      }
     catch(err){
     }
     return updateItems;
  } 

  let [fetchState, retry, data] = useFetcher(fetchData, onDataFetched, id);
  setRetry = retry && retry

  useEffect(()=>{
    setToShowItems([]),
    setItems([])
    setVideoActiveIndex(0)
    setActiveVideoId(null);
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
    if(percentage > 0){
      setInitialPlayStarted(true);
     }
     /********** Mixpanel ***********/
     if(currentTime >= duration-0.2){
       toTrackMixpanel('watchTime',{pageName:pageName,tabName:tabName, watchTime : 'Complete', duration : duration, durationWatchTime: duration},items?.[videoActiveIndex])
       toTrackMixpanel('replay',{pageName:pageName,tabName:tabName,  duration : duration, durationWatchTime: duration},items?.[videoActiveIndex])

       fbq.event('UGC_Played_Complete ')
       ToTrackFbEvents(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})

       toTrackFirebase(videoActiveIndex,'watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
       toTrackFirebase(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})
       /*** view events ***/
       viewEventsCall(activeVideoId, 'user_video_start');
       if(showSwipeUp.count < 1 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
     }
     /******************************/
     if(currentTime >= duration-0.4){
      if(showSwipeUp.count === 0 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
    }
  };

  const getCanShop = async () => {
    let isShoppable;
    const shopContent = { ...shop };
    try {
      const response = await canShop({ videoId: activeVideoId  });
      isShoppable = response?.isShoppable;
      shopContent.data = response?.data;
      shopContent.type = response?.type;
      shopContent.charmData = response?.charmData;
      shopContent.adData = response?.adData;
    } catch (e) {
      console.error("$",e)
    }
    isShoppable ? shopContent.isShoppable = 'success' : shopContent.isShoppable = 'fail';
    setShop(shopContent);
  };

 const incrementShowItems = async() =>{
  let updateShowItems = [...toShowItems];
  const dataItem = [...items]
  /* Increment */
    const incrementGap = 2;
    let insertItemIndex = videoActiveIndex+incrementGap;
    const arr = dataItem?.length-1 >= insertItemIndex ? dataItem : await getFeedData();
    
    arr && updateShowItems?.push(arr[insertItemIndex]);
  /* Delete */
    const decrementGap = 3;
    let deleteItemIndex = videoActiveIndex-decrementGap;
    if(deleteItemIndex >=0 && videoActiveIndex >=3){
      updateShowItems[deleteItemIndex] = null;
    }
  setToShowItems(updateShowItems);
 }

 const decrementingShowItems = async() =>{
  let updateShowItems = [...toShowItems];
  const dataItem = [...items]
  /* Add */
  const  incrementGap = 2;
  let insertItemIndex = videoActiveIndex-incrementGap;
  if(insertItemIndex >=0 && videoActiveIndex >=2){
    updateShowItems[insertItemIndex] = dataItem?.[insertItemIndex];
  }
  /* Delete */
    const  decrementGap=  3;
    let deleteItemIndex = videoActiveIndex+decrementGap;
     deleteItemIndex >= 3 && updateShowItems?.splice(deleteItemIndex,1);

    setToShowItems(updateShowItems);
 }

  useEffect(()=>{
    if(preVideoActiveIndex?.videoActiveIndex){
    }
    if(videoActiveIndex > preActiveVideoId?.videoActiveIndex){
      //swipe-down
      toShowItems.length > 0 && incrementShowItems();
    }else{
      //swipe-up
      toShowItems.length > 0 && decrementingShowItems();
    }
  },[videoActiveIndex])

  useEffect(() => {
    setShop({});
    items?.[videoActiveIndex]?.shoppable && getCanShop();
    setSaveLook(true);
  },[activeVideoId]);

  const toggleSaveLook = (value) => {
    /********* Mixpanel ***********/
    // saveLook === true && toTrackMixpanel(videoActiveIndex,'savelook')
    /*****************************/
    setSaveLook(value);
  };

  const tabs = [
    { display: `${t('FOLLOWING')}`, path: `${t('SFOLLOWING')}` },{ display: `${t('FORYOU')}`, path: `${t('FOR-YOU')}` }];

  const size = useWindowSize();
  const videoHeight = `${size.height}`;

const ToTrackFbEvents = (activeIndex, type, value) => {
  const item = items[activeIndex];
  const fbEvents = {}

  const toTrack = {
    'impression' : ()=>  fbq.event('UGC Impression', fbEvents),
    'swipe' : ()=> {
      fbEvents['UGC Duration'] = value?.duration
      fbEvents['UGC Watch Duration'] = value?.durationWatchTime
      fbq.event('UGC Swipe', fbEvents)
    },
    'play' : () => fbq.event('UGC Play', fbEvents),
    'pause' : () => fbq.event('Pause', fbEvents),
    'resume' : () => fbq.event('Resume', fbEvents),
    'share' : () => fbq.event('UGC Share Click', fbEvents),
    'replay' : () => fbq.event('UGC Replayed', fbEvents),
    'watchTime' : () => {
      fbEvents['UGC Consumption Type'] = value?.watchTime
      fbEvents['UGC Duration'] = value?.duration
      fbEvents['UGC Watch Duration'] = value?.durationWatchTime
      fbq.event('UGC Watch Time',fbEvents)
    },
    'cta' : ()=>{
      fbEvents['Element'] = value?.name
      fbEvents['Button Type'] = value?.type
      fbq.event('CTAs', fbEvents)
    },
    'savelook' : ()=>{
      fbq.event('Save Look', fbEvents)
    },
  }

  fbEvents['Creator ID'] = item?.userId;
  fbEvents['UGC ID'] = item?.content_id;
  fbEvents['Page Name'] = 'Feed';

  toTrack?.[type]();
}
/*****************************/
const toTrackFirebase = (activeIndex, type, value) => {
  const item = items[activeIndex];
  const events = {}

  const toTrack = {
    'play' : () => trackEvent('UGC_Play', events),
    'share' : () => trackEvent('UGC_Share Click', events),
    'replay' : () => trackEvent('UGC_Replayed', events),
    'watchTime' : () => {
      events['UGC Consumption Type'] = value?.watchTime
      events['UGC Duration'] = value?.duration
      events['UGC Watch Duration'] = value?.durationWatchTime
      trackEvent('UGC_Watch_Time',events)
    },
    'cta' : ()=>{
      events['Element'] = value?.name
      events['Button Type'] = value?.type
      trackEvent('CTAs', events)
    },
    'savelook' : ()=>{
      trackEvent('Save_Look', events)
    }
  }

  events['Creator ID'] = item?.userId;
  events['UGC ID'] = item?.content_id;
  events['Page Name'] = 'Feed';

  toTrack?.[type]();
}

  const swiper = <Swiper
              className="max-h-full"
              direction="vertical"
              draggable="true"
              spaceBetween={5}
              calculateheight="true"
              // slidesPerView={}
              mousewheel
              // speed = '5000'
              scrollbar={{ draggable: true }}
              // autoplay= {{
              //     // delay: 2000,
              //     // delay: 5000,
              //     disableOnInteraction: false
              // }}
              onSwiper={swiper => {
                const {
                  activeIndex, slides
                } = swiper;
                setInitialPlayStarted(false);
              }}
              onSlideChange={swiperCore => {
                const {
                  activeIndex, slides
                } = swiperCore;
                setSeekedPercentage(0)
                setInitialPlayStarted(false);

                setShowSwipeUp({count : 1, value:false});

                /***************/
                /*** Mixpanel ****/
                toTrackMixpanel('impression',{pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);
                // toTrackMixpanel(videoActiveIndex, 'swipe',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration});
                toTrackMixpanel('watchTime',{pageName:pageName,tabName:tabName, durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration},items?.[videoActiveIndex])
                ToTrackFbEvents(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
                toTrackFirebase(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})

                /*** video events ***/
                if(preVideoDurationDetails?.videoDurationDetails?.currentT < 3){
                  toTrackMixpanel('skip',{pageName:pageName,tabName:tabName,durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration, isShoppable:preShopData?.shop?.isShoppable, isMonetization:preShopData?.shop?.adData?.isMonetization},items?.[videoActiveIndex])
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
                      hashTags={item?.hashtags}
                      videoOwnersId={item?.videoOwnersId}
                      thumbnail={item?.firstFrame}
                      canShop={item?.shoppable}
                      charmData = {shop?.charmData}
                      shopCards={shop?.data}
                      shopType={shop?.type}
                      handleSaveLook={toggleSaveLook}
                      saveLook={saveLook}
                      saved={item?.saveLook}
                      activeVideoId={activeVideoId}
                      preActiveVideoId={items?.[videoActiveIndex]?.content_id}
                      nextActiveVideoId = {items?.[videoActiveIndex]?.content_id}
                      comp="feed"
                      ProfileFeed
                      initialPlayButton={initialPlayButton}
                      muted={muted}
                      loading={loading}
                      videoActiveIndex={videoActiveIndex}
                      initialPlayStarted={initialPlayStarted}
                      currentT={videoDurationDetails?.currentT}
                      player={'single-player-muted'}
                      isLiked={item?.isLiked}
                      description={item?.content_description}
                      onCloseChamboard={onCloseChamboard}
                      setClose={setClose}
                      pageName={pageName}
                      tabName={tabName}
                      adData={shop?.adData}
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
                style={{ display: (seekedPercentage > 0) ? 'none' : 'flex text-white' }}
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
              {<div
                onClick={()=>setMuted(false)}
                className="absolute top-0 right-4  mt-4 items-center flex justify-center p-4"
                style={{ display: initialPlayStarted && muted ? 'flex' : 'none' }}
              >
               <div className="stretch-y"><div className="stretch-z"></div></div>
               <div className='z-9'>
                <Mute/>
                </div>
              </div>}
              {validItemsLength ? seekedPercentage > 0
              ? <Seekbar seekedPercentage={seekedPercentage} type={'aboveFooterMenu'} />
              : <SeekbarLoading type={'aboveFooterMenu'}/>
              : ''}
              <FooterMenu 
              videoId={activeVideoId}
              canShop={items?.[videoActiveIndex]?.shoppable}
              type="shop"
              selectedTab="home"
              shopType={shop?.type && shop.type}
              shop={shop}
              setClose={setClose}
              pageName={pageName}
              tabName={tabName}
              />
            </Swiper>
            

  const showLoginFollowing = <LoginFollowing toTrackMixpanel={toTrackMixpanel} videoActiveIndex={videoActiveIndex} pageName={pageName} tabName={tabName || null}/>;
  
  const toShowFollowing =  useAuth(showLoginFollowing, swiper);

  const info = {
    'for-you' : swiper,
    'following' : toShowFollowing
  }

//   let hostname;
//   if (typeof window !== 'undefined') {
//     hostname = window?.location?.hostname;
//  }

 
const onStoreRedirect = async ()=>{
  fbq.event('App Open CTA')
  toTrackMixpanel('cta',{pageName:pageName,tabName:tabName},{ name: 'Open App', type: 'Button'},items?.[videoActiveIndex]);
  trackEvent('App_Open_CTA')
  let link = ONE_TAP_DOWNLOAD;
try{  
 if(activeVideoId){ 
   try{ const resp = await getOneLink({videoId : activeVideoId});
    link = resp?.data;
    console.log("one link resp",resp);
  }
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
      {/* open cta */}
      <div className="bottom-16 z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center flex items-center ">
            <p className="text-sm">
            Get the full experience on the Hipi app
            </p>
            <div onClick={onStoreRedirect} className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
               Open
            </div>
         </div>

          {/* hamburger */}
         <HamburgerMenu/>

        <div className="fixed mt-10 z-10 w-full">
          <FeedTabs items={tabs} />
        </div>
        {info?.[id]}
        <div id="cb_tg_d_wrapper">
          <div className="playkit-player" />
        </div>
      </div>
      <LandscapeView/>
    </>
    </ComponentStateHandler>

  );
}

export default withRouter(Feed);
