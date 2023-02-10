/* eslint-disable import/no-cycle */
import { post } from 'network';
import { getApiBasePath } from '../../config';
import { ESK_ENV } from '../../constants';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { getEsk } from '../../utils/eskGenerator';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';
import { hipiLogin } from './login';

const register = async ({
  type, value, firstName, lastName, dob, gender, otp
}) => {
  let signupData = {
    firstName: firstName,
    lastName: lastName,
    birthday: new Date(dob).getFullYear(),
    gender: gender
  }
  const deviceId = getItem('guest-token');
  let response = {};
  // TO-DO take care of aid, guestoken & verison_number
  try {
    const payload = {
      [type]: value,
      first_name: firstName,
      last_name: lastName,
      gender,
      dob,
      otp,
      // partner_key: 'zee5',
      // password,
      // birthday,
      // aid: '02b2fecc-b0ec-44d3-b68f-4d927bf05863',
      // appsflyer_id: '1617441698955-1824654386516053207',
      additional: {
        guest_token: 'Z5X_09c303a8591ab6b017b2f60c90ae04668f659631d7f73a6afd2b91ee0fb8fbfa',
        sourceapp: 'Web',
        version_number: '30.1602365.0-76960fb',
        platform_name: 'hipi'
      }
    };
    const apiPath = `${getApiBasePath('preprodAuth')}/v1/user/registerWithOTPMobileorEmail`;
    const resp = await post(apiPath, payload,
      {
        'content-type': 'application/json',
        'device_id': deviceId,
        'esk': getEsk({deviceId, env: ESK_ENV}),
        'platform': 'hipi',
      }
    );
    resp.data.status = 200;
    resp.data.message = 'success';
    const accessToken = resp?.data?.access_token;
    const refreshToken = resp?.data?.refresh_token;
    // setTimeout(async()=>{
      response = await hipiLogin({ accessToken, refreshToken, ...(type === "email" ? {"email": value} : {"mobile": value}), signupData});
    // },[2000]);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [registerUser, clearRegisterUser] = apiMiddleWare(register, transformSuccess, transformError);

export { registerUser, clearRegisterUser };
