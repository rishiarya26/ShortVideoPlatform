import canUseDom from 'can-use-dom';
import { loadMockServer } from '../mock';

function objClone(clone, obj) {
  try {
    Object.keys(obj).forEach(i => {
      clone[i] = (typeof obj[i] === 'object' && obj[i] != null)
        ? this.objClone(obj[i].constructor(), obj[i]) : obj[i];
    });
  } catch (e) {
    return obj;
  }
  return clone;
}

export const getNewObjectCopy = ogObj => (objClone({}, ogObj));

// params in  getInitialProps [ err, req, res, pathname, query, asPath, AppTree ]
export const withRouteState = Component => {
  if (!Component.getInitialProps) {
    Component.getInitialProps = async (params = {}) => {
      let routeState = {};
      if (canUseDom) {
        const routeStateKey = params.asPath.replace(/\//g, '');
        routeState = JSON.parse(window.sessionStorage.getItem(routeStateKey) || {});
        window.sessionStorage.removeItem(routeStateKey);
      }
      return {
        pathname: params.pathname,
        query: params.query,
        asPath: params.asPath,
        routeState
      };
    };
  }
  return Component;
};

/** example
 * Router.pushState('/user, {name : ankit, age: 31})
 * This will work only on component in pages folder
 * pages/user.js ----
 * const User = props => {
 *  const {name, age} = props.routeState
 * return (
 *  <div>{name}</div>
 *  <div>{age}</div>
 * )
 * }
 * export default withRouteState(User)
 */

export const resolvePromise = (data = {}) => (new Promise(resolve => {
  resolve(data);
}));

export const rejectPromise = (data = {}) => (new Promise((resolve, reject) => {
  reject(data);
}));

export const isObjectEmpty = obj => (obj instanceof Object && Object.keys(obj || {}).length <= 0);

export function apiMiddleWare(_promise, transformSuccess = data => (data), transformError = data => (data), shouldCache = true) {
  const cache = {};
  let cacheKey = '';
  const wrapped = async (params = {}) => {
    let resp = {};
    try {
      await loadMockServer();
      cacheKey = JSON.stringify(params);
      const cachedItem = cache[cacheKey];
      if (cachedItem) {
        return resolvePromise(cachedItem);
      }
      resp = await _promise(params);
      if (isObjectEmpty(resp)) {
        resp = null;
      }
      if (!resp) {
        return _promise(params);
      }
      const tResponse = transformSuccess(resp);
      if (shouldCache) {
        cache[cacheKey] = tResponse;
      }
      return resolvePromise(tResponse);
    } catch (e) {
      e.status = resp.status;
      return rejectPromise(transformError(e));
    }
  };

  const clearCache = () => {
    delete cache[cacheKey];
    return true;
  };
  return [wrapped, clearCache];
}
