
import React, { useState, useRef } from 'react';
import VideoFooter from '../videofooter/index';
import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';

function Video() {
  const [playing, setPlaying] = useState(true);
  const [clicked, setClicked] = useState(true);
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

  return (
    <div
      ref={rootRef}
      className="video_card relative w-full h-full scroll-snap-start"
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
          src="https://media.charmboard.com/images/demo_videos/116281312_735041643986642_3875123162107059152_n.mp4"
          type="video/mp4"
        />
      </video>
      <VideoSidebar
        usrimg="https://tinyurl.com/yuc7zdc2"
        likes={444}
        comment={555}
        share={777}
      />
      <VideoFooter />
    </div>
  );
}

export default Video;
