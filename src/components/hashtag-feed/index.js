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
import { getProfileVideos } from '../../sources/users/profile';
import { Back } from '../commons/svgicons/back';
import useWindowSize from '../../hooks/use-window-size';
import { getHashTagVideos } from '../../sources/explore/hashtags-videos';
import { inject } from '../../analytics/async-script-loader';
import { CHARMBOARD_PLUGIN_URL } from '../../constants';
import CircularProgress from '../commons/circular-loader'
import Mute from '../commons/svgicons/mute';
import { viewEvents } from '../../sources/social';
import usePreviousValue from '../../hooks/use-previous';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import { commonEvents } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';
import SwipeUp from '../commons/svgicons/swipe-up';
import { ONE_TAP_DOWNLOAD } from '../../constants';
import { getOneLink } from '../../sources/social';
import { getItem } from '../../utils/cookie';
import * as fbq from '../../analytics/fb-pixel'
import { trackEvent } from '../../analytics/firebase';

SwiperCore.use([Mousewheel]);

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loading />);

function HashTagFeed({ router }) {
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
  const [loadMore, setLoadMore] = useState(true);
  const [showSwipeUp, setShowSwipeUp] = useState({count : 0 , value : false});

  const preVideoDurationDetails = usePreviousValue({videoDurationDetails});

  const { item } = router?.query;
  const { videoId = items?.[0]?.content_id } = router?.query;
  // const { type = 'all' } = router?.query;

  const loaded = () => {
    setLoading(false);
  };

  const loadMoreItems = async() =>{
    let videos = [...items]
    try {
    if(loadMore){   
    const resp = await getHashTagVideos({ keyword : item, offset: offset });
    if(resp?.data?.length > 0){
      console.log("innn",resp)
      const index = resp.data.findIndex((data)=>(data?.id === videoId))
      if(index !== -1){
        resp.data.splice(index,1);
      }
      videos = videos?.concat(resp?.data);
      console.log("concat",videos)
      setItems(videos);
      setOffset(offset+1);}
    }else{    
      setLoadMore(false);
    }
  }catch(e){
    setLoadMore(false);
  }
  }

  useEffect(()=>{
   async function loadItems() 
   { 
    console.log(items.length-4, videoActiveIndex) 
    const toLoadMoreIndex = items.length-4;
     videoActiveIndex === toLoadMoreIndex && await loadMoreItems();
   }
   loadItems();
  },[videoActiveIndex])


  useEffect(() => {
   setTimeout(()=>{ inject(CHARMBOARD_PLUGIN_URL, null, loaded);
    // const guestId = getItem('guest-token');
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Page Name'] = 'Hashtag Feed';
    fbq.event('Screen View')
    trackEvent('Screen View',{'Page Name' :'Hashtag Feed'})
    track('Screen View',mixpanelEvents );},500);
  }, []);


  useEffect(()=>{
    if(initialPlayStarted === true){
      toTrackMixpanel(videoActiveIndex,'play')
      ToTrackFbEvents(videoActiveIndex,'play')
      toTrackFirebase(videoActiveIndex,'play')
      viewEventsCall(activeVideoId, 'user_video_start');
    }
  },[initialPlayStarted])

  const viewEventsCall = async(id, event)=>{
    console.log("event to send", id, event)
   await viewEvents({id:id, event:event})
  }

  const dataFetcher = () => getHashTagVideos({ keyword : item, videoId: videoId && videoId });
  const onDataFetched = data => {
    let videos = data?.data;
    data && setItems(videos);
    !activeVideoId && data && setActiveVideoId(videos?.[0]?.content_id);
  };

  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;
  const validItemsLength = items?.length > 0;

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
      toTrackMixpanel(videoActiveIndex,'watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
      toTrackMixpanel(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})

      toTrackFirebase(videoActiveIndex,'watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
      toTrackFirebase(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})

      fbq.event('UGC_Played_Complete')
      ToTrackFbEvents(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})
      /*** view events ***/
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
      shopContent.type = response?.type;
    } catch (e) {
      console.log('error in canShop');
    }
    setShop(shopContent);
  };

  useEffect(() => {
    setShop({ isShoppable: 'pending' });
    getCanShop();
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

  /*******  Mixpanel *************/
  const toTrackMixpanel = (activeIndex, type, value) => {
    const item = items[activeIndex];
    const mixpanelEvents = commonEvents();

    const toTrack = {
      'impression' : ()=> track('UGC Impression', mixpanelEvents),
      'swipe' : ()=> {
        mixpanelEvents['UGC Duration'] = value?.duration
        mixpanelEvents['UGC Watch Duration'] = value?.durationWatchTime
        track('UGC Swipe', mixpanelEvents)
      },
      'play' : () => track('UGC Play', mixpanelEvents),
      'pause' : () => track('Pause', mixpanelEvents),
      'resume' : () => track('Resume', mixpanelEvents),
      'share' : () => track('UGC Share Click', mixpanelEvents),
      'replay' : () => track('UGC Replayed', mixpanelEvents),
      'watchTime' : () => {
        mixpanelEvents['UGC Consumption Type'] = value?.watchTime
        mixpanelEvents['UGC Duration'] = value?.duration
        mixpanelEvents['UGC Watch Duration'] = value?.durationWatchTime
        track('UGC Watch Time',mixpanelEvents)
      },
      'cta' : ()=>{
        mixpanelEvents['Element'] = value?.name
        mixpanelEvents['Button Type'] = value?.type
        track('CTAs', mixpanelEvents)
      },
      'savelook' : ()=>{
        track('Save Look', mixpanelEvents)
      }
    }

    // const hashTags = item?.hashtags?.map((data)=> data.name);

    mixpanelEvents['Creator ID'] = item?.userId;
    // mixpanelEvents['Creator Handle'] = `${item?.userName}`;
    // mixpanelEvents['Creator Tag'] = item?.creatorTag || 'NA';
    mixpanelEvents['UGC ID'] = item?.content_id;
    // mixpanelEvents['Short Post Date'] = 'NA';
    // mixpanelEvents['Tagged Handles'] = hashTags || 'NA';
    // mixpanelEvents['Hashtag'] = hashTags || 'NA';
    // mixpanelEvents['Audio Name'] = item?.music_title || 'NA';
    // mixpanelEvents['UGC Genre'] = item?.genre;
    // mixpanelEvents['UGC Description'] = item?.content_description;
    mixpanelEvents['Page Name'] = 'Feed';

    toTrack?.[type]();
  }

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
  
    fbEvents['Creator ID'] = item?.userId;
    // mixpanelEvents['Creator Handle'] = `${item?.userName}`;
    // mixpanelEvents['Creator Tag'] = item?.creatorTag || 'NA';
    fbEvents['UGC ID'] = item?.content_id;
    // mixpanelEvents['Short Post Date'] = 'NA';
    // mixpanelEvents['Tagged Handles'] = hashTags || 'NA';
    // mixpanelEvents['Hashtag'] = hashTags || 'NA';
    // mixpanelEvents['Audio Name'] = item?.music_title || 'NA';
    // mixpanelEvents['UGC Genre'] = item?.genre;
    // mixpanelEvents['UGC Description'] = item?.content_description;
    fbEvents['Page Name'] = 'Hashtag Feed';
  
    toTrack?.[type]();
  }

  const toTrackFirebase = (activeIndex, type, value) => {
    const item = items[activeIndex];
    const events = {}
  
    const toTrack = {
      'play' : () => trackEvent('UGC Play', events),
      'share' : () => trackEvent('UGC Share Click', events),
      'replay' : () => trackEvent('UGC Replayed', events),
      'watchTime' : () => {
        events['UGC Consumption Type'] = value?.watchTime
        events['UGC Duration'] = value?.duration
        events['UGC Watch Duration'] = value?.durationWatchTime
        trackEvent('UGC Watch Time',events)
      },
      'cta' : ()=>{
        events['Element'] = value?.name
        events['Button Type'] = value?.type
        trackEvent('CTAs', events)
      },
      'savelook' : ()=>{
        trackEvent('Save Look', events)
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
    events['Page Name'] = 'Hashtag Feed';
  
    toTrack?.[type]();
  }
  

  const size = useWindowSize();
  const videoHeight = `${size.height}`;

  
 const onStoreRedirect = async ()=>{
  toTrackMixpanel(videoActiveIndex,'cta',{name: 'Open', type: 'Button'});
  fbq.event('App Open CTA')
  trackEvent('App Open CTA')
  let link = ONE_TAP_DOWNLOAD;
  const device = getItem('device-info');
  console.log(device)
try{  
 if(device === 'android' && activeVideoId){ 
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
      <SeoMeta
        data={{
          title: `#${item} Hashtag videos on Hipi - Indian Short Video App`,
          // image: item?.thumbnail,
          description: `#${item} videos on Hipi. Checkout latest trending videos for #${item} hashtag that you can enjoy and share with your friends.`        
        }}
     />
        <div className="overflow-hidden relative " style={{ height: `${videoHeight}px` }}>

        <div className="bottom-0 z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center flex items-center ">
            <p className="text-sm">
            Get the full experience on the app
            </p>
            <div onClick={onStoreRedirect} className="font-semibold text-sm border border-hipired rounded-md py-1 px-2 mr-1 bg-hipired text-white">
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
              router.replace(`/hashtag-feed/${item}`);
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

              toTrackMixpanel(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
              toTrackFirebase(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})

              ToTrackFbEvents(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})

              ToTrackFbEvents(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})

                /*** video events ***/
                if(preVideoDurationDetails?.videoDurationDetails?.currentT < 3){
                  viewEventsCall(activeVideoId,'skip')
                }else if(preVideoDurationDetails?.videoDurationDetails?.currentT < 7){
                  viewEventsCall(activeVideoId,'no decision')
                }
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
              items?.map(
                item => (
                  <SwiperSlide
                    key={item.content_id}
                    id={item.content_id}

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
                      canShop={shop?.isShoppable}
                      shopCards={shop?.data}
                      shopType={shop?.type}
                      handleSaveLook={handleSaveLook}
                      saveLook={saveLook}
                      saved={item?.saveLook}
                      activeVideoId={activeVideoId}
                      comp="profile"
                      pageName="hashtag"
                      profileFeed
                      loading={loading}
                      muted={muted}
                      initialPlayStarted={initialPlayStarted}
                      firstFrame={item?.firstFrame}
                      player={'single-player-muted'}
                      description={item?.content_description}
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

              {validItemsLength &&  <div onClick={()=>setShowSwipeUp({count : 1, value : false})} id="swipe_up" className={showSwipeUp.value ? "absolute flex flex-col justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full" : 
          "absolute hidden justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full"}>
               <div className="p-1 relative">
                <SwipeUp/>
               <div className="w-4 h-16 bg-white bg-opacity-20 rounded-full absolute top-1 left-1"></div>
              </div>
              <div className="flex py-2 px-4 bg-gray text-white font-semibold mt-12">Swipe up for next video</div>
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

export default withRouter(HashTagFeed);
