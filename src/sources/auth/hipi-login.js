
import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';

const login = async ({ zee5Token }) => {
  let response = {};
  try {
    const payload = {
      zee5Token
    };
    const apiPath = `${getApiBasePath('hipiLogin')}/v1/shorts/login`;
    response = await post(apiPath, payload, {
    });
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [hipiLogin, clearHipiLogin] = apiMiddleWare(login, transformSuccess, transformError);

export { hipiLogin, clearHipiLogin };
