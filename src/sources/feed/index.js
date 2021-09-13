import { get } from 'network';
import { getApiBasePath } from '../../config';
import useAuth from '../../hooks/use-auth';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { transformSuccess, transformError } from '../transform/feed';

async function fetchHomeFeedWithLogin({ type = 'forYou', page = 1, total = 5 }) {

  let response = {};
  try {
    const condition = type === 'for-you' ? 'forYou' : 'following';
    // const apiPath = `${getApiBasePath('charmboard')}/v3.6/demo/hipi/2`;
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}`;
     let tokens = getItem('tokens');
     tokens = JSON.parse(tokens);
      const { shortsAuthToken = '' } = tokens;
      const { accessToken = '' } = tokens;
      response = await get(apiPath,null,{
        Authorization: `Bearer ${shortsAuthToken}`,
        'access-token': accessToken
      });

    response.data.requestedWith = { page, total };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}


async function fetchHomeFeed({ type = 'forYou', page = 1, total = 5 }) {

  let response = {};
  try {
    const condition = type === 'for-you' ? 'forYou' : 'following';
    // const apiPath = `${getApiBasePath('charmboard')}/v3.6/demo/hipi/2`;
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/home?limit=${total}&type=${condition}&offset=${page}`;
    response = await get(apiPath);
    response.data.requestedWith = { page, total };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

// const options = selected === info[after]
const [getHomeFeed, clearHomeFeed] = apiMiddleWare(fetchHomeFeed, transformSuccess, transformError, {shouldCache : false});
const [getHomeFeedWLogin, clearHomeFeedWLogin] = apiMiddleWare(fetchHomeFeedWithLogin, transformSuccess, transformError, 
    {shouldCache : false, requiresAuth: true});

export { getHomeFeed, clearHomeFeed };
export { getHomeFeedWLogin, clearHomeFeedWLogin };
