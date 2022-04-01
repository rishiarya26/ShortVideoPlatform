/*eslint-disable  @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "../../config";
import useWindowSize from "../../hooks/use-window-size";
import CircularProgress from '../commons/circular-loader'
import EmbedSeekbar from "../emded-seekbar";

const Video = ({url, firstFrame})=>{
    const [seekedPercentage, setSeekedPercentage] = useState(0);
    const [initialPlayStarted, setInitialPlayStarted] = useState(false);
    const [playing, setPlaying] = useState(true);
    // const [clicked, setClicked] = useState(false);
    const [play, setPlay] = useState(true);

    const rootRef = useRef(null);
    const size = useWindowSize();

    useEffect(()=>{
        setSeekedPercentage(0);
        setPlay(true);
    },[url])

    const handleUpdateSeekbar = e => {
        const percentage = (e.target.currentTime / e.target.duration) * 100;
        setSeekedPercentage(percentage);
        // const duration = e?.target?.duration;
        // const currentTime = e?.target?.currentTime;
        // settDuration(duration);
        // setWatchedTime(currentTime);
    
        if(percentage > 0){
          setInitialPlayStarted(true);
         }
    
         /********** Mixpanel ***********/
        //  if(currentTime >= duration-0.2){
        //   toTrackMixpanel('watchTime',{ watchTime : 'Complete', duration : duration, durationWatchTime: duration})
        //   toTrackMixpanel('replay',{  duration : duration, durationWatchTime: duration})
        //    /*** view events ***/
        //    viewEventsCall(props?.id, 'completed');
        //    viewEventsCall(props?.id, 'user_video_start');
        // }
        /******************************/
      };

      const handleVideoPress = () => {
          console.log("playing :",playing)
        if (playing) {
          rootRef?.current?.children?.[0]?.pause &&  rootRef?.current?.children?.[0]?.pause();
          setPlaying(false);
          // setClicked(false);
          setPlay(false);
        } else {
            rootRef?.current?.children?.[0]?.play &&  rootRef?.current?.children?.[0]?.play();          setPlaying(true);
          // setClicked(true);
          setPlay(true);
        }
      };

    return(
    <div
      ref={rootRef}
      className="video_card relative scroll-snap-start bg-black h-screen overflow-hidden"
    >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay
          playsInline
          key={url}
          onTimeUpdate={handleUpdateSeekbar}
          // ref={ref}
          loop
          poster={firstFrame}
          onClick={handleVideoPress}
          className="vdo_player"
          width={size.width}
          height={size.height}
          objectfit="cover"
        >
          <source src={url} type="video/mp4" />
        </video>
        {<div
                className="absolute top-1/2 justify-center w-full flex"
                style={{ display: (seekedPercentage > 0) ? 'none' : 'flex text-white' }}
              >
             <CircularProgress/>
              </div>}
        <EmbedSeekbar type='desk' seekedPercentage={seekedPercentage} />

        {
        !play && 
        <div
          onClick={handleVideoPress}
          className="absolute top-2/5 justify-center w-full"
          style={{ display: 'flex' }}
        >
          <img
            src={withBasePath('images/play.png')}
            className="w-12 h-12"
            alt="playicon"
          />
        </div>}
     </div>
    )
}

export default Video;