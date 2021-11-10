import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformError, transformSuccess } from '../transform/auth/verify-user';
import { sendOTP } from './send-otp';

const getUserVerify = async (mobile) => {
  let response = {};
  try {
    const urlencoded = new URLSearchParams();
    urlencoded.append('mobile', mobile);
    const apiPath = `${getApiBasePath('login')}/getUserToken.php`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded'
    });
    response.data.status = 200;
    response.data.message = 'success';
   if(response.data.code === 0){ 
     const resp = await sendOTP(mobile);
     response.data.sendOtp = resp.data;}
     return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getUserVerifyOnly = async (payload) => {
  let response = {};
  let value = payload.type === 'mobile' ? 'mobile' : 'email';
  try {
    const urlencoded = new URLSearchParams();
    urlencoded.append(value, payload[value]);
    const apiPath = `${getApiBasePath('login')}/getUserToken.php`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded'
    });
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [verifyUser, cleanVerifyUser] = apiMiddleWare(getUserVerify, transformSuccess, transformError);
const [verifyUserOnly, cleanVerifyUserOnly] = apiMiddleWare(getUserVerifyOnly, transformSuccess, transformError);

export { verifyUser, cleanVerifyUser, verifyUserOnly };
