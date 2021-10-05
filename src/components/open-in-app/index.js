/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-key */
import HipiLogo from '../commons/svgicons/hipi-logo-black';
import { withBasePath } from '../../config';
import { getOS } from '../../utils/device-details';
import useDevice, { devices } from '../../hooks/use-device';
import useDrawer from '../../hooks/use-drawer';
import { getItem } from '../../utils/cookie';
import { useEffect } from 'react';
import { ANDROID_STORE, IOS_STORE, ONE_TAP_DOWNLOAD } from '../../constants';
import { commonEvents } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';

export default function DownloadAppWidget({text, setMuted}) {
  const stores = {
    android: ANDROID_STORE,
    ios: IOS_STORE
  };

  useEffect(()=>{
    toTrackMixpanel('launch');
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
    toTrack?.[type]();
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
  /***************************/

  // const onStoreRedirect =()=>{
  //   toTrackMixpanel('downloadClick');
  //   window?.open(ONE_TAP_DOWNLOAD);
  // }

  const onStoreRedirect =()=>{
     toTrackMixpanel('downloadClick');
  console.log('clicked')
  let deviceInfo = 'android';
 try{ 
   deviceInfo = getOS();
   deviceInfo && (window.open(`${stores[deviceInfo]}`));
   console.log('clicked','window',window.open, deviceInfo,`${stores[deviceInfo]}`)
 }
  catch(e){
    console.log('error in store redirect')
    return `${stores[deviceInfo]}`}
  }


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
        <div onClick={onStoreRedirect} className="flex py-3 items-center">
          <div className="flex w-20v h-13v object-contain justify-center px-4">
              <img src={withBasePath('icons/Hipi-Logo-RGB.png')}></img>
          </div>
          <div className="flex w-3/4 flex-col p-1">
            <p className="font-semibold text-xl ">Hipi -  Open in the App</p>
            <p className="text-xs text-gray-500">More ways to interact with the video. And, to create your own. Only on the App.</p>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="flex justify-center items-center w-1/2 ">
            <p onClick={()=>close()} className="text-base font-semibold text-hipired">Not now</p>
          </div>
        </div>
      </div>
    </>
  );
}
