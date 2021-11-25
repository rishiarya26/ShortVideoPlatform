/* eslint-disable max-len */
import { get } from 'network';
// import { getApiBasePath } from '../../config';
// import { apiMiddleWare } from '../../network/utils';
// import { transformSuccess, transformError } from '../transform/explore/top';

async function detectCountry() {
  let response = {};
  try {
    const apiPath = `http://ip-api.com/json`;
    response = await get(apiPath);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { detectCountry };
