/*eslint-disable react/jsx-no-duplicate-props*/
/*eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
import React, { useState, useRef, useEffect } from 'react';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import Play from '../commons/svgicons/play';
import usePreviousValue from '../../hooks/use-previous';
// import VideoFooter from '../videofooter/index';
// import VideoSidebar from '../videosidebar/index';
// import ProductWidget from '../product-widget';
// import ProductCards from '../product-cards';
// import CircularProgress from '../commons/circular-loader'
// import { PreviousMap } from 'postcss';
// import { inject } from '../../analytics/async-script-loader';
// import { CHARMBOARD_PLUGIN_URL } from '../../constants';
// import SwipeUp from '../commons/svgicons/swipe-up';
// import DynamicImg from '../commons/image-dynamic';
// import Img from '../commons/image';
// import { withRouter } from 'next/router';


function Video(props) {
   const [playing, setPlaying] = useState(true);
   const [clicked, setClicked] = useState(true);
   const [play, setPlay] = useState(false);

   const prePlayState = usePreviousValue({play});
   const rootRef = useRef(null);
   const size = useWindowSize();
   const videoHeight = `${size.height}`;

  const handleVideoPress = () => {
      if (playing) {
      rootRef.current.children[0].pause();
      setPlaying(false);
      setPlay(true);
      setClicked(false);
      } else {
      rootRef.current.children[0].play();
      setPlaying(true);
      setClicked(true);
      setPlay(false);
      setTimeout(() => {
      }, 2000);
   }
   };

   const handlePlay = entry => {
      if (clicked) {
      if (entry?.isIntersecting) {
      rootRef?.current?.children[0]?.play && rootRef?.current?.children[0]?.play();
      setPlaying(true);
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

   useEffect(()=>{
      if(props?.comp === 'feed'){
      if(props.initialPlayStarted && play === true){
      props?.toTrackMixpanel(props.videoActiveIndex,'pause');
      }else{
      prePlayState?.play === true && play === false && props?.toTrackMixpanel(props.videoActiveIndex,'resume')
      }
      }
   },[play])

   const handleUpdateSeekbar = e => {
   const percentage = (e.target.currentTime / e.target.duration) * 100;
   percentage && props.updateSeekbar(percentage, e.target.currentTime, e?.target?.duration);
   };
   
   const thumanilWidth = props?.thumbnail?.replaceAll('upload','upload/w_300');
   const firstFrame = thumanilWidth?.replaceAll('.jpg','.webp');

   const selectVideoPlayer = {
    'multi-player-muted' : <video
      playsInline
      muted={props?.muted ? true : false}
      autoPlay
      preload="auto"
      webkit-playsinline = "true"
      onTimeUpdate={handleUpdateSeekbar}
      loop
      ref={ref}
      onClick={handleVideoPress}
      className="vdo_player"
      poster={firstFrame}
      objectfit="cover"
      key={props.url}
      >
      <source
         src={props.url}
         type="video/mp4"
      /> 
      </video>,
       'multi-player-non-muted' : <video
       playsInline
       preload="auto"
       webkit-playsinline = "true"
       onTimeUpdate={handleUpdateSeekbar}
       loop
       ref={ref}
       onClick={handleVideoPress}
       className="vdo_player"
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
        autoPlay
        preload="auto"
        importance="high"
        onTimeUpdate={handleUpdateSeekbar}
        loop
        ref={ref}
        onClick={handleVideoPress}
        className="vdo_player"
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
        playsInline
        onContextMenu={(e)=>{
         e.preventDefault();
         return false}}
      controlsList="nodownload"
        muted={props.muted ? true : false}
        autoPlay
        preload="auto"
        importance="high"
        onTimeUpdate={handleUpdateSeekbar}
        loop
        ref={ref}
        onClick={handleVideoPress}
        className="vdo_player"
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

   </div>
   );
   }
export default Video;