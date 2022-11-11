/* eslint-disable react/no-unknown-property */
/*eslint-disable  @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { reportPlaybackEnded, reportPlaybackRequested, videoAnalytics } from "../../analytics/conviva";
import { withBasePath } from "../../config";
import useWindowSize from "../../hooks/use-window-size";
import CircularProgress from '../commons/circular-loader'
import SnackCenter from "../commons/snack-bar-center";
import EmbedSeekbar from "../emded-seekbar";

const Video = ({url, firstFrame, comp, videoId, convivaItemInfo, muted=false, checkSound, nosound, videoSound})=>{
    const [seekedPercentage, setSeekedPercentage] = useState(0);
    const [initialPlayStarted, setInitialPlayStarted] = useState(false);
    const [playing, setPlaying] = useState(true);
    // const [clicked, setClicked] = useState(false);
    const [play, setPlay] = useState();

    const rootRef = useRef(null);
    const size = useWindowSize();

    useEffect(()=>{
      let currentRef = rootRef?.current?.children?.[0];
      if(videoAnalytics !== null) reportPlaybackEnded()
      try{
        reportPlaybackRequested({ ref: currentRef, convivaItemInfo:convivaItemInfo });
      }catch(e){
        console.error(e,"setplayer error");
      }
        checkSound && checkSound();
    },[url])

    

    useEffect(()=>{
        setSeekedPercentage(0);
        setPlay(true);
        if(comp && comp !=='deskSingleVideo'){
          setPlay(true);
          setPlaying(true);
        }else{
          setPlay(false);
          setPlaying(false);
        }
        setInitialPlayStarted(false)
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
      className={`video_card relative ${comp==='deskSingleVideo' ? 'h-80v' : 'h-screen'} overflow-hidden`}
    >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay={comp==='deskSingleVideo' ? false : true}
          onContextMenu={(e)=>{
            e.preventDefault();
            return false}}
         controlsList="nodownload"
          playsInline
          key={url}
          onTimeUpdate={handleUpdateSeekbar}
          // ref={ref}
          loop
          poster={firstFrame}
          onClick={handleVideoPress}
          className="vdo_player_desk_detail"
          width={size.width}
          height={size.height}
          objectfit="cover"
          muted={muted}
        >
          <source src={url} type="video/mp4" />
        </video>
        {!videoSound && initialPlayStarted ? <SnackCenter showSnackbar={nosound}/> : ''}
        {comp!=='deskSingleVideo' && seekedPercentage === 0 && <div
                className="absolute top-1/2 justify-center w-full flex"
                style={{ display: 'flex text-white' }}
              >
             <CircularProgress/>
              </div>
              }
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