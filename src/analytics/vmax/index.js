import { detectGeoLocationByZee } from "../../sources/geo-location";
import { getItem } from "../../utils/cookie";
import { localStorage } from "../../utils/storage";

let adView;



export const initVmax = () => {
  if (
    typeof window !== 'undefined' &&
    window.VMAXSDK &&
    window.VMAXSDK.Events
  ) {
    window.VMAXSDK.App.setSource("hipi.co.in");
  }
}

export const initAdView = async() => {
  if (
    typeof window !== 'undefined' &&
    window.VMAXSDK &&
    window.VMAXSDK.Events
  ) {
    let respGeoInfo = {};
    let geoLocationInfo = {};
    try{
      respGeoInfo = await detectGeoLocationByZee();
      geoLocationInfo = await respGeoInfo?.data;
    }catch(err){
      console.log("getting error while getting geoInfo",err);
    }
    const guestId = getItem('guest-token');
    const loggedInId = localStorage?.get('user-id') || null;
    const loggedInUserDetails = localStorage?.get('user-details') || null;

    let customData = {};
    customData['userId'] = loggedInId ? loggedInId : guestId;
    customData["userHandle"] = loggedInUserDetails?.userHandle ? loggedInUserDetails?.userHandle : 'NA'
    customData["gender"] =  loggedInUserDetails?.gender ? loggedInUserDetails?.gender : 'NA';
    customData["city"] = geoLocationInfo?.city || ''
    customData["state"] = geoLocationInfo?.state || ''
    customData["stateCode"] = geoLocationInfo?.state_code || ''

    adView = null;
    adView = new VMAXSDK.CreateVmaxAdView();
    adView.setAdspotKey('ffb8745f').setCustomData({...customData});
    console.log("vmax setting custom data: " + JSON.stringify(customData), adView);
    return "success";
  }
}

export const cacheAd = async () => {
  try {
    if(adView){
      let cacheAdResponse = await adView?.cacheAd();
      let adData = await adView?.getVmaxAd();
      let ctaInfo = adData?.getAdAssets();
      let ctaPath = adData?.getClickThrough();
      let ctaLinkUrl = adData?.getLinkurl();
      ctaInfo = {...ctaInfo, ctaPath, ctaLinkUrl}
      return { adData, ctaInfo, adView };
    }
  } catch (err) {
    console.error(`Error getting VmaxAd: ${err}`);
    initVmax()
    return {};
    
  }
};

// export const showAd = async () => {
//   try {
//     const showAdResponse = await adView.showAd({
//       container: '#adView',
//     });
//     console.log(showAdResponse);
//   } catch (err) {
//     console.error(err)
//   }
// };

// export const destroyAd = async () => {
//   try {
//     const adDestroy = await adView.destroy();
//   } catch (err) {
//     console.error(err);
//   }
// };

export const vmaxTrackerEvents = (url, type) => {
  let adArr = localStorage.get('vmaxEvents');
  if(!adArr?.includes(type)) {
    let arr = localStorage.get('vmaxEvents');
    arr.push(type);
    localStorage.set("vmaxEvents",arr);

    let track = {
      "impression":()=> url?.onImpression(),
      "videoAdStarted":()=> url?.onStart(),
      "videoAdFirstQuartile":()=> url?.onFirstQuartile(),
      "videoAdSecondQuartile":()=> url?.onMidpoint(),
      "videoAdThirdQuartile":()=> url?.onThirdQuartile(),
      "videoAdEnd":()=> url?.onComplete(),
    }
    
    track && track[type] && track[type]?.()
  }
  
}
