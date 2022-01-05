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
import { Shop } from '../commons/button/shop';
import { clearHomeFeed, getHomeFeed, getHomeFeedWLogin } from '../../sources/feed';
import { canShop } from '../../sources/can-shop';
import useWindowSize from '../../hooks/use-window-size';
import FooterMenu from '../footer-menu';
import dynamic from 'next/dynamic';
import Play from '../commons/svgicons/play';
import Img from '../commons/image';
import Mute from '../commons/svgicons/mute';
import usePreviousValue from '../../hooks/use-previous';
import useAuth from '../../hooks/use-auth';
import LoginFollowing from '../login-following';
import useDrawer from '../../hooks/use-drawer';
import {
  SeoMeta,
  VideoJsonLd
} from '../../components/commons/head-meta/seo-meta';
// import Spinner from '../commons/svgicons/spinner';
// import Like from '../commons/svgicons/like';
import CircularProgress from '../commons/circular-loader'
import { inject } from '../../analytics/async-script-loader';
import { CHARMBOARD_PLUGIN_URL } from '../../constants';
import { track } from '../../analytics';
import { getItem } from '../../utils/cookie';
import { commonEvents } from '../../analytics/mixpanel/events';
import SwipeUp from '../commons/svgicons/swipe-up';
import { viewEvents } from '../../sources/social';

// import {sessionStorage} from "../../utils/storage"
 
