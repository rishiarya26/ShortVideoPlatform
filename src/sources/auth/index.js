import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { setItem } from '../../utils/cookie';
import { transformError, transformSuccess } from '../transform/auth';
import { hipiLogin } from './hipi-login';

const login = async ({
  type, email = '', password = '', mobile = ''
}) => {
  let response = {};
  try {
    const payload = {
      email,
      password,
      mobile,
      guest_token: 'null',
      aid: 'djsucgius',
      platform: 'web',
      version: '27.0202065'
    };

    const apiPath = `${getApiBasePath('login')}/login${type}_v2.php`;
    const resp = await post(apiPath, payload, {
    });
    resp.data.status = 200;
    resp.data.message = 'success';
    const zee5Token = resp.data.access_token;
    response = await hipiLogin({ zee5Token });
    const tokens = {
      shortsAuthToken: response.data.shortsAuthToken,
      accessToken: zee5Token,
      refreshToken: resp.data.refresh_token
    };
    setItem('tokens', JSON.stringify(tokens));
    response.data.accessToken = zee5Token;
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [userLogin, clearUserLogin] = apiMiddleWare(login, transformSuccess, transformError);

export { userLogin, clearUserLogin };
