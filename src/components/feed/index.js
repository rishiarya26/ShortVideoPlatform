/*eslint-disable react/display-name */
import React, { useContext, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
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
import { cacheAdResponse, getHomeFeed, getHomeFeedWLogin } from '../../sources/feed';
import { canShop } from '../../sources/can-shop';
import useWindowSize from '../../hooks/use-window-size';
import FooterMenu from '../footer-menu';
import usePreviousValue from '../../hooks/use-previous';
import useAuth from '../../hooks/use-auth';
import CircularProgress from '../commons/circular-loader'
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { localStorage, sessionStorage } from '../../utils/storage';
import * as fbq from '../../analytics/fb-pixel'
import HamburgerMenu from '../hamburger-menu';
import {trackEvent} from '../../analytics/firebase'
import { viewEventsCall } from '../../analytics/view-events';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';
import SwipeUp from '../commons/svgicons/swipe-up';
import Mute from '../commons/svgicons/mute';
import Landscape from '../landscape';
import AppBanner from '../app-banner';
import { incrementCountVideoView } from '../../utils/events';
import OpenAppStrip from '../commons/user-experience';
import LanguageSelection from '../lang-selection';
import VideoUnavailable from '../video-unavailable';
import { isReffererGoogle } from '../../utils/web';
import SnackCenter from '../commons/snack-bar-center';
import { INDEX_TO_SHOW_LANG } from '../../constants';
import { pushAdService } from '../../sources/ad-service';
import { getBrand } from '../../utils/web';
import { vmaxTrackerEvents } from '../../analytics/vmax';
import { CacheAdContext } from '../../hooks/use-cacheAd';
import isEmptyObject from '../../utils/is-object-empty';
import { showPwaInstall } from '../../utils/app';
import Close from '../commons/svgicons/close-white';
import { isObjectEmpty } from '../../network/utils';
import { impressionUrlWrapper } from '../../sources/appsflyer-pixel';
import { toTrackClevertap } from '../../analytics/clevertap/events';
import { webPush } from "../../analytics/clevertap/index";

SwiperCore?.use([Mousewheel]);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

const LandscapeView = dynamic(() => import('../landscape'),{
  loading: () => <div />,
  ssr: false
});
const LoginFollowing = dynamic(()=> import('../login-following'),{
  loading: () => <div />,
  ssr: false
});


// const UserExperience = dynamic(()=> import('../commons/user-experience'),{
//   loading: () => <div />,
//   ssr: false
// });

// const LandscapeView = dynamic(
//   () => import('../landscape'),
//   {
//     loading: () => <div />,
//     ssr: false
//   }
// );

//TO-DO segregate SessionStorage
function Feed({ router }) {
  const [items, setItems] = useState([]);
  const [toShowItems, setToShowItems] = useState([]);
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
  const [onCloseChamboard, setOnCloseChamboard] = useState('');
  const [showAppBanner, setShowAppBanner] = useState(false);
  const [loadFeed, setLoadFeed] = useState(true);
  const [noSound, setNoSound] = useState(false);
  const [slideToNext, setSlideToNext] = useState(true);

  const cacheAd = useContext(CacheAdContext);
  const [lang24ShowOnce, setLang24ShowOnce] = useState('true')
  const [activatePwaCustomPopup, setActivatePwaCustomPopup] = useState({show:false, shown:false});
  
  // const [isSaved, setIsSaved] = useState(false);
  const [initailShopContentAdded, setInitalShopContentAdded] = useState(false);

  const { t } = useTranslation();
  const { id } = router?.query;
  const { videoId } = router?.query;
  let { campaign_id = null} = router?.query;
  // campaign_id = campaign_id ? campaign_id :  (localStorage?.get('campaign_id') || null);
  campaign_id = campaign_id ? campaign_id :  ( JSON.parse(window.sessionStorage.getItem('campaign_id')) || null);

  const utmData = localStorage?.get('utm-data') || '';
  const pageName = 'Feed';
  const tabName = id && (id === 'following') ? 'Following' : 'ForYou';
  const languagesSelected = localStorage.get('lang-codes-selected')?.lang || null;

  const showBanner =()=>{
    setShowAppBanner(true);
  }

  const setClose = (value)=>{
      setOnCloseChamboard(value)
  }

  const notNowClick = ()=>{
    setShowAppBanner(null);
  }

  const adImpression =  async (index = 0)=>{
    if(toShowItems[index]?.adId && window !== undefined){
      let adInfo = toShowItems?.[index]?.adId || {};
      let {impression_url = null } = adInfo;
     
      // let formedUrl = impression_url.split("&").map((item)=>{
      //   if(item.match(/af_sub2/)){
      //     let splititem = item.split("=");
      //     item = `${splititem[0]}` + "=" + "pwa"
      //     return item;
      //   }else{
      //     return item
      //   }
      // }).join("&")
      
      if(impression_url && impression_url?.split(".").includes("appsflyer")){
        try{
         let response = await impressionUrlWrapper({url: impression_url})
        }
        catch(e){
          console.error("error getting impression");
        }
      }else{
      let timeStamp = Date.now();
      try{
        impression_url && pushAdService({url: impression_url, value:"Impression", timeStamp:timeStamp});
      }catch(e){
        console.error("Impression error: " + e);
      }
    }
    }
    if(toShowItems[index]?.feedVmaxAd){
      let tracker = toShowItems[index]?.feedVmaxAd?.adView?.getVmaxAd()?.getEventTracker();
      vmaxTrackerEvents(tracker,'impression')
    }
  }

  useEffect(() => {
     setTimeout(()=>{
    if(initialLoadComplete === true){
      adImpression();
      toTrackMixpanel('screenView',{pageName:pageName, tabName:tabName});
      toTrackClevertap('screenView',{pageName:pageName, tabName:tabName});
      toTrackMixpanel('impression',{pageName:pageName,tabName:tabName, isShoppable: items?.[videoActiveIndex]?.shoppable},items?.[videoActiveIndex]);
      toTrackClevertap('impression',{pageName:pageName,tabName:tabName},items?.[videoActiveIndex]); 
      //fbq.event('Screen View')
      ToTrackFbEvents('screenView');
      //trackEvent('Screen_View',{'Page Name' :'Feed'});
      toTrackFirebase('screenView',{'page':'Feed'});
    }
    },1500);
  }, [initialLoadComplete]);

  useEffect(()=>{    
    shop?.isShoppable == 'success' && setInitalShopContentAdded(true)
},[shop])

  useEffect(()=>{
     initailShopContentAdded && 
    toTrackMixpanel('impression',{pageName:pageName,tabName:tabName, isShoppable: items?.[videoActiveIndex]?.shoppable, isMonetization : shop?.adCards?.monitisation || false},items?.[videoActiveIndex]);
    toTrackClevertap('impression',{pageName:pageName,tabName:tabName,isShoppable:shop?.isShoppable !== 'pending' ? shop?.isShoppable : 'fail', isMonetization : shop?.adCards?.monitisation || false},items?.[videoActiveIndex]);  
  },[initailShopContentAdded])

  useEffect(()=>{
    if(items?.[videoActiveIndex]?.feedVmaxAd){
      setSlideToNext(false)
      setTimeout(()=>{
        setSlideToNext(true)
      },5000)
    }
  },[videoActiveIndex])

  const preActiveVideoId = usePreviousValue({videoActiveIndex});
  const preVideoActiveIndex = usePreviousValue({videoActiveIndex});
  const preVideoDurationDetails = usePreviousValue({videoDurationDetails});
  const preShopData = usePreviousValue({shop});

  const onDataFetched = data => {
    // console.error('LOadFeeD',data,data.status)
    if(data.status !== 'notFound'){
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
        const lang24Show = localStorage.get('lang-24-hr') || 'true';
        setLang24ShowOnce(lang24Show);
        // checkNoSound();
        // setFirstItemLoaded(true);
        // setSeoItem(data?.data[0]);
    }else{
      setItems([]);
      setToShowItems([]);
      setActiveVideoId(null);
      setFirstApiCall(false);
    }
  }else{
    if(isReffererGoogle && isReffererGoogle()){
      console.log("REFF",isReffererGoogle())
      window.location.href = '/feed/for-you';
    }
    setLoadFeed(false);
    // }
  }
}

/* mixpanel - monetization cards impression */
  useEffect(()=>{
    shop?.adData?.monitisation && shop?.adData?.monitisationCardArray?.length > 0 &&   shop?.adData?.monitisationCardArray?.map((data)=> { 
      toTrackMixpanel('monetisationProductImp',{pageName:pageName, tabName:tabName},{content_id: items?.[videoActiveIndex]?.content_id,productId:data?.card_id, productUrl:data?.product_url, brandName: getBrand(data?.product_url), campaignId: shop?.campaignId, category: data?.category, subCategory: data?.sub_category, subSubCategory: data?.subsub_category, mainCategory: data?.main_category});
      toTrackClevertap('monetisationProductImp',{pageName:pageName, tabName:tabName},{content_id:videoId,productId:data?.card_id, productUrl:data?.product_url, brandName: getBrand(data?.product_url), campaignId: shop?.campaignId});
    });
  },[shop])
 /************************ */ 

  useEffect(()=>{
    if(initialPlayStarted === true){
      // let currentActiveFeedItem = items?.[videoActiveIndex];
      toTrackMixpanel('play',{pageName : pageName,tabName:tabName, isShoppable: items?.[videoActiveIndex]?.shoppable},items?.[videoActiveIndex]);
      toTrackClevertap('play',{pageName : pageName,tabName:tabName},items?.[videoActiveIndex]);
      ToTrackFbEvents('play', {userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'});
      toTrackFirebase('play', {userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'});
      viewEventsCall(activeVideoId, 'user_video_start');
      checkNoSound();
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
       let adPosition = localStorage.get('vmaxAdPosition') || null;
       let cacheAdVideo = (cacheAd?.getCacheAd && cacheAd?.getCacheAd?.()) ?? {};

       if(!isEmptyObject(cacheAdVideo) && adPosition !== null) {
          //delete cacheAdVideo?.adId; //Neeed to remove
          data?.data.splice(adPosition, 0, cacheAdVideo);
          cacheAd?.feedCacheAd && cacheAd?.feedCacheAd([]); //added cachead successfully!
          updateItems = updateItems.concat(data?.data);
          setItems(updateItems);
       }else{
        try{
          // debugger;
          let {adPosition ="", cachedVideo ={}} = await cacheAdResponse() || {};
          if(!isEmptyObject(cachedVideo) && adPosition){
            //delete cacheAdVideo?.adId; //Neeed to remove
            data?.data.splice(adPosition, 0, cachedVideo);
          }
        }catch(error){
          console.error(error);
        }
        updateItems = updateItems.concat(data?.data);
        setItems(updateItems);
       }
      
      
       console.log("data after", data?.data, "=>" ,updateItems);

       
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
    toTrackClevertap('tabView',{pageName:pageName, tabName:tabName});
  },[id])

  if (id === 'for-you') {
    const status = fetchState === 'success';
    const dataLength = data?.data?.length;
    fetchState = (status && !dataLength > 0) ? 'fail' : fetchState;
    data = (status && dataLength > 0) && data;
    retry = (status && !dataLength > 0) && retry;
  }

  const validItemsLength = toShowItems?.length > 0;

  let advmaxObj = toShowItems[videoActiveIndex]?.feedVmaxAd;
  let adIdObj = toShowItems[videoActiveIndex]?.adId;
  const videoAdSessionsCalls = async (percentage) => {
    if(!!advmaxObj && typeof advmaxObj === 'object' && !isObjectEmpty(advmaxObj) && window !== undefined){
     console.log("adView", toShowItems[videoActiveIndex]?.feedVmaxAd, "=>" , toShowItems[videoActiveIndex]?.feedVmaxAd?.adView);
      let tracker = toShowItems[videoActiveIndex]?.feedVmaxAd?.adView?.getVmaxAd()?.getEventTracker();
      if(percentage > 0 && percentage < 25){
        toTrackMixpanel('videoAdStarted', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        // vmaxTrackerEvents(tracker,'impression')
        vmaxTrackerEvents(tracker,'videoAdStarted')
      }
      if(percentage > 25 && percentage < 50) {
        toTrackMixpanel('videoAdFirstQuartile', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        vmaxTrackerEvents(tracker,'videoAdFirstQuartile')
      }
      if(percentage > 50 && percentage < 75) {
        toTrackMixpanel('videoAdSecondQuartile', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        vmaxTrackerEvents(tracker,'videoAdSecondQuartile')
      }
      if(percentage > 75 && percentage < 90) {
        toTrackMixpanel('videoAdThirdQuartile', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        vmaxTrackerEvents(tracker,'videoAdThirdQuartile')
      }
      if(percentage > 98) {
        toTrackMixpanel('videoAdEnd', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        vmaxTrackerEvents(tracker,'videoAdEnd');
        if(document.querySelector(".swiper-container").swiper){
          document.querySelector(".swiper-container").swiper?.slideNext();
        }
      }
    }
    
    if(!!adIdObj && typeof adIdObj === 'object' && !isObjectEmpty(adIdObj) && window !== undefined){
      let adInfo = toShowItems?.[videoActiveIndex]?.adId || {};
      let { event_url = null } = adInfo;
      let timeStamp = Date.now();
      console.log(timeStamp, "timeStamp");
      if(percentage > 0){
        toTrackMixpanel('videoAdStarted', {pageName:pageName,tabName:tabName, timeStamp:timeStamp},items?.[videoActiveIndex]);
        toTrackClevertap('videoAdStarted', {pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);
        try{
         event_url && await pushAdService({url: event_url, value: "start"}); 
        }catch(e){
          toTrackMixpanel('videoAdStartedFailure', {pageName:pageName,tabName:tabName, timeStamp:timeStamp},toShowItems?.[videoActiveIndex]);
        }
      }
      if(percentage > 25) {
        toTrackMixpanel('videoAdFirstQuartile', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        try{
          event_url && await pushAdService({url: event_url, value: "firstQuartile"});
        }catch(e){
          toTrackMixpanel('videoAdFirstQuartileFailure', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        }
        
      }
      if(percentage > 50) {
        toTrackMixpanel('videoAdSecondQuartile', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        try{
          event_url && await pushAdService({url: event_url, value: "midpoint"});
        }catch(e){
          toTrackMixpanel('videoAdSecondQuartileFailure', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        }
       
      }
      if(percentage > 75) {
        toTrackMixpanel('videoAdThirdQuartile', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        try{
          event_url && await pushAdService({url: event_url, value: "thirdQuartile"});
        }catch(e){
          toTrackMixpanel('videoAdThirdQuartileFailure', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        }
        
      }
      if(percentage > 98) {
        toTrackMixpanel('videoAdEnd', {pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);
        toTrackClevertap('videoAdEnd', {pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);
        try{
        event_url && await pushAdService({url: event_url, value: "complete"});
        }catch(e){
          toTrackMixpanel('videoAdEndFailure', {pageName:pageName,tabName:tabName},toShowItems?.[videoActiveIndex]);
        }
        
        if(document.querySelector(".swiper-container").swiper){
          document.querySelector(".swiper-container").swiper?.slideNext();
        }
      }
    }
  }

  const updateSeekbar = (percentage, currentTime, duration) => {
    setInitialPlayButton(false)
    setSeekedPercentage(percentage);
    const videoDurationDetail = {
      currentT : currentTime,
      totalDuration : duration
    }
   
    // 👆🏻 video ad calls for feed videos
    videoAdSessionsCalls(percentage)

    if(currentTime > 6.8 && currentTime < 7.1){
      viewEventsCall(activeVideoId,'view')
    }
    setVideoDurationDetails(videoDurationDetail);
    console.log("debug", percentage)
    if(percentage > 0){
      setInitialPlayStarted(true);
     }
     /********** Mixpanel ***********/
     if(currentTime >= duration-0.2){
       toTrackMixpanel('watchTime',{pageName:pageName,tabName:tabName, watchTime : 'Complete', duration : duration, durationWatchTime: duration, isShoppable: items?.[videoActiveIndex]?.shoppable},items?.[videoActiveIndex])
       toTrackClevertap('watchTime',{pageName:pageName,tabName:tabName, watchTime : 'Complete', duration : duration, durationWatchTime: duration},items?.[videoActiveIndex])
       toTrackMixpanel('replay',{pageName:pageName,tabName:tabName,  duration : duration, durationWatchTime: duration, isShoppable: items?.[videoActiveIndex]?.shoppable},items?.[videoActiveIndex])

       fbq.event('UGC_Played_Complete ')
       ToTrackFbEvents('replay',{userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'},{ watchTime : 'Complete', duration : duration, durationWatchTime: duration}, {  duration : duration, durationWatchTime: duration})
       toTrackFirebase('watchTime', {userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'},{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
       toTrackFirebase('replay', {userId: items?.[videoActiveIndex]?.['userId'], content_id: items?.[videoActiveIndex]?.['content_id'], page:'Feed'},{  duration : duration, durationWatchTime: duration})
       /*** view events ***/
       console.log('duration',duration?.toString());
       viewEventsCall(activeVideoId, 'completed', {duration : duration} );
       viewEventsCall(activeVideoId, 'user_video_start');
       if(showSwipeUp.count < 1 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
      //  try{
      //   const videosCompleted = parseInt(window.sessionStorage.getItem('videos-completed'));
      //   console.log('MIX-count ++',videosCompleted, " ** incre ** ", videosCompleted+1)
      //   window.sessionStorage.setItem('videos-completed',videosCompleted+1);
      //  }catch(e){
      //    console.error('error in video comp increment',e)
      //  }
     }
     /******************************/
     if(currentTime >= duration-0.4){
      if(showSwipeUp.count === 0 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
    }
  };

  const adBtnClickCb = () => {
    toTrackMixpanel('videoAdCTAClicked', {pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);
    toTrackClevertap('videoAdCTAClicked', {pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);
  }

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
      shopContent.campaignId= response?.campaignId;
    } catch (e) {
      // isShoppable = false;
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
    console.log("*inc",updateShowItems)

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
    console.log("*dec",updateShowItems)
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
    if(videoActiveIndex === 6) showAppBanner===false && setShowAppBanner(true);

   checkNoSound();
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

  const checkNoSound =()=>{
    if(!items?.[videoActiveIndex]?.videoSound){
      setNoSound(true);
      setTimeout(()=>{setNoSound(false)},2000)
    }
  }

  const convivaItemInfo = (item = {}) => {
    let obj = {};
  
    let {content_id, music_title, video_url, language,
          content_description, userName, videoOwnersId, creatorTag,
            createdOn, videoDuration}  = item;
  
    obj = {content_id, music_title, video_url, language,
      content_description, userName, videoOwnersId, creatorTag,
        createdOn, videoDuration}
  
          return obj;
  }

  const getNextVmaxAd = async(activeIndex) => {
    //? condition to fetch ad for next feed chunk
    try{
      if(toShowItems?.[activeIndex]?.feedVmaxAd && !firstApiCall){
        localStorage.set("vmaxAdPosition", "");
        let {adPosition ="", cachedVideo ={}} = await cacheAdResponse() || {};
        !!adPosition && localStorage.set("vmaxAdPosition", adPosition);
        if(!isObjectEmpty(cachedVideo)) {
          //debugger
          cacheAd?.feedCacheAd(cachedVideo);
        }
      }
    }catch(error){ 
      console.log(error);
    }
  }

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

                localStorage.set("adArr",[]);
                localStorage.set("adArrMixPanel",[]);
                localStorage.set('vmaxEvents',[]);

                setInitialPlayStarted(false);
              }}
              allowSlideNext={slideToNext}
              onSlideChange={swiperCore => {
                const {
                  activeIndex, slides
                } = swiperCore;
                if(activeIndex === 9) {
                  webPush();
                }
                localStorage.set("adArr",[]);
                localStorage.set("adArrMixPanel",[]);
                localStorage.set('vmaxEvents',[]);

                setVideoDurationDetails({totalDuration: null, currentT:0});

                setSeekedPercentage(0)
                setInitialPlayStarted(false);

                setShowSwipeUp({count : 1, value:false});
                let currentActiveFeedItem = items?.[videoActiveIndex];

                
                /***************/
                /*** Mixpanel ****/
                toTrackMixpanel('impression',{pageName:pageName,tabName:tabName, isShoppable: items?.[videoActiveIndex]?.shoppable},items?.[videoActiveIndex]);
                adImpression(activeIndex);

                toTrackClevertap('impression',{pageName:pageName,tabName:tabName},items?.[videoActiveIndex]);
                // toTrackMixpanel(videoActiveIndex, 'swipe',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration});
                preVideoDurationDetails?.videoDurationDetails?.currentT > 0 && toTrackMixpanel('watchTime',{pageName:pageName,tabName:tabName, durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration, isShoppable: items?.[videoActiveIndex]?.shoppable},items?.[videoActiveIndex])
                ToTrackFbEvents('watchTime',{userId: currentActiveFeedItem['userId'], content_id: currentActiveFeedItem['content_id'], page:'Feed'},{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
                toTrackFirebase('watchTime',{userId: currentActiveFeedItem['userId'], content_id: currentActiveFeedItem['content_id'], page:'Feed'},{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})

                /** Mixpanel - increment view count **/
                preVideoDurationDetails?.videoDurationDetails?.currentT > 0 && 
                incrementCountVideoView(currentActiveFeedItem?.content_id);
                
                /*** video events ***/
                if(preVideoDurationDetails?.videoDurationDetails?.currentT < 3){
                  toTrackMixpanel('skip',{pageName:pageName,tabName:tabName,durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration, isShoppable:preShopData?.shop?.isShoppable, isMonetization:preShopData?.shop?.adData?.isMonetization},items?.[videoActiveIndex])
                  toTrackClevertap('skip',{pageName:pageName,tabName:tabName,durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration, isShoppable:preShopData?.shop?.isShoppable, isMonetization:preShopData?.shop?.adData?.isMonetization},items?.[videoActiveIndex])
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
                const activeId = slides[activeIndex]?.attributes?.itemid?.value;

                activeIndex && setVideoActiveIndex(activeIndex);
                if(activeIndex === 4){
                  !activatePwaCustomPopup?.shown && setActivatePwaCustomPopup({show: true, shown: true});
                  !activatePwaCustomPopup?.shown && window.deferredPrompt && toTrackMixpanel('popupLaunch',{pageName:pageName, tabName:(tabName && tabName) || '', name:'PWA Install Custom'});
                } 
                if(activeIndex === 0){
                  setVideoActiveIndex(0);
                }
      
                activeId && setActiveVideoId(activeId);

                console.log("active index: " + activeIndex, toShowItems , "=> main arr" , items,  "is this feedVmaxAd =>",  items?.[activeIndex]?.feedVmaxAd);

                //? next vmax ad video position and  details.
                getNextVmaxAd(activeIndex);
                
                window.sessionStorage.setItem('used-impression-link',false); //to reset appsflyer value for apps-impression to be called for diff video.(line 54 in ad-cards).

              }}
            >
              {!loadFeed && <VideoUnavailable/>}
             
              {loadFeed && validItemsLength ? toShowItems.map((
                  item, id
                ) => (
                  <SwiperSlide
                    key={id}
                    id={item?.watchId}
                    itemID={item?.content_id}
                  >  
                  {item !==null && !languagesSelected && id === INDEX_TO_SHOW_LANG && lang24ShowOnce === 'false' ? 
                   <LanguageSelection activeVideoIndex = {videoActiveIndex}/>  
                  :
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
                      hashTags={item?.hashtags}
                      videoOwnersId={item?.videoOwnersId}
                      thumbnail={item?.firstFrame}
                      canShop={shop?.isShoppable === "success" || false}
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
                      muted={item?.videoSound === false ? true : muted}
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
                      showBanner={showBanner}
                      index={id}
                      convivaItemInfo={()=> convivaItemInfo(item)}
                      userVerified = {item?.verified}
                      videoSound={item?.videoSound}
                      adBtnClickCb={adBtnClickCb}
                      campaignId={shop?.campaignId}
                      // toggleIsSaved={toggleIsSaved}
                      setMuted={setMuted}
                      feedAd={item?.adId && typeof item?.adId === 'object' && !isEmptyObject(item?.adId) ? item.adId : null}
                      vmaxAd={item?.feedVmaxAd && typeof item?.feedVmaxAd === 'object' && !isEmptyObject(item?.feedVmaxAd) ? item.feedVmaxAd : null}
                      explain={item?.explain || null}
                      correlationID={item?.correlationID || null}
                      profileId=""
                    />}
                  </SwiperSlide>
                )) : (
                  <div className="h-screen bg-black flex justify-center items-center">
                    <span className="mt-10 text-white">{t('NO_VIDEOS')}</span>
                  </div>
                )
              }
              {loadFeed &&
              <>
              {validItemsLength && <div
                className="absolute top-1/2 justify-center w-screen flex"
                style={{ display: (seekedPercentage > 0) ? 'none' : 'flex text-white' }}
              >
             <CircularProgress/>
              </div>}
                {(!languagesSelected && videoActiveIndex === INDEX_TO_SHOW_LANG) ? '' : !(items?.[videoActiveIndex]?.videoSound) && initialPlayStarted && <SnackCenter showSnackbar={noSound}/>}
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
                className={`absolute top-0 right-4  mt-4 items-center justify-center p-4`}
                style={{ display: (!languagesSelected && videoActiveIndex === INDEX_TO_SHOW_LANG) ? 'hidden' : (initialPlayStarted && muted) ? 'flex' : 'none' }}
              >
               <div className="stretch-y"><div className="stretch-z"></div></div>
               <div className='z-9'>
                <Mute/>
                </div>
              </div>}
              {(!languagesSelected && videoActiveIndex === INDEX_TO_SHOW_LANG) ? '' : (validItemsLength ? seekedPercentage > 0
              ? <Seekbar seekedPercentage={seekedPercentage} type={'aboveFooterMenu'} />
              : <SeekbarLoading type={'aboveFooterMenu'}/>
              : '')}
              </>
              }
              <FooterMenu 
              videoId={activeVideoId}
              canShop={items?.[videoActiveIndex]?.shoppable}
              type={(!items[videoActiveIndex]?.adId && !toShowItems[videoActiveIndex]?.feedVmaxAd) && 'shop'}
              selectedTab="home"
              shopType={shop?.type && shop.type}
              shop={shop}
              setClose={setClose}
              showBanner={showBanner}
              pageName={pageName}
              tabName={tabName}
              campaignId={shop?.campaignId}
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

  // console.log('&&&',!languagesSelected,langViewed === 'false',videoActiveIndex === INDEX_TO_SHOW_LANG)
  return (
    <ComponentStateHandler state={fetchState} Loader={LoadComp} ErrorComp={ErrorComp} >
      <>
        <div className="feed_screen overflow-hidden relative" style={{ height: `${videoHeight}px` }}>

{/* install App popup */}
      {activatePwaCustomPopup?.show && window.deferredPrompt && 
         <div className='absolute w-full left-0 flex justify-center top-0 z-30 px-2'>
          <div className='w-full install_app_bg py-4 px-3 flex items-center text-white rounded-lg'>
             <div className='pr-2' onClick={()=>{
              toTrackMixpanel('popupCta',{pageName:pageName || '', tabName:(tabName && tabName) || '',name:'PWA Install Custom',ctaName:'Cancel', elemant:'Cancel'});
              setActivatePwaCustomPopup({show: false, shown: true})}}>
                <Close/>
              </div>
              <div className=' flex justify-center w-full flex-col items-start '>
                <p className='font-semibold'>Hipi</p>
                  <p className='text-sm'>{`Installing our app won't take any space on your phone.`}</p>
              </div>
              <div className='flex justify-end items-center'>
        {/* open cta */}
 {
        <button className='font-semibold text-sm  rounded py-1 px-2 mr-1 bg-white text-gray-600' 
         onClick={()=>{
          toTrackMixpanel('popupCta',{pageName:pageName || '', tabName:(tabName && tabName) || '',name:'PWA Install Custom',ctaName:'Install', elemant:'Install'});
          showPwaInstall({pageName:pageName, tabName:tabName})}}>
          Install
        </button>}
              </div>
          </div>
      </div>}

        {(!languagesSelected && lang24ShowOnce === 'false' && videoActiveIndex === INDEX_TO_SHOW_LANG || toShowItems?.[videoActiveIndex]?.adId || toShowItems?.[videoActiveIndex]?.feedVmaxAd ) ? '' : 
        (typeof window !== "undefined" && window?.deferredPrompt) &&<OpenAppStrip
          pageName={pageName}
          tabName={tabName}
          item={items?.[videoActiveIndex]}
          activeVideoId={activeVideoId}
          type='aboveBottom'
          creatorId={toShowItems?.[videoActiveIndex]?.videoOwnersId}
          playlistId={toShowItems?.[videoActiveIndex]?.playlistId}
          playlistName={toShowItems?.[videoActiveIndex]?.playlistName}
        />}
        
        {/* hamburger */}
       {(!languagesSelected && lang24ShowOnce === 'false' && videoActiveIndex === INDEX_TO_SHOW_LANG) ? '' : <HamburgerMenu pageName={pageName || ''} tabName={tabName || ''}/>}
       {/* <HamburgerMenu/> */}
        <div className={`fixed mt-10 z-10 w-full ${videoActiveIndex === INDEX_TO_SHOW_LANG && languagesSelected === null && lang24ShowOnce === 'false' ? 'hidden' : ''}`}>
          <FeedTabs items={tabs} />
        </div>
        {info?.[id]}
        <div id="cb_tg_d_wrapper">
          <div className="playkit-player" />
        </div>
      </div>
       <Landscape/> 
      {/* {utmData?.utm_source !== 'BestIT' && showAppBanner ? <AppBanner notNowClick={notNowClick} videoId={activeVideoId}/> : ''} */}
      {/* {showAppBanner && <AppBanner notNowClick={notNowClick} videoId={activeVideoId}/>} */}
    </>
    </ComponentStateHandler>
  );
}

export default withRouter(Feed);
