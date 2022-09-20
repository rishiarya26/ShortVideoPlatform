import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';

async function adService({url, value}) {
  let response = {};
  try {
    const apiPath = `${url}&vast_event=${value}`;
    response = await get(apiPath,null,{'content-type':'noHeaders'});
    return Promise.resolve(response);
  } catch (err) {
    return Promise.resolve({ data: '' });
  }
}
const [pushAdService] = apiMiddleWare(adService);

export { pushAdService };