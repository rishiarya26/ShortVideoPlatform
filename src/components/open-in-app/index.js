/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-key */
import { withBasePath } from '../../config';
import useDrawer from '../../hooks/use-drawer';
import { getItem } from '../../utils/cookie';
import { useEffect } from 'react';
import { ONE_TAP_DOWNLOAD } from '../../constants';
import { commonEvents } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';
import { getOneLink } from '../../sources/social';
import Close from '../commons/svgicons/close-black';
import { playerEvents } from '../../analytics/conviva/events';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';

export default function DownloadAppWidget({videoId}) {
  // const stores = {
  //   android: ANDROID_STORE,
  //   ios: IOS_STORE
  // };

  useEffect(()=>{
    toTrackMixpanel('launch');
    playerEvents('waitStarted');
    // fbq.event('App Download Popup')
    // trackEvent('App_Download_Popup');
    toTrackFirebase('appDownloadPopup');
    ToTrackFbEvents('appDownloadPopup');
    ()=> {
      console.log('unmounted');
      playerEvents('waitEnded');
    }
  },[])

  const {close} = useDrawer();

  /******* Mixpanel *********/
  const toTrackMixpanel = (type) =>{
    const toTrack ={
      'launch': () => {
        mixpanelEvents['Popup Name'] = 'Download App'
        track('Popup Launch', mixpanelEvents)
      },
      'downloadClick' : () => {
        mixpanelEvents['Popup Name'] = 'Download App',
        mixpanelEvents['Element'] = 'Download App',
        mixpanelEvents['Button Type'] = 'Link',
        track('Popup CTAs', mixpanelEvents)
      }
    }

    const mixpanelEvents = commonEvents();
    type && toTrack?.[type] && toTrack?.[type]();
  }
  /***************************/

  // const onStoreRedirect =()=>{
  //   toTrackMixpanel('downloadClick');
  //   window?.open(ONE_TAP_DOWNLOAD);
  // }
  /***************************/

  // const onStoreRedirect =()=>{
  //   toTrackMixpanel('downloadClick');
  //   window?.open(ONE_TAP_DOWNLOAD);
  // }

// 
  const onStoreRedirect = async ()=>{
    toTrackMixpanel('downloadClick');
    ToTrackFbEvents('appDownloadCTA');
    toTrackFirebase('appDownloadCTA');
    //fbq.event('App Download CTA');
    // trackEvent('App_Download_CTA')
    let link = ONE_TAP_DOWNLOAD;
    const device = getItem('device-info');
    console.log(device)
  try{  
    if(videoId){ 
      const resp = await getOneLink({videoId : videoId});
      link = resp?.data;
      console.log("one link resp",resp);
    }
  //  if(device === 'android' && videoId){ 
  //     const resp = await getOneLink({videoId : videoId});
  //     link = resp?.data;
  //     console.log("one link resp",resp);
  //   }
   }
    catch(e){
    }
    console.log("final onelink",link);
    window?.open(link);
 }
  /***************************/

  // const onStoreRedirect =()=>{
  //   toTrackMixpanel('downloadClick');
  //   window?.open(ONE_TAP_DOWNLOAD);
  // }

//   const onStoreRedirect =()=>{
//      toTrackMixpanel('downloadClick');
//   console.log('clicked')
//   let deviceInfo = 'android';
//  try{ 
//    deviceInfo = getOS();
//    deviceInfo && (window.open(`${stores[deviceInfo]}`));
//    console.log('clicked','window',window.open, deviceInfo,`${stores[deviceInfo]}`)
//  }
//   catch(e){
//     console.log('error in store redirect')
//     return `${stores[deviceInfo]}`}
//   }


  // const value = useDevice(devices, [
  //   <div className="flex justify-center">
  //     <img src={withBasePath(storeImages.android)} className="mr-2" alt="playicon" />
  //     <img src={withBasePath(storeImages.ios)} className="" alt="playicon" />
  //   </div>,
  //   <img src={withBasePath(storeImages[`${getOS()}`])} className="" alt="playicon" />]);

// const handleWeb=()=>{
//   setMuted(true);
//   close();
// }

  return (
    <>
      <div className=" flex flex-col items-center w-full ">
      <div onClick={close} className='flex w-full justify-end p-2'>
      <Close/>
   </div>
        <div onClick={onStoreRedirect} className="flex py-3 items-center">
          <div className="flex w-18v h-11v object-contain justify-center px-4">
              <img src={withBasePath('icons/Hipi-Logo-RGB.png')}></img>
          </div>
          <div className="flex w-3/4 flex-col p-1">
            <p className="font-semibold text-lg text-gray-600">Hipi -  Open in the App</p>
            <p className="text-xs text-gray-400">More ways to interact with the video. And, to create your own. Only on the App.</p>
          </div>
        </div>
        <button onClick={onStoreRedirect} className="font-semibold text-sm border border-hipired rounded-sm py-2 px-14 my-4 bg-hipired text-white rounded-sm">Open the Hipi app</button>
        <div className="flex w-full justify-center items-center">
          <div className="flex justify-center items-center w-1/2 ">
            <p onClick={()=>close()} className="text-sm font-semibold text-gray-500">Not now</p>
          </div>
        </div>
      </div>
    </>
  );
}