/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/explore/hashtags-videos';
import { getHashTagDetails } from './hashtags-detail';

async function fetchSearchResult({
   keyword, limit='15', offset='1'
}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/hashtag/videoDetails?id=${keyword}&limit=${limit}&offset=${offset}&type=hashtag`;
    response = await Promise.all([get(apiPath), getHashTagDetails({ keyword: keyword })]);
    const [resp, details] = response;
  console.log(resp,details)
     resp.data.details = details?.data;
     console.log(resp)
    resp.data.requestedWith = { keyword };
    return Promise.resolve(resp);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getHashTagVideos, clearHashTagVideos] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getHashTagVideos, clearHashTagVideos };
