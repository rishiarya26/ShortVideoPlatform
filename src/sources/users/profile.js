import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/users/profile';

async function fetchUserProfile({ params }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile?id=${params.id}`;
    response = await get(apiPath);
    response.data.requestedWith = { params };
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
async function fetchUserFollowing({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/users/following`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
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

// TODO add TTL for api cache

const [getUserProfile] = apiMiddleWare(fetchUserProfile, transformSuccess, transformError);
const [getUserFollower] = apiMiddleWare(fetchUserFollower, transformSuccess, transformError);
const [getUserFollowing] = apiMiddleWare(fetchUserFollowing, transformSuccess, transformError);
const [getUserRecommendation] = apiMiddleWare(fetchUserRecommendation, transformSuccess, transformError);
const [getSoundDetails] = apiMiddleWare(fetchSoundDetails, transformSuccess, transformError);
const [getSimilarProfile] = apiMiddleWare(fetchSimilarProfile, transformSuccess, transformError);
const [getPopularUser] = apiMiddleWare(fetchPopularUser, transformSuccess, transformError);

export {
  getUserProfile,
  getUserFollower,
  getUserFollowing,
  getUserRecommendation,
  getSoundDetails,
  getSimilarProfile,
  getPopularUser
};
