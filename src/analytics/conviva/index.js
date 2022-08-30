import { Analytics, Constants } from '@convivainc/conviva-js-coresdk'
import { TEST_CUSTOMER_KEY, TOUCHSTONE_SERVICE_URL, CONVIVA_PROD_CUSTOMER_KEY } from '../../constants';
import HTML5Module from '@convivainc/conviva-js-html5';
import { localStorage } from '../../utils/storage';
import { getItem } from '../../utils/cookie';


export let videoAnalytics = null;
let kNA = "N/A";
let convivaConfigs = {};
let customer_key = (process?.env?.APP_ENV?.toLocaleLowerCase() === 'production' || process?.env?.NODE_ENV?.toLocaleLowerCase() === 'production') ? CONVIVA_PROD_CUSTOMER_KEY : TEST_CUSTOMER_KEY

console.log(process?.env?.APP_ENV,"process?.env?.APP_ENV");
console.log(process?.env?.NODE_ENV,"process?.env?.NODE_ENV");


export const initConviva = async() => {
  //debugger
  try{
    if(process.env.APP_ENV === 'development'){
      convivaConfigs[Constants.GATEWAY_URL] = TOUCHSTONE_SERVICE_URL;
      convivaConfigs[Constants.LOG_LEVEL] = Constants.LogLevel.DEBUG;
    }
    Analytics.init(customer_key, null, convivaConfigs);
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
  let itemObject = content?.convivaItemInfo && content?.convivaItemInfo();

  let videoId = itemObject?.content_id ?? 'N/A';
  let musicTitle = itemObject?.music_title ?? "N/A";
  let videoUrl =  itemObject?.video_url ?? "N/A";
  let language = itemObject?.language ?? 'N/A';
  let contentDescription = itemObject?.content_description ?? 'N/A';
  let userName = itemObject?.userName ?? 'N/A';
  let videoOwnersId = itemObject?.videoOwnersId ?? 'N/A';
  let creatorTag = itemObject?.creatorTag ?? 'Influencer';
  let createdOn = itemObject?.createdOn ?? 'N/A';
  let accessType = localStorage.get('user-id') ? 'registered' : 'guest';
  let connectionType = typeof window !== undefined ? window?.navigator?.connection?.effectiveType : 'N/A';
  let videoDuration = itemObject?.videoDuration ?? 'N/A';


  let contentMetadata = {};
  contentMetadata[Constants.ASSET_NAME] = `${videoId}[${musicTitle}]`  ?? '';
  contentMetadata[Constants.STREAM_URL] = videoUrl ?? '';
  contentMetadata[Constants.IS_LIVE] = Constants.StreamType.VOD;
  contentMetadata[Constants.PLAYER_NAME] = 'HiPi WEB HTML5';
  contentMetadata[Constants.APPLICATION_VERSION] = "1.0"; //major matrix point to filter
  contentMetadata[Constants.DURATION] = videoDuration;
  contentMetadata[Constants.VIEWER_ID] = getItem('guest-token') ?? localStorage.get('user-id') ?? '';
  contentMetadata['audioLanguage'] = language;
  contentMetadata["playerVersion"] = kNA;
  contentMetadata['appVersion'] = "1.0";
  contentMetadata["connectionType"] = connectionType;
  contentMetadata["platformName"] = 'Hipi'
  contentMetadata["adID"] = kNA
  contentMetadata["filter"] = kNA
  contentMetadata["genre"] = kNA
  contentMetadata["category"] = "Shorts"
  contentMetadata["originalLanguage"] = language;
  contentMetadata["contentName"] = contentDescription
  contentMetadata["initPlayback"] = "true"
  contentMetadata["creatorHandle"] = userName;
  contentMetadata["creatorID"] = videoOwnersId;
  contentMetadata["creatorTag"] = creatorTag;
  contentMetadata["videoType"] = "normal"
  contentMetadata["playbackCount"] = "1"
  contentMetadata["contentID"] = videoId;
  contentMetadata["modelName"] = kNA
  contentMetadata["autoPlay"] = "true"
  contentMetadata["affiliate"] = "Zee Entertainment Enterprises Ltd"
  contentMetadata["contentType"] = "VOD"
  contentMetadata["pubDate"] = createdOn;
  contentMetadata["streamingProtocol"] = "MP4"
  contentMetadata["viewerAge"] = kNA
  contentMetadata["viewerGender"] = kNA
  contentMetadata["viewingMode"] = "Portrait"
  contentMetadata["audioLanguage"] = language;
  contentMetadata["infoMessage"] = kNA
  contentMetadata["accessType"] = accessType;
  contentMetadata["carrier"] = kNA
  contentMetadata["catchUp"] = kNA
  contentMetadata["channel"] = kNA
  contentMetadata["clickID"] = kNA
  contentMetadata["contentAccessType"] = kNA
  contentMetadata["dsn"] = kNA
  contentMetadata["episodeName"] = kNA
  contentMetadata["episodeNumber"] = kNA
  contentMetadata["origin"] = kNA
  contentMetadata["originalLanguage"] = kNA
  contentMetadata["playbackQuality"] = kNA
  contentMetadata["episodeNumber"] = kNA
  contentMetadata["rootID"] = kNA
  contentMetadata["searchTags"] = kNA
  contentMetadata["season"] = kNA
  contentMetadata["show"] = kNA
  contentMetadata["subtitle"] = kNA
  contentMetadata["tvbrand"] = kNA
  contentMetadata["videoEndPoint"] = kNA
  contentMetadata["videoStartPoint"] = kNA

  return contentMetadata;
}

export const videoAnalyticsRef = () => {
  videoAnalytics = Analytics?.buildVideoAnalytics();
}

export const reportPlaybackRequested = (content = {}) => {
  let options = {};
  options[Constants.CONVIVA_MODULE] = HTML5Module;
  let contentMetadata = setContentInfo(content);
  try{
    videoAnalytics?.setPlayer(content.ref, options);
    videoAnalytics?.reportPlaybackRequested(contentMetadata);
  }catch(e){
    initConviva()
    videoAnalytics?.setPlayer(content.ref, options);
    videoAnalytics?.reportPlaybackRequested(contentMetadata);
  }
}

export const reportPlaybackEnded = () => videoAnalytics.reportPlaybackEnded();

export const analyticsCleanup = () => {
  console.log("cleanup happen");
  videoAnalytics?.release();
  Analytics.release();
}





