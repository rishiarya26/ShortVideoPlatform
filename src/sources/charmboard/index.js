// https://stagingmobile.charmboard.com/v3.6/zee/charm/46930?charmId=46930
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { API_KEY_SHOP } from '../../constants';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/charmboard';

async function getCharmboardData({ charmId }) {
  let response = {};
 
  try {
    const apiPath = `${getApiBasePath(
      'charmboard'
    )}/v3.6/zee/charm/46930?charmId=${charmId}`;
    response = await get(apiPath,null,{webkey:'1EC97-25A91-DAA24-FF3CA4-4LD8D-OFB84',
    'content-type': 'application/json'});
    response.data.requestedWith = { charmId }; 
    return Promise.resolve(response);
  } catch (err) {
    return Promise.resolve({ data: '' });
  }
}
const [getCharms] = apiMiddleWare(
  getCharmboardData,
  transformSuccess,
  transformError
);

export { getCharms };
