/*eslint-disable @next/next/no-img-element*/
import React, { useState, useRef } from 'react';
import VideoFooter from '../videofooter/index';
import EmbedVideoSidebar from '../embed-video-sidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import { withBasePath } from '../../config';
import ProductCards from '../product-cards';
import EmbedSeekbar from '../emded-seekbar';
import { getItem } from '../../utils/cookie';

function Embedvideo(props) {
  const [playing, setPlaying] = useState(false);
  // const [clicked, setClicked] = useState(false);
  // const [play, setPlay] = useState(false)

  const stores = {
    android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
    ios: 'https://apps.apple.com/in/app/zee5-shows-live-tv-movies/id743691886'
  };

  const onStoreRedirect =()=>{
    let deviceInfo = 'android';
   try{ 
     deviceInfo = getItem('device-info')
     deviceInfo && (window.open(`${stores[deviceInfo]}`));
   }
    catch(e){
      return `${stores[deviceInfo]}`}
    }

  const rootRef = useRef(null);
  const size = useWindowSize();
  const handleVideoPress = () => {
    if (playing) {
      rootRef.current.children[0].pause();
      setPlaying(false);
      // setClicked(false);
      // setPlay(false)
    } else {
      rootRef.current.children[0].play();
      setPlaying(true);
      // setClicked(true);
      // setPlay(true)
    }
  };

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
  };

  return (
    <div className="flex flex-col border-2 border-gray-200">
    <div
      ref={rootRef}
      className="video_card relative w-full  scroll-snap-start bg-black"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        playsInline
        loop
        key={props.url}
        onTimeUpdate={handleUpdateSeekbar}
        // ref={ref}
        poster={props.poster}
        onClick={handleVideoPress}
        className="vdo_player"
        width={size.width}
        height={size.height}
      >
        <source src={props.url} type="video/mp4" />
      </video>
      
      <EmbedSeekbar type='embed' seekedPercentage={props.seekedPercentage} />
    {!playing &&  <div
        onClick={handleVideoPress}
        className="absolute top-2/5 justify-center w-full"
        style={{ display: playing ? 'none' : 'flex' }}
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

      <EmbedVideoSidebar
        socialId={props.socialId}
        profilePic={props.profilePic}
        likes={props.likes}
        comment={props.comments}
        share={777}
        type="embed"
      />
      
      {props.canShop === 'success'
         && ( 
           <ProductCards
             shopCards={props.shopCards}
             videoId={props.videoId}
             comp="embed"
           />
         )}
    </div>
    <div className="flex relative flex-col p-3">
    <VideoFooter
        musicTitle={props.musicTitle}
        userName={`${props.userName}`}
        musicCoverTitle={props.musicCoverTitle}
        hashTags={props.hashTags}
        canShop={props.canShop}
        comp="embed"
      />
      <div className="flex w-full py-4 justify-center border-t-2 border-gray-200 mt-2">
            <button onClick={onStoreRedirect} className="bg-hipired text-white px-4 py-2 font-semibold">View more on Hipi</button>
      </div>
    </div>
    </div>
  );
}

export default Embedvideo;
