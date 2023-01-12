import { get, post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/auth/verify-otp';
import { hipiLogin } from './login';

async function validateOTP({
  info, otp, guestToken = 'null', platform = 'web', cookieId = '', version = '2.50.19'
}) {
  let response = {};
  try {
    /* eslint-disable max-len */
    const apiPath = `${getApiBasePath('preprodAuth')}/v1/user/verifyotp`;
    const resp = await post(apiPath,{
        ...info,
        "otp": otp,
         "guest_token": guestToken,
         "platform": "web",
        "version":"27.0202065"
    },{'content-type' : 'application/json',"ref-origin-id":"2"});
    resp.data.requestedWith = {
      info, otp, platform, guestToken
    };
    console.log("response*",resp);
    const accessToken = resp?.data?.access_token;
    const refreshToken = resp.data.refresh_token;
    response = await hipiLogin({ accessToken, refreshToken, mobile:info?.phoneno });
    return Promise.resolve(response);
  } catch (err) {
    console.error("error verify-otp",err)
    return Promise.reject(err);
  }
}
const [verifyOTP, clearVerfiyOTP] = apiMiddleWare(validateOTP, transformSuccess, transformError);

export { verifyOTP, clearVerfiyOTP };
