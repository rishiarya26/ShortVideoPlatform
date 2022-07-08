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
import { getProfileVideos, getUserProfile } from '../../sources/users/profile';
import { Back } from '../commons/svgicons/back_white';
import useWindowSize from '../../hooks/use-window-size';
import { ONE_TAP_DOWNLOAD } from '../../constants';
import Mute from '../commons/svgicons/mute';
import CircularProgress from '../commons/circular-loader'
import usePreviousValue from '../../hooks/use-previous';
import { getOneLink } from '../../sources/social';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';
import { getSingleFeed } from '../../sources/feed/embed';
import useDrawer from '../../hooks/use-drawer';
import dynamic from 'next/dynamic';
import SwipeUp from '../commons/svgicons/swipe-up';
import { getItem } from '../../utils/cookie';
import * as fbq from '../../analytics/fb-pixel'
import { trackEvent } from '../../analytics/firebase';
import { viewEventsCall } from '../../analytics/view-events';
import { getCanonicalUrl } from '../../utils/web';

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

function ProfileFeedIphone({ router }) {
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
  const [userDetails, setUserDetails] = useState({})
  const [offset, setOffset] = useState(2);
  const [toInsertElements, setToInsertElements] = useState(4);
  const [toShowItems, setToShowItems] = useState([]);
  const [deletedTill, setDeletedTill] = useState();
  const [showSwipeUp, setShowSwipeUp] = useState({count : 0 , value : false});
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const preVideoDurationDetails = usePreviousValue({videoDurationDetails});
  const preActiveVideoId = usePreviousValue({videoActiveIndex});
  const pretoInsertElemant = usePreviousValue({toInsertElements});

  const { id } = router?.query;
  const { videoId = items?.[0]?.content_id } = router?.query;
  const { type = 'all' } = router?.query;

  const {show} = useDrawer();

  const pageName = 'Profile Feed';

  // const loaded = () => {
  //   setLoading(false);
  // };

  const loadMoreItems = async() =>{
    let videos = [...items]
    try {
    const resp = await getProfileVideos({ id, limit: 6, type: type, offset: offset });
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
     setToShowItems(updateShowItems);
   }
     catch(e){
   console.log('errorree',e)
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
     },[videoActiveIndex])

     useEffect(()=>{
      if(initialLoadComplete){
        toTrackMixpanel('impression',{pageName:pageName},items?.[videoActiveIndex]);
      }
    },[initialLoadComplete])

  
  useEffect(() => {
    setTimeout(()=>{
      //inject(CHARMBOARD_PLUGIN_URL, null, loaded);
      setLoading(false);
      fbq.event('Screen View')
      trackEvent('Screen_View',{'Page Name' :'Profile Feed'})
      toTrackMixpanel('screenView',{pageName:pageName});
    },500)

  }, []);

  const onStoreRedirect = async ()=>{
    toTrackMixpanel('cta',{pageName:pageName},{ name: 'Open App', type: 'Button'},items?.[videoActiveIndex]);
    fbq.event('App Open CTA')
    trackEvent('App_Open_CTA')
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


  useEffect(()=>{
    if(initialPlayStarted === true){
      toTrackMixpanel('play',{pageName : pageName},items?.[videoActiveIndex]);
      ToTrackFbEvents(videoActiveIndex,'play')
      toTrackFirebase(videoActiveIndex,'play')

      viewEventsCall(activeVideoId, 'user_video_start');
    }
  },[initialPlayStarted])

  const getUserDetails = async(id)=>{
 try{   
   const data = await getUserProfile(id);
   setUserDetails(data?.data);
  //  console.log("userDetail",data)
  }catch(e){
   console.log("get profile error",e)
  }
  }
  useEffect(()=>{
    id && getUserDetails(id)
  },[id])

  const dataFetcher = () => getProfileVideos({ id, limit: 6, type: type, videoId: videoId && videoId });
  const onDataFetched = (data) => {
  let videos = data?.data;
    data && setItems(videos);
    setInitialLoadComplete(true);
    data && setToShowItems(videos);
    console.log("before",activeVideoId)
    !activeVideoId && data && setActiveVideoId(videos?.[0]?.content_id);
    setToInsertElements(4);
  };

    /* mixpanel - monetization cards impression */
    useEffect(()=>{
      // console.log("aAAAADDD",shop?.adData)
      shop?.adData?.monitisation && shop?.adData?.monitisationCardArray?.length > 0 &&   shop?.adData?.monitisationCardArray?.map((data)=> { toTrackMixpanel('monetisationProductImp',{pageName:pageName},{content_id:videoId,productId:data?.card_id, brandUrl:data?.product_url})});
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
      toTrackMixpanel('watchTime',{pageName:pageName, watchTime : 'Complete', duration : duration, durationWatchTime: duration},items?.[videoActiveIndex])
      toTrackMixpanel('replay',{pageName:pageName, duration : duration, durationWatchTime: duration},items?.[videoActiveIndex])

      toTrackFirebase(videoActiveIndex,'watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
      toTrackFirebase(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})
      /*** view events ***/
      fbq.event('UGC_Played_Complete')
      ToTrackFbEvents(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})

      // viewEventsCall(activeVideoId, 'completed');
      viewEventsCall(activeVideoId, 'user_video_start');
      if(showSwipeUp.count < 1 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
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
      shopContent.type= response?.type;
      shopContent.adData = response?.adData;
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
  
  const ToTrackFbEvents = (activeIndex, type, value) => {
    const item = items[activeIndex];
    const fbEvents = {}
  
    
  console.log('FB events',fbq)
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
      }
    }
  
    // const hashTags = item?.hashtags?.map((data)=> data.name);
  
    // fbEvents['Creator ID'] = item?.userId;
    // mixpanelEvents['Creator Handle'] = `${item?.userName}`;
    // mixpanelEvents['Creator Tag'] = item?.creatorTag || 'NA';
    // fbEvents['UGC ID'] = item?.content_id;
    // mixpanelEvents['Short Post Date'] = 'NA';
    // mixpanelEvents['Tagged Handles'] = hashTags || 'NA';
    // mixpanelEvents['Hashtag'] = hashTags || 'NA';
    // mixpanelEvents['Audio Name'] = item?.music_title || 'NA';
    // mixpanelEvents['UGC Genre'] = item?.genre;
    // mixpanelEvents['UGC Description'] = item?.content_description;
    // fbEvents['Page Name'] = 'Feed';
  
    toTrack?.[type]();
  }

  const toTrackFirebase = (activeIndex, type, value) => {
    const item = items[activeIndex];
    const events = {}
  
    const toTrack = {
      'play' : () => trackEvent('UGC_Play', events),
      'share' : () => trackEvent('UGC_Share_Click', events),
      'replay' : () => trackEvent('UGC_Replayed', events),
      'watchTime' : () => {
        events['UGC Consumption Type'] = value?.watchTime
        events['UGC Duration'] = value?.duration
        events['UGC Watch Duration'] = value?.durationWatchTime
        trackEvent('UGC_Watch Time',events)
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
  
    // const hashTags = item?.hashtags?.map((data)=> data.name);
  
    events['Creator ID'] = item?.userId;
    // mixpanelEvents['Creator Handle'] = `${item?.userName}`;
    // mixpanelEvents['Creator Tag'] = item?.creatorTag || 'NA';
    events['UGC ID'] = item?.content_id;
    // mixpanelEvents['Short Post Date'] = 'NA';
    // mixpanelEvents['Tagged Handles'] = hashTags || 'NA';
    // mixpanelEvents['Hashtag'] = hashTags || 'NA';
    // mixpanelEvents['Audio Name'] = item?.music_title || 'NA';
    // mixpanelEvents['UGC Genre'] = item?.genre;
    // mixpanelEvents['UGC Description'] = item?.content_description;
    events['Page Name'] = 'Profile Feed';
  
    toTrack?.[type]();
  }
  

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
          title: `${userDetails?.firstName || ''} ${userDetails?.lastName || ''} on Hipi - Indian Short Video App`,
          // image: item?.thumbnail,
          description: `${userDetails?.firstName || ''} ${userDetails?.lastName || ''} (@${userDetails?.userHandle || ''}) on Hipi. Checkout latest trending videos from ${userDetails?.firstName || ''} ${userDetails?.lastName || ''} that you can enjoy and share with your friends.`,
          canonical: getCanonicalUrl && getCanonicalUrl(),        
        }}
     />

       
        <div className="overflow-hidden relative" style={{ height: `${videoHeight}px` }}>
        <div className="bottom-0 z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center flex items-center ">
            <p className="text-sm">
            Get the full experience on the Hipi app
            </p>
            <div onClick={onStoreRedirect} className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
               Open
            </div>
         </div>
          <div onClick={handleBackClick} className="fixed z-10 w-full p-4 mt-4 w-1/2">
            <Back />
          </div>
          
          <Swiper
            className="max-h-full"
            direction="vertical"
            onSwiper={swiper => {
              // const slideToId = swiper?.slides?.findIndex(data => data?.id === videoId);
              // swiper?.slideTo(slideToId, 0);
              router?.replace(`/profile-feed/${id}`);
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
              setSeekedPercentage(0)
              setInitialPlayStarted(false);
              setShowSwipeUp({count : 1, value:false});
              toTrackMixpanel('impression',{pageName:pageName},items?.[videoActiveIndex]);
              // toTrackMixpanel(videoActiveIndex, 'swipe',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration});
              toTrackMixpanel('watchTime',{pageName:pageName, durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration},items?.[videoActiveIndex])
              ToTrackFbEvents(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
              toTrackFirebase(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})

                /*** video events ***/
                if(preVideoDurationDetails?.videoDurationDetails?.currentT < 3){
                  toTrackMixpanel('skip',{pageName:pageName,durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration},items?.[videoActiveIndex])
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
                      canShop={item?.shoppable}
                      shopCards={shop?.data}
                      shopType={shop?.type}
                      handleSaveLook={handleSaveLook}
                      saveLook={saveLook}
                      saved={item?.saveLook}
                      activeVideoId={activeVideoId}
                      comp="profile"
                      profileFeed
                      loading={loading}
                      muted={muted}
                      firstFrame={item?.firstFrame}
                      player={'multi-player-muted'}
                      description={item?.content_description}
                      pageName={pageName}
                      adData={shop?.adData}
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
              {toShowItems.length > 1 &&  <div onClick={()=>setShowSwipeUp({count : 1, value : false})} id="swipe_up" className={showSwipeUp.value ? "absolute flex flex-col justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full" : 
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
          </Swiper>
          {validItemsLength ? seekedPercentage
            ? <Seekbar seekedPercentage={seekedPercentage} type={'onBottom'}/>
            : <SeekbarLoading type={'onBottom'}/>
            : ''}
          <div id="cb_tg_d_wrapper">
            <div className="playkit-player" />
          </div>
        </div>
      </>
    </ComponentStateHandler>
  );
};

export default withRouter(ProfileFeedIphone);
