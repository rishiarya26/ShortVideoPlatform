// import App from "next/app"
import { useEffect, useRef, useState } from 'react';
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
import { localStorage, sessionStorage } from '../src/utils/storage';
import { detectCountry } from '../src/sources/detect-country';
import { init } from '../src/get-social';
// import { initConviva } from '../src/conviva';
import { initConviva } from '../src/analytics/conviva';
import { useRouter } from 'next/router';
import * as fbq from '../src/analytics/fb-pixel'
import Script from 'next/script'
import { initFirebase } from '../src/analytics/firebase';
import { detectGeoLocationByZee } from '../src/sources/geo-location';
import Cookies from '../src/components/cookies';
import { toTrackMixpanel } from '../src/analytics/mixpanel/events';
import { clearTimeouts,resetTimeout } from '../src/utils/session-track';
import { toGetSocialToken } from '../src/sources/get-social';
import { initLinkdin } from '../src/analytics/linkdin-pixel';
import { init as storyBlokInit } from "../src/storyblokComponents/storyblokInit";
import * as platform from 'platform';
import { initVmax } from '../src/analytics/vmax';
import { getFullDate } from '../src/utils/date';
import useAuth from '../src/hooks/use-auth';
import { getUserProfile } from '../src/sources/users/profile';
import { compareArrays } from '../src/utils/string';
import { toTrackClevertap } from "../src/analytics/clevertap/events";
import { getPageName } from '../src/utils/web';
import { toTrackReco } from '../src/analytics/view-events';
// import { detectGeoLocation, detectGeoLocationByZee } from '../src/sources/geo-location';

// import { SW_IGNORE } from '../src/constants';
// import { doesStringMatch } from '../src/utils/string';

// TODO add withBasePath for everything that gets affected because of base-path i18n

// test changes

(function storyBlokInitSelfFunction(){
  try{
    storyBlokInit();
  } catch(e){
    console.log("storyblokerr", e);
  }
  })();

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

