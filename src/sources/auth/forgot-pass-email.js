import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/auth';

async function forgotPassword(email) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('userApi')}/v1/user/passwordforgottenemail`;
    response = await post(apiPath,email,{'content-type': 'json'});
    response.data.requestedWith = { email };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [resetPasswordEmail] = apiMiddleWare(forgotPassword, transformSuccess, transformError);

export { resetPasswordEmail };
