import { get } from 'network';
import { core } from '../../api-base';
import { asyncMemoize } from '../../utils/app';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function getTopRepos({ lang }) {
  let response = {};
  try {
    const apiPath = `${core}/search/repositories?q=${lang}&sort=stars&order=desc`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [srGetTopRepos, clearGetTopRepos] = asyncMemoize(getTopRepos, transformSuccess, transformError);

export { srGetTopRepos, clearGetTopRepos };
