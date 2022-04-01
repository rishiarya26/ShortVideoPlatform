/*eslint-disable react/jsx-no-duplicate-props*/
/*eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';
// import VideoFooter from '../videofooter/index';
// import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import Play from '../commons/svgicons/play-desk';
import Pause from '../commons/svgicons/pause-desk';
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
import { trimHash } from '../../utils/string';
import VideoInfo from '../desk-video-info';

function Video({url, player='multi-player-muted',firstFrame,
userProfilePicUrl, userName, music_title, likesCount, muted, unMute,firstName, lastName,
description, updateActiveIndex, index, showVideoDetail}) {
const [playing, setPlaying] = useState(true);
const [clicked, setClicked] = useState(true);
const [play, setPlay] = useState(false);
const [pause, setPause] = useState(true);
const prePlayState = usePreviousValue({play});
const rootRef = useRef(null);
const size = useWindowSize();
const videoHeight = `${size.height}`;
const handleVideoPress = () => {
if (playing) {
  rootRef?.current?.children[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.pause();
setPlaying(false);
setPlay(true);
setPause(false);
setClicked(false);
} else {
  rootRef?.current?.children[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children?.[0]?.play();
setPlaying(true);
setClicked(true);
setPlay(false);
setPause(true);
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
<div ref={rootRef} className="feed_card  border-b border-gray-300">
<div ref={showVideoDetail ? null : ref} className='flex justify-between'>
   <div className="avatar">
      <div className="flex items-center w-16 h-16 overflow-hidden rounded-full">
         <img alt="profile-pic" className="usrimg" src={userProfilePicUrl} />    
      </div>
   </div>
   <div className="video_section flex flex-col  w-full ml-4">
     <VideoInfo
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      description={description}
      music_title={music_title}
     />
      <div className="Video flex items-end">
      <div className="desk-feed rounded-md overflow-hidden relative cursor-pointer" >
         {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        {showVideoDetail ?
        <img src={firstFrame} alt='poster image'/>
        :
        <video
         playsInline
         muted={muted}
         autoPlay
         preload="auto"
         webkit-playsinline = "true"
         // onTimeUpdate={handleUpdateSeekbar}
         loop
         onClick={()=>updateActiveIndex(index)}
         // onClick={handleVideoPress}
         className="vdo_player_desk bg-gray-200"
         poster={firstFrame}
         objectfit="contain"
         key={url}
         >
         <source
            src={url}
            type="video/mp4"
            />
         </video>}
         <div
         onClick={handleVideoPress}
         className="cursor-pointer absolute bottom-4 left-4 opacity-0 justify-start"
         style={{ display: play ? 'flex' : 'none' }}
         >
         <Play />
         </div>
         <div
         onClick={handleVideoPress}
         className=" cursor-pointer absolute bottom-4 left-4 opacity-0 justify-start "
         style={{ display: (pause ? 'flex' : 'none') }}
         >
        <Pause/>
      </div>
   
      <div onClick={()=>unMute()} className="cursor-pointer absolute bottom-4 opacity-0 right-4">
        {muted ? <Mute/> : ''}
      </div>
      <div onClick={()=>unMute()} className=" cursor-pointer absolute bottom-4 opacity-0 right-4">
        {muted ? <Mute/> : ''}
      </div>
</div>
<div className="sidebar flex flex-col items-center ml-4">
         <div className="flex flex-col items-center my-4">
            <Like />
            <span className=' text-xs font-semibold mt-2'>
            {likesCount}
            </span>
         </div>
         <div className="flex flex-col items-center my-4">
            <Comment />
            <span className=' text-xs font-semibold mt-2'>
               30
            </span>
         </div>
         <div className="flex flex-col items-center my-4 relative desk-share">
            <Share />
            <span className=' text-xs font-semibold mt-2'>
               455
            </span>
            <div className='absolute w-36 share-ls hidden cursor-pointer flex-col p-4 bottom-16 left-4 bg-white border'>
               <div className='text-gray-600 p-2'>Embed</div>
               <div className='text-gray-600 p-2'>Copy Link</div>
            </div>
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