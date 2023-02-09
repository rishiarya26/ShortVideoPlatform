import { useRouter } from 'next/router';
import React, { useEffect,memo, useState } from 'react'
import { ToTrackFbEvents } from '../../../analytics/fb-pixel/events';
import { toTrackFirebase } from '../../../analytics/firebase/events';
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';
import { FULL_EXPERIENCE } from '../../../constants';
import { onStoreRedirect } from '../../../utils/web';
import {appsflyer} from '../../../scripts/appsflyer-smart'
import { getItem } from '../../../utils/cookie';
import { showPwaInstall } from '../../../utils/app';
import RightArrow from '../svgicons/right-arrow';
import UpArrow from '../svgicons/up-arrow';
import useDrawer from '../../../hooks/use-drawer';
import playListModal from '../../playlist-drawer';
import PlaylistWhite from '../svgicons/playlist_white';
import { localStorage } from '../../../utils/storage';

let timer = 0;
const OpenAppStrip = ({pageName, tabName, item , activeVideoId , type='bottom', isPlaylistView=false, data=null, fetchMore, playlistId=null, videoId=null, playlistName=null, callbackForIos=undefined, noShow=false, piD=null, promptLoaded=false}) => {
const [showOpenStrip, setShowOpenStrip] = useState(false);  
const [impressionUsed, setImpressionUsed] = useState(false);
const [intervalInstance, setIntervalInstance] = useState(null);

// useEffect(()=>{
//  console.log("timer*&",Math.round(timer));
// },[timer]) 

const placement = {
  bottom : 'bottom-0',
  aboveBottom : 'bottom-16'
}  
const device = getItem('device-info');
const router = useRouter();
const {show} = useDrawer();
appsflyer && appsflyer();

useEffect(()=>{
  if(device === 'ios'){
     setShowOpenStrip(true);
    return;
    }
   setTimeout(()=>{setShowOpenStrip(true)},3000); 
   const intervalInstanceTemp = setInterval(()=>{
    timer = timer + 0.5;
    timer%5 === 0 && toTrackMixpanel('sessionDuration',{sessionTime : timer});
    timer === 60 && clearInterval(intervalInstance)
   },500)
   setIntervalInstance(intervalInstanceTemp);
 },[]) 

const promptPresent = localStorage.get('PwaPromptPresent');

 useEffect(()=>{
  if(!impressionUsed){
    if(promptPresent === 'true'){
      toTrackMixpanel('pwaInstallStripImpression',{"timer": Math.round(timer)});
      setImpressionUsed(true);
      // clearInterval(intervalInstance);
    }
  }
 },[promptPresent])

if(noShow) return false;
  //   return (
  //   <div className={`${placement?.[type]} z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center`}>
  //     <p className="text-sm">
  //       #HipiStunner is Live. Win Rs 1 Lac
  //     </p>
  //     <div 
  //       onClick={()=>router?.push('/stunner?utm_source=PWA&utm_medium=Bottom_strip&utm_campaign=Stunner_PWAFeed_1sept22')}
  //     //  onClick={()=>{
  //     //     ToTrackFbEvents('appOpenCTA');
  //     //     toTrackFirebase('appOpenCTA');
  //     //     toTrackMixpanel('cta',{pageName:pageName,tabName:tabName, name: 'Open App', type: 'Button'},item);
  //     //     onStoreRedirect({videoId : activeVideoId})}} 
  //        className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
  //         {/* Open */}
  //         Know More
  //     </div>
  //   </div>
  // )

  // appsflyer && appsflyer();
  
  const text = {
    'ios' : FULL_EXPERIENCE,
    'android' :  promptPresent === 'true'  ? "Our app won't take up space on your phone." : <>{showOpenStrip ? FULL_EXPERIENCE : ''}</>
  }

  const button = {
    'ios' : <div onClick={()=>{
      ToTrackFbEvents('appOpenCTA');
      toTrackFirebase('appOpenCTA');
      toTrackMixpanel('cta',{pageName:pageName,tabName:tabName, name: 'Open App', type: 'Button'},item);
      onStoreRedirect({videoId : activeVideoId})}} 
     className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white select-none">
      Open
  </div>,
  'android' : 
  promptPresent === 'true' ? 
  <div onClick={()=>{
     toTrackMixpanel('pwaInstallStripClicked',{pageName,tabName});
     showPwaInstall({pageName:pageName, tabName:tabName})
   }} 
   className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white select-none">
    Install
</div> : 
<>
{
 showOpenStrip ? <div onClick={()=>{
      ToTrackFbEvents('appOpenCTA');
      toTrackFirebase('appOpenCTA');
      toTrackMixpanel('cta',{pageName:pageName,tabName:tabName, name: 'Open App', type: 'Button'},item);
      onStoreRedirect({videoId : activeVideoId})}} 
     className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white select-none">
      Open
  </div> : ''
  }
  </>
  }
  if(isPlaylistView || playlistId){
    return (
      <div 
      className={`${placement?.[type]} z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center`}
      onClick={playlistId ?
        () => {
          toTrackMixpanel("playlistClickedVideo", {pageName, playlistId, playlistName});
          router.push(`/playlist/${playlistId}?videoId=${videoId || activeVideoId}`)
        } :
        ()=>{
          toTrackMixpanel("playlistPopUpLaunch", {name:"playlist",pageName:"Playlist Video Details",playlistName, playlistId: playlistId ?? piD, popUpName: "playlist"})
          show('', playListModal, 'medium', {data,  fetchMore, activeVideoId: videoId || activeVideoId, playlistName, callbackForIos, hideOverLay: true, playlistId:playlistId ?? piD })
        }}
        >
          <div className='flex items-center '>
          <div className='animate-bounce'><PlaylistWhite/> </div>
          <p className="text-sm ml-2">Playlist <span className='font-black'>&#x2022;</span> {playlistName}</p>
          </div>
       
        <div className={`font-semibold text-sm text-white`}>
            {isPlaylistView ? <UpArrow /> : <RightArrow value="#fff" />}
        </div>
      </div>
    )
  }
  
    return (
    <div className={`${placement?.[type]} z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full ${promptPresent === 'true' || showOpenStrip ?  'bg-black bg-opacity-70' : ''}  items-center`}>
      <p className="text-sm">
      {text?.[device]}
      </p>
      {button?.[device]}
    </div>
  )

  /*******************************/  
}


export default memo(OpenAppStrip);
