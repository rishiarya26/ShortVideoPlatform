/*eslint-disable react/jsx-no-duplicate-props*/
/*eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';
import VideoFooter from '../videofooter/index';
import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import Play from '../commons/svgicons/play';
import ProductWidget from '../product-widget';
import ProductCards from '../product-cards';
import CircularProgress from '../commons/circular-loader'
import { PreviousMap } from 'postcss';
import { inject } from '../../analytics/async-script-loader';
import { CHARMBOARD_PLUGIN_URL } from '../../constants';
import usePreviousValue from '../../hooks/use-previous';
import SwipeUp from '../commons/svgicons/swipe-up';
import DynamicImg from '../commons/image-dynamic';
import Img from '../commons/image';
// import { rptPlaybackEnd, rptPlaybackStart, setPlayer } from '../../analytics/conviva/analytics';
// import Pause from '../commons/svgicons/pause';
function Video(props) {
   const [playing, setPlaying] = useState(true);
   const [clicked, setClicked] = useState(true);
   const [play, setPlay] = useState(false);

   const prePlayState = usePreviousValue({play});
   // const [pause, setPause] = useState(false);
   const rootRef = useRef(null);
   const size = useWindowSize();
   const videoHeight = `${size.height}`;

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
      if (entry.isIntersecting) {
      rootRef?.current?.children[0]?.play();
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
         console.log("id",props?.id, props?.activeVideoId);
   },[props?.activeVideoId]) 

   useEffect(()=>{
         console.log("id",props?.id, props?.activeVideoId);
   },[props?.activeVideoId]) 
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
   return (
   <div
   ref={rootRef}
   className="video_card relative w-screen bg-black overflow-hidden rounded-sm"
   style={{ height: `${videoHeight}px` }}
   >
   {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    { props?.profileFeed === true ? (props.id && props.activeVideoId && (props.id === props?.activeVideoId)) ?  
    <video
      playsInline
      muted={props.muted ? true : false}
      autoPlay
      preload="auto"
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
      {/* <img src={firstFrame}></img>  */}
      <source
         src={`${props.url}`}
         type="video/mp4"
      /> 
      </video> :
      <img src={firstFrame}></img>
      :
      <video
      playsInline
      muted={props.muted ? true : false}
      autoPlay
      preload="auto"
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
      {/* <Img data={firstFrame} ></Img> */}
      <source
         src={props.url}
         type="video/mp4"
      /> 
      </video>
      }
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
         canShop={props.canShop}
         saveLook={props.saveLook}
         comp={props?.comp}
         />
      {/* TO-DO  comdition acc to comp */}
      <VideoSidebar
         userName={props.userName}
         videoOwnersId={props.videoOwnersId}
         socialId={props.socialId}
         profilePic={props.profilePic}
         likes={props.likes}
         comment={props.comments}
         share={777}
         type="feed"
         handleSaveLook={props.handleSaveLook}
         saveLook={props.saveLook}
         canShop={props.canShop}
         saved={props.saved}
         profileFeed={props?.profileFeed}
         videoId={props.id}
         videoActiveIndex={props?.videoActiveIndex}
         toTrackMixpanel={props?.toTrackMixpanel}
         />
      {/* TO-DO  comdition acc to comp */}
      {props.canShop === 'success' && (!props.profileFeed
      ? (!props.saveLook
      && (
      <ProductWidget
         shopCards={props?.shopCards}
         handleSaveLook={props?.handleSaveLook}
         videoId={props?.activeVideoId}
         loading={props?.loading}
         />
      )
      ) : (
      <ProductCards
         shopCards={props?.shopCards}
         handleSaveLook={props?.handleSaveLook}
         videoId={props?.activeVideoId}
         profileFeed={props.profileFeed}
         comp="profile"
         loading={props?.loading}
         />
      )
      )}
   </div>
   );
   }
export default Video;