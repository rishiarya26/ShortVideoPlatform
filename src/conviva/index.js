import Conviva from '@convivainc/conviva-js-coresdk'
import { TEST_CUSTOMER_KEY, TOUCHSTONE_SERVICE_URL } from '../constants';
import getConfig from 'next/config';
import HTMLVideoElement from '@convivainc/conviva-js-html5';

let initiated = false;
let videoAnalytics = null;


const { publicRuntimeConfig = {} } = getConfig() || {};
const { appEnv = 'production' } = publicRuntimeConfig;

const init = async() => {
  try{
    var convivaConfigs = {};
    if(appEnv !== 'production'){
      convivaConfigs[Conviva.Constants.GATEWAY_URL] = TOUCHSTONE_SERVICE_URL;
      convivaConfigs[Conviva.Constants.LOG_LEVEL] = Conviva.Constants.LogLevel.DEBUG;
    }else{
      /** prod pulse URL */
      // convivaConfigs[Conviva.Constants.GATEWAY_URL] = TOUCHSTONE_SERVICE_URL;
      // convivaConfigs[Conviva.Constants.LOG_LEVEL] = Conviva.Constants.LogLevel.DEBUG;
    }
    Conviva.Analytics.init(TEST_CUSTOMER_KEY, null, convivaConfigs);
    // Conviva.Analytics.setDeviceMetadata(_s.getDeviceMetadata());
    videoAnalyticsRef()

  }catch(e){
    console.log(e?.message);
  }
}

const playerInfo = () => {
  var playerInfo = {};
  playerInfo[Conviva.Constants.PLAYER_NAME] = "JS HTML5"
  return deviceMetadata;
};

export const videoAnalyticsRef = (obj) => {
  videoAnalytics = Conviva.Analytics.buildVideoAnalytics();
  videoAnalytics.setPlayer(HTMLVideoElement);
  videoAnalytics.setPlayerInfo(playerInfo);
}


