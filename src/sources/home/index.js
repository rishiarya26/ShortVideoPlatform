import { get } from 'network';
import promiseMemoize from 'promise-memoize';
import { baseURL } from '../../api-base';

async function getHomeFeed({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v2/shorts/home`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const homeFeed = promiseMemoize(getHomeFeed, { resolve: 'json' });
export { homeFeed };
