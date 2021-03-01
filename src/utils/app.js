import canUseDom from 'can-use-dom';

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

export function asyncMemoize(_promise, transformSuccess = data => (data), transformError = data => (data)) {
  const cache = {};
  let cacheKey = '';
  const wrapped = async (params = {}) => {
    let resp = {};
    try {
      cacheKey = JSON.stringify(params);
      const cachedItem = cache[cacheKey];
      if (cachedItem) {
        console.info('cache hit', cacheKey);
        return resolvePromise(cachedItem);
      }
      console.info('cache miss', cacheKey);
      resp = await _promise(params);
      if (isObjectEmpty(resp)) {
        resp = null;
      }
      if (!resp) {
        return _promise(params);
      }
      cache[cacheKey] = transformSuccess(resp);
      return resolvePromise(resp);
    } catch (e) {
      return rejectPromise(transformError(e));
    }
  };

  const clearCache = () => {
    delete cache[cacheKey];
    return true;
  };
  return [wrapped, clearCache];
}
