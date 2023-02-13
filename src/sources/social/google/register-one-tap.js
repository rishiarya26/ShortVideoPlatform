import { post } from 'network';
import { getApiBasePath } from '../../../config';
import { apiMiddleWare } from '../../../network/utils';
import { transformError, transformSuccess } from '../../transform/social/google/register-one-tap';
import { hipiLogin } from '../../auth/login';
import { getItem } from '../../../utils/cookie';
import { ESK_ENV } from '../../../constants';
import { getEsk } from '../../../utils/eskGenerator';

const regitserUserOneTap = async ({
  token = ''
}) => {
  let response = {};
  const deviceId = getItem('guest-token');
  try {
    const payload = {
     token
    };

    const apiPath = `${getApiBasePath('preprodAuth')}/v2/user/registergoogle`;
    const resp = await post(apiPath, payload,
      {
        'content-type' : 'application/json',
        'device_id': deviceId,
        'esk': getEsk({deviceId, env: ESK_ENV}),
        'platform': 'hipi',
        'platform-hipi-google': 'hipi-android'
      });
    resp.data.status = 200;
    resp.data.message = 'success';
    const accessToken = resp?.data?.access_token;
    // const refreshToken = resp?.data?.refresh_token;
    response = await hipiLogin({ accessToken, refreshToken:'', isSignup: true });
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [register, clearRegister] = apiMiddleWare(regitserUserOneTap, transformSuccess, transformError);

export { register, clearRegister };
