
import React, { useState, useRef } from 'react';
import VideoFooter from '../videofooter/index';
import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import Play from '../commons/svgicons/play';
import Pause from '../commons/svgicons/pause';

function Video(props) {
  const [playing, setPlaying] = useState(true);
  const [clicked, setClicked] = useState(true);
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(false);
  const rootRef = useRef(null);
  const size = useWindowSize();

console.log(rootRef.currentTime);


  const handleVideoPress = () => {
    if (playing) {
      rootRef.current.children[0].pause();
      setPlaying(false);
      setPlay(true);
      setPause(false);
      setClicked(false);
      setTimeout(() => {
        setPlay(false);
      }, 2000);
    } else {
      rootRef.current.children[0].play();
      setPlaying(true);
      setClicked(true);
      setPause(true);
      setPlay(false);
      setTimeout(() => {
        setPause(false);
      }, 2000);
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

  return (
    <div
      ref={rootRef}
      className="video_card relative w-full h-full scroll-snap-start bg-black"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        loop
        ref={ref}
        onClick={handleVideoPress}
        className="vdo_player"
        width={size.width}
        height={size.height}
      >
        <source
          src={props.url}
          type="video/mp4"
        />
      </video>
      <div
        onClick={handleVideoPress}
        className="absolute top-1/2 left-1/2 rounded-full bg-black bg-opacity-75"
        style={{ display: play ? 'block' : 'none' }}
      >
        <Play />
      </div>
      <div
        onClick={handleVideoPress}
        className="absolute top-1/2 left-1/2 rounded-full bg-black bg-opacity-75"
        style={{ display: pause ? 'block' : 'none' }}
      >
        <Pause />
      </div>
      <VideoSidebar
        profilePic={props.profilePic}
        likes={props.likes}
        comment={props.comments}
        share={777}
      />
      <VideoFooter
        musicTitle={props.musicTitle}
        userName={props.userName}
        musicCoverTitle={props.musicCoverTitle}
      />
    </div>
  );
}

export default Video;
