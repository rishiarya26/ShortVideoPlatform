import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
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
    const refreshToken = resp.data.refresh_token;
    response = await hipiLogin({ zee5Token, refreshToken });
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [userLogin, clearUserLogin] = apiMiddleWare(login, transformSuccess, transformError);

export { userLogin, clearUserLogin };
