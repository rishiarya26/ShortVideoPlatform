/* eslint-disable max-len */
import { get } from 'network';
// import { getApiBasePath } from '../../config';
// import { apiMiddleWare } from '../../network/utils';
// import { transformSuccess, transformError } from '../transform/explore/top';

async function detectCountry() {
  let response = {};
  try {
    const apiPath = `https://ipapi.co/json/`;
    response = await get(apiPath,null, {'content-type':'noHeaders'});
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { detectCountry };
