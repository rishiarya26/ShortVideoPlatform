import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformError, transformSuccess } from '../transform/auth';

const login = async ({ email = 'akrao123@gmail.com', password = '123456', mobile = '' }) => {
  let response = {};
  try {
    const payload = {
      mobile,
      email,
      password,
      guest_token: 'null',
      aid: 'djsucgius',
      platform: 'web',
      version: '27.0202065'
    };
    const apiPath = `${getApiBasePath('login')}/loginemail_v2.php`;
    response = await post(apiPath, payload, {
    });
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [userLogin, clearUserLogin] = apiMiddleWare(login, transformSuccess, transformError);

export { userLogin, clearUserLogin };
