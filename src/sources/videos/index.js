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

async function fetchProfileVideos({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile/videos`;
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
    const apiPath = `${getApiBasePath('hipi')}/search/repositories?q=${lang}&sort=stars&order=desc`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getProfileVideos] = apiMiddleWare(fetchProfileVideos, transformSuccess, transformError);
const [getCommentByVideoId] = apiMiddleWare(fetchCommentByVideoId, transformSuccess, transformError);

export {
  getProfileVideos,
  getCommentByVideoId
};
