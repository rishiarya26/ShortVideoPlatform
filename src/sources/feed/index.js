import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { preCondition } from '../auth/pre-condition';
import { transformSuccess, transformError } from '../transform/feed';

async function fetchHomeFeed({ type, page = 1, total = 5 }) {
  let response = {};
  try {
    const resp = await preCondition();
    const { data = {} } = resp;
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${type}&offset=${page}`;
    response = await get(apiPath, null, {
      Authorization: `Bearer ${data.shortsAuthToken}`,
      'access-token': data.accessToken
    });
    response.data.requestedWith = { page, total };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [getHomeFeed, clearHomeFeed] = apiMiddleWare(fetchHomeFeed, transformSuccess, transformError);

export { getHomeFeed, clearHomeFeed };
