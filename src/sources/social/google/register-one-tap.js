import { post } from 'network';
import { getApiBasePath } from '../../../config';
import { apiMiddleWare } from '../../../network/utils';
import { transformError, transformSuccess } from '../../transform/social/google/register-one-tap';
import { hipiLogin } from '../../auth/login';
import { getItem } from '../../../utils/cookie';
import { ESK } from '../../../constants';

const regitserUserOneTap = async ({
  token = ''
}) => {
  let response = {};
  const deviceId = 'device' || getItem('guest-token');
  try {
    const payload = {
     token
    };

    const apiPath = `${getApiBasePath('preprodAuth')}/v2/user/registergoogle`;
    const resp = await post(apiPath, payload,
      {
        'content-type' : 'application/json',
        'device_id': deviceId,
        'esk': ESK,
        'platform': 'hipi',
        'platform-hipi-google': 'hipi-android'
      });
    resp.data.status = 200;
    resp.data.message = 'success';
    const accessToken = resp?.data?.token;
    // const refreshToken = resp?.data?.refresh_token;
    response = await hipiLogin({ accessToken, refreshToken:'' });
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [register, clearRegister] = apiMiddleWare(regitserUserOneTap, transformSuccess, transformError);

export { register, clearRegister };
