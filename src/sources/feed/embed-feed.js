import { get } from 'network';
// import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/feed';

async function fetchEmbedFeed(params = {}) {
  let response = {};
  try {
    const apiPath = `https://mobiletest.charmboard.com/v3.6/demo/hipifeed/${params.page}/1`;
    response = await get(apiPath);
    response.data.requestedWith = { ...params };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [getHomeFeed, clearHomeFeed] = apiMiddleWare(fetchEmbedFeed, transformSuccess, transformError);

export { getHomeFeed, clearHomeFeed };
