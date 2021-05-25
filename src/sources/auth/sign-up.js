import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';

const mobileSignUp = async ({ mobile }) => {
  let response = {};
  try {
    const urlencoded = new URLSearchParams();
    urlencoded.append('mobile', mobile);
    const apiPath = `${getApiBasePath('hipi')}/v1/user/getUserToken.php`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded'
    });
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [signUp, clearSignUp] = apiMiddleWare(mobileSignUp, transformSuccess, transformError);

export { signUp, clearSignUp };
