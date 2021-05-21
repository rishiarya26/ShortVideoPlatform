import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/feed';

async function fetchHomeFeed({ type = 'forYou', page = 1, total = 5 }) {
  let response = {};
  try {
    // const condition = type === 'for-you' ? 'forYou' : 'following';
    const apiPath = `${getApiBasePath('stagingMobile')}/v3.6/demo/hipi/1`;
    // const apiPath = `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}`;
    response = await get(apiPath);
    response.data.requestedWith = { page, total };
    console.log(type, response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [getHomeFeed, clearHomeFeed] = apiMiddleWare(fetchHomeFeed, transformSuccess, transformError);

export { getHomeFeed, clearHomeFeed };
