
import React, { useState, useRef } from 'react';
import VideoFooter from '../videofooter/index';
import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';

function Embedvideo() {
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

  return (
    <div
      ref={rootRef}
      className="video_card relative w-full h-screen scroll-snap-start"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        onClick={handleVideoPress}
        className="vdo_player"
        width={size.width}
        height={size.height}
      >
        <source
          src="https://media.charmboard.com/images/demo_videos/116335347_384239915879641_9216393402670515633_n.mp4"
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

export default Embedvideo;
