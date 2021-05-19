import { userLogin } from '.';
import { hipiLogin } from './hipi-login';
import { transformError, transformSuccess } from '../transform/auth/pre-conditon';
import { apiMiddleWare } from '../../network/utils';
import { getItem, setItem } from '../../utils/cookie';

const getPreConditionTokens = async () => {
  let response = {};
  try {
    let payload = {};
    const itemsToSetCookies = {
      mobile: '',
      email: 'akrao123@gmail.com',
      password: '123456',
      guest_token: 'null',
      aid: 'djsucgius',
      platform: 'web',
      version: '27.0202065'
    };
    setItem('userDetails', JSON.stringify(itemsToSetCookies));
    payload = getItem('userDetails');
    payload = JSON.parse(payload);
    if (payload) {
      const resp = await userLogin(payload);
      const zee5Token = resp.data.access_token;
      response = await hipiLogin({ zee5Token });
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
