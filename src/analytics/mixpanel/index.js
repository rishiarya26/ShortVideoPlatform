/* eslint-disable max-len */
import { MIXPANEL_PROD } from '../../constants';
import { inject } from '../async-script-loader';
import queue from '../queue';

export async function init() {
  // TODO get this from env
  // const mixpanelID = process?.env?.APP_ENV === 'production' ? MIXPANEL_PROD : MIXPANEL_DEV
  const mixpanelId = MIXPANEL_PROD;
  console.log("detail",process?.env?.APP_ENV === 'production',mixpanelId)
  // eslint-disable-next-line quotes
  const scriptSrc = `(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);mixpanel.init('${mixpanelId}');`;
  return inject('', scriptSrc);
}

export const isLoaded = () => (window.mixpanel);

// export const flushQueue = () => {
//   queue.getAll().forEach(item => {
//     window.mixpanel && window.mixpanel.track(item);
//     queue.remove();
//   });
// };

export function track(event, payload) {
  if (isLoaded()) { 
    console.log('MIX - ',event, payload)
    // flushQueue();
     window?.mixpanel?.track(event,payload);
  } else {
    console.log('mixpanel not loaded')
    queue.push({
      event,
      ...payload
    });
  }
}
