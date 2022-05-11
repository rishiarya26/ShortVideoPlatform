/* eslint-disable max-len */
import { get } from 'network';
// import { getApiBasePath } from '../../config';
// import { apiMiddleWare } from '../../network/utils';
// import { transformSuccess, transformError } from '../transform/explore/top';

async function detectGeoLocation() {
  let response = {};
  try {
    const apiPath = `https://ipapi.co/json/`;
    response = await get(apiPath,null, {'content-type':'noHeaders'});
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function detectGeoLocationByZee() {
  let response = {};
  try {   
    const apiPath = `https://xtra.zee5.com/country`;
    response = await get(apiPath,null, {'content-type':'noHeaders'});
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { detectGeoLocation, detectGeoLocationByZee };
