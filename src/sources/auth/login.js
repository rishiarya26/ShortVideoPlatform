import { post } from 'network';
import { getApiBasePath } from '../../config';
import { init } from '../../get-social';
/* eslint-disable import/no-cycle */
import { apiMiddleWare } from '../../network/utils';
import { setItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';
import { transformError, transformSuccess } from '../transform/auth/hipiLogin';

const login = async ({ accessToken, refreshToken='',getSocialToken, signupData=null }) => {
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
    console.log("cookie set domain",domain);
    const urlencoded = new URLSearchParams();
    urlencoded.append('zee5Token', accessToken);
    if(signupData){
      urlencoded.append('lastName', signupData?.lastName);
      urlencoded.append('firstName', signupData?.firstName);
      urlencoded.append('gender', signupData?.gender);
      urlencoded.append('dateOfBirth',signupData?.birthday);
    }
    const apiPath = `${getApiBasePath('hipi')}/v1/shorts/login`;
    response = await post(apiPath, urlencoded, {
      'content-type': 'application/x-www-form-urlencoded'
    });
    const tokens = {
      shortsAuthToken: response.data.shortsAuthToken,
      accessToken,
      refreshToken,
      getSocialToken: response.data.getSocialToken
    };
    // setItem('tokens', JSON.stringify(tokens), { path: '/', domain });
    localStorage.set('tokens',tokens);
    const userId = response?.data?.userDetails?.id;
    const userDetails = response?.data?.userDetails;
    localStorage.set('user-id', userId);
    localStorage.set('user-details',userDetails);
    setTimeout(()=>{
      init();
    },200)
    // setItem('user-id', JSON.stringify(userId), { path: '/', domain });
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
