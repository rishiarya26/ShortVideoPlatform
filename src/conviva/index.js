// import { Analytics, Constants } from '@convivainc/conviva-js-coresdk'
// import { TEST_CUSTOMER_KEY, TOUCHSTONE_SERVICE_URL } from '../constants';
// import HTML5Module from '@convivainc/conviva-js-html5';
// import { localStorage } from '../../src/utils/storage';

// let initiated = false;
// // let videoAnalytics = new VideoAnalytics();
// export let videoAnalytics = null;
// let appEnv = 'dev'
// let convivaConfigs = {};

// const userId = localStorage.get('user-id');


// export const initConviva = async() => {
//   try{
//     if(process.env.APP_ENV === 'development'){
//       convivaConfigs[Constants.GATEWAY_URL] = TOUCHSTONE_SERVICE_URL;
//       convivaConfigs[Constants.LOG_LEVEL] = Constants.LogLevel.DEBUG;
//     }else{
//       /** prod pulse URL */
//       // convivaConfigs[Conviva.Constants.GATEWAY_URL] = TOUCHSTONE_SERVICE_URL;
//       // convivaConfigs[Conviva.Constants.LOG_LEVEL] = Conviva.Constants.LogLevel.DEBUG;
//     }
//     Analytics.init(TEST_CUSTOMER_KEY, null, convivaConfigs);
//     Analytics.setDeviceMetadata(getDeviceMetadata());
//     videoAnalyticsRef();

//   }catch(e){
//     console.log(e?.message,"error");
//   }
// }

// export const getDeviceMetadata = () =>  {
//   let deviceMetadata = {};
//   deviceMetadata[Constants.DeviceMetadata.BRAND] = "Apple";
//   deviceMetadata[Constants.DeviceMetadata.MANUFACTURER] = "Apple";
//   deviceMetadata[Constants.DeviceMetadata.MODEL] = "MacBookPro";
//   deviceMetadata[Constants.DeviceMetadata.TYPE] = Constants.DeviceType.DESKTOP;
//   deviceMetadata[Constants.DeviceMetadata.VERSION] = "NAForMac";
//   deviceMetadata[Constants.DeviceMetadata.OS_NAME] = "MAC";
//   deviceMetadata[Constants.DeviceMetadata.OS_VERSION] = "10.13.6";
//   deviceMetadata[Constants.DeviceMetadata.CATEGORY] = Constants.DeviceCategory.WEB;

//   return deviceMetadata;
// };

// export const setContentInfo = (content ={}) =>{
//   let contentMetadata = {};
//   contentMetadata[Constants.ASSET_NAME] = content?.id + `bharat.mp4`;
//   contentMetadata[Constants.STREAM_URL] = content?.url;
//   contentMetadata[Constants.IS_LIVE] = Constants.StreamType.VOD;
//   contentMetadata[Constants.PLAYER_NAME] = 'Hipi App';
//   contentMetadata[Constants.VIEWER_ID] = 'Viewer ID';
//   contentMetadata[Constants.DEFAULT_RESOURCE] = 'Resource Name';
//   // contentMetadata[Constants.ENCODED_FRAMERATE] = 20;
//   // contentMetadata['contentId'] = content?.id;

//   return contentMetadata;
// }

// export const videoAnalyticsRef = () => {
//   videoAnalytics = Analytics?.buildVideoAnalytics();
// }

// export const playerStates = (type) => {
//   const events = {
//     'buffer':()=> videoAnalytics.reportPlaybackMetric(Constants.Playback.PLAYER_STATE, Constants.PlayerState.BUFFERING),
//     'playing':()=> videoAnalytics.reportPlaybackMetric(Constants.Playback.PLAYER_STATE, Constants.PlayerState.PLAYING),
//     'ended':()=>videoAnalytics.reportPlaybackMetric(Constants.Playback.PLAYER_STATE, Constants.PlayerState.SEEK_ENDED),
//     'pause':()=>videoAnalytics.reportPlaybackMetric(Constants.Playback.PLAYER_STATE, Constants.PlayerState.PAUSED),
//     'waitStarted':()=>videoAnalytics.reportPlaybackEvent(Constants.Events.USER_WAIT_STARTED),
//     'waitEnded':()=>videoAnalytics.reportPlaybackEvent(Constants.Events.USER_WAIT_ENDED)
//   }
//   console.log(type,"type");
//   type && events?.[type] && events?.[type]();
// }

// export const reportPlaybackRequested = (content = {}) => {
//   let options = {};
//   options[Constants.CONVIVA_MODULE] = HTML5Module;
//   let contentInfo = setContentInfo(content);
//   try{
//     videoAnalytics?.setPlayer(content.ref, options);
//     videoAnalytics?.reportPlaybackRequested(contentInfo);
//   }catch(e){
//     initConviva()
//     videoAnalytics?.setPlayer(content.ref, options);
//     videoAnalytics?.reportPlaybackRequested(contentInfo);
//   }
// }

// export const reportPlaybackEnded = () => videoAnalytics.reportPlaybackEnded();

// export const analyticsCleanup = () => {
//   console.log("cleanup happen");
//   videoAnalytics.release();
//   Analytics.release();
// }


