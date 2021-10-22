import parseResponse from './parse-response';
import { getUserId } from '../utils/user';

const options = (methodName, body, headersOpt = {}) => {
  switch (headersOpt['content-type']) {
    case 'application/x-www-form-urlencoded': return {
      method: methodName,
      ...body && { body },
      headers: {
        Accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'guest-token': getUserId(),
        ...headersOpt
      }
    };
    case 'multipart/form-data': return {
      method: methodName,
      ...body && { body },
      headers: {
        Accept: '*/*',
        'content-type': 'multipart/form-data',
        // 'guest-token': getUserId(),
        ...headersOpt
      }
    };
    case 'application/json': return {
      method: methodName,
      ...body && { body: JSON.stringify(body) },
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'guest-token': getUserId(),
        ...headersOpt
      }
    };
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
  setTimeout(() => reject(new Error('request timed out')), 5000);
});

// eslint-disable-next-line max-len
const createFetcher = methodName => (url, body, headers) => Promise.race([fetch(url, options(methodName, body, headers)), timeout()]).then(parseResponse);
export const get = createFetcher('get');
export const post = createFetcher('post');
export const put = createFetcher('put');
export const patch = createFetcher('patch');
export const del = createFetcher('delete');
