/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable react/jsx-no-duplicate-props*/
/*eslint-disable @next/next/no-img-element */
/*eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from 'react';
import VideoFooter from '../videofooter/index';
import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import Play from '../commons/svgicons/play';
import usePreviousValue from '../../hooks/use-previous';
import dynamic from 'next/dynamic';
import { getItem } from '../../utils/cookie';
import { analyticsCleanup, reportPlaybackEnded, reportPlaybackRequested, videoAnalytics  } from '../../analytics/conviva';
import {incrementCountVideoView} from '../../utils/events';
import RightArrow from '../commons/svgicons/right-arrow';
import { VmaxAdButton ,FeedAdButton } from '../commons/button/ad';

// import { rptPlaybackEnd, rptPlaybackStart, setPlayer } from '../../analytics/conviva/analytics';
// import Pause from '../commons/svgicons/pause';



 const ProductWidget = dynamic(() => import("../product-widget"), {
   // eslint-disable-next-line react/display-name
   loading: () => <div />,
   ssr: false,
});

const ProductCards= dynamic(() => import("../product-cards"), {
   // eslint-disable-next-line react/display-name
   loading: () => <div />,
   ssr: false,
});

function Video(props) {
   const [playing, setPlaying] = useState(true);
   const [clicked, setClicked] = useState(true);
   const [play, setPlay] = useState(false);
   const prePlayState = usePreviousValue({play});
   // const [pause, setPause] = useState(false);
   const rootRef = useRef(null);
   const size = useWindowSize();
   const videoHeight = `${size.height}`;
   const device = getItem('device-info');

   useEffect(()=>{
      let videoElement;
      try{
         videoElement = rootRef?.current?.children[0];
      if(device === 'ios') 
      {    
          videoElement?.addEventListener('suspend', () => {
            props?.suspendLoader && props?.suspendLoader(true);
          });
      }
      }catch(e){
         console.error('issue in video elemant',e);
      }

      return ()=>{
       try{ 
          if(device === 'ios'){
            videoElement.removeEventListener('suspend', () => {
            props?.suspendLoader && props?.suspendLoader(true);
          });
         }}catch(e){
            console.error(e);
         }
       }
   },[])
   // useEffect(()=>{
   //    if(props?.comp === 'feed'){
   //    if(props.initialPlayStarted && play === true){
   //    props?.toTrackMixpanel(props.videoActiveIndex,'pause');
   //    }else{
   //    prePlayState?.play === true && play === false && props?.toTrackMixpanel(props.videoActiveIndex,'resume')
   //    }
   //    }
   // },[play])


   const handleVideoPress = () => {
      if (playing) {
      rootRef.current.children[0].pause();
      setPlaying(false);
      setPlay(true);
      // setPause(false);
      setClicked(false);
      // setTimeout(() => {
      //   setPlay(false);
      // }, 2000);

      } else {
      rootRef.current.children[0].play();
      setPlaying(true);
      setClicked(true);
      // setPause(true);
      setPlay(false);
      setTimeout(() => {
      // setPause(false);
      }, 2000);
   }
   };
   // console.log(JSON.stringify(props))
   const handlePlay = entry => {
      if (clicked) {
      if (entry?.isIntersecting) {
      rootRef?.current?.children[0]?.play && rootRef?.current?.children[0]?.play();
      setPlaying(true);
      // if (promise !== undefined) {
      //    promise.then(function() {
      //       console.log('success')
      //      // Automatic playback started!
      //    }).catch(function(error) {
      //       console.log('error',error)
      //      // Automatic playback failed.
      //      // Show a UI element to let the user manually start playback.
      //    });
      // }
      } else {
      rootRef?.current?.children[0]?.pause && rootRef?.current?.children[0]?.pause();
      setPlaying(false);
      }
      }
   };

   const [ref] = useIntersect({
   callback: handlePlay,
   rootMargin: '50px',
   threshold: [0.30, 0.75]
   });

    // useEffect(()=>{
   //    if(props?.comp === 'feed'){
   //    if(props.initialPlayStarted && play === true){
   //    props?.toTrackMixpanel(props.videoActiveIndex,'pause');
   //    }else{
   //    prePlayState?.play === true && play === false && props?.toTrackMixpanel(props.videoActiveIndex,'resume')
   //    }
   //    }
   // },[play])


   useEffect(()=>{
      let currentRef = rootRef?.current?.children[0];

      if(props.id === props.activeVideoId){
         if(videoAnalytics !== null) reportPlaybackEnded();
         try{
            reportPlaybackRequested({ref: currentRef, convivaItemInfo:props.convivaItemInfo });
         }catch(e){
            console.error(e,"setplayer error");
         }
      }
      // if(props?.player !== 'single-player-muted'){
      //    props?.setMuted(true);
      // }
   },[props.activeVideoId])

   useEffect(() => {
      if(typeof window !== undefined){
         window?.addEventListener("beforeunload", ()=>{
            if(videoAnalytics !== null) reportPlaybackEnded();
         })
      }
      return () => {
         window.removeEventListener('beforeunload', ()=>{
            if(videoAnalytics !== null) reportPlaybackEnded();
         });
         analyticsCleanup();
      }
   }, [])

   const handleUpdateSeekbar = (e) => {
      const percentage = (e.target.currentTime / e.target.duration) * 100;
      // if(e.target.currentTime >= e.target.duration-0.4){
      //    handleSeeked();
      // }
      percentage && props.updateSeekbar(percentage, e.target.currentTime, e?.target?.duration);
   };

   const convivaReplaySession = () =>{
      let currentRef = rootRef?.current?.children[0];
      if(videoAnalytics !== null) reportPlaybackEnded();
      try{
         reportPlaybackRequested({ ref: currentRef, convivaItemInfo:props.convivaItemInfo  });
      }catch(e){
         console.error(e,"setplayer error");
      }
      
   }


   const handleSeeked = () => {
      convivaReplaySession();
   }
   
   const thumanilWidth = props?.thumbnail?.replaceAll('upload','upload/w_300');
   const firstFrame = thumanilWidth?.replaceAll('.jpg','.webp');
   
   const selectVideoPlayer = {
      'multi-player-muted' : <video
      onContextMenu={(e)=>{
         e.preventDefault();
         return false}}
         controlsList="nodownload"
         playsInline
         muted={props?.muted ? true : false}
         autoPlay
         preload="auto"
         webkit-playsinline = "true"
         // onLoadCapture ={resetCurrentTime}
         onTimeUpdate={handleUpdateSeekbar}
      loop
      ref={ref}
      onClick={handleVideoPress}
      className="vdo_player"
      // onEnded={(e)=> onReplay(e)}
      // width={size.width}
      // height={videoHeight}
      // onPlay={()=>{(prePlayState?.play === true) &&  props.toTrackMixpanel(props.videoActiveIndex,'resume')}}
      poster={firstFrame}
      objectfit="cover"
      key={props.url}
      onSeeked={handleSeeked}
      onEnded={()=>{
         console.log("MIX&&- ended")
         window.sessionStorage.setItem('videos-finished',window.sessionStorage.getItem('videos-finished') || 1)}}
      >
      <source
         src={props.url}
         type="video/mp4"
      />
      </video>,
       'multi-player-non-muted' : <video
       onContextMenu={(e)=>{
         e.preventDefault();
         return false}}
      controlsList="nodownload"
       playsInline
      //  muted={props.muted ? true : false}
      //  autoPlay
       preload="auto"
       webkit-playsinline = "true"
       // onLoadCapture ={resetCurrentTime}
       onTimeUpdate={handleUpdateSeekbar}
       loop
       ref={ref}
       onClick={handleVideoPress}
       className="vdo_player"
       // onEnded={(e)=> onReplay(e)}
       // width={size.width}
       // height={videoHeight}
       // onPlay={()=>{(prePlayState?.play === true) &&  props.toTrackMixpanel(props.videoActiveIndex,'resume')}}
       poster={firstFrame}
       objectfit="cover"
       key={props.url}
       >
       <source
          src={props.url}
          type="video/mp4"
       /> 
       </video>,
      'single-player' : (props.id && props.activeVideoId && (props.id === props?.activeVideoId)) ?  
      <video
      onContextMenu={(e)=>{
         e.preventDefault();
         return false}}
      controlsList="nodownload"
        playsInline
      //   muted={props.muted ? true : false}
        autoPlay
        preload="auto"
        importance="high"
        // muted
        // webkit-playsinline = "true"
        // onLoadCapture ={resetCurrentTime}
        onTimeUpdate={handleUpdateSeekbar}
        loop
        ref={ref}
        onClick={handleVideoPress}
        className="vdo_player"
        // onEnded={(e)=> onReplay(e)}
        // width={size.width}
        // height={videoHeight}
        // onPlay={()=>{(prePlayState?.play === true) &&  props.toTrackMixpanel(props.videoActiveIndex,'resume')}}
        poster={firstFrame}
        objectfit="cover"
        key={props.url}
        >
         <source
           src={`${props.url}`}
           type="video/mp4"
        />  
        </video> :
        <img className="h-screen" src={firstFrame}></img>,
        'single-player-muted' : (props.id && props.activeVideoId && (props.id === props?.activeVideoId)) ?  
      <video
      onContextMenu={(e)=>{
         e.preventDefault();
         return false}}
      controlsList="nodownload"
        playsInline
        muted={props.muted ? true : false}
        autoPlay
        preload="auto"
        importance="high"
        // muted
        // webkit-playsinline = "true"
        // onLoadCapture ={resetCurrentTime}
        onTimeUpdate={handleUpdateSeekbar}
        loop
        ref={ref}

      //   onWaiting={handleWait}
      //   onPlaying={handlePlaying}
      //   onSeeked={handleEnded}

        onClick={handleVideoPress}
        className="vdo_player"
        // onEnded={(e)=> onReplay(e)}
        // width={size.width}
        // height={videoHeight}
        // onPlay={()=>{(prePlayState?.play === true) &&  props.toTrackMixpanel(props.videoActiveIndex,'resume')}}
        poster={firstFrame}
        objectfit="cover"
        key={props.url}
        onSeeked={(e)=>{
         incrementCountVideoView(props?.id);
         handleSeeked(e);
         // try{
         //    /* mixpanel - view event tracker (videos completed) */
         //    const videosCompleted = JSON.parse(window.sessionStorage.getItem('videos-completed')) ||{ ids:[], value: 0};
         //    console.log('MIX-count --++',videosCompleted, " ** incre ** ", videosCompleted.value+1, videosCompleted?.ids?.findIndex((item)=>item === props?.id) === -1,typeof (videosCompleted?.ids?.findIndex((item)=>item === props?.id)), props?.id)
         //    if(videosCompleted?.ids?.findIndex((item)=>item === props?.id) === -1)
         //    { console.log('MIX-count ++',videosCompleted, " ** incre ** ", videosCompleted.value+1)
         //      videosCompleted.ids.push(props?.id);
         //      const updateValue = parseInt(videosCompleted.value)+1
         //      const updateData = {ids:videosCompleted.ids, value:updateValue}
         //       window.sessionStorage.setItem('videos-completed',JSON.stringify(updateData));
         //    }
         //   }catch(e){
         //     console.error('error in video comp increment',e)
         //   }
        }}
        >
         <source
           src={`${props.url}`}
           type="video/mp4"
        />  
        </video> :
        <img className="h-screen" loading="lazy" src={firstFrame}></img>
   }

   return (
   <div
   ref={rootRef}
   className="video_card relative w-screen bg-black overflow-hidden rounded-sm"
   style={{ height: `${videoHeight}px` }}
   >
   {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
   {selectVideoPlayer[props?.player || 'multi-player-muted']}
      <div
      onClick={handleVideoPress}
      className="absolute top-1/2 justify-center w-screen"
      style={{ display: play ? 'flex' : 'none' }}
      >
      <Play />
      </div>
      {/* <div
      onClick={handleVideoPress}
      className="absolute top-1/2 left-1/2 rounded-full bg-black bg-opacity-75"
      style={{ display: pause ? 'block' : 'none' }}
      >
      <Pause />
      </div> */}

      <VideoFooter
         musicTitle={props.musicTitle}
         userName={props.userName}
         musicCoverTitle={props.musicCoverTitle}
         type="feed"
         hashTags={props.hashTags}
         canShop={props?.canShop || false}
         saveLook={props.saveLook}
         comp={props?.comp}
         description={props?.description}
         adCards={props?.adData}
         showBanner={props?.showBanner}
         videoId={props.id}
         activeVideoId={props?.activeVideoId}
         userVerified = {props?.userVerified}
         videoSoundAvailable={props?.videoSound}
         isAdShowVisible={!!props?.feedAd || !!props?.vmaxAd}
         profilePic={props?.profilePic}
         explain={props?.explain}
         correlationID={props?.correlationID}
         userId={props?.videoOwnersId}
         pageName={props?.pageName}
         tabName={props?.tabName}
         />
      {/* TO-DO  comdition acc to comp */}

      {
         !!props?.feedAd && (
            <>
            <FeedAdButton
            id = {props?.id}
            ctaColor = "#63ABFF"
            noShow = {!!props?.feedAd}
            userName = {props.userName}
            setMuted = {props?.setMuted}
            profilePic = {props?.profilePic}
            ctaText = {props?.feedAd?.cta_text}
            ctaPath = {props?.feedAd?.click_url}
            userVerified = {props?.userVerified}
            adBtnClickCb = {props?.adBtnClickCb}
            >
               <button
                  className="pb-4 pt-2 pr-4 bottom-16 w-full z-50 box-border animateBottom"
                  onClick={() => {
                  props?.setMuted && props?.setMuted(true);
                  props?.adBtnClickCb && props?.adBtnClickCb();
                  props?.feedAd?.click_url && window.open(props?.feedAd?.click_url)
                  }}
               >
                  <a
                  href={void 0}
                  style={{ backgroundColor: "#63ABFF" }}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-2 text-white rounded-md flex items-center justify-between text-sm font-semibold"
                  >
                  {props?.feedAd?.cta_text}
                  <span>
                     <RightArrow value="#fff" />
                  </span>
                  </a>
               </button>
            </FeedAdButton>
            
            </>
         )
      }

      { !!props?.vmaxAd && (
         <VmaxAdButton 
            vmaxAd={!!props?.vmaxAd}
            id={props?.id}
            noShow={!!props?.vmaxAd}
            userName={props.userName}
            setMuted = {props?.setMuted}
            profilePic={props?.profilePic}
            adBtnClickCb = {props?.adBtnClickCb}
            activeVideoId={props?.activeVideoId}
            videoActiveIndex={props?.videoActiveIndex}
            userVerified = {props?.userVerified}
            ctaColor = {props?.vmaxAd?.ctaColor}
            ctaTrackers={props?.vmaxAd?.clicktrackers}
            ctaText = {props?.vmaxAd?.ctaText ? props.vmaxAd.ctaText: "Click here"}
            ctaPath = {props?.vmaxAd?.ctaLinkUrl ? props?.vmaxAd?.ctaLinkUrl : props?.vmaxAd?.ctaPath} 
         />
      )}
      
      
      <VideoSidebar
         userName={props.userName}
         videoOwnersId={props.videoOwnersId}
         socialId={props.socialId}
         isLiked={props.isLiked}
         profilePic={props.profilePic}
         likes={props.likes}
         comment={props.comments}
         share={777}
         type="feed"
         handleSaveLook={props.handleSaveLook}
         saveLook={props.saveLook}
         canShop={props?.canShop ||  false}
         saved={props.saved}
         profileFeed={props?.profileFeed}
         videoId={props.id}
         activeVideoId={props?.activeVideoId}
         comp={props?.comp}
         pageName={props?.pageName}
         tabName={props?.tabName}
         shopType={props?.shopType}
         charmData = {props?.charmData}
         onCloseChamboard={props?.onCloseChamboard}
         creatorId={props?.creatorId}
         adCards={props?.adData}
         showBanner={props?.showBanner}
         isAdShowVisible={!!props?.feedAd || !!props?.vmaxAd}
         campaignId={props?.campaignId || "NA"}
         vmaxAd={!!props?.vmaxAd}
         explain={props?.explain || null}
         correlationID={props?.correlationID || null}
         userId={props?.videoOwnersId || null}
         profileId={props?.profileId || ""}
         />
      {/* TO-DO  condition acc to comp */}
      {props.canShop && (!props.profileFeed
      ? (!props.saveLook
      && (
      <ProductWidget
         shopCards={props?.shopCards}
         handleSaveLook={props?.handleSaveLook}
         videoId={props?.activeVideoId}
         loading={props?.loading}
         shopType={props?.shopType}
         setClose={props?.setClose}
         pageName={props?.pageName}
         tabName={props?.tabName}
         campaignId={props?.campaignId || "NA"}
         />
      )
      ) : (
         !props?.adData?.monitisation && <ProductCards
         shopCards={props?.shopCards}
         videoId={props?.activeVideoId}
         profileFeed={props.profileFeed}
         comp="profile"
         loading={props?.loading}
         pageName={props?.pageName}
         tabName={props?.tabName}
         campaignId={props?.campaignId || "NA"}
         />
      )
      )}
   </div>
   );
   }
export default Video;