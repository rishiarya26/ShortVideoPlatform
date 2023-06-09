import { post } from 'network';
import { getApiBasePath } from '../../../config';
import { apiMiddleWare } from '../../../network/utils';
import { transformError, transformSuccess } from '../../transform/social/google/register-one-tap';
import { hipiLogin } from '../../auth/login';

const regitserUser = async ({
  token = ''
}) => {
  let response = {};
  try {
    const payload = {
        "token": token,
        "mac_address": "",
        "ip_address": "",
        "registration_country": "IN",
        "registration_region": "",
        "additional": {
            "additionalProp1": "",
            "additionalProp2": "",
            "additionalProp3": ""
        }
    };

    const apiPath = `${getApiBasePath('oldUserApi')}/v2/user/registergoogle`;
    const resp = await post(apiPath, payload, { 'conetent-type' : 'noHeaders'});
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

const [register, clearRegister] = apiMiddleWare(regitserUser, transformSuccess, transformError);

export { register, clearRegister };
