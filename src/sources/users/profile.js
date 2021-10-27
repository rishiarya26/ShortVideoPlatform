import { get, post } from 'network';
import { getApiBasePath, isMockMode } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
// import { getItem } from '../../utils/cookie';
import { transformSuccess, transformError } from '../transform/users/profile';
import {
  transformSuccess as transformProfileVideoSuccess,
  transformError as transformProfileVideoError
} from '../transform/users/profile-videos';

import {
  transformSuccess as transformSuccessFollow,
  transformError as transformErrorFollow
} from '../transform/users/follow';

async function fetchUserProfile(id) {
  let response = {};
  let apiPath = '';
  try {
    if (isMockMode()) {
      apiPath = `${getApiBasePath('app')}/api/user`;
      response = await get(apiPath);
      return Promise.resolve(response);
    }
    apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile?id=${id}`;

    response = await get(apiPath);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function fetchSimilarProfile({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile/similar`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function fetchPopularUser({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/users/popular`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function fetchSoundDetails({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/sound/detail`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function fetchUserFollower({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/users/follower`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
async function fetchUserFollowing({ id, limit ='30', offset='1', type='Following', keyword='' }) {
  let response = {};
  try {
    let tokens = getItem('tokens');
    tokens = JSON.parse(tokens);
    const { shortsAuthToken = '' } = tokens;
    const { accessToken = '' } = tokens;
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile/followers?id=${id}&type=${type}&keyword=${keyword}&limit=${limit}&offset=${offset}`;
    response = await get(apiPath,null,{
      'Authorization': `Bearer ${shortsAuthToken}`,
      'access-token': accessToken
    });
    console.log("resp",response)
    response.data.requestedWith = { id };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function fetchUserRecommendation({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/discover/recommendation`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function fetchUserProfileVideos({
  id, limit = '15', offset = '1', type='all'
}) {
  let response = {};
  // let tokens = getItem('tokens');
  // tokens = JSON.parse(tokens);
  // const { shortsAuthToken = '' } = tokens;
  // const { accessToken = '' } = tokens;                

  try {
    /* eslint-disable max-len */
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile/videos?id=${id}&filter=${type}&limit=${limit}&offset=${offset}`;
    response = await get(apiPath);
    //   , null, {
    //   Authorization: `Bearer ${shortsAuthToken}`,
    //   'access-token': accessToken
    // });
    response.data.requestedWith = { id, limit, offset };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function follow({
    userId= "",
    followerId= "",
    follow= true})
{
  let response = {};
    try {
    let tokens = getItem('tokens');
    tokens = JSON.parse(tokens);
    const { shortsAuthToken = '' } = tokens;
    const { accessToken = '' } = tokens;
    const payload = {
      userId: userId,
      followerId: followerId,
      follow: follow
    }
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/user/follow`;
    response = await post(apiPath,payload,{
      'Authorization': `Bearer ${shortsAuthToken}`,
      'access-token': accessToken
    });
    response.data.requestedWith = { userId, followerId, follow };
    return Promise.resolve(response);
    } catch (err) {
    return Promise.reject(err);
}
}

// TODO add TTL for api cache

const [getUserProfile] = apiMiddleWare(fetchUserProfile, transformSuccess, transformError);
const [getUserFollower] = apiMiddleWare(fetchUserFollower, transformSuccess, transformError);
const [getUserFollowing] = apiMiddleWare(fetchUserFollowing, transformSuccess, transformError,{requiresAuth : true});
const [getUserRecommendation] = apiMiddleWare(fetchUserRecommendation, transformSuccess, transformError);
const [getSoundDetails] = apiMiddleWare(fetchSoundDetails, transformSuccess, transformError);
const [getSimilarProfile] = apiMiddleWare(fetchSimilarProfile, transformSuccess, transformError);
const [getPopularUser] = apiMiddleWare(fetchPopularUser, transformSuccess, transformError);
const [getProfileVideos] = apiMiddleWare(fetchUserProfileVideos, transformProfileVideoSuccess, transformProfileVideoError);
const [toFollow] = apiMiddleWare(follow, transformSuccessFollow, transformErrorFollow, {requiresAuth : true})

export {
  getUserProfile,
  getUserFollower,
  getUserFollowing,
  getUserRecommendation,
  getSoundDetails,
  getSimilarProfile,
  getPopularUser,
  getProfileVideos,
  toFollow
};
