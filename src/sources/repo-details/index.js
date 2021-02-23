
import { get } from 'network';
import promiseMemoize from 'promise-memoize';
import { core } from '../../api-base';

async function getRepoDetails({ publisher, project }) {
  let response = {};
  try {
    const apiPath = `${core}/repos/${publisher}/${project}`;
    response = await get(apiPath);
    response.data.requestedWith = { publisher, project };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const srGetRepoDetails = promiseMemoize(getRepoDetails, { resolve: 'json' });

export { srGetRepoDetails };
