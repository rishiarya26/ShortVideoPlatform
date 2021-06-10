import { get } from 'network';
import { getApiBasePath } from '../../config';
import { hipiLogin } from '../../mock/seeds/auth/hipi-login';
import { apiMiddleWare } from '../../network/utils';
import { setItem } from '../../utils/cookie';
import { transformSuccess, transformError } from '../transform/auth/verify-otp';

async function validateOTP({
  mobile, otp, guestToken = "null", platform = 'web', cookieId, version = '2.50.19'
}) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('otp')}/device/verifyotp_v1.php?phoneno=${mobile}&otp=${otp}&guest_token=${guestToken}&platform=${platform}&aid=${mobile}&lotame_cookie_id=${cookieId}&version=${version}`;
    const resp = await get(apiPath);
    console.log(resp)
    resp.data.requestedWith = {
      mobile, otp, platform, guestToken
    };
    const zee5Token = resp.data.access_token;
    response = await hipiLogin({ zee5Token });
    const tokens = {
      shortsAuthToken: response.data.shortsAuthToken,
      accessToken: zee5Token,
      refreshToken: resp.data.refresh_token
    };
    setItem('tokens', JSON.stringify(tokens), { path: '/' });
    response.data.accessToken = zee5Token;
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [verifyOTP, clearVerfiyOTP] = apiMiddleWare(validateOTP, transformSuccess, transformError);

export { verifyOTP, clearVerfiyOTP };
