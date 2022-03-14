/*eslint-disable react/jsx-no-duplicate-props*/
/*eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';
// import VideoFooter from '../videofooter/index';
// import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import Play from '../commons/svgicons/play';
// import ProductWidget from '../product-widget';
// import ProductCards from '../product-cards';
// import CircularProgress from '../commons/circular-loader'
// import { PreviousMap } from 'postcss';
// import { inject } from '../../analytics/async-script-loader';
// import { CHARMBOARD_PLUGIN_URL } from '../../constants';
import usePreviousValue from '../../hooks/use-previous';
// import SwipeUp from '../commons/svgicons/swipe-up';
// import DynamicImg from '../commons/image-dynamic';
// import Img from '../commons/image';
// import { withRouter } from 'next/router';
import Mute from "../commons/svgicons/mute";
import MusicBlack from "../commons/svgicons/music-black";
import Comment from "../commons/svgicons/comment-black"
import Like from "../commons/svgicons/like-black";
import Share from "../commons/svgicons/share-black";
function Video({url, player='multi-player-muted',firstFrame,
userProfilePicUrl, userName, music_title, likesCount, muted, unMute,firstName, lastName}) {
const [playing, setPlaying] = useState(true);
const [clicked, setClicked] = useState(true);
const [play, setPlay] = useState(false);
const prePlayState = usePreviousValue({play});
const rootRef = useRef(null);
const size = useWindowSize();
const videoHeight = `${size.height}`;
const handleVideoPress = () => {
if (playing) {
  rootRef?.current?.children[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.pause();
setPlaying(false);
setPlay(true);
setClicked(false);
} else {
  rootRef?.current?.children[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.play();
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
// console.log("IS INTERSECTING", rootRef?.current?.children[0]?.children?.[1]?.children?.[1]?.children?.[0])
rootRef?.current?.children[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.play &&
rootRef?.current?.children[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.play();
setPlaying(true);
} else {
rootRef?.current?.children[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.pause();
setPlaying(false);
}
}
};
const [ref] = useIntersect({
callback: handlePlay,
rootMargin: '50px',
threshold: [0.65, 0.65]
});
//  useEffect(()=>{
//     if(props?.comp === 'feed'){
//     if(props.initialPlayStarted && play === true){
//     props?.toTrackMixpanel(props.videoActiveIndex,'pause');
//     }else{
//     prePlayState?.play === true && play === false && props?.toTrackMixpanel(props.videoActiveIndex,'resume')
//     }
//     }
//  },[play])
//  const handleUpdateSeekbar = e => {
//  const percentage = (e.target.currentTime / e.target.duration) * 100;
//  percentage && props.updateSeekbar(percentage, e.target.currentTime, e?.target?.duration);
//  };
//  const thumanilWidth = props?.thumbnail?.replaceAll('upload','upload/w_300');
//  const firstFrame = thumanilWidth?.replaceAll('.jpg','.webp');
const selectVideoPlayer = {
// <img className="h-screen" src={firstFrame}></img>
}
return (
<>
<div ref={rootRef} className="feed_card  border-b-2 border-gray-300 p-8 ">
<div ref={ref} className='flex justify-between'>
   <div className="avatar">
      <div className="flex items-center w-16 h-16 overflow-hidden rounded-full">
         <img alt="profile-pic" className="usrimg" src={userProfilePicUrl} />    
      </div>
   </div>
   <div className="video_section flex flex-col  w-full ml-4">
      <div className="header flex flex-col relative">
         <p className='font-medium text-sm text-gray-600'> <span className="font-semibold text-lg text-black cursor-pointer">{userName} </span>{`${firstName} ${lastName}`}</p>
         <p className="font-semibold text-sm my-2 mb-4 ">
            <MusicBlack/>
            {music_title}
         </p>
         <div className="absolute rounded-md text-sm  px-3 right-4 top-0 border-2 p-1 border-hipired text-hipired">
            Follow
         </div>
      </div>
      <div className="Video flex items-end">
      <div className="desk-feed rounded-md overflow-hidden relative" >
         {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
         <video
         playsInline
         muted={muted}
         autoPlay
         preload="auto"
         webkit-playsinline = "true"
         // onTimeUpdate={handleUpdateSeekbar}
         loop
         onClick={handleVideoPress}
         className="vdo_player_desk bg-gray-200"
         // poster={firstFrame}
         objectfit="contain"
         key={url}
         >
         <source
            src={url}
            type="video/mp4"
            />
         </video>
         <div
         onClick={handleVideoPress}
         className="absolute top-1/2 justify-center w-screen"
         style={{ display: play ? 'flex' : 'none' }}
         >
         <Play />
         {/* <div
         onClick={handleVideoPress}
         className="absolute top-1/2 left-1/2 rounded-full bg-black bg-opacity-75"
         style={{ display: pause ? 'block' : 'none' }}
         >
         <Pause />
      </div>
      */} 
      </div>
      <div onClick={()=>unMute()} className="absolute bottom-4 right-4">
        {muted ? <Mute/> : ''}
      </div>
</div>
<div className="sidebar flex flex-col items-center ml-4">
         <div className="flex flex-col items-center my-4">
            <Like />
            {likesCount}
         </div>
         <div className="flex flex-col items-center my-4">
            <Comment />
         </div>
         <div className="flex flex-col items-center my-4">
            <Share />
            455
         </div>
      </div>
</div>

</div>
</div>
</div>
</>
);
}
export default Video;