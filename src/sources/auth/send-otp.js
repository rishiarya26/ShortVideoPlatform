import { post } from 'network';
import { getApiBasePath } from '../../config';
import { ESK_ENV } from '../../constants';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { transformSuccess, transformError } from '../transform/auth/send-otp';
import { getEsk } from "../../utils/eskGenerator";

async function dispatchOTP(info) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('preprodAuth')}/v1/user/sendotp`;
    const deviceId = getItem('guest-token');
    response = await post(apiPath,{
          ...info,
          "platform_name": "hipi",
          "hash_id": "FA+9qCX9VSu"
      },
      {
        'content-type' : 'application/json',
        'device_id': deviceId,
        'esk': getEsk({deviceId, env: ESK_ENV}),
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
