import { post } from 'network';
import { getApiBasePath } from '../../../config';
import { apiMiddleWare } from '../../../network/utils';
import { transformError, transformSuccess } from '../../transform/social/google/register-one-tap';
import { hipiLogin } from '../../auth/login';

const regitserUserOneTap = async ({
  token = ''
}) => {
  let response = {};
  try {
    const payload = {
     token
    };

    const apiPath = `${getApiBasePath('userApi')}/v4/user/registergoogle`;
    const resp = await post(apiPath, payload, {
    });
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

const [register, clearRegister] = apiMiddleWare(regitserUserOneTap, transformSuccess, transformError);

export { register, clearRegister };
