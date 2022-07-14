// import App from "next/app"
import { useEffect, useState } from 'react';
import '../src/styles/global.css';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../src/components/commons/layout';
import { TranslationProvider } from '../src/hooks/use-translation';
import { RouteStateProvider } from '../src/hooks/use-route-state';
import { getLocales } from '../src/sources/app';
import HeadMeta from '../src/components/commons/head-meta';
import { inject } from '../src/analytics/async-script-loader';
import { oneTapGoogle } from '../src/utils/social/one-tap-google';
import { GOOGLE_ONE_TAP, GET_SOCIAL, GET_SOCIAL_LOADED  } from '../src/constants';
import { getItem, removeItem, setItem } from '../src/utils/cookie';
import { localStorage } from '../src/utils/storage';
import { detectCountry } from '../src/sources/detect-country';
import { init } from '../src/get-social';
import { useRouter } from 'next/router';
import * as fbq from '../src/analytics/fb-pixel'
import Script from 'next/script'
import { initFirebase } from '../src/analytics/firebase';
import { detectGeoLocationByZee } from '../src/sources/geo-location';
import Cookies from '../src/components/cookies';

const scriptSrc = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${fbq.FB_PIXEL_ID});
`;

const DrawerProvider = dynamic(() => import('../src/hooks/use-drawer').then(module => {
  const { DrawerProvider } = module;
  return DrawerProvider;
}));

const SnackbarProvider = dynamic(() => import('../src/hooks/use-snackbar').then(module => {
  const { SnackbarProvider } = module;
  return SnackbarProvider;
}));

const DialogProvider = dynamic(() => import('../src/hooks/use-dialog').then(module => {
  const { DialogProvider } = module;
  return DialogProvider;
}));

const LoaderProvider = dynamic(() => import('../src/hooks/use-loader').then(module => {
  const { LoaderProvider } = module;
  return LoaderProvider;
}));

const OverLayProvider = dynamic(() => import('../src/hooks/use-overlay').then(module => {
  const { OverLayProvider } = module;
  return OverLayProvider;
}));

export function reportWebVitals() {
  // console.log(metric);
  // const body = JSON.stringify(metric);
  // const url = 'analytics endpoint';

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  // if (navigator.sendBeacon) {
  //   navigator.sendBeacon(url, body);
  // } else {
  //   fetch(url, { body, method: 'POST', keepalive: true });
  // }
}

// TODO add useServiceWorker hook have manifest.json generated from some js
// async function refreshCacheAndReload() {
//   console.warn('update found!!!');
//   const clearAllCaches = [];
//   if (caches) {
//     // Service worker cache should be cleared with caches.delete()
//     const cacheNames = await caches.keys();
//     console.warn('updating caches', cacheNames);
//     cacheNames.forEach(name => clearAllCaches.push(caches.delete(name)));
//   }
//   await Promise.all(clearAllCaches);
//   // delete browser cache and hard reload
//   window.location.reload(true);
// }

// function createUIPrompt(opts) {
//   // eslint-disable-next-line no-restricted-globals
//   if (confirm('A new update is available. Do you want to update now?')) {
//     opts.onAccept();
//   }
// }

// function registerSW() {
//   if ('serviceWorker' in navigator && !isLocalEnv()) {
//     const wb = new Workbox('sw.js');
//     let registration;

//     const showSkipWaitingPrompt = event => {
//       // `event.wasWaitingBeforeRegister` will be false if this is
//       // the first time the updated service worker is waiting.
//       // When `event.wasWaitingBeforeRegister` is true, a previously
//       // updated service worker is still waiting.
//       // You may want to customize the UI prompt accordingly.

//       // Assumes your app has some sort of prompt UI element
//       // that a user can either accept or reject.
//       console.info(event);
//       const prompt = createUIPrompt({
//         onAccept: async () => {
//           // Assuming the user accepted the update, set up a listener
//           // that will reload the page as soon as the previously waiting
//           // service worker has taken control.
//           wb.addEventListener('controlling', event => {
//             console.info('controlling event!!!', event);
//             refreshCacheAndReload();
//           });

//           console.info(registration, registration.waiting);
//           if (registration && registration.waiting) {
//             // Send a message to the waiting service worker,
//             // instructing it to activate.
//             // Note: for this to work, you have to add a message
//             // listener in your service worker. See below.
//             messageSW(registration.waiting, { type: 'SKIP_WAITING' });
//           }
//         },

//         onReject: () => {
//           prompt.dismiss();
//         }
//       });
//     };

//     // Add an event listener to detect when the registered
//     // service worker has installed but is waiting to activate.
//     wb.addEventListener('waiting', showSkipWaitingPrompt);
//     wb.addEventListener('externalwaiting', showSkipWaitingPrompt);
//     wb.register().then(r => {
//       registration = r;
//     });
//   }
// }

function Hipi({
  Component, pageProps, locales, locale
}) {

  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('India');
  const [showCookies, setShowCookies] = useState(false);
  const [loadingGS, setLoadingGS] = useState(true);

  const router = useRouter();
  
  const loaded = ()=>{
    setLoading(false)
  }

  const loadedGS=()=>{
    setLoadingGS(false);
    if(typeof window !== "undefined"){
      if(window?.sessionStorage?.getItem(GET_SOCIAL_LOADED) && window?.sessionStorage?.getItem(GET_SOCIAL_LOADED) === 'false'){
        window?.sessionStorage?.setItem(GET_SOCIAL_LOADED, true);
      }
    }
  }

  const getCountry = async()=>{
    try{ 
      const resp = await detectCountry();
      // console.log(resp?.data?.country_name)
      setCountry(resp?.data?.country_name || 'India');
      if(resp?.data?.country_name === 'India'){
        setItem('cookie-agreed','yes');
      }
    }
     catch(e){

     }
  }

  const getGeoLocationInfo =async()=>{
    try{ 
      const resp = await detectGeoLocationByZee();
      localStorage.set('geo-info',resp?.data)
    }
     catch(e){
    console.log("error in geo-api/setting it to localStorage",e)
     }
  }

  // useEffect(()=>{
  //   setItem('cookie-agreed','yes');
  // },[country])

  const updatingGoogleCookies = () =>{
    try {
      const gotUrl = window?.location?.href;
      let domain = (new URL(gotUrl));
      domain = domain?.hostname;
      const arrSplit = document?.cookie?.split(";");
      for (let i = 0; i < arrSplit?.length; i++) {
        const cookie = arrSplit?.[i]?.trim();
        const cookieName = cookie?.split("=")[0];
        // If the prefix of the cookie's name matches the one specified, remove it
        if (cookieName?.indexOf("_gs_auth_") === 0) {
          console.log("COOKIE", cookieName)
          // Remove the cookie
          cookieName && removeItem(cookieName);
          // document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      }
    } catch (e) {
      console.log("** error in deleting gs cookies **");
    }
  }

  useEffect(()=>{
    let timer;
    try{ 
      if(typeof window !== "undefined"){
        if(window?.sessionStorage?.getItem(GET_SOCIAL_LOADED) !== null){
          window?.sessionStorage?.removeItem(GET_SOCIAL_LOADED);
        }
        window?.sessionStorage?.setItem(GET_SOCIAL_LOADED, false);
      }
  
      /**loading scripts */

      timer = setTimeout(()=>{
        inject(GOOGLE_ONE_TAP , null, loaded);
        inject(GET_SOCIAL , null, loadedGS);
        inject('', scriptSrc);
      },2500);

      updatingGoogleCookies();

      console.log('mounted');
      // inject(GOOGLE_ONE_TAP , null, loaded);
      const cookieAgree = getItem('cookie-agreed');
      cookieAgree !== 'yes' && getCountry();
      getGeoLocationInfo();
      let tokens = localStorage.get('tokens') || null;
      // tokens = tokens && JSON.parse(tokens);
      const userAgent = window?.navigator.userAgent;
      const deviceModel = userAgent?.substring(userAgent?.indexOf("(") + 1, userAgent?.indexOf(")"))?.split(';')?.[2] || userAgent?.substring(userAgent?.indexOf("(") + 1, userAgent?.indexOf(")"))?.split(';')?.[0] 
      localStorage.set('device-modal',deviceModel);
      const networkInformation = window?.navigator?.connection;
      const effectiveType = networkInformation?.effectiveType;
      localStorage.set('network-strength',effectiveType);

      if (tokens && tokens?.shortsAuthToken && tokens?.accessToken) {
        console.log('tokens are there in _app.js')
        setTimeout(()=>{
          init();
          initFirebase();
        },[3000])
      }
    }
    catch(e){
    }

    /** unmount */
    return () => clearTimeout(timer);

    },[])

    useEffect(()=>{
      try{   
        let tokens = localStorage.get('tokens') || null;
        // tokens = tokens && JSON.parse(tokens);
      
        if (tokens && tokens?.shortsAuthToken && tokens?.accessToken) {
          console.log('tokens there in _app.js')
          setTimeout(()=>{
            //init();
            initFirebase();
          },[1000])
        }else{
          if(loading === false){
            oneTapGoogle();
        }
      }}catch(e){

      }
    },[loading])

    useEffect(()=>{
      try{
        let tokens = localStorage.get('tokens') || null;
        if(tokens && tokens?.shortsAuthToken && tokens?.accessToken) {
          if(loadingGS=== false){
            init()
          }
        }
      }
      catch(e){
        console.error(e);
      }
    },[loadingGS])

    useEffect(() => {
      // This pageview only triggers the first time (it's important for Pixel to have real information)
      fbq.pageview()
  
      const handleRouteChange = () => {
        fbq.pageview()
      }
  
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }, [router.events])

 /* Extract out Mixpanel - Custom session event logic */   

  // let setTimeoutsTracker = [];
  // function logout() {
  //      console.error("reset - session end - from logout")
  //      toTrackMixpanel('sessionEnd')
  //      setTimeoutsTracker = null;
  //      clearTimeouts();
  //      setSessionTimer(undefined);
  //      window.sessionStorage.setItem("sessionT",undefined);
  //      window.sessionStorage.setItem("sessionEventTrack",null);
  //      clearTimeouts();
  // }
  

//   const setTimeouts = (timer) => {
//     setTimeoutsTracker = setTimeoutsTracker ===  (undefined || null) ? [] : setTimeoutsTracker;
//     setTimeoutsTracker.push(setTimeout(()=>{timer < 5 && logout()}, 1000 * 60));
//   };

//   const clearTimeouts = () => {
//       if (setTimeoutsTracker?.length >0){ 
//         setTimeoutsTracker.map((data)=>{
//           clearTimeout(data)
//         })
//   };
// }

  // const resetTimeout = () => {
  //  let timer =  window.sessionStorage.getItem("sessionT");
  //     if(window.sessionStorage.getItem("sessionEventTrack") === 'null'){
  //       console.error("reset - session start R");
  //       toTrackMixpanel('sessionStart')
  //       setSessionTimer(0);
  //       window.sessionStorage.setItem("sessionEventTrack",undefined);
  //       window.sessionStorage.setItem("sessionT",0);
  //       timer = 0;
  //     }
  //     clearTimeouts();
  //     setTimeouts(timer);
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("reset timer ",sessionTimer)
  //     if(sessionTimer < 6){
  //     setSessionTimer(sessionTimer+1)
  //     window.sessionStorage.setItem("sessionT",sessionTimer+1);
  //     }
  //     else{
  //      if( sessionTimer === 6) { 
  //        console.error('reset - session end')
  //        toTrackMixpanel('sessionEnd')
  //        console.error('reset - session start T')
  //        toTrackMixpanel('sessionStart')
  //       setSessionTimer(0)
  //       window.sessionStorage.setItem("sessionT",0);
  //       resetTimeout();
  //      }
  //     }
  //   }, 1000 * 60);

  //   return () => clearInterval(interval);
  // });
 /*************************** */
    useEffect(()=>{
      // console.log("Router**",document.referrer)
      // console.error("reset - session start")
      // toTrackMixpanel('sessionStart')
      // if(typeof document != "undefined"){
      //   console.log('sessDoc',document?.referrer,document?.referrer?.includes('hipi.co.in'))
      //   const timer =  window.sessionStorage.getItem("sessionT") === 'null' ? 0 : window.sessionStorage.getItem("sessionT");
      //   if(timer !== null && document?.referrer?.includes('hipi.co.in')){
      //     console.log('sessTimer',timer)
      //     window.sessionStorage.setItem("sessionT",timer || 0);
      //     setSessionTimer(timer || 0);
      //   }else{
      //     window.sessionStorage.setItem("sessionT",0);
      //     setSessionTimer(0);
      //     console.error("reset - session start");
      //     toTrackMixpanel('sessionStart');
      //   }
      // }


      window.onload = function () {
        // window.sessionStorage.setItem('sessionEventTrack',undefined)
        setTimeout(function () {
            setShowCookies(true);
        }, 5000);
    }

    //   const events = [
    //     'load',
    //     'mousemove',
    //     'mousedown',
    //     'click',
    //     'scroll',
    //     'keypress',
    //     'touchmove'
    // ];

    // events.forEach((data)=>{
    //   window.addEventListener(data,resetTimeout);
    // })
    // return () => {
    //   events.forEach((data)=>{
    //     window.addEventListener(data,resetTimeout);
    //     clearTimeouts();
    //   })
    // }
  },[])

  return (
    <>
      <Head>
        <HeadMeta />
      </Head>
      <TranslationProvider
        locale={locale}
        locales={locales}
      >
        <OverLayProvider>
          <LoaderProvider>
            <DialogProvider>
              <DrawerProvider>
                <SnackbarProvider>
                  <RouteStateProvider>
                    <Layout>
                    <Script
        strategy="afterInteractive"
      />
                      <Component {...pageProps} />
                      {showCookies && (getItem('cookie-agreed') !== 'yes') && country !== 'India' && <><Cookies/></>}
                    </Layout>
                  </RouteStateProvider>
                </SnackbarProvider>
              </DrawerProvider>
            </DialogProvider>
          </LoaderProvider>
        </OverLayProvider>
      </TranslationProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
Hipi.getInitialProps = async ctx => {
  const { router } = ctx;
  const { locale } = router;
  try {
    const locales = await getLocales(locale);
    return {
      locale,
      locales
    };
  } catch (e) {
    console.log(e);
  }
  return {};
};

export default Hipi;
