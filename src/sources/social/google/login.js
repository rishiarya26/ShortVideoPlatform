import { post } from 'network';
import { getApiBasePath } from '../../../config';
import { apiMiddleWare } from '../../../network/utils';
import { hipiLogin } from '../../auth/login';
import { transformError, transformSuccess } from '../../transform/social/google/login-one-tap';

const loginGoogle = async ({
    googleToken = 'ya29.a0ARrdaM_Bf0irjVMWd11bzp-vRh_suhiyCl3TQgY0fkB4O_oqgSlZLpwouzK8k8JcCYDf3QdBtLK_UsokAhCI9FJnZGXln5e0pRHFd0A36WkO66hJ7dUTmSiQ9jh4ouG_M0v7pcL4-cfP-ifBA7RJ0F9RlRQs0w'
  }) => {
    const payload = {
        access_token: googleToken
       };
   
    let response = {};
    try {
      const apiPath = `${getApiBasePath('userApi')}/v2/user/logingoogle`;
      const resp = await post(apiPath,payload,{'content-type':'noHeaders'});
      resp.data.status = 200;
      resp.data.message = 'success';
      const accessToken = resp?.data?.access_token;
      const refreshToken = resp?.data?.refresh_token;
      response = await hipiLogin({ accessToken, refreshToken });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

const [login, clearLogin] = apiMiddleWare(loginGoogle, transformSuccess, transformError);

export { login, clearLogin };

