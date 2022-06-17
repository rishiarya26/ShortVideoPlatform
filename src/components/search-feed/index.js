/*eslint-disable react/jsx-no-duplicate-props */
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
import { Back } from '../commons/svgicons/back_white';
import useWindowSize from '../../hooks/use-window-size';
import { getNetworkConnection } from '../../utils/device-details';
import SwiperSlideComp from '../swiper.js';
import fallbackUser from "../../../public/images/users.png"
import CircularProgress from '../commons/circular-loader'
import { CHARMBOARD_PLUGIN_URL } from '../../constants';
import { inject } from '../../analytics/async-script-loader';
import Mute from '../commons/svgicons/mute';
import { numberFormatter } from '../../utils/convert-to-K';
import usePreviousValue from '../../hooks/use-previous';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import { commonEvents } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';
import { ONE_TAP_DOWNLOAD } from '../../constants';
import { getOneLink } from '../../sources/social';
import { getItem } from '../../utils/cookie';
import * as fbq from '../../analytics/fb-pixel'
import { trackEvent } from '../../analytics/firebase';
import { viewEventsCall } from '../../analytics/view-events';
import { getCanonicalUrl } from '../../utils/web';

SwiperCore.use([Mousewheel]);

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loading />);

function SearchFeed({ router }) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [items, setItems] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [videoActiveIndex, setVideoActiveIndex] = useState(0)
  const [saveLook, setsaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true)
  const [initialPlayStarted, setInitialPlayStarted] = useState(false)
  const [videoDurationDetails, setVideoDurationDetails] = useState({totalDuration: null, currentT:0})

  const preVideoDurationDetails = usePreviousValue({videoDurationDetails});

  const loaded = () => {
    setLoading(false);
  };

  const { id : videoId = items?.[0]?.content_id } = router?.query;
  const { ref = '' } = router?.query;
  const {type = 'normal'} = router?.query;

  // const { videoId = items?.[0]?.content_id } = router?.query;


  useEffect(() => {
    inject(CHARMBOARD_PLUGIN_URL, null, loaded);
    // const guestId = getItem('guest-token');
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Page Name'] = 'Search Feed';
    fbq.event('Screen View')
    trackEvent('Screen_View',{'Page Name' :'Search Feed'})
    track('Screen View',mixpanelEvents );
  }, []);

  const selectVideoUrl = (video) => {
    const networkConnection = getNetworkConnection();
    let videoUrls = {}
    videoUrls.fast = video?.videoUrl?.AkamaiURL?.[2];
    videoUrls.medium = video?.videoUrl?.AkamaiURL?.[1];
    videoUrls.low = video?.akamaiUrl;
    return videoUrls[networkConnection];
  }

  const transformResponse = (data) =>{  
    const feedData = data.filter((content) => (content.widgetName === `#${ref}` || content.widgetName === `${ref}`));
    const [content = []] = feedData;
    const {widgetList= []} = content;
    const finalTData = []
    widgetList.forEach((d)=>{
        const video = d?.video;
        video.selected_video_url = selectVideoUrl(video);;
        finalTData.push(video);
    })
    return finalTData;
  }

  useEffect(()=>{
    if(initialPlayStarted === true){
      toTrackMixpanel(videoActiveIndex,'play')
      ToTrackFbEvents(videoActiveIndex,'play')
      toTrackFirebase(videoActiveIndex,'play')
      viewEventsCall(activeVideoId, 'user_video_start');
    }
  },[initialPlayStarted])

  const viewEventsCall = async(id, event)=>{
  try{  console.log("event to send", id, event)
   await viewEvents({id:id, event:event})
  }catch(e){
    console.log('issue in view events',e)
  }
  }

  const dataFetcher = () => JSON.parse(window.sessionStorage.getItem('searchList'));
  const onDataFetched = data => {
      const info = {
          normal : data,
          withHash : transformResponse(data)
      }
      console.log('data',info[type])
      data && setItems(info?.[type]);
      data && setActiveVideoId(videoId);
  };

  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;
  const validItemsLength = items?.length > 0;

  const updateSeekbar = (percentage,currentTime,duration) => {
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

        ToTrackFbEvents(videoActiveIndex,'watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
        ToTrackFbEvents(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})
        /*** view events ***/
        viewEventsCall(activeVideoId, 'completed');
        viewEventsCall(activeVideoId, 'user_video_start');
        // if(showSwipeUp.count < 1 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
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
    mixpanelEvents['Page Name'] = 'Search Feed';

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
    events['Page Name'] = 'Search Feed';
  
    toTrack?.[type]();
  }
  

  
