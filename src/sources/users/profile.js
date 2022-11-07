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
import {
  transformSuccess as transformSuccessPopular,
  transformError as transformErrorPopular
} from '../transform/users/popular-profiles';
import { localStorage } from '../../utils/storage';
import { getSingleFeed } from '../feed/embed';

async function fetchUserProfile(id) {
  let response = {};
  let apiPath = '';
  try {
    console.log("PROFILE CALLED",id)

    // if (isMockMode()) {
    //   apiPath = `${getApiBasePath('app')}/api/user`;
    //   response = await get(apiPath);
    //   return Promise.resolve(response);
    // }
    apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile?id=${id}`;
    console.log('sasdsa*****',apiPath)

    response = await get(apiPath);
    return Promise.resolve(response);
  } catch (err) {
    console.log("ssdssd",err)
    return Promise.reject(err);
  }
}

async function fetchUserProfileAfterLogin(id) {
  let response = {};
  let apiPath = '';
  try {
    console.log("PROFILE LOGIN CALLED", id)
    let tokens = localStorage.get('tokens');
    // tokens = JSON.parse(tokens);
    const { shortsAuthToken = '' } = tokens;
    const { accessToken = '' } = tokens;
    apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile?id=${id}`;
    response = await get(apiPath,null,{
      'Authorization': `Bearer ${shortsAuthToken}`,
      'access-token': accessToken
    });
    return Promise.resolve(response);
  } catch (err) {
    console.log("ssdssd",err)
    return Promise.reject(err);
  }
}

// async function fetchSimilarProfile({ lang }) {
//   let response = {};
//   try {
//     const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile/similar`;
//     response = await get(apiPath);
//     response.data.requestedWith = { lang };
//     return Promise.resolve(response);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

async function fetchPopularUser() {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/users/popular?limit=10&offset=1`;
    response = await get(apiPath);
    // response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

// async function fetchPopularUser({ lang }) {
//   let response = {};
//   try {
//     const apiPath = `${getApiBasePath('hipi')}/v1/shorts/users/popular`;
//     response = await get(apiPath);
//     response.data.requestedWith = { lang };
//     return Promise.resolve(response);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

// async function fetchSoundDetails({ lang }) {
//   let response = {};
//   try {
//     const apiPath = `${getApiBasePath('hipi')}/v1/sound/detail`;
//     response = await get(apiPath);
//     response.data.requestedWith = { lang };
//     return Promise.resolve(response);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

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
    let tokens = localStorage.get('tokens');
    // tokens = JSON.parse(tokens);
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
  id, limit = '15', offset = '1', type='all', videoId, sortType = ''
}) {
  console.log("videoId",videoId)
  let response = {};
  let video = {}
  // let tokens = getItem('tokens');
  // tokens = JSON.parse(tokens);
  // const { shortsAuthToken = '' } = tokens;
  // const { accessToken = '' } = tokens;                

  try {
    /* eslint-disable max-len */
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile/videos?id=${id}&filter=${type}&limit=${limit}&offset=${offset}&sortType=${sortType}`;
    response = await get(apiPath);
    if(videoId && response?.data?.responseData?.length > 0){
      const items = response.data.responseData
      const index = items.findIndex((data)=>(data?.id === videoId))
      if(index !== -1){
        const video = items[index]
        items.splice(index,1);
        items.splice(0,0,video);
      }
      else{ 
        const video = localStorage.get('selected-profile-video')
          video && (response.data.firstVideo = video);
      }
      // const data = await getSingleFeed({id : videoId});
      // video = data?.data;
      // response.data.firstVideo = video;
      // console.log("resppp", response, data)}
    }
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

async function fetchOwnProfileVideos({
  limit = '15', offset = '1', type='all', videoId, sortType = ''
}) {
  let response = {};
  let tokens = localStorage.get('tokens');
  const { shortsAuthToken = '' } = tokens;
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile/videos?filter=${type}&limit=${limit}&offset=${offset}&sortType=${sortType}`;
    response = await get(apiPath, null,
      {
        Authorization: `Bearer ${shortsAuthToken}`
    });
    if(videoId && response?.data?.responseData?.length > 0){
      const items = response.data.responseData
      const index = items.findIndex((data)=>(data?.id === videoId))
      if(index !== -1){
        const video = items[index]
        items.splice(index,1);
        items.splice(0,0,video);
      }
      else{ 
        const video = localStorage.get('selected-profile-video')
          video && (response.data.firstVideo = video);
      }
    }
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
    let tokens = localStorage.get('tokens');
    // tokens = JSON.parse(tokens);
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
const [getUserProfileWLogin] = apiMiddleWare(fetchUserProfileAfterLogin, transformSuccess, transformError, {requiresAuth : true});
const [getUserFollower] = apiMiddleWare(fetchUserFollower, transformSuccess, transformError);
const [getUserFollowing] = apiMiddleWare(fetchUserFollowing, transformSuccess, transformError,{requiresAuth : true});
const [getUserRecommendation] = apiMiddleWare(fetchUserRecommendation, transformSuccess, transformError);
// const [getSoundDetails] = apiMiddleWare(fetchSoundDetails, transformSuccess, transformError);
// const [getSimilarProfile] = apiMiddleWare(fetchSimilarProfile, transformSuccess, transformError);
const [getPopularUser] = apiMiddleWare(fetchPopularUser, transformSuccessPopular, transformErrorPopular);
const [getProfileVideos] = apiMiddleWare(fetchUserProfileVideos, transformProfileVideoSuccess, transformProfileVideoError);
const [getOwnProfileVideos] = apiMiddleWare(fetchOwnProfileVideos, transformProfileVideoSuccess, transformProfileVideoError, {requiresAuth : true});
const [toFollow] = apiMiddleWare(follow, transformSuccessFollow, transformErrorFollow, {requiresAuth : true})

export {
  getUserProfile,
  getUserProfileWLogin,
  getUserFollower,
  getUserFollowing,
  getUserRecommendation,
  // getSoundDetails,
  // getSimilarProfile,
  getPopularUser,
  getProfileVideos,
  toFollow,
  getOwnProfileVideos
};
