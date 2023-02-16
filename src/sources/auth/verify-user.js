import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { transformError, transformSuccess } from '../transform/auth/verify-user';
import { sendOTP } from './send-otp';
import { getEsk } from '../../utils/eskGenerator';
import { ESK_ENV } from '../../constants';

const getUserVerify = async (info) => {
  let response = {};
  let value = info.type === 'mobile' ? 'mobile' : 'email';
  const deviceId = getItem('guest-token');
  try {
    const urlencoded = new URLSearchParams();
    urlencoded.append(value, info[value]);
    const apiPath = `${getApiBasePath('userApi')}/v1/user/getUserToken`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded',
      'device_id': deviceId,
      'esk': getEsk({deviceId, env: ESK_ENV}),
      'platform': 'hipi',
    });
    response.data.status = 200;
    response.data.message = 'success';
      const payload = value === "mobile" ? {"phoneno": info.mobile} : {"email": info.email};
      const resp = await sendOTP(payload);
      response.data.sendOtp = resp.data;
     return Promise.resolve(response);
  } catch (err) {
    console.log("err", err);
    return Promise.reject(err);
  }
};

const getUserVerifyOnly = async (payload) => {
  let response = {};
  let value = payload.type === 'mobile' ? 'mobile' : 'email';
  const deviceId = getItem('guest-token');
  try {
    const urlencoded = new URLSearchParams();
    urlencoded.append(value, payload[value]);
    const apiPath = `${getApiBasePath('userApi')}/v1/user/getUserToken`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded',
      'device_id': deviceId,
      'esk': getEsk({deviceId, env: ESK_ENV}),
      'platform': 'hipi',
    });
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    console.log("debug err", err);
    return Promise.reject(err);
  }
};

const [verifyUser, cleanVerifyUser] = apiMiddleWare(getUserVerify, transformSuccess, transformError);
const [verifyUserOnly, cleanVerifyUserOnly] = apiMiddleWare(getUserVerifyOnly, transformSuccess, transformError);

export { verifyUser, cleanVerifyUser, verifyUserOnly };
