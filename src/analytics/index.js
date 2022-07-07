import { init as initMixpanel, track as trackEvent } from './mixpanel';

let initiated = false;

export const init = () => {
  // setTimeout(()=>{
    initMixpanel();
  // },500);
  window.addEventListener('unload', () => {
    // flushQueue();
  });
  initiated = true;
};
export const track = (event, payload) => {
  // console.log(event,payload)
  if (!initiated) init();
  trackEvent(event, payload);
};

