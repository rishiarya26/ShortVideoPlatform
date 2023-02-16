import { post } from 'network';
import { getApiBasePath } from '../../config';
import { ESK_ENV } from '../../constants';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { getEsk } from '../../utils/eskGenerator';
import { transformError, transformSuccess } from '../transform/auth';
import { hipiLogin } from './login';

const login = async ({info, password, type="email"}) => {
  let response = {};
  try {
    const deviceId = getItem('guest-token');
    const payload = {
      [type]: info[type],
      password,
      guest_token: deviceId,
    };
    const apiPath = `${getApiBasePath('authApi')}/v2/user/loginemail`;
    const resp = await post(apiPath, {
      ...payload,
      "platform_name": "hipi",
    },  {
      'content-type' : 'application/json',
      'device_id': deviceId,
      'esk': getEsk({deviceId, env: ESK_ENV}),
      'platform': 'hipi',
    });
    resp.data.status = 200;
    resp.data.message = 'success';
    const accessToken = resp.data.access_token;
    const refreshToken = resp.data.refresh_token;
    response = await hipiLogin({ accessToken, refreshToken, [type]: info[type] });
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [userLogin, clearUserLogin] = apiMiddleWare(login, transformSuccess, transformError);
export { userLogin, clearUserLogin };
