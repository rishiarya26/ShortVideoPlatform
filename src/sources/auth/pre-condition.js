import { userLogin } from '.';
import { hipiLogin } from './hipi-login';
import { transformError, transformSuccess } from '../transform/auth/pre-conditon';
import { apiMiddleWare } from '../../network/utils';
import { setItem } from '../../utils/cookie';

const getPreConditionTokens = async () => {
  let response = {};
  try {
    // setItem('userDetails', JSON.stringify(itemsToSetCookies));
    // payload = getItem('userDetails');
    // payload = JSON.parse(payload);
    // if (payload) {
    const resp = await userLogin();
    const zee5Token = resp.data.access_token;
    response = await hipiLogin({ zee5Token });
    const tokens = {
      shortsAuthToken: response.data.shortsAuthToken,
      accessToken: zee5Token,
      refreshToken: resp.data.refresh_token
    };
    setItem('tokens', JSON.stringify(tokens));
    response.data.accessToken = zee5Token;
    response.data.status = 200;
    response.data.message = 'success';
    // }
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [preCondition, clearPreCondition] = apiMiddleWare(getPreConditionTokens, transformSuccess, transformError);

export { preCondition, clearPreCondition };
