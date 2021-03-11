import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function fetchSearchResult({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('test')}/search/repositories?q=${lang}&sort=stars&order=desc`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getSearchResults, clearSearchResults] = apiMiddleWare(fetchSearchResult, transformSuccess, transformError);

export { getSearchResults, clearSearchResults };

