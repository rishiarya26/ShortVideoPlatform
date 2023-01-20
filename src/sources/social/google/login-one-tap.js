
import { post } from 'network';
import { getApiBasePath } from '../../../config';
import { apiMiddleWare } from '../../../network/utils';
import { hipiLogin } from '../../auth/login';
import { transformError, transformSuccess } from '../../transform/social/google/login-one-tap';

const loginOneTap = async (
    token
   ) => {
      console.log(token)
    let response = {};
    const payload = {
      access_token: token
    }
    try {
      const apiPath = `${getApiBasePath('preprodAuth')}/v2/user/logingoogle`;
      const resp = await post(apiPath, payload,
        {
          'content-type' : 'application/json',
          'ref-origin-id': '2',
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

