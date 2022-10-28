import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformError, transformSuccess } from '../transform/auth';
import { hipiLogin } from './login';

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
    const accessToken = resp.data.access_token;
    const refreshToken = resp.data.refresh_token;
    const getSocialToken = resp.data.getSocialToken;
    response = await hipiLogin({ accessToken, refreshToken, getSocialToken, email, mobile });
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [userLogin, clearUserLogin] = apiMiddleWare(login, transformSuccess, transformError);

export { userLogin, clearUserLogin };
