import { post } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { getItem, setItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';
import { transformSuccess, transformError } from '../transform/get-social';

async function getSocialToken() {
  let response = {};
  const payload = {
      userId : getItem('guest-token')
  }
  try {
    const apiPath = 
    `${getApiBasePath(
      'hipi'
    )}/v1/shorts/guest-login`;
    response = await post(apiPath,payload,{
    'content-type': 'application/json'
    });
    console.log("user api guest RESP*",response);
    if(response?.data?.statusCode === 200){
      response?.data?.shortsAuthToken && localStorage.set('guest-get-social',response.data.shortsAuthToken)
    }
    return Promise.resolve(response);
  } catch (err) {
    return Promise.resolve({ data: '' });
  }
}
const [toGetSocialToken] = apiMiddleWare(
  getSocialToken,
  transformSuccess,
  transformError
);

export { toGetSocialToken };
