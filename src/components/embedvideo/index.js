import React, { useState, useRef } from 'react';
import VideoFooter from '../videofooter/index';
import EmbedVideoSidebar from '../embedvideoside/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import { withBasePath } from '../../config';

function Embedvideo(props) {
  const [playing, setPlaying] = useState(false);
  const [clicked, setClicked] = useState(false);

  const rootRef = useRef(null);
  const size = useWindowSize();
  const handleVideoPress = () => {
    if (playing) {
      rootRef.current.children[0].pause();
      setPlaying(false);
      setClicked(false);
    } else {
      rootRef.current.children[0].play();
      setPlaying(true);
      setClicked(true);
    }
  };

  const handlePlay = entry => {
    if (clicked) {
      if (entry.isIntersecting) {
        rootRef.current.children[0].play();
        setPlaying(true);
      } else {
        rootRef.current.children[0].pause();
        setPlaying(false);
      }
    }
  };

  const [ref] = useIntersect({
    callback: handlePlay,
    rootMargin: '50px',
    threshold: [0.30, 0.75]
  });

  const handleUpdateSeekbar = e => {
    const percentage = (e.target.currentTime / e.target.duration) * 100;
    props.updateSeekbar(percentage);
  };

  return (
    <div
      ref={rootRef}
      className="video_card relative w-full h-screen scroll-snap-start bg-black"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        key={props.url}
        onTimeUpdate={handleUpdateSeekbar}
        ref={ref}
        poster={props.poster}
        onClick={handleVideoPress}
        className="vdo_player"
        width={size.width}
        height={size.height}
      >
        <source src={props.url} type="video/mp4" />
      </video>
      <div
        onClick={handleVideoPress}
        className="absolute top-2/5 justify-center w-full"
        style={{ display: playing ? 'none' : 'flex' }}
      >
        <img
          src={withBasePath('images/play.png')}
          className="w-12 h-12"
          alt="playicon"
        />
      </div>
      <div id="cb_tg_d_wrapper">
        <div className="playkit-player" />
      </div>
      <div className="flex flex-col absolute bottom-12 justify-items-end w-full">
          <div className="flex justify-between items-end">
               
      <EmbedVideoSidebar
        socialId={props.socialId}
        profilePic={props.profilePic}
        likes={props.likes}
        comment={props.comments}
        share={777}
      />
      <VideoFooter
        musicTitle={props.musicTitle}
        userName={props.userName}
        musicCoverTitle={props.musicCoverTitle}
        hashTags={props.hashTags}
        canShop={props.canShop}
      />
      </div>
      </div>
    </div>
  );
}

export default Embedvideo;
