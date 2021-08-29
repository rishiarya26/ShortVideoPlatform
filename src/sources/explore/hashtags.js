/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/explore/hastags';

async function fetchSearchResult({
   keyword, limit='20', offset='1'
}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/search/result/hashtags?keyword=${keyword}&limit=${limit}&offset=${offset}`;
    response = await get(apiPath);
    response.data.requestedWith = { keyword };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getHashTags, clearHashTags] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getHashTags, clearHashTags };