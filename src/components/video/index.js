import React, { useRef, useState, useEffect } from 'react';
import VideoFooter from '../videofooter/index';
import VideoSidebar from '../videosidebar/index';

function Video(props) {
  const [playing, setPlaying] = useState(true);
  const [clicked, setClicked] = useState(true);
  const videoRef = useRef(null);

  const handleVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
      setClicked(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
      setClicked(true);
    }
  };

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: [0.25, 0.75]
    };

    const handlePlay = (entries, observer) => {
      entries.forEach(entry => {
        if (clicked) {
          if (entry.isIntersecting) {
            videoRef.current.play();
            setPlaying(true);
            console.log(playing);
          } else {
            videoRef.current.pause();
            setPlaying(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handlePlay, options);

    observer.observe(videoRef.current);
  });

  return (

    <div className="video_card relative w-full h-full scroll-snap-start ">

      <video loop ref={videoRef} onClick={handleVideoPress} className="vdo_player" width={412} height={731}>
        <source src="https://media.charmboard.com/images/demo_videos/116281312_735041643986642_3875123162107059152_n.mp4" type="video/mp4" />
      </video>
      <VideoSidebar />
      <VideoFooter />
    </div>
  );
}

export default Video;
