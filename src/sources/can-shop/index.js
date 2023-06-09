import { get } from 'network';
import { getApiBasePath } from '../../config';
import { API_KEY_SHOP } from '../../constants';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/can-shop';

async function verifyVideoForShop({ videoId }) {
  let response = {};
 
  try {
    const apiPath = `${getApiBasePath(
      'charmboard'
    )}/v3.6/video/ddeaa554-b40e-45ef-8cde-9d940a9d2cae/charm?video_id=${videoId}`;
    response = await get(apiPath,null,{webkey:'1EC97-25A91-DAA24-FF3CA4-4LD8D-OFB84',
    'content-type': 'application/json'
    });
    response.data.requestedWith = { videoId };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.resolve({ data: '' });
  }
}
const [canShop, clearCanShop] = apiMiddleWare(
  verifyVideoForShop,
  transformSuccess,
  transformError
);

export { canShop, clearCanShop };
