/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/explore/top';

async function fetchSearchResult(keyword) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/search?keyword=${keyword}`;
    response = await get(apiPath);
    response.data.requestedWith = { keyword };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

fetchSearchResult();

const [getTopSearches, clearTopSearches] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getTopSearches, clearTopSearches };
