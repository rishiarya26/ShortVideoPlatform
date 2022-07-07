import canUseDom from 'can-use-dom';
import cloneDeep from 'lodash/cloneDeep';
import { setItem } from './cookie';
import { GUEST_TOKEN, NO_SUPPORT } from '../constants';
import { toTrackMixpanel } from '../analytics/mixpanel/events';
import { track } from '../analytics';

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
    let expireTime = new Date();
    expireTime = new Date(expireTime?.getTime() +3600 * 1000 * 24 * 365 * 10);
    setItem('guest-token',uuid,{ path: '/', expires: expireTime?.toGMTString() });
  }
  return uuid;
};


export const share = ({id,creatorId, userName, pageName,tabName, type = 'video' }) => {
  console.log("tyee",type)
 const mixpanel = {
   video : toTrackMixpanel &&  toTrackMixpanel('share',{pageName:pageName, tabName:tabName && tabName},{content_id:id, userId:creatorId, userName:userName }),
   profile : ''
 }

  if (navigator.share) {
   try{ 
   type && mixpanel[type];
    const url = document?.location?.href;
    console.log("url",url)
    let domain = (new URL(url));
    domain = domain?.hostname;
   
    const shareUrl = {
      video : id && domain &&`https://${domain}/video/${id}`,
      profile : id && domain && `https://${domain}/${id}`
    }
    console.log("tyeefinal",shareUrl[type])
     const finalUrl = (type && (shareUrl[type])) || document?.location?.href;
     console.log("final",finalUrl)
    // const canonicalElement = document.querySelector('link[rel=canonical]');
    // const url = canonicalElement?.href || document.location.href;
    return navigator.share({
      url : finalUrl
    });
  }catch(e){
    console.error('something went wrong during share',e)
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
