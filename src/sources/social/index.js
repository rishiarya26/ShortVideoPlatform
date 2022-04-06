import { get, post, del } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/social';
import { transformSuccessViewCount, transformErrorViewCount } from '../transform/social/view-count';
import { getEpochTime } from '../../utils/date';
import { trimSpace } from '../../utils/string';
import { getItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';
import { transformErrorOneLink, transformSuccessOneLink } from '../transform/social/get-one-link';

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

const viewCountUpdate = async ({ id, event = 'user_video_start'}) => {
  let response = {};
 
  try {
    const payload = {
      "assetId": id,
      "event": event
  }
  console.log("api called", payload)
   const userId = localStorage.get('user-id') || null;
  //  const geoData = localStorage.get('geo-info') || null;
   const guestToken =  getItem('guest-token') || null;
    const apiPath = `${getApiBasePath('viewCount')}/Prod/v1/events`;
    response = await post(apiPath, payload, {
      Authorization : userId || guestToken,
      'content-type': 'application/json',
      // 'X-GEO-IPADDR' : geoData?.ip,
      // 'X-GEO-COUNTRY-CODE':geoData?.country,
      // 'X-GEO-REGION-CODE':geoData?.state_code,
      // 'X-GEO-CITY':geoData?.city,
      // 'X-GEO-LATLONG':`${geoData?.lat},${geoData?.long}` ,
      // 'X-GEO-PINCODE':geoData?.pin
    });
    response.data.status = 'success';
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    console.log(err)
    return Promise.reject(err);
  }
};

const getDynamicOneLink = async({videoId}) => {
  let response = {};
  try {
  console.log('videoId',videoId)
    const payload = {
      deep_link_value: `https://www.hipi.co.in/video/${videoId}`,
      utm_source: 'pwa_mobile_install_cta',
      utm_campaign: 'pwa',
      is_retargeting: 'true',
      pid:"install",
      af_dp:"zee5hipi://"
    }
    console.log("api called", payload)
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/appsflyer`;
    response = await post(apiPath, {data: payload}, {
      'content-type': 'application/json'
    });
    response.data.status = 'success';
    response.data.message = '';
    return Promise.resolve(response);
  } catch (err) {
    console.log(err)
    return Promise.reject(err);
  }
}


const [getComments, clearComments] = apiMiddleWare(getActivityFeed, transformSuccess, transformError, middlewareSettings);
const [viewEvents, clearViewEvents] = apiMiddleWare(viewCountUpdate, transformSuccessViewCount , transformErrorViewCount);
const [getOneLink, clearOneLink] = apiMiddleWare(getDynamicOneLink, transformSuccessOneLink , transformErrorOneLink);


export {
  getComments,
  clearComments,
  postComment,
  postLike,
  deleteLike,
  viewEvents,
  clearViewEvents,
  getOneLink,
  clearOneLink
};
