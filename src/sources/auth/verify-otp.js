import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/auth/verify-otp';
import { hipiLogin } from './hipi-login';

async function validateOTP({
  mobile, otp, guestToken = 'null', platform = 'web', cookieId = '', version = '2.50.19', aid = '91955485578'
}) {
  let response = {};
  try {
    /* eslint-disable max-len */
    const apiPath = `${getApiBasePath('otp')}/device/verifyotp_v1.php?phoneno=${mobile}&otp=${otp}&guest_token=${guestToken}&platform=${platform}&aid=${aid}&lotame_cookie_id=${cookieId}&version=${version}`;
    const resp = await get(apiPath);
    resp.data.requestedWith = {
      mobile, otp, platform, guestToken
    };
    const zee5Token = resp.data.token;
    const refreshToken = resp.data.refresh_token;
    response = await hipiLogin({ zee5Token, refreshToken });
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [verifyOTP, clearVerfiyOTP] = apiMiddleWare(validateOTP, transformSuccess, transformError);

export { verifyOTP, clearVerfiyOTP };
