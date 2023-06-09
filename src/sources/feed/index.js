import { get } from 'network';
import { cacheAd, destroyAd, initAdView } from '../../analytics/vmax';
import { getApiBasePath } from '../../config';
import { apiMiddleWare, isObjectEmpty } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import isEmptyObject from '../../utils/is-object-empty';
import { localStorage } from '../../utils/storage';
import { detectGeoLocationByZee } from '../geo-location';
import { transformSuccess, transformError } from '../transform/feed';
import { getAdPositions } from '../vmax/ads-position';
import { getSingleVideo } from './single';

let firstTimeCall = true;
let geoData = localStorage?.get('geo-info') || null;
const device = getItem('device-type');
const deviceInfo = getItem('device-info');
const userAgent =localStorage.get('plaformData')?.ua;
const os = localStorage.get('plaformData')?.os?.family;
const browser = localStorage.get('plaformData')?.name;
const flush = localStorage.get('lang-flush');
const languageCodesSelected = localStorage.get('lang-codes-selected')?.lang || [];

/* Feed API with login */
async function fetchHomeFeedWithLogin({ type = 'forYou', page = 1, total = 5, videoId, firstApiCall, campaign_id='' }) {

  let response = {};
  // let payload = {}
  try {
    const condition = type === 'for-you' ? 'forYou' : 'following';
    const apiPath = flush === 'true' ? `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}&flush=true` : `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}`;
    flush === 'true' && localStorage.set('lang-flush','false');
     let tokens = localStorage.get('tokens');
      const { shortsAuthToken = '' } = tokens;
      const { accessToken = '' } = tokens;
      const payload = {
        Authorization: `Bearer ${shortsAuthToken}`,
        'access-token': accessToken,
        'x-campaign-id':campaign_id || '',
        'X-DEVICE-BRAND' : `PWA-${device} ${os}- ${browser}`,
        'X-DEVICE-MODEL': userAgent,
        'X-HIPI-APPPLATFORM' : 'pwa',
        'X-USER-TYPE' : `pwa-member`,
      }
       if(geoData){     
          payload['X-GEO-IPADDR']= geoData?.ip || '',
          payload['X-GEO-COUNTRY-CODE']=geoData?.country_code || 'IN',
          payload['X-GEO-REGION-CODE']=geoData?.state_code || '',
          payload['X-GEO-CITY']=geoData?.city || '',
          payload['X-GEO-LATLONG']=`${geoData?.lat || ''}${(geoData?.lat && geoData?.long) ? ',' : ''}${geoData?.long || ''}`,
          payload['X-GEO-PINCODE']=geoData?.pin || ''
       }else{
        const respGeoInfo = await detectGeoLocationByZee();
        const geoLocationInfo = respGeoInfo?.data;
        if(geoLocationInfo){
            payload['X-GEO-COUNTRY-CODE']=geoLocationInfo?.country_code || 'IN',
            payload['X-GEO-REGION-CODE']=geoLocationInfo?.state_code || '',
            payload['X-GEO-CITY']=geoLocationInfo?.city || '',
            payload['X-GEO-LATLONG']=`${geoLocationInfo?.lat || ''}${(geoLocationInfo?.lat && geoLocationInfo?.long) ? ',' : ''}${geoLocationInfo?.long || ''}`,
            payload['X-GEO-PINCODE']=geoLocationInfo?.pin || ''
          }
       }
      
      if(languageCodesSelected && languageCodesSelected.length > 0){
        const languages = languageCodesSelected?.reduce((acc,item,id)=>`${acc}${id === 0 ? '':','}${item}`,'')
        payload['X-USER-LANGUAGE-CODES'] = languages;
      }

      response = await get(apiPath,null,payload);

      /* video apppend on top of feed */
      if(firstApiCall && videoId && response?.data?.responseData?.videos?.length > 0){
        const data = await getSingleVideo({id : videoId});
        console.log("l",data)
        const video = data?.data;
        if(!isEmptyObject(video)){
          console.log("l",data)
          response.data.firstVideo = video;
          response.data.loadFeed = true;
          console.log('first',video)
        }else{
          response.data.loadFeed = false;
        }
      }else{
        response.data.loadFeed = true;
      }
    
      // ? As of now no difference between firstCall and secondCall keeping this for reference

      if(firstApiCall && response?.data?.responseData?.videos?.length > 0 && deviceInfo === 'ios'){
        try{
          let {adPosition ="", cachedVideo ={}} = await cacheAdResponse();
          if(!isEmptyObject(cachedVideo) && adPosition){
            response.data.vmaxAdVideo = cachedVideo;
            response.data.vmaxVideoIndex = adPosition;
          }
        }catch(e){
          console.error(e);
        }
      }

    response.data.requestedWith = { page, total };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

/* Feed API without login */
async function fetchHomeFeed({ type = 'forYou', page = 1, total = 5, videoId , firstApiCall, campaign_id=''}) {
   console.log('fT',firstTimeCall)
   console.time("concatenation");
  let response = {};
  try {
    const condition = type === 'for-you' ? 'forYou' : 'following';
    const apiPath = flush === 'true' ? `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}&flush=true` : `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}`;
    flush === 'true' && localStorage.set('lang-flush','false');
    const payload = {
      'x-campaign-id':campaign_id || '',
      'X-DEVICE-BRAND' : `PWA-${device} ${os}- ${browser}`,
      'X-DEVICE-MODEL': userAgent,
      'X-HIPI-APPPLATFORM' : 'pwa',
      'X-USER-TYPE' : `pwa-guest`,
    }
      if(geoData){
          payload['X-GEO-IPADDR' ]= geoData?.ip || '',
          payload['X-GEO-COUNTRY-CODE']=geoData?.country_code || 'IN',
          payload['X-GEO-REGION-CODE']=geoData?.state_code || '',
          payload['X-GEO-CITY']=geoData?.city || '',
          payload['X-GEO-LATLONG']=`${geoData?.lat || ''}${(geoData?.lat && geoData?.long) ? ',' : ''}${geoData?.long || ''}`,
          payload['X-GEO-PINCODE']=geoData?.pin || ''
      }else{
          const respGeoInfo = await detectGeoLocationByZee();
          const geoLocationInfo = respGeoInfo?.data;
          if(geoLocationInfo){
          console.log("No GEO_DATA*****",geoLocationInfo );
            payload['X-GEO-COUNTRY-CODE']=geoLocationInfo?.country_code || 'IN',
            payload['X-GEO-REGION-CODE']=geoLocationInfo?.state_code || '',
            payload['X-GEO-CITY']=geoLocationInfo?.city || '',
            payload['X-GEO-LATLONG']=`${geoLocationInfo?.lat || ''}${(geoLocationInfo?.lat && geoLocationInfo?.long) ? ',' : ''}${geoLocationInfo?.long || ''}`,
            payload['X-GEO-PINCODE']=geoLocationInfo?.pin || '' 
          }
        }

    if(languageCodesSelected && languageCodesSelected.length > 0){
      const languages = languageCodesSelected?.reduce((acc,item,id)=>`${acc}${id === 0 ? '':','}${item}`,'')
      payload['X-USER-LANGUAGE-CODES'] = languages;
    }

    response = await get(apiPath,null,payload);

    console.timeEnd("concatenation");
    console.log('v-id',videoId);
    
    if(firstApiCall && videoId && response?.data?.responseData?.videos?.length > 0){
      // const items = response.data.responseData;
      const data = await getSingleVideo({id : videoId});
      console.log("l",data)
      const video = data?.data;
      if(!isEmptyObject(video)){
        console.log("l",data)
        response.data.firstVideo = video;
        response.data.firstVideoPresent = true;
        response.data.loadFeed = true;
        console.log('first',video)
      }else{
        response.data.firstVideoPresent = false;
        response.data.loadFeed = false;
      }
      // console.log("resppp", response, data)
    }else{
      response.data.loadFeed = true;
    }

    // ? As of now no difference between firstCall and secondCall keeping this for reference

    if(firstApiCall && response?.data?.responseData?.videos?.length > 0 && deviceInfo === 'ios'){
      try{
        // let {adPosition = "", cachedVideo = {}} = await cacheAdResponse();
        let resp = await cacheAdResponse();
        let adPosition = resp?.adPosition || null;
        let cachedVideo =  resp?.cachedVideo ?? {};
        // debugger;
        console.log("initial position: " + adPosition)

        if(!isEmptyObject(cachedVideo) && adPosition){
          response.data.vmaxAdVideo = cachedVideo;
          response.data.vmaxVideoIndex = adPosition;
        }
      }catch(error){
        console.error(error);
      }
    }
    // else{
    //   try{
    //     // let {adPosition= "", cachedVideo = {}} = await cacheAdResponse();
    //     let resp = await cacheAdResponse();
    //     let adPosition = resp?.adPosition || null;
    //     let cachedVideo =  resp?.cachedVideo ?? {};

    //     if(!isEmptyObject(cachedVideo) && adPosition){
    //       response.data.vmaxAdVideo = cachedVideo;
    //       response.data.vmaxVideoIndex = adPosition;
    //     }
    //   }catch(error){
    //     console.error(error);
    //   } 
    // }
      // const index = items.findIndex((data)=>(data?.id === videoId))
      // if(index !== -1){
      //   const video = items[index]
      //   items.splice(index,1);
      //   items.splice(0,0,video);
      // }
      // else{ 
      //   const video = localStorage.get('selected-profile-video')
      //     video && (response.data.firstVideo = video);
      // }
      
      console.log('resp-video',response)
      response.data.firstApiCall = firstApiCall;
      firstTimeCall = false;
    response.data.requestedWith = { page, total };
    return Promise.resolve(response);
  } catch (err) {
    firstTimeCall = false;
    return Promise.reject(err);
  }
}

const cacheAdResponse = async () => {
  try{
    // const { adPosition = "" } = await getAdPositions({limit : 5});
    
    let adPosition = 4;

    let adShow = await initAdView() // 👈 creating new instance for vmaxsDK

    const {adData = {}, ctaInfo = {}, adView = {}} = await cacheAd() || {};

    let {postid = "", ctaButtonColor = "", ctatext ="", ctaPath = "", ctaLinkUrl =""} = ctaInfo ?? {};

    const singleVideoData = postid && await getSingleVideo({id : postid});

    const video = await singleVideoData?.data || {};
    
    if(!isEmptyObject(video) && adData){
      let cacheAdData = {...adData, ctaColor: ctaButtonColor, ctaText: ctatext, ctaPath, ctaLinkUrl, vmaxAd: true, adView};
      let cachedVideo = {...video, feedVmaxAd: cacheAdData };
      console.log("spliced video position",cachedVideo, cacheAdData, adPosition);
      return {adPosition, cachedVideo};
    }else{
      throw new Error(`No video found for id ${postid}`)
    }

  }catch (err) {
    console.error("Error getting video position",err);
    return {};
  }
}

// const options = selected === info[after]
const [getHomeFeed, clearHomeFeed] = apiMiddleWare(fetchHomeFeed, transformSuccess, transformError, {shouldCache : false,requiresAuth: false});
const [getHomeFeedWLogin, clearHomeFeedWLogin] = apiMiddleWare(fetchHomeFeedWithLogin, transformSuccess, transformError, 
    {shouldCache : false, requiresAuth: true});

export { getHomeFeed, clearHomeFeed };
export { getHomeFeedWLogin, clearHomeFeedWLogin };
export { cacheAdResponse };
