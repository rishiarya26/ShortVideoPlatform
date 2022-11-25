import { get, post, del } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/social';
import { transformSuccessViewCount, transformErrorViewCount } from '../transform/social/view-count';
import { getEpochTime } from '../../utils/date';
import { trimSpace } from '../../utils/string';
import { getItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';
// import { transformErrorOneLink, transformSuccessOneLink } from '../transform/social/get-one-link';
import { BASIC_ONE_LINK_SKELETON, ONE_TAP_DOWNLOAD } from '../../constants';

const apiKey = '4dbc881836c2a0130cda9cfcec0f3383';
const appId = 'YInJ8G70y098';
const appsFlyerApiKey = '1b3u1l4h0010O00001prc0CQAQ1s6h3a2t';

const middlewareSettings = {
  shouldCache: true,
  ttl: getEpochTime('MINUTE', 5)
};

const getActivityFeed = async ({ socialId = 0, nextCursor = '' }) => {
  let response = {};
  try {
    // eslint-disable-next-line max-len
    const apiPath = trimSpace(`
    ${getApiBasePath('get-social')}/activities
    ?target_type=ACTIVITY
    &target_id=${socialId}
    &app_id=${appId}
    ${(nextCursor ? `&next_cursor=${nextCursor}` : '')}
    `);
    response = await get(apiPath, null, {
      'X-GetSocial-API-Key': apiKey
    });
    response.data.status = 200;
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const postComment = async ({ text = '', socialId }) => {
  let response = {};
  try {
    const payload = {
      app_id: appId,
      activity: {
        content: {
          language: 'en',
          text
        },
        target: {
          type: 'ACTIVITY',
          id: socialId
        }
      }
    };
    const apiPath = `${getApiBasePath('get-social')}/activities`;
    response = await post(apiPath, payload, {
      'X-GetSocial-API-Key': apiKey
    });
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const postLike = async ({ socialId }) => {
  let response = {};
  try {
    const payload = {
      app_id: appId,
      reaction: {
        type: 'like',
        activity_ids: [
          socialId
        ]
      }
    };
    const apiPath = `${getApiBasePath('get-social')}/activities/reactions`;
    response = await post(apiPath, payload, {
      'X-GetSocial-API-Key': apiKey,
      'X-GetSocial-impersonate-user': 'f999f4de-5c13-4b9f-8467-dfc417548169'
    });

    response.data.status = 200;
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteLike = async ({ socialId }) => {
  let response = {};
  try {
    const payload = {
      app_id: appId,
      reaction: {
        type: 'like',
        activity_ids: [
          socialId
        ]
      }
    };
    const apiPath = `${getApiBasePath('get-social')}/activities/reactions`;
    response = await del(apiPath, payload, {
      'X-GetSocial-API-Key': apiKey
    });
    response.data.status = 200;
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const viewCountUpdate = async ({headers, payloads, id, event = 'user_video_start', duration='', timeSpent=''}) => {
  let response = {};
  let payload;
  const device = getItem('device-type');
const userAgent =localStorage.get('plaformData')?.ua;
const os = localStorage.get('plaformData')?.os?.family;
const browser = localStorage.get('plaformData')?.name;
const isLoggedIn = localStorage?.get('user-id') || null;
const previousPage = window?.sessionStorage?.getItem('previous-page');
  try {
    payload =  (event === 'user_video_end') ?
     {
      "assetId": id,
      "event": event,
      "duration":duration,
      "timeSpent":timeSpent
  }:
  {
    "assetId": id,
    "event": event
  }

  payloads ? (payload = payloads) : ''
  console.log("api called", payload)
   const userId = localStorage.get('user-id') || null;
   let geoData = localStorage?.get('geo-info') || null;
   const guestToken =  getItem('guest-token') || null;
   const languageCodesSelected = localStorage.get('lang-codes-selected')?.lang || [];
// console.log('la',languageCodesSelected, typeof languageCodesSelected === 'array', languageCodesSelected?.reduce((item,acc)=>{acc = `${acc},${item}`}))
    const apiPath = `${getApiBasePath('viewCount')}/Prod/v1/events`;
    response = await post(apiPath, payload, {
      Authorization : userId || guestToken,
      ...headers,
      'X-Z5-AppPlatform': 'PWA',
      'Content-Type': 'application/json',
      ...(userId ? {'X-Z5-Guest-Token': userId} : {}),
      ...(geoData ? {
        'X-GEO-IPADDR' : geoData?.ip || '',
        'X-GEO-COUNTRY-CODE':geoData?.country_code || 'IN',
        'X-GEO-REGION-CODE':geoData?.state_code || '',
        'X-GEO-CITY':geoData?.city || '',
        'X-GEO-LATLONG':`${geoData?.lat || ''}${(geoData?.lat && geoData?.long) ? ',' : ''}${geoData?.long || ''}`,
        'X-GEO-PINCODE':geoData?.pin || '',
        'X-DEVICE-BRAND' : `PWA-${device} ${os}- ${browser}`,
        'X-DEVICE-MODEL': userAgent,
      } : {}),
      // 'X-HIPI-APPPLATFORM' : 'pwa',
      // 'X-USER-TYPE' : `pwa-${isLoggedIn ? 'member' : 'guest'}`,
      'X-USER-LANGUAGE-CODES' : languageCodesSelected && languageCodesSelected?.length > 0 ? 
      languageCodesSelected?.reduce((acc,item,id)=>`${acc}${id === 0 ? '':','}${item}`,'') : 'NA'
      });
    response.data.status = 'success';
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    console.error(err)
    return Promise.reject(err);
  }
};

const getDynamicOneLink = async({videoId, afChannel}) => {
  // let response = {};
  try {
  console.log('videoId',videoId)
    // const payload = {
    //   deep_link_value: `https://www.hipi.co.in/video/${videoId}`,
    //   // utm_source: 'pwa_mobile_install_cta',
    //   // utm_campaign: 'pwa',
    //   is_retargeting: 'true',
    //   pid:"install",
    //   af_dp:"zee5hipi://"
    // }
    // console.log("api called", payload);
    // const apiPath = `${getApiBasePath('hipi')}/v1/shorts/appsflyer`;
    // response = await post(apiPath, {data: payload}, {
    // });
    // console.log("link",response)
    // console.log("link-smart",link);
    // response.data.smartLink = link;
    // response.data.status = 'success';
    // response.data.message = '';
    // return Promise.resolve(response);
    const link = getSmartOneLink({oneLink : BASIC_ONE_LINK_SKELETON, afChannel:afChannel, videoId});
    console.log('smart-script-link',link)
    return (link || ONE_TAP_DOWNLOAD);

  } catch (err) {
    console.error('one-link-error',err)
    return ONE_TAP_DOWNLOAD;
    // return Promise.reject(err);
  }
}

const getSmartOneLink = ({oneLink, afChannel, videoId})=>{
  let result_url = "No output from script"
  try{  
  //Initializing Smart Script arguments
  const oneLinkURL = oneLink;
  // If a media source key is NOT FOUND on the link and NO default value is found, the script will return a null string 
  const mediaSource = {keys: ["utm_source"], defaultValue: "webOrganic"};
  const campaign = {keys: ["utm_campaign"]};
  const content = {paramKey:"content",keys:["utm_content"]};
  const term = {paramKey:"term", keys:["utm_term"]}
  const afchannel= afChannel
  const deepLinkValue = {defaultValue:`https://www.hipi.co.in/video/${videoId}`};
  const af_dp = { paramKey: "af_dp" , defaultValue:`zee5hipi://video/${videoId}`}
  const is_retargeting = {paramKey: "is_retargeting", defaultValue:"true"}
  
  let result = window?.AF_SMART_SCRIPT?.generateOneLinkURL({
    oneLinkURL,
    afParameters:{
      mediaSource: mediaSource,
      campaign: campaign,
      af_channel: afchannel,
      deepLinkValue: deepLinkValue,
      afCustom : [ 
        af_dp,
        is_retargeting,
        term,
        content
      ]
    }
  })

  if (result) {
    console.log("re",result)
        result_url = result?.clickURL;            
  }  
}catch(e){
  console.error("apps-smart-error",e)
}    
  return result_url;
}


const [getComments, clearComments] = apiMiddleWare(getActivityFeed, transformSuccess, transformError, middlewareSettings);
const [viewEvents, clearViewEvents] = apiMiddleWare(viewCountUpdate, transformSuccessViewCount , transformErrorViewCount);
// const [getOneLink, clearOneLink] = apiMiddleWare(getDynamicOneLink, transformSuccessOneLink , transformErrorOneLink);
const getOneLink = getDynamicOneLink;

export {
  getComments,
  clearComments,
  postComment,
  postLike,
  deleteLike,
  viewEvents,
  clearViewEvents,
  getOneLink,
  getSmartOneLink
};
