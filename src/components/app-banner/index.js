/*eslint-disable @next/next/no-img-element */
import { getItem } from '../../utils/cookie';
import { useEffect } from 'react';
import { ONE_TAP_DOWNLOAD } from '../../constants';
import { commonEvents } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';
import { getOneLink } from '../../sources/social';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';
import { playerEvents } from '../../analytics/conviva/events.js';
import { onStoreRedirect } from '../../utils/web';

function AppBanner({notNowClick, videoId}) {


    useEffect(()=>{
      console.log("callinggggg")
        toTrackMixpanel('launch');
        // fbq.event('App Download Popup')
        //trackEvent('App_Download_Popup');
        playerEvents('waitStarted');
        ToTrackFbEvents('appDownloadPopup')
        toTrackFirebase('appDownloadPopup')

        return () =>{
          playerEvents('waitEnded');
        }
        
      },[])

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
          },
          'notNow' : () => {
            mixpanelEvents['Popup Name'] = 'Download App',
            mixpanelEvents['Element'] = 'Not Now',
            mixpanelEvents['Button Type'] = 'Link',
            track('Popup CTAs', mixpanelEvents)
          }
        }
    
        const mixpanelEvents = commonEvents();
        type && toTrack?.[type] && toTrack?.[type]();
      }

    // const onStoreRedirect = async ()=>{
    //     toTrackMixpanel('downloadClick');
    //     ToTrackFbEvents('appDownloadCTA')
    //     toTrackFirebase('appDownloadCTA')
    //     // fbq.event('App Download CTA');
    //     // trackEvent('App_Download_CTA')
    //     let link = ONE_TAP_DOWNLOAD;
    //     const device = getItem('device-info');
    //     console.log(device)
    //   try{  
    //     if(videoId){ 
    //       const resp = await getOneLink({videoId : videoId});
    //       link = resp?.data;
    //       console.log("one link resp",resp);
    //     }
    //   //  if(device === 'android' && videoId){ 
    //   //     const resp = await getOneLink({videoId : videoId});
    //   //     link = resp?.data;
    //   //     console.log("one link resp",resp);
    //   //   }
    //    }
    //     catch(e){
    //     }
    //     console.log("final onelink",link);
    //     window?.open(link);
    //  }


  return (
    <>
    <div className="visible
    bg-black z-20 opacity-70 fixed inset-0 overflow-y-auto w-full h-full"></div>
    <div className="
    w-3/4
    undefined
    block 
    z-30 fixed rounded-lg p-4 pt-8 bg-white 
    transition-all duration-300
    top-2/4 left-2/4
    transform-gpu origin-bottom -translate-y-2/4 -translate-x-2/4 translate_center 
    motion-reduce:transition-none motion-reduce:transform-none
    ">
    <div className="dialog-header flex w-full justify-between relative" >
        <div className=" w-16 h-16 absolute -top-16 absolute_cntr rounded-full overflow-hidden bg-white p-2" ><img className="rounded-full overflow-hidden" src="https://www.hipi.co.in/icons/icon-512x512.png"/></div>
        <div className=" flex justify-center text-xl font-semibold" data-testid="dialog-title" ></div>
    </div>
    <div data-testid="dialog-content w-full" >
        <div className="flex flex-col w-full items-center text-center" >
            <div  className="flex flex-col items-center" >
                <h1 className="text-lg font-bold px-2 text-gray-800">Get the full experience on the app</h1>
                <p className="text-center text-gray-400 mt-2 text-xs text-gray-700">Follow your favourite accounts,explore new trends and make your own videos</p>
            </div>
            <div className="flex mt-2 flex-col w-full">
                <div onClick={()=>{
                     toTrackMixpanel('downloadClick');
                     ToTrackFbEvents('appDownloadCTA')
                     toTrackFirebase('appDownloadCTA')
                     onStoreRedirect({videoId : videoId, afChannel: 'pop_up'})
                }}  className="flex bg-hipired py-3 mx-2 px-4 my-2 text-white"  >
                    <div className="flex justify-center items-center text-sm md:text-base w-full font-semibold" >
                        <p>Open Hipi</p>
                    </div>
                </div>
            </div>
            <div onClick={()=>
                {toTrackMixpanel('notNow')
                playerEvents('waitEnded')
                 notNowClick()}} className="my-2 text-xs md:text-base text-gray-800" >
                <p>Not now</p>
            </div>
        </div>
    </div>
</div>
</>
  );
  }
export default AppBanner;