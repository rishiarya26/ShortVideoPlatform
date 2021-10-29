
import { get } from 'network';
import { getApiBasePath } from '../../../config';
import { apiMiddleWare } from '../../../network/utils';
import { hipiLogin } from '../../auth/login';
import { transformError, transformSuccess } from '../../transform/social/google/login-one-tap';

const loginOneTap = async (
    token
   ) => {
      console.log(token)
    let response = {};
    try {
      const apiPath = `${getApiBasePath('userApi')}/v3/user/logingoogle?id_token=${token}`;
      const resp = await get(apiPath, null, {'content-type' : 'noHeaders'});
      resp.data.status = 200;
      resp.data.message = 'success';
      const accessToken = resp?.data?.token;
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

