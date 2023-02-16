
import { post } from 'network';
import { getApiBasePath } from '../../../config';
import { ESK_ENV } from '../../../constants';
import { apiMiddleWare } from '../../../network/utils';
import { getItem } from '../../../utils/cookie';
import { getEsk } from '../../../utils/eskGenerator';
import { hipiLogin } from '../../auth/login';
import { transformError, transformSuccess } from '../../transform/social/google/login-one-tap';

const loginOneTap = async ({googleToken=null}) => {
    let response = {};
    const payload = {
      access_token: googleToken
    }
    const deviceId = getItem('guest-token');
    try {
      const apiPath = `${getApiBasePath('authApi')}/v2/user/logingoogle`;
      const resp = await post(apiPath, payload,
        {
          'content-type' : 'application/json',
          'device_id': deviceId,
          'esk': getEsk({deviceId, env: ESK_ENV}),
          'platform': 'hipi',
          'platform-hipi-google': 'hipi-android'
        }
      );
      resp.data.status = 200;
      resp.data.message = 'success';
      const accessToken = resp?.data?.access_token;
      console.log(resp, accessToken)
      // const {refreshToken = ''} = resp;
      response = await hipiLogin({ accessToken , refreshToken :'' });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

const [login, clearLogin] = apiMiddleWare(loginOneTap, transformSuccess, transformError);

export { login, clearLogin };

