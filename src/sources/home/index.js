import { get } from 'network';
import { baseURL } from '../../api-base';
import { apiMiddleWare } from '../../utils/app';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function fetchHomeFeed({ lang }) {
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
const [getHomeFeed, clearHomeFeed] = apiMiddleWare(fetchHomeFeed, transformSuccess, transformError);

export { getHomeFeed, clearHomeFeed };
