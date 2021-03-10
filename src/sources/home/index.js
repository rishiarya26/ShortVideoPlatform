import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../utils/app';
import { transformSuccess, transformError } from '../transform/home/feed';

async function fetchHomeFeed({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/v2/shorts/home`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [getHomeFeed, clearHomeFeed] = apiMiddleWare(fetchHomeFeed, transformSuccess, transformError);

export { getHomeFeed, clearHomeFeed };
