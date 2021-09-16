import canUseDom from 'can-use-dom';
import cloneDeep from 'lodash/cloneDeep';
import { setItem } from './cookie';
import { GUEST_TOKEN, NO_SUPPORT } from '../constants';

export const getNewObjectCopy = ogObj => (cloneDeep(ogObj));

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

export const generateUUID = persist => {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = Math.random() * 16 | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
  if (persist) {
    setItem('guest-token',uuid,{ path: '/' });
  }
  return uuid;
};



export const share = (id) => {
  // const url = document?.location?.href;
  // let domain = (new URL(url));
  // domain = domain?.hostname;
  // const finalUrl = (id && domain && `https://${domain}/video${id}`) || document?.location?.href;
  // console.log(`https://${domain}/video/${id}`)
  // console.log(finalUrl)
  if (navigator.share) {
   try{ 
    const url = document?.location?.href;
    let domain = (new URL(url));
    domain = domain?.hostname;
    const finalUrl = (id && domain && `https://${domain}/video/${id}`) || document?.location?.href;
   
    // const canonicalElement = document.querySelector('link[rel=canonical]');
    // const url = canonicalElement?.href || document.location.href;
    return navigator.share({
      url : finalUrl
    });
  }catch(e){
    alert('something went wrong',e)
  }
  }
  return Promise.reject(NO_SUPPORT);
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
