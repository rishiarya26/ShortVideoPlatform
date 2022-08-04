/*eslint-disable @next/next/no-img-element*/
import React, { useState, useRef, useEffect } from 'react';
import VideoFooter from '../videofooter/index';
import EmbedVideoSidebar from '../embed-video-sidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import { withBasePath } from '../../config';
import ProductCards from '../product-cards';
import EmbedSeekbar from '../emded-seekbar';
import FooterMenu from '../footer-menu';
import { commonEvents } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';
import { viewEventsCall } from '../../analytics/view-events';
// import usePreviousValue from '../../hooks/use-previous';
// import EmbedVideoSidebar from '../embed-video-sidebar'

export default function SingleVideo(props){
  const [playing, setPlaying] = useState(false);
  // const [clicked, setClicked] = useState(false);
  const [play, setPlay] = useState(false);
  const [initialPlayStarted, setInitialPlayStarted] = useState(false);
  const [tDuration, settDuration] = useState(0);
  const [watchedTime, setWatchedTime] = useState(0)

  // const prePlayState = usePreviousValue({play});

  const rootRef = useRef(null);
  const size = useWindowSize();
  const handleVideoPress = () => {
    if (playing) {
      rootRef.current.children[0].pause();
      setPlaying(false);
      // setClicked(false);
      setPlay(false);
    } else {
      rootRef.current.children[0].play();
      setPlaying(true);
      // setClicked(true);
      setPlay(true);

    }
  };

  useEffect(()=>{
    if(initialPlayStarted && play === false){
    toTrackMixpanel('pause');
    }else{
      initialPlayStarted && play === true && toTrackMixpanel('resume')
    }},[play]);

  useEffect(()=>{
      if(initialPlayStarted === true){
        toTrackMixpanel('play')
        viewEventsCall(props?.id, 'user_video_start');
      }
    },[initialPlayStarted])

  useEffect(() => {
    // const guestId = getItem('guest-token');
    const mixpanelEvents = commonEvents();
    mixpanelEvents['Page Name'] = 'Video';
    track('Screen View',mixpanelEvents );
    toTrackMixpanel('impression');
    window.addEventListener("beforeunload", ()=>{
      watchedTime > 0 && toTrackMixpanel('watchTime',{ watchTime : 'Partial', duration : tDuration, durationWatchTime: watchedTime})
       /*** video events ***/
       if(watchedTime < 3){
        viewEventsCall(props?.id,'skip')
      }else if(watchedTime < 7){
        viewEventsCall(props?.id,'no decision')
      }else {
        viewEventsCall(props?.id,'view')
      }
      viewEventsCall(props?.id, 'user_video_end', 
      {timeSpent: watchedTime,
       duration :  tDuration});

      /***************/
    });
  }, []);

  // const noteWatchTime =()=>{
  //   toTrackMixpanel('watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
  // }

  /*******  Mixpanel *************/
  const toTrackMixpanel = (type, value) => {
    // const item = items[activeIndex];
    const mixpanelEvents = commonEvents();

    const toTrack = {
      'impression' : ()=> track('UGC Impression', mixpanelEvents),
      // 'swipe' : ()=> {
      //   mixpanelEvents['UGC Duration'] = value?.duration
      //   mixpanelEvents['UGC Watch Duration'] = value?.durationWatchTime
      //   track('UGC Swipe', mixpanelEvents)
      // },
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

    const hashTags = props?.hashTags?.map((data)=> data?.name);

    mixpanelEvents['Creator ID'] = props?.userId;
    mixpanelEvents['Creator Handle'] = `${props?.userName}`;
    mixpanelEvents['Creator Tag'] = props?.creatorTag || 'NA';
    mixpanelEvents['UGC ID'] = props?.id;
    mixpanelEvents['Short Post Date'] = 'NA';
    mixpanelEvents['Tagged Handles'] = hashTags || 'NA';
    mixpanelEvents['Hashtag'] = hashTags || 'NA';
    mixpanelEvents['Audio Name'] = props?.musicTitle || 'NA';
    mixpanelEvents['UGC Genre'] = props?.genre || 'NA';
    mixpanelEvents['UGC Description'] = props?.description || 'NA';
    mixpanelEvents['Page Name'] = 'Video';

    type && toTrack?.[type] && toTrack?.[type]();
  }


  // const handlePlay = entry => {
  //   if (clicked) {
  //     if (entry.isIntersecting) {
  //       rootRef.current.children[0].play();
  //       setPlaying(true);
        
  //     } else {
  //       rootRef.current.children[0].pause();
  //       setPlaying(false);
       
  //     }
  //   }
  // };

  // const [ref] = useIntersect({
  //   callback: handlePlay,
  //   rootMargin: '50px',
  //   threshold: [0.30, 0.75]
  // });

  const handleUpdateSeekbar = e => {
    const percentage = (e.target.currentTime / e.target.duration) * 100;
    props.updateSeekbar(percentage);
    const duration = e?.target?.duration;
    const currentTime = e?.target?.currentTime;
    settDuration(duration);
    setWatchedTime(currentTime);

    if(percentage > 0){
      setInitialPlayStarted(true);
     }

     /********** Mixpanel ***********/
     if(currentTime >= duration-0.2){
      toTrackMixpanel('watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
      toTrackMixpanel('replay',{  duration : duration, durationWatchTime: duration})
       /*** view events ***/
       viewEventsCall(props?.id, 'completed');
       viewEventsCall(props?.id, 'user_video_start');
       try{
        const videosCompleted = parseInt(window.sessionStorage.getItem('videos-completed'));
        window.sessionStorage.setItem('videos-completed',videosCompleted+1);
       }catch(e){
         console.error('error in video comp increment',e)
       }
    }
    /******************************/
  };

  return (
    <div className="flex flex-col overflow-hidden">
    <div
      ref={rootRef}
      className="video_card relative w-screen  scroll-snap-start bg-black h-screen overflow-hidden"
    >
    
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        // autoPlay
        onContextMenu={(e)=>{
          e.preventDefault();
          return false}}
       controlsList="nodownload"
        playsInline
        key={props.url}
        onTimeUpdate={handleUpdateSeekbar}
        // ref={ref}
        loop
        poster={props.poster}
        onClick={handleVideoPress}
        className="vdo_player"
        width={size.width}
        height={size.height}
        objectfit="cover"
      >
        <source src={props.url} type="video/mp4" />
      </video>
      
      <EmbedSeekbar type='single' seekedPercentage={props.seekedPercentage} />
      {!play && <div
        onClick={handleVideoPress}
        className="absolute top-2/5 justify-center w-full"
        style={{ display: 'flex' }}
      >
        <img
          src={withBasePath('images/play.png')}
          className="w-12 h-12"
          alt="playicon"
        />
      </div>}
      <div id="cb_tg_d_wrapper">
        <div className="playkit-player" />
      </div>
         {/* <div className="flex relative flex-col p-3"> */}
    <VideoFooter
        musicTitle={props.musicTitle}
        userName={`${props.userName}`}
        musicCoverTitle={props.musicCoverTitle}
        hashTags={props.hashTags}
        canShop={props.canShop}
        comp="single"
        description={props?.description}
      />
       <EmbedVideoSidebar
       userName={props?.userName}
        videoId={props?.videoId}
        socialId={props.socialId}
        profilePic={props.profilePic}
        likes={props.likes}
        comment={props.comments}
        share={777}
        type="single"
      />
    {/* </div> */}
      {props.canShop === 'success'
         && ( 
           <ProductCards
             shopCards={props.shopCards}
             videoId={props.videoId}
             comp="single"
           />
         )} 
    </div>
           <FooterMenu 
              videoId={props.videoId}
              canShop={props.canShop}
              type=""
              selectedTab=""
            />
    </div>
  );
}

