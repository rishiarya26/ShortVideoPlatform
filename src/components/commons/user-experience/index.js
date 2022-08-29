import { useRouter } from 'next/router';
import React from 'react'
import { ToTrackFbEvents } from '../../../analytics/fb-pixel/events';
import { toTrackFirebase } from '../../../analytics/firebase/events';
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';

import { ONE_TAP_DOWNLOAD, FULL_EXPERIENCE } from '../../../constants';
import { getOneLink } from '../../../sources/social';

export default function UserExperience({pageName, tabName, items, videoActiveIndex, activeVideoId}) {
  // const router = useRouter();
  //  return (
  //   <div className="bottom-16 z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center">
  //     <p className="text-sm">
  //      #HipiStunner is Live. Win Rs 1 Lac
  //     </p>
  //     <div onClick={()=>router && router.push('/stunner')} className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
  //         Know More
  //     </div>
  //   </div>
  // )
 /*** for Open Install CTA with smart script Appsflyer ***/ 

  const onStoreRedirect = async ()=>{
    // fbq.event('App Open CTA')
    // trackEvent('App_Open_CTA')
    ToTrackFbEvents('appOpenCTA');
    toTrackFirebase('appOpenCTA');
    //toTrackMixpanel('cta',{pageName:pageName,tabName:tabName},{ name: 'Open App', type: 'Button'},items?.[videoActiveIndex]);
    
    // fbq.event('App Open CTA')
    toTrackMixpanel('cta',{pageName:pageName,tabName:tabName, name: 'Open App', type: 'Button'},items?.[videoActiveIndex]);
    // trackEvent('App_Open_CTA')
    let link = ONE_TAP_DOWNLOAD;
    try{  
      if(activeVideoId){ 
        try{ const resp = await getOneLink({videoId : activeVideoId});
        link = resp?.data;
        console.log("one link resp",resp);
        }
        catch(e){
          console.log('error android onelink',e)
        }
      }
    }
    catch(e){
    }
    window?.open(link);
  }

  return (
    <div className="bottom-16 z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center">
      <p className="text-sm">
      {FULL_EXPERIENCE}
      </p>
      <div onClick={onStoreRedirect} className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
          Open
      </div>
    </div>
  )

  /*******************************/  
}
