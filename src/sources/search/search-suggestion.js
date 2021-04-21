import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/search/suggestion_search';

async function fetchSearchResult({ lang, keyword }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/search/suggestion?keyword=${keyword}`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getSearchResults, clearSearchResults] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getSearchResults, clearSearchResults };

