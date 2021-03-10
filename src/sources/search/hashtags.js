/* eslint-disable max-len */
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../utils/app';
import { transformSuccess, transformError } from '../transform/search/hastags';

async function fetchSearchResult({
  lang, keyword, limit, offset
}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/search/result/hashtags?keyword=${keyword}&limit=${limit}&offset=${offset}`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getSearchResults, clearSearchResults] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getSearchResults, clearSearchResults };

