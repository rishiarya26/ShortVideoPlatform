/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/explore/videos';

async function fetchSearchResult({
   keyword, limit='20', offset='1'
}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/search/result/videos?keyword=${keyword}&limit=${limit}&offset=${offset}`;
    response = await get(apiPath);
    response.data.requestedWith = { keyword };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getVideos, clearVideos] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getVideos, clearVideos };
