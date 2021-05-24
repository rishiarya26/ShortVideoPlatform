import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/auth/send-otp';

async function dispatchOTP({ mobile }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('otp')}/device/sendotp_v1.php?phoneno=${mobile}`;
    response = await get(apiPath);
    response.data.requestedWith = { page, total };
    console.log(type, response);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [sendOTP] = apiMiddleWare(dispatchOTP, transformSuccess, transformError);

export { sendOTP };
