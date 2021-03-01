import { get } from 'network';
import promiseMemoize from 'promise-memoize';
import { baseURL } from '../../api-base';

async function getUserProfile({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/profile`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getSimilarProfile({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/profile/similar`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getPopularUser({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/users/popular`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getSoundDetails({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/sound/detail`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getUserFollower({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/users/follower`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
async function getUserFollowing({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/users/following`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getUserRecommendation({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v2/shorts/discover/recommendation`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const userProfile = promiseMemoize(getUserProfile, { resolve: 'json' });
const userFollowers = promiseMemoize(getUserFollower, { resolve: 'json' });
const followingUser = promiseMemoize(getUserFollowing, { resolve: 'json' });
const userRecommendation = promiseMemoize(getUserRecommendation, { resolve: 'json' });
const soundDetails = promiseMemoize(getSoundDetails, { resolve: 'json' });
const similarProfile = promiseMemoize(getSimilarProfile, { resolve: 'json' });
const popularProfile = promiseMemoize(getPopularUser, { resolve: 'json' });

export {
  userProfile, userFollowers, followingUser,
  userRecommendation, soundDetails, similarProfile, popularProfile
};
