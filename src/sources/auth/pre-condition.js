import { userLogin } from '.';
import { hipiLogin } from './hipi-login';
import { transformError, transformSuccess } from '../transform/auth/pre-conditon';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';

const getPreConditionTokens = async () => {
  let response = {};
  try {
    let payload = {};
    payload = getItem('userDetails');
    if (payload) {
      const resp = await userLogin(payload);
      const zee5Token = resp.data.access_token;
      response = await hipiLogin({ zee5Token: resp.data.zee5Token });
      response.data.accessToken = zee5Token;
      response.data.status = 200;
      response.data.message = 'success';
    }
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [preCondition, clearPreCondition] = apiMiddleWare(getPreConditionTokens, transformSuccess, transformError);

export { preCondition, clearPreCondition };
