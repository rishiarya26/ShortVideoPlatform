import { get } from 'network';
import promiseMemoize from 'promise-memoize';
import { baseURL } from '../../api-base';

async function getShortsConfig({ lang }) {
  let response = {};
  try {
    const apiPath = `${baseURL}/v1/shorts/config`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const getConfig = promiseMemoize(getShortsConfig, { resolve: 'json' });
export { getConfig };
