import React from 'react'
import * as fbq from '../../../analytics/fb-pixel'
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';
import { trackEvent } from '../../../analytics/firebase';
import { ONE_TAP_DOWNLOAD, FULL_EXPERIENCE } from '../../../constants';
import { getOneLink } from '../../../sources/social';


export default function UserExperience({pageName, tabName, items, videoActiveIndex, activeVideoId}) {

  const onStoreRedirect = async ()=>{
    fbq.event('App Open CTA')
    toTrackMixpanel('cta',{pageName:pageName,tabName:tabName},{ name: 'Open App', type: 'Button'},items?.[videoActiveIndex]);
    trackEvent('App_Open_CTA')
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
}
