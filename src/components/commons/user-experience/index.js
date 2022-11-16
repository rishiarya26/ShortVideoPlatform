import { useRouter } from 'next/router';
import React from 'react'
import { ToTrackFbEvents } from '../../../analytics/fb-pixel/events';
import { toTrackFirebase } from '../../../analytics/firebase/events';
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';
import { FULL_EXPERIENCE } from '../../../constants';
import { onStoreRedirect } from '../../../utils/web';
import {appsflyer} from '../../../scripts/appsflyer-smart'
import RightArrow from '../svgicons/right-arrow';
import useDrawer from '../../../hooks/use-drawer';
import detectDeviceModal from '../../playlist-drawer';

export default function OpenAppStrip({pageName, tabName, item , activeVideoId , type='bottom', isPlaylistView, data, fetchMore}) {
const placement = {
  bottom : 'bottom-0',
  aboveBottom : 'bottom-16'
}  
const router = useRouter();
const {show} = useDrawer();
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

  if(isPlaylistView){
    return (
      <div className={`${placement?.[type]} z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center`}>
        <p className="text-sm">
          Playlist
        </p>
        <div onClick={()=>show('', detectDeviceModal, 'extraSmall', {data,  fetchMore})} 
           className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
            <RightArrow />
        </div>
      </div>
    )
  }

  return (
    <div className={`${placement?.[type]} z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center`}>
      <p className="text-sm">
      {FULL_EXPERIENCE}
      </p>
      <div onClick={()=>{
          ToTrackFbEvents('appOpenCTA');
          toTrackFirebase('appOpenCTA');
          toTrackMixpanel('cta',{pageName:pageName,tabName:tabName, name: 'Open App', type: 'Button'},item);
          onStoreRedirect({videoId : activeVideoId})}} 
         className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
          Open
      </div>
    </div>
  )

  /*******************************/  
}
