import { post } from 'network';
import { getApiBasePath } from '../../config';
/* eslint-disable import/no-cycle */
import { apiMiddleWare } from '../../network/utils';
import { setItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';

const login = async ({ accessToken, refreshToken }) => {
  let response = {};
  // const url = window.location.href;
  // let domain = (new URL(url));
  // domain = domain.hostname;
  // console.log(domain);
  try {
    // TO-DO segregate doamin fetcing code
    const url = window?.location?.href;
    let domain = (new URL(url));
    domain = domain?.hostname;
    console.log(domain);
    const urlencoded = new URLSearchParams();
    urlencoded.append('zee5Token', accessToken);
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/login`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded'
    });
    const tokens = {
      shortsAuthToken: response.data.shortsAuthToken,
      accessToken,
      refreshToken
    };
    setItem('tokens', JSON.stringify(tokens), { path: '/', domain });
    const userId = response?.data?.userDetails?.id;
    localStorage.set('user-id', userId);
    response.data.accessToken = accessToken;
    response.data.status = 200;
    response.data.message = 'success';
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [hipiLogin, clearHipiLogin] = apiMiddleWare(login, transformSuccess, transformError);

export { hipiLogin, clearHipiLogin };
