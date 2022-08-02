import { Analytics, Constants } from '@convivainc/conviva-js-coresdk'
import { TEST_CUSTOMER_KEY, TOUCHSTONE_SERVICE_URL } from '../../constants';
import HTML5Module from '@convivainc/conviva-js-html5';
import { localStorage } from '../../utils/storage';
import { getItem } from '../../utils/cookie';


export let videoAnalytics = null;
let convivaConfigs = {};


export const initConvivaa = async() => {
  //debugger
  try{
    if(process.env.APP_ENV === 'development'){
      convivaConfigs[Constants.GATEWAY_URL] = TOUCHSTONE_SERVICE_URL;
      convivaConfigs[Constants.LOG_LEVEL] = Constants.LogLevel.DEBUG;
    }else if(process.env.APP_ENV === 'production'){
      /** prod pulse URL */
      convivaConfigs[Conviva.Constants.GATEWAY_URL] = TOUCHSTONE_SERVICE_URL;
      convivaConfigs[Conviva.Constants.LOG_LEVEL] = Conviva.Constants.LogLevel.DEBUG;
    }
    Analytics.init(TEST_CUSTOMER_KEY, null, convivaConfigs);
    Analytics.setDeviceMetadata(getDeviceMetadata());
    videoAnalyticsRef();

  }catch(e){
    console.log(e?.message,"error");
  }
}

export const getDeviceMetadata = () =>  {
  let deviceMetadata = {};
  deviceMetadata[Constants.DeviceMetadata.CATEGORY] = Constants.DeviceCategory.WEB;
  return deviceMetadata;
};

export const setContentInfo = (content ={}) =>{
  console.log(localStorage.get('user-id'), 'localstroage');
  let contentMetadata = {};
  contentMetadata[Constants.ASSET_NAME] = content?.id ?? '';
  contentMetadata[Constants.STREAM_URL] = content?.url ?? '';
  contentMetadata[Constants.IS_LIVE] = Constants.StreamType.VOD;
  contentMetadata[Constants.PLAYER_NAME] = 'WEB HTML5';
  contentMetadata[Constants.VIEWER_ID] = getItem('guest-token') ?? localStorage('user-id') ?? '';
  return contentMetadata;
}

export const videoAnalyticsRef = () => {
  videoAnalytics = Analytics?.buildVideoAnalytics();
}

export const reportPlaybackRequested = (content = {}) => {
  let options = {};
  options[Constants.CONVIVA_MODULE] = HTML5Module;
  let contentInfo = setContentInfo(content);
  try{
    videoAnalytics?.setPlayer(content.ref, options);
    videoAnalytics?.reportPlaybackRequested(contentInfo);
  }catch(e){
    initConvivaa()
    videoAnalytics?.setPlayer(content.ref, options);
    videoAnalytics?.reportPlaybackRequested(contentInfo);
  }
}

export const reportPlaybackEnded = () => videoAnalytics.reportPlaybackEnded();

export const analyticsCleanup = () => {
  console.log("cleanup happen");
  videoAnalytics?.release();
  Analytics.release();
}





