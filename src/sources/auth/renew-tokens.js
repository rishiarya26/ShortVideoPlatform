import { post } from 'network';
import { getApiBasePath } from '../../config';
/* eslint-disable import/no-cycle */
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';
import { transformSuccess, transformError } from '../transform/auth/renew-tokens';
import { hipiLogin } from './login';

async function refreshTokens() {
  let response = {};
  const tokens = localStorage.get('tokens');

  try {
    // const refresh = JSON.parse(tokens)?.refreshToken;
    const refresh = tokens?.refreshToken;
    const apiPath = `${getApiBasePath('userApi')}/v2/user/renew?refresh_token=${refresh}`;

    const resp = await post(apiPath);
    const accessToken = resp?.data?.access_token;
    const refreshToken = resp?.data?.refresh_token;
    response = await hipiLogin({ accessToken, refreshToken });
    response.data.requestedWith = { refreshToken };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [renewTokens] = apiMiddleWare(refreshTokens, transformSuccess, transformError);

export { renewTokens };
