import { post } from 'network';
import { getApiBasePath } from '../../config';
/* eslint-disable import/no-cycle */
import { apiMiddleWare } from '../../network/utils';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';
import { hipiLogin } from './login';

const register = async ({
  type, value, firstName, lastName = '', password, birthday, gender
}) => {
  let response = {};
  // TO-DO take care of aid, guestoken & verison_number
  try {
    const payload = {
      type,
      value,
      first_name: firstName,
      last_name: lastName,
      partner_key: 'zee5',
      password,
      birthday,
      gender,
      aid: '02b2fecc-b0ec-44d3-b68f-4d927bf05863',
      appsflyer_id: '1617441698955-1824654386516053207',
      additional: {
        guest_token: 'Z5X_09c303a8591ab6b017b2f60c90ae04668f659631d7f73a6afd2b91ee0fb8fbfa',
        sourceapp: 'Web',
        version_number: '30.1602365.0-76960fb',
        platform: 'Web'
      }
    };
    const apiPath = `${getApiBasePath('whapi')}/v2/userRegistration`;
    const resp = await post(apiPath, payload, {
    });
    resp.data.status = 200;
    resp.data.message = 'success';
    const accessToken = resp?.data?.token;
    const refreshToken = resp?.data?.refresh_token;
    response = await hipiLogin({ accessToken, refreshToken });
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [registerUser, clearRegisterUser] = apiMiddleWare(register, transformSuccess, transformError);

export { registerUser, clearRegisterUser };
