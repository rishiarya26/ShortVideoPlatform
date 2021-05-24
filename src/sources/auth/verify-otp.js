import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/auth/verify-otp';

async function validateOTP({ mobile, otp, guestToken, platform='web', cookieId}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('otp')}/device/verifyotp_v1.php?
    phoneno=${mobile}&
    otp=${otp}&
    guest_token=${guestToken}&
    platform=${platform}&
    aid=${mobile}&
    lotame_cookie_id=${cookieId}&
    version=${version}`;
    response = await get(apiPath);
    response.data.requestedWith = { page, total };
    console.log(type, response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [verifyOTP, clearVerfiyOTP] = apiMiddleWare(validateOTP, transformSuccess, transformError);

export { verifyOTP, clearVerfiyOTP };