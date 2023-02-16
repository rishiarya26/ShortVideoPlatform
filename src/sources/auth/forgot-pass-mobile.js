import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/auth';

async function forgotPassword(mobile) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('oldUserApi')}/v2/user/passwordforgottenmobile`;
    response = await post(apiPath,mobile,{'content-type': 'json'});
    response.data.requestedWith = { mobile };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [resetPasswordMobile] = apiMiddleWare(forgotPassword, transformSuccess, transformError);

export { resetPasswordMobile };
