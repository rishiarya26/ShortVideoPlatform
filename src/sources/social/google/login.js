import { post } from 'network';
import { getApiBasePath } from '../../../config';
import { apiMiddleWare } from '../../../network/utils';
import { hipiLogin } from '../../auth/login';
import { transformError, transformSuccess } from '../../transform/social/google/login-one-tap';

const loginGoogle = async ({
  googleToken = ''
  }) => {
    const payload = {
        access_token: googleToken
       };
   
    let response = {};
    try {
      console.log("inside source","| token :", googleToken, "payload : ",payload)
      const apiPath = `${getApiBasePath('oldUserApi')}/v2/user/logingoogle`;
      const resp = await post(apiPath,payload,{'content-type':'json'});
      console.log("api finished", resp)
      resp.data.status = 200;
      resp.data.message = 'success';
      const accessToken = resp?.data?.access_token;
      // const refreshToken = resp?.data?.refresh_token;
      response = await hipiLogin({ accessToken, refreshToken: '' });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

const [login, clearLogin] = apiMiddleWare(loginGoogle, transformSuccess, transformError);

export { login, clearLogin };

