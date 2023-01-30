import { get,post } from 'network';
import { getApiBasePath } from '../../config';
import { ESK } from '../../constants';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { transformSuccess, transformError } from '../transform/auth/send-otp';

async function dispatchOTP(info) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('preprodAuth')}/v1/user/sendotp`;
    const deviceId = 'device' || getItem('guest-token');
    response = await post(apiPath,{
          ...info,
          "platform_name": "web",
          "hash_id": "FA+9qCX9VSu"
      },
      {
        'content-type' : 'application/json',
        'device_id': deviceId,
        'esk': ESK,
        'platform': 'hipi',
      }
    );
    response.data.requestedWith = { info };
    return Promise.resolve(response);
  } catch (err) {
    console.error("error- sendotp",err)
    return Promise.reject(err);
  }
}
const [sendOTP] = apiMiddleWare(dispatchOTP, transformSuccess, transformError);

export { sendOTP };
