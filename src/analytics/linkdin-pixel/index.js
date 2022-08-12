/* eslint-disable max-len */
import { MIXPANEL_PROD } from '../../constants';
import { inject } from '../async-script-loader';
import queue from '../queue';

export async function initLinkdin() {
  // TODO get this from env
  // const mixpanelID = process?.env?.APP_ENV === 'production' ? MIXPANEL_PROD : MIXPANEL_DEV
//   const mixpanelId = MIXPANEL_PROD;
//   console.log("detail",process?.env?.APP_ENV === 'production',mixpanelId)
  // eslint-disable-next-line quotes
//   const scriptSrc = `<script type="text/javascript"> _linkedin_partner_id = "4069492"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id); </script><script type="text/javascript"> (function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk); </script> <noscript> <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=4069492&fmt=gif" /> </noscript>`;
//   return inject('', scriptSrc);
}

// export const isLoaded = () => (window.mixpanel);

// export const flushQueue = () => {
//   queue.getAll().forEach(item => {
//     window.mixpanel && window.mixpanel.track(item);
//     queue.remove();
//   });
// };

export function track(event, payload) {

//   if (isLoaded()) { 
//     // console.log('MIX - ',event, payload)
//     // // flushQueue();
//     //  window?.mixpanel?.track(event,payload);
//   } else {
    // console.log('mixpanel not loaded')
    // queue.push({
    //   event,
    //   ...payload
    // });
//   }
}
