import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';
import { sendOTP } from './send-otp';

const getUserVerify = async mobile => {
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
    const resp = await sendOTP(mobile);
    response.data.sendOtp = resp.data;
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [verifyUser, cleanVerifyUser] = apiMiddleWare(getUserVerify, transformSuccess, transformError);

export { verifyUser, cleanVerifyUser };
