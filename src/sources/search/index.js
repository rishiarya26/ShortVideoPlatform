import { get } from 'network';
import promiseMemoize from 'promise-memoize';
import { baseURL } from '../../api-base';

async function getSearchResult({ lang }) {
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

const search = promiseMemoize(getSearchResult, { resolve: 'json' });
export { search };
