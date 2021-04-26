import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/feed/embed';

async function verifyVideoForShop({ videoId }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath(
      'verifyVideoForShop'
    )}/v3.6/video/${videoId}/charm?video_id=${videoId}`;
    response = await get(apiPath);
    response.data.requestedWith = { id };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [verifyVideo] = apiMiddleWare(
  verifyVideoForShop,
  transformSuccess,
  transformError
);

export { verifyVideo };
