import parseResponse from './parse-response';
import { getUserId } from '../utils/user';

const options = (methodName, body, headersOpt = {},formData) => {
  switch (headersOpt['content-type']) {
    case 'application/x-www-form-urlencoded': return {
      method: methodName,
      ...body && { body },
      headers: {
        Accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        ...headersOpt
      }
    };
    case 'multipart/form-data': return {
      method: methodName,
      ...body && { body },
      headers: {
        Accept: '*/*',
        'content-type': '',
        // 'guest-token': getUserId(),
        ...headersOpt
      }
    };
    case 'application/json': return {
      method: methodName,
      ...body && { body: JSON.stringify(body) },
      headers: {
        Accept: 'application/json',
        // 'content-type': 'application/json',
        // 'guest-token': getUserId(),
        ...headersOpt
      }
    };
    case 'form-data': return {
      method: methodName,
      ...body && { body: body },
      headers: {
        Accept: '*/*',
        // 'content-type': 'form-data',
        // 'content-type': 'application/json',
        // 'guest-token': getUserId(),
        ...formData
      }
    };
    case 'json': return {
      method: methodName,
      ...body && { body: JSON.stringify(body) },
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      }
    };
    // case 'customHeaders': return {
    //   method: methodName,
    //   ...body && { body: JSON.stringify(body) },
    //   headers: {
    //    ...headersOpt
    //   }
    // };
    case 'noHeaders': return {
      method: methodName,
      ...body && { body: JSON.stringify(body) },
      headers: {
        // Accept: 'application/json',
        // 'content-type': 'application/json',
        // 'guest-token': getUserId(),
        // ...headersOpt
      }
    };
    default: return {
      method: methodName,
      ...body && { body: JSON.stringify(body) },
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'guest-token': getUserId(),
        ...headersOpt
      }
    };
  }
};

const timeout = () => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('request timed out')), 30000);
});

// eslint-disable-next-line max-len
const createFetcher = methodName => (url, body, headers,formData) => Promise.race([fetch(url, options(methodName, body, headers,formData)), timeout()]).then(parseResponse);
export const get = createFetcher('get');
export const post = createFetcher('post');
export const put = createFetcher('put');
export const patch = createFetcher('patch');
export const del = createFetcher('delete');
