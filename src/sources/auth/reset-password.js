import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/auth';

async function forgotPassword({code, password}) {
  let response = {};
  let payload = {
    "code": code,
    "old_password": password,
    "new_password": password
}
  try {
    const apiPath = `${getApiBasePath('userApi')}/v1/user/recreatepasswordmobile`;
    response = await post(apiPath,payload,{'content-type': 'json'});
    response.data.requestedWith = { payload };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [createNewPassword] = apiMiddleWare(forgotPassword, transformSuccess, transformError);

export { createNewPassword };
