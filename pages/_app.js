// import App from "next/app"
import { useEffect, useState } from 'react';
// import { isLocalEnv } from 'config';
import '../src/styles/global.css';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// import { Workbox, messageSW } from 'workbox-window';
import Layout from '../src/components/commons/layout';
import { TranslationProvider } from '../src/hooks/use-translation';
import { RouteStateProvider } from '../src/hooks/use-route-state';
import { getLocales } from '../src/sources/app';
import HeadMeta from '../src/components/commons/head-meta';
import { inject } from '../src/analytics/async-script-loader';
import { oneTapGoogle } from '../src/utils/social/one-tap-google';
import { GOOGLE_ONE_TAP } from '../src/constants';
import { getItem, setItem } from '../src/utils/cookie';
import { localStorage } from '../src/utils/storage';
import { detectCountry } from '../src/sources/detect-country';
import Cookies from '../src/components/cookies'
import { init } from '../src/get-social';
import { useRouter } from 'next/router';
import * as fbq from '../src/analytics/fb-pixel'
import Script from 'next/script'

// import { SW_IGNORE } from '../src/constants';
// import { doesStringMatch } from '../src/utils/string';

// TODO add withBasePath for everything that gets affected because of base-path i18n

// test changes

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

  const router = useRouter();
  
  const loaded = ()=>{
    setLoading(false)
  }

  const getCountry = async()=>{
    try{ 
      const resp = await detectCountry();
      console.log(resp?.data?.country_name)
      setCountry(resp?.data?.country_name || 'India');
      if(resp?.data?.country_name === 'India'){
        setItem('cookie-agreed','yes');
      }
    }
     catch(e){

     }
  }

  // useEffect(()=>{
  //   setItem('cookie-agreed','yes');
  // },[country])

  useEffect(()=>{
   try{ 
    console.log('mounted');
    inject(GOOGLE_ONE_TAP , null, loaded);
    const cookieAgree = getItem('cookie-agreed');
    cookieAgree !== 'yes' && getCountry();
    let tokens = localStorage.get('tokens') || null;
    // tokens = tokens && JSON.parse(tokens);
  
    if (tokens && tokens?.shortsAuthToken && tokens?.accessToken) {
      console.log('tokens are there in _app.js')
      // let getSocialInitialised = localStorage.get('get-social') || 'fail'
       init();
    }
    // setTimeout(()=>{},[500])
    // console.log("device DD", window?.navigator.appVersion,window?.navigator.vendor,window?.navigator?.mediaDevices)

    }
    catch(e){
    
    }
    },[])

    useEffect(()=>{
   try{   
    let tokens = localStorage.get('tokens');
    // tokens = tokens && JSON.parse(tokens);
  
    if (tokens && tokens?.shortsAuthToken && tokens?.accessToken) {
      console.log('tokens there in _app.js')
        init();
     }else{
      if(loading === false){
        oneTapGoogle();
    }
      }}catch(e){

      }
    },[loading])

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
                      {(getItem('cookie-agreed') !== 'yes') && country !== 'India' && <><Cookies/></>}
                      <Component {...pageProps} />
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
