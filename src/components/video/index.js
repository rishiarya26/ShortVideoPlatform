/*eslint-disable react/jsx-no-duplicate-props*/
import React, { useState, useRef, useEffect } from 'react';
import VideoFooter from '../videofooter/index';
import VideoSidebar from '../videosidebar/index';
import useWindowSize from '../../hooks/use-window-size';
import useIntersect from '../../hooks/use-intersect';
import Play from '../commons/svgicons/play';
import ProductWidget from '../product-widget';
import ProductCards from '../product-cards';
// import { rptPlaybackEnd, rptPlaybackStart, setPlayer } from '../../analytics/conviva/analytics';
// import Pause from '../commons/svgicons/pause';

function Video(props) {
  const [playing, setPlaying] = useState(true);
  const [clicked, setClicked] = useState(true);
  const [play, setPlay] = useState(false);
  // const [pause, setPause] = useState(false);
  const rootRef = useRef(null);
  const size = useWindowSize();
  const videoHeight = `${size.height}`;
  const handleVideoPress = () => {
    if (playing) {
      rootRef.current.children[0].pause();
      setPlaying(false);
      setPlay(true);
      // setPause(false);
      setClicked(false);
      setTimeout(() => {
        setPlay(false);
      }, 2000);
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

  useEffect(() => {

    // rootRef.current.children[0].autoPlay = true;
    // console.log(rootRef.current.children[0].muted,"muted")
    // props.setMuted(false);
    // rootRef.current.children[0].muted = false;
    // rootRef?.current?.children[0]?.load();
  }, [])

  const handleUpdateSeekbar = e => {
    const percentage = (e.target.currentTime / e.target.duration) * 100;
    percentage && props.updateSeekbar(percentage);
  };

  // props.initialPlayButton === false && rootRef.current.children[0].play()

  // const unMute =(e)=>{
  //   rootRef.current.children[0].muted = false;
  //   console.log(rootRef.current.children[0].muted,"muted")
  //   props.setMuted(false);
  // }

  // let hasPlayed = false;
  // function handleFirstPlay(event) {
  // if(hasPlayed === false) {
  //   hasPlayed = true;

  //   let vid = event.target;

  //   vid.onplay = null;
    // props.initialPlayButton === false && rootRef.current.children[0].play()

    // Start whatever you need to do after first playback has started
//   }
// }

  return (
    <div
      ref={rootRef}
      className="video_card relative w-screen bg-black overflow-hidden rounded-sm"
      style={{ height: `${videoHeight}px` }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        muted
        // muted
        // webkit-playsinline = "true"
        // onLoadCapture ={resetCurrentTime}
        playsInline
        onTimeUpdate={handleUpdateSeekbar}
        loop
        ref={ref}
        onClick={handleVideoPress}
        className="vdo_player"
        // width={size.width}
        // height={videoHeight}
        poster={props.thumbnail}
        objectfit="cover"
        key={props.url}
      >
        <source
          src={props.url}
          type="video/mp4"
        />
      </video>
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
      />

      {/* TO-DO  comdition acc to comp */}
      {props.canShop === 'success' && (!props.profileFeed
        ? (!props.saveLook
          && (
            <ProductWidget
              shopCards={props.shopCards}
              handleSaveLook={props.handleSaveLook}
              videoId={props.activeVideoId}
            />
          )
        ) : (
          <ProductCards
            shopCards={props.shopCards}
            handleSaveLook={props.handleSaveLook}
            videoId={props.activeVideoId}
            profileFeed={props.profileFeed}
            comp="profile"
          />
        )
      )}

    </div>
  );
}

export default Video;
