import { get } from 'network';
import promiseMemoize from 'promise-memoize';
import { baseURL } from '../../api-base';

async function getProfileVideos({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/profile/videos`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getCommentByVideoId({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/search/repositories?q=${lang}&sort=stars&order=desc`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const getCommment = promiseMemoize(getCommentByVideoId, { resolve: 'json' });
const profileVideos = promiseMemoize(getProfileVideos, { resolve: 'json' });

export { getCommment, profileVideos };
