import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { setItem } from '../../utils/cookie';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';

const login = async ({ zee5Token, refreshToken }) => {
  let response = {};
  try {
    const urlencoded = new URLSearchParams();
    urlencoded.append('zee5Token', zee5Token);
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/login`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded'
    }); 
    const tokens = {
      shortsAuthToken: response.data.shortsAuthToken,
      accessToken: zee5Token,
      refreshToken
    };
    setItem('tokens', JSON.stringify(tokens), { path: '/', domain: 'localhost' });
    response.data.accessToken = zee5Token;
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [hipiLogin, clearHipiLogin] = apiMiddleWare(login, transformSuccess, transformError);

export { hipiLogin, clearHipiLogin };