const onStoreRedirect = async ()=>{
  trackEvent('App_Open_CTA')
  fbq.event('App Open CTA')
  toTrackMixpanel(videoActiveIndex,'cta',{name: 'Open', type: 'Button'});
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
    // fbEvents['Page Name'] = 'Search Feed';
  
    toTrack?.[type]();
  }


  // const ToTrackFbEvents = (activeIndex, type, value) => {
  //   const item = items[activeIndex];
  //   const fbEvents = {}
  
    
  // console.log('FB events',fbq)
  //   const toTrack = {
  //     'impression' : ()=>  fbq.event('UGC Impression', fbEvents),
  //     'swipe' : ()=> {
  //       fbEvents['UGC Duration'] = value?.duration
  //       fbEvents['UGC Watch Duration'] = value?.durationWatchTime
  //       fbq.event('UGC Swipe', fbEvents)
  //     },
  //     'play' : () => fbq.event('UGC Play', fbEvents),
  //     'pause' : () => fbq.event('Pause', fbEvents),
  //     'resume' : () => fbq.event('Resume', fbEvents),
  //     'share' : () => fbq.event('UGC Share Click', fbEvents),
  //     'replay' : () => fbq.event('UGC Replayed', fbEvents),
  //     'watchTime' : () => {
  //       fbEvents['UGC Consumption Type'] = value?.watchTime
  //       fbEvents['UGC Duration'] = value?.duration
  //       fbEvents['UGC Watch Duration'] = value?.durationWatchTime
  //       fbq.event('UGC Watch Time',fbEvents)
  //     },
  //     'cta' : ()=>{
  //       fbEvents['Element'] = value?.name
  //       fbEvents['Button Type'] = value?.type
  //       fbq.event('CTAs', fbEvents)
  //     },
  //     'savelook' : ()=>{
  //       fbq.event('Save Look', fbEvents)
  //     }
  //   }
  
  //   // const hashTags = item?.hashtags?.map((data)=> data.name);
  
  //   fbEvents['Creator ID'] = item?.userId;
  //   // mixpanelEvents['Creator Handle'] = `${item?.userName}`;
  //   // mixpanelEvents['Creator Tag'] = item?.creatorTag || 'NA';
  //   fbEvents['UGC ID'] = item?.content_id;
  //   // mixpanelEvents['Short Post Date'] = 'NA';
  //   // mixpanelEvents['Tagged Handles'] = hashTags || 'NA';
  //   // mixpanelEvents['Hashtag'] = hashTags || 'NA';
  //   // mixpanelEvents['Audio Name'] = item?.music_title || 'NA';
  //   // mixpanelEvents['UGC Genre'] = item?.genre;
  //   // mixpanelEvents['UGC Description'] = item?.content_description;
  //   fbEvents['Page Name'] = 'Feed';
  
  //   toTrack?.[type]();
  // }

  
// const onStoreRedirect = async ()=>{
//   // toTrackMixpanel('downloadClick');
//   let link = ONE_TAP_DOWNLOAD;
//   const device = getItem('device-info');
//   console.log(device)
// try{  
//  if(device === 'android' && videoId){ 
//    try{ const resp = await getOneLink({videoId : videoId});
//     link = resp?.data;
//     console.log("one link resp",resp);}
//     catch(e){
//       console.log('error android onelink',e)
//     }
//   }
//  }
//   catch(e){
//   }
//   console.log("final onelink",link);
//   window?.open(link);
// }


  const size = useWindowSize();
  const videoHeight = `${size.height}`;

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
        }}
     />
      <>
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
              setInitialPlayStarted(false);
            const slideToId = swiper?.slides?.findIndex(data => data?.id === videoId);
            swiper?.slideTo(slideToId, 0);
            //   router.replace(`/search-feed/${id}`);
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
            toTrackMixpanel(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
            toTrackFirebase(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
            fbq.event('watchTime')

              /*** video events ***/
                if(preVideoDurationDetails?.videoDurationDetails?.currentT < 3){
                  viewEventsCall(activeVideoId,'skip')
                }else if(preVideoDurationDetails?.videoDurationDetails?.currentT < 7){
                  viewEventsCall(activeVideoId,'no decision')
                }
                viewEventsCall(activeVideoId, 'user_video_end', 
                {timeSpent: preVideoDurationDetails?.videoDurationDetails?.currentT,
                 duration :  preVideoDurationDetails?.videoDurationDetails?.totalDuration});

              /***************/

            const activeId = slides[activeIndex]?.id;
            setVideoActiveIndex(activeIndex)
            setActiveVideoId(activeId);
            }}
        >
    {   items?.map(
            (item,id) => {
              if(type === 'withHash' && id > 5) return null;
              return(
                <SwiperSlide
                key={item?.id}
                id={item?.id}

              >
          <Video
             updateSeekbar={updateSeekbar}
             socialId={item?.getSocialId}
             url={item?.selected_video_url}
             id={item?.id}
             comments={item?.commentsCount}
             likes={item?.lCount || item?.likeCount || null}
             music={item?.musicCoverTitle}
             musicTitle={item?.sound?.name}
             profilePic={item?.videoOwners?.profilePicImgUrl}
             userName={item?.videoOwners?.userName}
             musicCoverTitle={item?.musicCoverTitle}
             videoid={item?.content_id}
             hashTags={item?.hashtags}
             videoOwnersId={item?.videoOwnersId}
             thumbnail={item?.thumbnailUrl}
             canShop={shop?.isShoppable}
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
             player={'multi-player-muted'}
             description={item?.description}
          />
          </SwiperSlide>
          )})}
            <div
                className="absolute top-1/2 justify-center w-screen flex"
                style={{ display: (validItemsLength && seekedPercentage > 0) ? 'none' : 'flex text-white' }}
              >
             <CircularProgress/>
              </div>
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
}

export default withRouter(SearchFeed);
