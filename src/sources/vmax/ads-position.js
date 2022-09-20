import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function getAdPosition({ limit = 5 }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/ads-position?limit=${limit}`;
    response = await get(apiPath);
    response.data.requestedWith = { limit };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getAdPositions] = apiMiddleWare(getAdPosition, transformSuccess, transformError);

export { getAdPositions };