SwiperCore?.use([Mousewheel]);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

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
  // const [item,setSeoItem] = useState({})
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

  const loaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    // const guestId = getItem('guest-token');
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Page Name'] = 'Feed';
    track('Screen View',mixpanelEvents );
  }, []);

  // useEffect(()=>{
  //   inject(CHARMBOARD_PLUGIN_URL, null, loaded);
  // },[items])

  // const [offset, setOffset] = useState(1)
  const preActiveVideoId = usePreviousValue({videoActiveIndex});
  const preVideoActiveIndex = usePreviousValue({videoActiveIndex});
  const preVideoDurationDetails = usePreviousValue({videoDurationDetails});

  const { t } = useTranslation();
  const { id } = router?.query;

 const {show} = useDrawer();

  const onDataFetched = data => {
    if(data?.data?.length > 0){
        // let toUpdateShowData = [];
        const videoIdInitialItem = data?.data?.[0]?.content_id
        //set first three item in showItems
        // data?.data?.[0] && toUpdateShowData.push(data?.data?.[0]);
        // data?.data?.[1] && toUpdateShowData.push(data?.data?.[1]);
        // data?.data?.[2] && toUpdateShowData.push(data?.data?.[2]);
        setItems(data?.data);
        // setToShowItems(data?.data);
        setActiveVideoId(videoIdInitialItem);
        // setSeoItem(data?.data[0]);
    }else{
      setItems([]);
    //   setToShowItems([]);
      setActiveVideoId(null);
    }
  }

  useEffect(()=>{
    if(initialPlayStarted === true){
      toTrackMixpanel(videoActiveIndex,'play')
      viewEventsCall(activeVideoId, 'user_video_start');
    }
  },[initialPlayStarted])

  const viewEventsCall = async(id, event)=>{
    console.log("event to send", id, event)
   await viewEvents({id:id, event:event})
  }

  // selecting home feed api based on before/after login
  const dataFetcher = () => getHomeFeed({ type: id });
  const dataFetcherWLogin = () => getHomeFeedWLogin({ type: id });

  const fetchData =  useAuth(dataFetcher,dataFetcherWLogin);

  const getFeedData = async() =>{
    let updateItems = [...items];
     try{
       const data =  await fetchData({ type: id });
       updateItems = updateItems.concat(data?.data);
       console.log('updateItems',updateItems)
      //  setOffset(offset+1)
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
    setActiveVideoId(null)
    // const mixpanelEvents = commonEvents();
    // mixpanelEvents['Page Name'] = 'Feed';
    // mixpanelEvents['Tab Name'] = id && (id === 'following') ? 'Following' : 'ForYou';
    // track('Tab View', mixpanelEvents);
  },[id])

  if (id === 'for-you') {
    const status = fetchState === 'success';
    const dataLength = data?.data?.length;
    fetchState = (status && !dataLength > 0) ? 'fail' : fetchState;
    data = (status && dataLength > 0) && data;
    retry = (status && !dataLength > 0) && retry;
  }

  const validItemsLength = toShowItems?.length > 0;
  // console.log(toShowItems, validItemsLength)
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
    if(percentage > 0){
      setInitialPlayStarted(true);
     }
     /********** Mixpanel ***********/
     if(currentTime >= duration-0.2){
       toTrackMixpanel(videoActiveIndex,'watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
       toTrackMixpanel(videoActiveIndex,'replay',{  duration : duration, durationWatchTime: duration})
       /*** view events ***/
      //  viewEventsCall(activeVideoId, 'completed');
       viewEventsCall(activeVideoId, 'user_video_start');
       if(showSwipeUp.count < 1 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
     }
     /******************************/
     if(currentTime >= duration-0.4){
      if(showSwipeUp.count === 0 && activeVideoId === items[0].content_id){setShowSwipeUp({count : 1, value:true})}
    }
  };

  const getCanShop = async () => {
    let isShoppable = false;
    const shopContent = { ...shop };
    try {
      const response = await canShop({ videoId: activeVideoId });
      isShoppable = response?.isShoppable;
      shopContent.data = response?.data;
    } catch (e) {
      isShoppable = false;
    }
    isShoppable ? shopContent.isShoppable = 'success' : shopContent.isShoppable = 'fail';
    setShop(shopContent);
  };

//  const incrementShowItems = async() =>{
//   let updateShowItems = [...toShowItems];
//   const dataItem = [...items]
//   /* Increment */
//     const incrementGap = 2;
//     let insertItemIndex = videoActiveIndex+incrementGap;
//     const arr = dataItem?.length-1 >= insertItemIndex ? dataItem : await getFeedData();
    
//     arr && updateShowItems?.push(arr[insertItemIndex]);
//   /* Delete */
//     const decrementGap = 3;
//     let deleteItemIndex = videoActiveIndex-decrementGap;
//     if(deleteItemIndex >=0 && videoActiveIndex >=3){
//       updateShowItems[deleteItemIndex] = null;
//     }

//   setToShowItems(updateShowItems);
//  }

//  const decrementingShowItems = async() =>{
//   let updateShowItems = [...toShowItems];
//   const dataItem = [...items]
//   // setMuted(false)
//   /* Add */
//   const  incrementGap = 2;
//   let insertItemIndex = videoActiveIndex-incrementGap;
//   if(insertItemIndex >=0 && videoActiveIndex >=2){
//     updateShowItems[insertItemIndex] = dataItem?.[insertItemIndex];
//   }
//   /* Delete */
//     const  decrementGap=  3;
//     let deleteItemIndex = videoActiveIndex+decrementGap;
//      deleteItemIndex >= 3 && updateShowItems?.splice(deleteItemIndex,1);
//     setToShowItems(updateShowItems);
//  }

  useEffect(()=>{
    if(videoActiveIndex === items.length - 3){
       
       getFeedData();
    }
    
    // if(preVideoActiveIndex?.videoActiveIndex){
    //   // toTrackMixpanel(preVideoActiveIndex?.videoActiveIndex,'durationWatchTime',{watchTime : preCurrentT?.currentT}) 
    // }
    // if(videoActiveIndex > preActiveVideoId?.videoActiveIndex){
    //   //swipe-down
    //   toShowItems.length > 0 && incrementShowItems();
    // }else{
    //   //swipe-up
    //   toShowItems.length > 0 && decrementingShowItems();
    // }
  },[videoActiveIndex])

  useEffect(() => {
    setShop({ isShoppable: 'pending' });
    getCanShop();
    setSaveLook(true);
  }, [activeVideoId]);

  const toggleSaveLook = () => {
    /********* Mixpanel ***********/
    // saveLook === true && toTrackMixpanel(videoActiveIndex,'savelook')
    /*****************************/

    const data = [...items];
    const resp = data.findIndex(item => (item?.content_id === activeVideoId));
    data[resp].saveLook = true;
    setToShowItems(data);
    setSaveLook(!saveLook);
  };

  const tabs = [
    { display: `${t('FOLLOWING')}`, path: `${t('SFOLLOWING')}` },{ display: `${t('FORYOU')}`, path: `${t('FOR-YOU')}` }];

  const size = useWindowSize();
  const videoHeight = `${size.height}`;

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
  /*****************************/

  const swiper = <Swiper
              className="max-h-full"
              direction="vertical"
              draggable="true"
              spaceBetween={0}
              calculateheight="true"
              slidesPerView={1}
              mousewheel
              // speed = '5000'
              scrollbar={{ draggable: true }}
              autoplay= {{
                  // delay: 2000,
                  // delay: 5000,
                  disableOnInteraction: false
              }}
              onSwiper={swiper => {
                const {
                  activeIndex, slides
                } = swiper;
                setInitialPlayStarted(false);
                // toTrackMixpanel(0, 'impression');
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
                // toTrackMixpanel(activeIndex, 'impression');
                // toTrackMixpanel(videoActiveIndex, 'swipe',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration});
                toTrackMixpanel(videoActiveIndex,'watchTime',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, watchTime : 'Partial', duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration})
                
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
                (items && items?.length > 0 ? items.map((
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
                      canShop={shop?.isShoppable}
                      shopCards={shop?.data}
                      handleSaveLook={toggleSaveLook}
                      saveLook={saveLook}
                      saved={item?.saveLook}
                      activeVideoId={activeVideoId}
                      preActiveVideoId={items?.[videoActiveIndex]?.content_id}
                      nextActiveVideoId = {items?.[videoActiveIndex]?.content_id}
                      comp="feed"
                      initialPlayButton={initialPlayButton}
                      muted={muted}
                      loading={loading}
                      toTrackMixpanel={toTrackMixpanel}
                      videoActiveIndex={videoActiveIndex}
                      initialPlayStarted={initialPlayStarted}
                      currentT={videoDurationDetails?.currentT}
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
              <div className="flex py-2 px-4 bg-gray text-white font-semibold mt-12">Swipe up for next video</div>
              </div>}
              {/* <div
                onClick={()=>setInitialPlayButton(false)}
                className="absolute top-1/2 justify-center w-screen"
                style={{ display: initialPlayButton ? 'flex' : 'none' }}
              >
                <Play/>
              </div> */}
              {<div
                onClick={()=>setMuted(false)}
                className="absolute top-0 left-4  mt-4 items-center flex justify-center p-4"
                style={{ display: initialPlayStarted && muted ? 'flex' : 'none' }}
              >
               
                <Mute/>
              </div>}
              {validItemsLength ? seekedPercentage > 0
              ? <Seekbar seekedPercentage={seekedPercentage} type={'aboveFooterMenu'} />
              : <SeekbarLoading type={'aboveFooterMenu'}/>
              : ''}
              <FooterMenu 
              videoId={activeVideoId}
              canShop={shop.isShoppable}
              type="shop"
              selectedTab="home"
              />
            </Swiper>
            

  const showLoginFollowing = <LoginFollowing toTrackMixpanel={toTrackMixpanel} videoActiveIndex={videoActiveIndex}/>;
  
  const toShowFollowing =  useAuth(showLoginFollowing, swiper);

  // useEffect(() => {
  //   toShowFollowing.current = typeof window !== "undefined" && window.localStorage;
  // }, []);

  const info = {
    'for-you' : swiper,
    'following' : toShowFollowing
  }

  let hostname;
  if (typeof window !== 'undefined') {
    hostname = window?.location?.hostname;
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
          // canonical: 'https://hipi.co.in/feed/[id]',
          // openGraph: {
          //   title: 'HiPi - Indian Short Video Platform for Fun Videos, Memes & more',
          //   description: 'Short Video Community - Watch and create entertaining dance, romantic, funny, sad & other short videos. Find fun filters, challenges, famous celebrities and much more only on HiPi',
          //   url: hostname || '',
          //   images: [
          //     {
          //       url: item?.thumbnail,
          //       width: 800,
          //       height: 600,
          //       alt: item?.music_title
          //     },
          //     { url: item?.userProfilePicUrl }
          //   ],
          //   type: 'video.movie',
          //   video: {
          //     actors: [
          //       {
          //         role: item?.userName
          //       }
          //     ],
          //     tag: item?.genre
          //   },
          //   site_name: 'HiPi'
          // }
        }}
      />
      {/* <VideoJsonLd
        name={item.music_title}
        description={item.content_description}
        contentUrl={item.video_url}
        embedUrl={hostname}
        thumbnailUrls={item.thumbnailUrls}
        watchCount={item.likesCount}
      /> */}
    <>
      <div className="feed_screen overflow-hidden" style={{ height: `${videoHeight}px` }}>
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
