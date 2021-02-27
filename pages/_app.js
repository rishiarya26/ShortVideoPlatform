// import App from "next/app"
import { useEffect } from 'react';
import '../src/styles/global.css';
import Head from 'next/head';
import { Workbox, messageSW } from 'workbox-window';
import Layout from 'components/commons/layout';
import appVersion from './app-version';

export function reportWebVitals(metric) {
  console.log(metric);
  // const body = JSON.stringify(metric);
  // const url = 'analytics endpoint';

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  // if (navigator.sendBeacon) {
  //   navigator.sendBeacon(url, body);
  // } else {
  //   fetch(url, { body, method: 'POST', keepalive: true });
  // }
}

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

function Zee5WebStarterKit({ Component, pageProps }) {
  const APP_NAME = 'Zee5 Web Starter Kit';

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
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
  // }, []);

  return (
    <>
      <Head>
        {/* Primary */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <title>{APP_NAME}</title>
        <link rel="canonical" href="https://nextpwa-72153.web.app" />
        <meta name="theme-color" content="red" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />

        <meta
          name="description"
          itemProp="description"
          content="This project is a starter kit that can be used to build a robust and high performance web app"
        />
        <meta name="keywords" content="Zee5 web starter kit" />
        <meta name="format-detection" content="telephone=no" />

        {/* IOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />

        {/* Android   */}
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Windows */}
        <meta name="msapplication-navbutton-color" content="red" />
        <meta name="msapplication-TileColor" content="red" />
        <meta name="msapplication-TileImage" content="icons/favicon.ico" />
        {/* Pinned Sites */}
        <meta name="msapplication-tooltip" content="Tooltip Text" />
        <meta name="msapplication-starturl" content="/" />
        {/* https://blog.mzikmund.com/2015/08/removing-touch-highlights-on-smartphones/ */}
        <meta name="msapplication-tap-highlight" content="no" />

        {/* UC Mobile Browser  */}
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />
        {/* Disable night mode for this page  */}
        <meta name="nightmode" content="enable/disable" />
        {/* Layout mode */}
        <meta name="layoutmode" content="fitscreen/standard" />
        {/* imagemode - show image even in text only mode  */}
        <meta name="imagemode" content="force" />
        {/* Orientation  */}
        <meta name="screen-orientation" content="portrait" />

        {/* Main Link Tags  */}
        <link href="icons/favicon-16x16-dunlab-manifest-17016.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="icons/favicon-32x32-dunlab-manifest-17016.png" type="image/png" sizes="32x32" />
        <link href="icons/favicon-96x96-dunlab-manifest-17016.png" rel="icon" type="image/png" sizes="96x96" />

        {/* iOS  */}
        <link href="icons/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="icons/apple-icon-76x76-dunlab-manifest.png" rel="apple-touch-icon" sizes="76x76" />
        <link href="icons/apple-icon-120x120-dunlab-manifest.png" rel="apple-touch-icon" sizes="120x120" />
        <link href="icons/apple-icon-152x152-dunlab-manifest.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="icons/apple-icon-180x180-dunlab-manifest.png" rel="apple-touch-icon" sizes="180x180" />

        {/* Startup Image  - splash screens for i phones */}
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-icon-76x76-dunlab-manifest.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />

        <link
          rel="apple-touch-startup-image"
          href="icons/apple-icon-76x76-dunlab-manifest.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />

        <link
          rel="apple-touch-startup-image"
          href="icons/apple-icon-76x76-dunlab-manifest.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />

        <link
          rel="apple-touch-startup-image"
          href="icons/apple-icon-76x76-dunlab-manifest.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />

        <link
          rel="apple-touch-startup-image"
          href="icons/apple-icon-76x76-dunlab-manifest.png"
          media="(min-device-width: 768px) and (max-device-width: 1024px)
          and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />

        <link
          rel="apple-touch-startup-image"
          href="icons/apple-icon-76x76-dunlab-manifest.png"
          media="(min-device-width: 834px) and (max-device-width: 834px)
          and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />

        <link
          rel="apple-touch-startup-image"
          href="icons/apple-icon-76x76-dunlab-manifest.png"
          media="(min-device-width: 1024px) and (max-device-width: 1024px)
          and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />

        {/* Pinned Tab  */}
        <link href="icons/favicon.ico" rel="mask-icon" size="any" color="red" />

        {/* Android  */}
        <link href="icons/android-chrome-192x192.png" rel="icon" sizes="192x192" />
        <link href="icons/android-chrome-192x192.png" rel="icon" sizes="128x128" />

        {/* Others */}
        <link href="icons/favicon.icon" rel="shortcut icon" type="image/x-icon" />

        {/* UC Browser  */}
        <link href="images/Zee5_logo_v01.png" rel="apple-touch-icon-precomposed" sizes="57x57" />

        <link rel="shortcut icon" href="/icons/favicon.ico" />

        <link rel="manifest" href={`/manifest.json?v=${appVersion}`} />

        {/* Social Media */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Zee5 Web Starter Kit" />
        <meta property="og:image" content="images/Zee5_logo_v01.png" />
        <meta property="og:url" content="https://localhost:5000/" />
        <meta
          property="og:description"
          content="This project is a starter kit that can be used to build a robust and high performance web app."
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Zee5 Web Starter Kit" />
        {/* twitter needs absolute urls for image */}
        {/* <meta name="twitter:image" content="https://covid.bhaarat.ai/img_fb.jpg" /> */}
        <meta name="twitter:image:alt" content="Zee5 Web Starter Kit" />

      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page"s `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default Zee5WebStarterKit;
