
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
  const videoHeight = `${size.height}`;
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

  const handleUpdateSeekbar = e => {
    const percentage = (e.target.currentTime / e.target.duration) * 100;
    props.updateSeekbar(percentage);
  };

  return (
    <div
      ref={rootRef}
      className="video_card relative w-full bg-black"
      style={{ height: `${videoHeight}px` }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        onTimeUpdate={handleUpdateSeekbar}
        loop
        ref={ref}
        onClick={handleVideoPress}
        className="vdo_player"
        width={size.width}
        height={videoHeight}
        poster={props.thumbnail}
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
        videoOwnersId={props.videoOwnersId}
        socialId={props.socialId}
        profilePic={props.profilePic}
        likes={props.likes}
        comment={props.comments}
        share={777}
        type="feed"
      />

      <VideoFooter
        musicTitle={props.musicTitle}
        userName={props.userName}
        musicCoverTitle={props.musicCoverTitle}
        type="feed"
        hashTags={props.hashTags}
      />

    </div>
  );
}

export default Video;
