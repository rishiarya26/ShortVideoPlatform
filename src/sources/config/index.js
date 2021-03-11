import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function getShortsConfig({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/config`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getConfig, clearConfig] = apiMiddleWare(getShortsConfig, transformSuccess, transformError);

export { getConfig, clearConfig };
