import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/feed';

async function fetchEmbedFeed({ page = 1 }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/demo/hipifeed/${page}/1`;
    response = await get(apiPath);
    response.data.requestedWith = { page };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [getSingleFeed, clearSingleFeed] = apiMiddleWare(fetchEmbedFeed, transformSuccess, transformError);

export { getSingleFeed, clearSingleFeed };
