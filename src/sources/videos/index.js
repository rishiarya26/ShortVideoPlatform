import { get } from 'network';
import { baseURL } from '../../api-base';
import { apiMiddleWare } from '../../utils/app';

// TODO add transforms per call
function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function fetchProfileVideos({ lang }) {
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

async function fetchCommentByVideoId({ lang }) {
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

const shouldCache = false;

const [getProfileVideos] = apiMiddleWare(fetchProfileVideos, transformSuccess, transformError, shouldCache);
const [getCommentByVideoId] = apiMiddleWare(fetchCommentByVideoId, transformSuccess, transformError, shouldCache);

export {
  getProfileVideos,
  getCommentByVideoId
};
