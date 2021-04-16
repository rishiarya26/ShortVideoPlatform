import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/feed';

async function fetchEmbedFeed({ page }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('hipi')}/demo/video-detail/${page}`;
    response = await get(apiPath);
    response.data.requestedWith = { page };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [getSingleFeed, clearSingleFeed] = apiMiddleWare(fetchEmbedFeed, transformSuccess, transformError);

export { getSingleFeed, clearSingleFeed };
