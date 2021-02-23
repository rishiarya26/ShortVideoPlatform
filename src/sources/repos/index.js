import { get } from 'network';
import promiseMemoize from 'promise-memoize';
import { core } from '../../api-base';

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

const srGetTopRepos = promiseMemoize(getTopRepos, { resolve: 'json' });

export { srGetTopRepos };
