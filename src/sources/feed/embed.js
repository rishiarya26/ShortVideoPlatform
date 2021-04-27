import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { verifyIsShoppable } from '../can-shop';
import { transformSuccess, transformError } from '../transform/feed/embed';

async function fetchEmbedFeed({ page }) {
  let response = {};
  let isShoppable = false;
  try {
    const resp = await verifyIsShoppable({ videoId: page });
    isShoppable = resp?.videoVerified;
  } catch (e) {
    isShoppable = false;
  }
  try {
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/video/detail?id=${page}`;
    response = await get(apiPath);
    response.data.requestedWith = { page };
    response.data.isShoppable = isShoppable;
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [getSingleFeed, clearSingleFeed] = apiMiddleWare(fetchEmbedFeed, transformSuccess, transformError);

export { getSingleFeed, clearSingleFeed };
