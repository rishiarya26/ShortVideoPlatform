/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable react/jsx-no-duplicate-props*/
/*eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';
import VideoFooter from '../videofooter/index';
import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import Play from '../commons/svgicons/play';
import usePreviousValue from '../../hooks/use-previous';
import dynamic from 'next/dynamic';
import { getItem } from '../../utils/cookie';

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
   const device = getItem('device-info')

   useEffect(()=>{console.log("$$",props?.adData)},[])

   useEffect(()=>{
      try{
      if(device === 'ios') 
      {   const videoElement = rootRef?.current?.children[0];
          videoElement.addEventListener('suspend', () => {
            props?.suspendLoader && props?.suspendLoader(true);
          });
      }
      }catch(e){
         console.error(e);
      }

      return ()=>{
        if(device === 'ios'){
            videoElement.removeEventListener('suspend', () => {
            props?.suspendLoader && props?.suspendLoader(true);
          });
         }
       }
   },[])
   // useEffect(()=>{
   //    const player = rootRef.current.children[0];
   //    if(player){
   //       console.log(player, rootRef)
   //    setTimeout(()=>{
   //       const promise = player?.play();
   //       if (promise.then) {
   //          promise
   //            .then(() => {})
   //            .catch(() => {
   //              // if promise fails, hide the video and fallback to <img> tag
   //            });
   //        }
   //       console.log(promise);
   //    },0)
   //   }
   // },[props?.videoActiveIndex])


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
      rootRef?.current?.children[0]?.pause();
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

   const handleUpdateSeekbar = e => {
   const percentage = (e.target.currentTime / e.target.duration) * 100;
   percentage && props.updateSeekbar(percentage, e.target.currentTime, e?.target?.duration);
   };
   
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
        <img className="h-screen" src={firstFrame}></img>
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
         />
      {/* TO-DO  comdition acc to comp */}
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
         />
      )
      )}
   </div>
   );
   }
export default Video;