const CacheAdProvider = dynamic(() => import('../src/hooks/use-cacheAd').then(module => {
  const { CacheAdProvider } = module;
  return CacheAdProvider;
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
  const [session, setSession] = useState(true);
  // const [sessionTimer, setSessionTimer] = useState(null);
  const [timerArr, setTimerArr] = useState([])
  const [enableSession , setEnableSession] = useState(true)
  const [previousTimer, setPreviousTimer] = useState(60);
  // const savePWA = typeof window!==undefined ?  window?.deferredPrompt : null;
  // const [videosCompleted, setVideosCompleted] = useState(0);

  const router = useRouter();
  
  const loaded = ()=>{
    setLoading(false)
  }

  const getCountry = async()=>{
    try{ 
      const resp = await detectGeoLocationByZee();
      console.log("RESP",resp)
      if(resp?.data?.country === 'INDIA'){
        setCountry('India');
        setItem('cookie-agreed','yes');
      }else{
       resp?.data?.country && setCountry(resp?.data?.country);
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

  const updateDeviceData = () =>{
    try{
      localStorage.set('plaformData',platform);
      console.log("platform-data*",platform,window?.platform);
    }catch(e){
      console.error('error-platform',e);
    }
  }

  useEffect(()=>{
    //let timer;
    try{
        toTrackReco('launch')
      window.sessionStorage.setItem('searchExecuted', undefined)
      // if(typeof window !== "undefined"){
      //   if(window?.sessionStorage?.getItem(GET_SOCIAL_LOADED) !== null){
      //     window?.sessionStorage?.removeItem(GET_SOCIAL_LOADED);
      //   }
      //   window?.sessionStorage?.setItem(GET_SOCIAL_LOADED, false);
      // }
  
      /**loading scripts */

      // timer = setTimeout(()=>{
      //   inject(GOOGLE_ONE_TAP , null, loaded);
      // },0);

      updatingGoogleCookies();
      initConviva()
      initVmax();
      console.log('mounted');
      //to make sure before loading the app the vmax should get updated
      inject("https://vmax.charmboard.com/web-sdk/prod/1.3.3/ad.js", null);
      
      initLinkdin();
      const cookieAgree = getItem('cookie-agreed');
      cookieAgree !== 'yes' && getCountry();
      getGeoLocationInfo();
      let tokens = localStorage.get('tokens') || null;
      // tokens = tokens && JSON.parse(tokens);
      const userAgent = window?.navigator.userAgent;
      const deviceModel = userAgent?.substring(userAgent?.indexOf("(") + 1, userAgent?.indexOf(")"))?.split(';')?.[2] || userAgent?.substring(userAgent?.indexOf("(") + 1, userAgent?.indexOf(")"))?.split(';')?.[0] 
      localStorage.set('device-modal',deviceModel);
      localStorage.set("adArr",[]);
      localStorage.set("adArrMixPanel",[]);
      localStorage.set("vmaxEvents",[]);
      
      const networkInformation = window?.navigator?.connection;
      const effectiveType = networkInformation?.effectiveType;
      localStorage.set('network-strength',effectiveType);
      guestGetSocialToken();
      setTimeout(()=>{
        init();
        // initFirebase();
      },[1500])
      if (tokens && tokens?.shortsAuthToken && tokens?.accessToken) {
        console.log('tokens are there in _app.js')
        setTimeout(()=>{
          // init();
          initFirebase();
        },[500])
      }
      updateDeviceData();
    }
    catch(e){
      console.error("one tap issue ")
    }

    /** unmount */
    // return () => clearTimeout(timer);

    },[])

    useEffect(()=>{
      try{   
        let tokens = localStorage.get('tokens') || null;
        // tokens = tokens && JSON.parse(tokens);
      
        if (tokens && tokens?.shortsAuthToken && tokens?.accessToken) {
          console.log('one tap not initiated - tokens already there in _app.js ')
          setTimeout(()=>{
            // init();
            initFirebase();
          },[1000])
        }else{
          if(loading === false){
            oneTapGoogle();
        }
      }}catch(e){
        console.error("one tap issue ")
      }
    },[loading])


    // useEffect(()=>{
    //   try{
    //     let tokens = localStorage.get('tokens') || null;
    //     if(tokens && tokens?.shortsAuthToken && tokens?.accessToken) {
    //       if(loadingGS=== false){
    //         init()
    //       }
    //     }
    //   }
    //   catch(e){
    //     console.error(e);
    //   }
    // },[loadingGS])

    useEffect(() => {
      let handleRouteChange
      // This pageview only triggers the first time (it's important for Pixel to have real information)
      try{
        if(window?.fbq){
        fbq.pageview()
      }
      
  
      handleRouteChange = () => {
        if(window?.fbq){
          fbq.pageview()
        }
      }
  
      router?.events.on('routeChangeComplete', handleRouteChange)
    }catch(e){
      console.error("fbq event",e)
    }
      return () => {
       try{ 
         router?.events.off('routeChangeComplete', handleRouteChange)
      }catch(e){
        console.error(e)
      }
      }
    }, [router.events])

 /* To-Do : Extract out Mixpanel - Custom session event logic */   

  let setTimeoutsTracker = [];
  function endSessionOnIdle() {
      //  console.error("reset - session end - from logout")
       toTrackMixpanel('sessionEnd');
       toTrackClevertap('sessionEnd');
       setTimeoutsTracker = null;
       clearTimeouts();
       window.sessionStorage.setItem("minutes",undefined);
       window.sessionStorage.setItem("sessionEventTrack",null);
       clearTimeouts();
  }
  
  const setTimeouts = (timer) => {
    setTimeoutsTracker = setTimeoutsTracker ===  (undefined || null) ? [] : setTimeoutsTracker;
    setTimeoutsTracker.push(setTimeout(()=>{timer < 5 && endSessionOnIdle()}, 1000 * 60));
  };

  const clearTimeouts = () => {
      if (setTimeoutsTracker?.length >0){ 
        setTimeoutsTracker.map((data)=>{
          clearTimeout(data)
        })
  };
}

  const resetTimeout = () => {
   let minutesTracker =  window.sessionStorage.getItem("minutes");
      if(window.sessionStorage.getItem("sessionEventTrack") === 'null'){
        // console.error("reset - session start R");
        toTrackMixpanel('sessionStart');
        toTrackClevertap('sessionStart');
        window.sessionStorage.setItem('seconds',60);
        window.sessionStorage.setItem("sessionEventTrack",undefined);
        window.sessionStorage.setItem("minutes",0);
        minutesTracker = 0;
      }
      clearTimeouts();
      setTimeouts(minutesTracker);
  };
  // let videosCompleted = (typeof window !== "undefined" &&  parseInt(window.sessionStorage.getItem('videos-completed'))) || 0
 
  useEffect(() => {
  /* Timer - track & update seconds & minutes timer & end session at 7 minutes(minuteTimer === 6) */
    const timeTrackerInterval = setInterval(() => {

     if(window.sessionStorage.getItem("sessionEventTrack") !== 'null'){
      let minutesTracker = parseInt(window.sessionStorage.getItem('minutes')) || 0;
      let secondsTracker = parseInt(window.sessionStorage.getItem('seconds')) || 60;
      window.sessionStorage.setItem('seconds',secondsTracker === 0 ? 60 : secondsTracker-1);
      if(minutesTracker < 6){
        // console.log('checking...',minutesTracker, secondsTracker)
        secondsTracker === 1 && window.sessionStorage.setItem('minutes',  minutesTracker+1)
        }
        else{
         if( minutesTracker === 6) { 
           toTrackMixpanel('sessionEnd');
           toTrackMixpanel('sessionStart');
           toTrackClevertap('sessionStart');
           toTrackClevertap('sessionEnd')
          window.sessionStorage.setItem("minutes",0);
          // console.error("reset - session end");
          window.sessionStorage.setItem('seconds',60);
          // console.error("reset - session start T");
          resetTimeout();
         }
        }}
    }, 1000);

    return () => {
      clearInterval(timeTrackerInterval);
    };
  });

  const updateDate = ()=>{
    try{
    const prevDate = localStorage.get('prev-date');
    const langSelected = localStorage.get('lang-codes-selected')?.lang;
    let todayDate = getFullDate && getFullDate();
    if(!langSelected){
    if(!prevDate){
      localStorage.set('prev-date',todayDate);
      localStorage.set('lang-24-hr','false');
      }else{
        if(prevDate !== todayDate){
          localStorage.set('prev-date',todayDate);
          localStorage.set('lang-24-hr','false');
        };
      }
    }
    }catch(e){
      console.error('error in updating date for 24 hr timer in _app.js',e);
    }
  }

  const checkLanguagesUpdatedInProfile = async() =>{
    console.log("checking lang...")
   try{ 
    let tokens = localStorage.get('tokens') || null;
    const isLoggedIn = (tokens && tokens?.shortsAuthToken && tokens?.accessToken) || false;
    if(isLoggedIn){
    const userId = localStorage.get('user-id');
    console.log("USER",userId)
    const userProfileDetails = await getUserProfile(userId);
    const languages = userProfileDetails?.data?.languages || '';
    const languageCodes = languages?.reduce((acc,data)=>{
      acc.push(data?.code)
      return acc;       
     },[]);
    const currentLangSelected = localStorage.get('lang-codes-selected')?.lang || [];
    console.log("inside - PROFILE__",userProfileDetails)
    if(currentLangSelected && !compareArrays(languageCodes,currentLangSelected) ){
      userProfileDetails?.data && localStorage.set('user-details',userProfileDetails?.data);
      const languageCodes = languages?.reduce((acc,data)=>{
        acc.push(data?.code)
        return acc;       
       },[]);
      localStorage.set('lang-codes-selected',{lang : languageCodes, type : 'profile'});
    }
  }}catch(e){
    console.error('issue in updating lang for logged in user on refresh',e);
  }
  }

  const setRefferer = ()=>{
    try{
      console.log("Refferer**",document?.referrer);
      localStorage.set('refferer',document?.referrer);
    }catch(e){
      console.error('refferer error',e)
    }
  }
          
  useEffect(()=>{
    savePreviousPage(router);
  },[router?.asPath])

  const savePreviousPage = (router) =>{
   try{
    const {asPath = ''} = router;
    const previousPage = window.sessionStorage.getItem('current-page');
    const pageName = getPageName(asPath)
  if(pageName !== previousPage ){  
    console.error('asPath',asPath, previousPage,)
    previousPage && window.sessionStorage.setItem('previous-page',previousPage);
    window.sessionStorage.setItem('current-page',pageName);
  }
  }catch(e){
    console.error('save previous path error',e)
  }
  }
 /*************************** */
    useEffect(()=>{
      setRefferer();
      isPwa();
      localStorage.set("PwaPromptPresent",'false');
     
      // console.error("reset - session start")
      // toTrackMixpanel('sessionStart')
      if(typeof document != "undefined"){
        console.log('sessDoc',document?.referrer,document?.referrer?.includes('hipi.co.in'))
        let minutesTracker =  window.sessionStorage.getItem("minutes") === 'null' ? 0 : window.sessionStorage.getItem("minutes");
        if(minutesTracker !== null && document?.referrer?.includes('hipi.co.in')){
          if(typeof minutesTracker === 'string'){
            minutesTracker = parseInt(minutesTracker);
          } 
          window.sessionStorage.setItem("minutes",minutesTracker || 0);
        }else{
          window.sessionStorage.setItem("minutes",0);
          // console.error("reset - session start");
          toTrackMixpanel('sessionStart');
          toTrackClevertap('sessionStart');
        }
      }

      window.onload = function () {
        window.sessionStorage.setItem('sessionEventTrack',undefined)
        setTimeout(function () {
            setShowCookies(true);
        }, 5000);
    }
    
    // setVideosCompleted(window.sessionStorage.getItem('videos-completed'));
    if(!window.sessionStorage.getItem('videos-completed')){
      window.sessionStorage.setItem('videos-completed', JSON.stringify({ids:[],value: 0}));
      // videosCompleted = 0
    } 
    updateDate();
    let timeout = setTimeout(()=>{checkLanguagesUpdatedInProfile();},[2500])
    // else{
      // videosCompleted =  window.sessionStorage.getItem('videos-completed');
    // }
    // sessionStorage.set('videos-completed',0);

      const events = [
        'load',
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'keypress',
        'touchmove'
    ];

    events.forEach((data)=>{
      window.addEventListener(data,resetTimeout);
    })

    trapPwaInstallEvent();

    
    /* injecting scripts - floodlight, gtag after 5sec */
  setTimeout(()=>{
      inject(null,`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
     
      gtag('config', 'DC-11937136');
      gtag('config', 'UA-218793053-1');
      `)

      inject("https://www.googletagmanager.com/gtag/js?id=DC-11937136");

      inject(null,`
      (function (m, f, i, l, t, e, r) {
      m[t] = m[t] || function () {(m[t].q = m[t].q || []).push(arguments)}, m[t].l = 1 * new Date();
      e = f.createElement(l); e.async = 1; e.id = "mfilterit-visit-tag"; e.src = i; r=f.getElementsByTagName(l)[0]; r.parentNode.insertBefore(e, r);
      })(window, document,"https://script.mfilterit.net/v3/v/client/web.hipi.cpv.js", "script", "mf");
      mf("mf_package_name", "web.hipi.cpv"); mf("mf_tracking_type", "pageviews");
      `);
    },6000);
    
    setTimeout(
      () => {
        inject(null, `var clevertap = {event:[], profile:[], account:[], onUserLogin:[], notifications:[], privacy:[], region:'in1'};

        clevertap.account.push({"id": "RK8-65R-9Z6Z"});
        clevertap.privacy.push({optOut: false}); //set the flag to true, if the user of the device opts out of sharing their data
        clevertap.privacy.push({useIP: false}); //set the flag to true, if the user agrees to share their IP data
        (function () {
                var wzrk = document.createElement('script');
                wzrk.type = 'text/javascript';
                wzrk.async = true;
                wzrk.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/clevertap.min.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(wzrk, s);
          })();`)
          inject(GOOGLE_ONE_TAP , null, loaded);
      }, 7000);
    

    return () => {
      events.forEach((data)=>{
        window.addEventListener(data,resetTimeout);
        clearTimeouts();
      })
      timeout && clearTimeouts(timeout);
    }
  },[])

 const guestGetSocialToken = async() =>{
   let response;
   try{ 
     response =  await toGetSocialToken();
     console.log("RESP",response);
    }
   catch(e){
     console.error("guest get social error",e)
     response = await toGetSocialToken();
   }};

   const trapPwaInstallEvent = () =>{
    // let deferredPrompt;
    console.log("before fn called");
   try{ 
     window.addEventListener('beforeinstallprompt', (e) => {
     console.log("beforeInstall called",e);
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      // deferredPrompt = e;
      window.deferredPrompt = e;
      localStorage.set("PwaPromptPresent",'true');
      // Update UI notify the user they can install the PWA
      // showInstallPromotion();
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });}catch(e){
      console.error('error',e)
    }
   }

   function isPwa() {
   try{ 
    // localStorage?.remove('isInstalled');
      // let mode = 'browser tab';     
      const pwa = ["fullscreen", "standalone", "minimal-ui"].some(
          (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
      );
      // if(pwa){
      //   mode = 'pwa'
      // }
      // Log launch display mode to analytics
      console.log('isInstalled:', pwa);
      localStorage.set('isInstalled',JSON.stringify(pwa));
  }catch(e){
      console.error('error')
    }
  }

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
                    id="pixelScript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
          <Script
          id="linkedinScript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          _linkedin_partner_id = "4069492"; 
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; 
          window._linkedin_data_partner_ids.push(_linkedin_partner_id); 
          (function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} 
          var s = document.getElementsByTagName("script")[0]; 
          var b = document.createElement("script"); b.type = "text/javascript";b.async = true; 
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; 
          s.parentNode.insertBefore(b, s);})(window.lintrk);
          `,
        }}
      />
    <CacheAdProvider>
                        <Component {...pageProps} />
                      </CacheAdProvider>
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
