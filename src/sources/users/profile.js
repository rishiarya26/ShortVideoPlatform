import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../utils/app';

// TODO add transforms per call
function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function fetchUserProfile({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
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
    return Promise.resolve(response.data);
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
    return Promise.resolve(response.data);
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
    return Promise.resolve(response.data);
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
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
async function fetchUserFollowing({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/users/following`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
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
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

// TODO add TTL for api cache

const shouldCache = false;

const [getUserProfile] = apiMiddleWare(fetchUserProfile, transformSuccess, transformError, shouldCache);
const [getUserFollower] = apiMiddleWare(fetchUserFollower, transformSuccess, transformError, shouldCache);
const [getUserFollowing] = apiMiddleWare(fetchUserFollowing, transformSuccess, transformError, shouldCache);
const [getUserRecommendation] = apiMiddleWare(fetchUserRecommendation, transformSuccess, transformError, shouldCache);
const [getSoundDetails] = apiMiddleWare(fetchSoundDetails, transformSuccess, transformError, shouldCache);
const [getSimilarProfile] = apiMiddleWare(fetchSimilarProfile, transformSuccess, transformError, shouldCache);
const [getPopularUser] = apiMiddleWare(fetchPopularUser, transformSuccess, transformError, shouldCache);

export {
  getUserProfile,
  getUserFollower,
  getUserFollowing,
  getUserRecommendation,
  getSoundDetails,
  getSimilarProfile,
  getPopularUser
};
