import canUseDom from 'can-use-dom';
import cloneDeep from 'lodash/cloneDeep';
import { setItem } from './cookie';
import { GUEST_TOKEN, NO_SUPPORT } from '../constants';
import { toTrackMixpanel } from '../analytics/mixpanel/events';
import { track } from '../analytics';
import { toTrackClevertap } from '../analytics/clevertap/events';
import { localStorage } from './storage';

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


export const share = ({id,creatorId, userName, pageName,tabName, type = 'video', playlistId, playlistName }) => {
 const mixpanel = {
   video : toTrackMixpanel &&  toTrackMixpanel('share',{pageName:pageName, tabName:tabName && tabName, playlistId, playlistName, isPlaylist: (playlistId !== "NA" ? true : false)},{content_id:id, userId:creatorId, userName:userName }),
   profile : ''
 }

 const clevertap = {
  video : toTrackClevertap &&  toTrackClevertap('share',{pageName:pageName, tabName:tabName && tabName},{content_id:id, userId:creatorId, userName:userName }),
  profile : ''
 }

  if (navigator?.share) {
   try{ 
   if(type) {
    mixpanel[type];
    clevertap[type];
   }
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
  }else{
    // let msg = "inside alert"
    const url = document?.location?.href;
    console.log("url",url)
    let domain = (new URL(url));
    domain = domain?.hostname;
    // msg = `${msg}, domain = ${domain}`
    const shareUrl = {
      video : id && domain &&`https://${domain}/video/${id}`,
      profile : id && domain && `https://${domain}/${id}`
    }
    console.log("tyeefinal",shareUrl[type])
     const finalUrl = (type && (shareUrl[type])) || document?.location?.href;
    //  msg = `${msg}, finalUrl = ${finalUrl}`
    window.open(`https://api.whatsapp.com/send?text=${finalUrl}`);
    console.log("no navigator share, redirected to whatsap share page")
    // alert(`no navigator share, redirected to whatsap share page ${msg}`);
   return;
  }
  return Promise.reject(NO_SUPPORT);
};

export const showPwaInstall = async({pageName='', tabName=''})=>{
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window?.deferredPrompt;
    if (!promptEvent) {
      console.info("prompt not found",promptEvent)
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent?.prompt();
    promptEvent && toTrackMixpanel('popupLaunch',{pageName:pageName, tabName:(tabName && tabName) || '', name:'PWA Install Native'})

    // after user choice 
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    if(result?.outcome){
     try{
       if(result.outcome === "accepted"){
        toTrackMixpanel('popupCta',{pageName:pageName || '', tabName:(tabName && tabName) || '',name:'PWA Install Native',ctaName:'Install', elemant:'Install'});
        toTrackMixpanel('pwaInstallClickSuccess',{pageName:pageName || '', tabName:(tabName && tabName) || ''});
        window.deferredPrompt = null;
        localStorage.set("PwaPromptPresent",'false');
        // setTimeout(()=>{
        //   try{  
        //     // console.log('current page',window.location.href);
        //     const currentPage = typeof window !== "undefined" && window?.location?.href;
        //     window.location.href = currentPage;
        //     }catch(e){
        //       console.error('error in page refreshing',e);
        //     }
        // },1000)
      }}catch(e){
        toTrackMixpanel('pwaInstallClickError',{pageName:pageName || '', tabName:(tabName && tabName) || ''});
      }
      result.outcome === "dismissed" && toTrackMixpanel('popupCta',{pageName:pageName || '', tabName:(tabName && tabName) || '',name:'PWA Install Native',ctaName:'Cancel', elemant:'Cancel'});
    }
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    // deferredPrompt = null;
 }


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
