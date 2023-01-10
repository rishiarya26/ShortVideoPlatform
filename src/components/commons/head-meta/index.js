/* eslint-disable no-trailing-spaces */
/*eslint-disable @next/next/no-sync-scripts */
import useTranslation from '../../../hooks/use-translation';
import appVersion from '../../../../app-version';
import { withBasePath } from '../../../config';
import { SeoMeta } from './seo-meta';

function HeadMeta() {
  const APP_NAME = 'hipi Starter Kit';
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  console.log(withBasePath(`manifest.json?v=${appVersion}`))
  return (
    <>
      <link rel="manifest" href={withBasePath(`manifest.json?v=${appVersion}`)} />
      <SeoMeta />
      {/* <meta charSet="utf-8" /> */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* <link rel="preconnect" href="https://hipigwapi.zee5.com"/> */}
      {/* <link rel="preconnect" href="https://www.hipi.co.in" as="document" /> */}
      {/* <link rel="preconnect" href="https://websdk.getsocial.im/getsocial.min.js" as="script" /> */}
      <link rel="preconnect" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" as="font" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdn.mxpnl.com" />
      <link rel="preconnect" href="https://assets2.charmboard.com" />
      <link rel="preconnect" href="https://media.charmboard.com" />
      <link rel="preconnect" href="https://www.hipi.co.in" />
      <link rel="preconnect" href="https://devqa2.charmboard.com" />
      <link rel="preconnect" href="https://hipigwapi.zee5.com"/>
      <link rel="preconnect" href="https://mapi.charmboard.com"/>
      <link rel="preconnect" href="https://xtra.zee5.com"/>
      {/* <link rel="preconnect" href="https://ipapi.co"/> */}
      <link rel="preconnect" href="https://websdk.getsocial.im"/>
      <link rel="preconnect" href="https://akamaividz2.zee5.com"/>
      <link rel="preconnect" href="https://preprod.hipi.co.in"/>
      <link rel="preconnect" href="https://firebase.googleapis.com"/>
      <link rel="preconnect" href="https://z5shorts.akamaized.net"/>
      <link rel="preconnect" href="https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com"/>
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://api-js.mixpanel.com" />


      {/* <title>{APP_NAME}</title> */}

      {/* hipi.co.in */}
      {/* <link rel="preload" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" /> */}
      {/* <link rel="preload" href="https://www.hipi.co.in" as="fetch" /> */}
      <link rel="preload" href="https://www.hipi.co.in/feed/for-you" as="document" />

      {/* <link rel="dns-prefetch" href="https://eum.instana.io" /> */}
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://cdn.mxpnl.com" />
      <link rel="dns-prefetch" href="https://assets2.charmboard.com" />
      <link rel="dns-prefetch" href="https://media.charmboard.com" />
      <link rel="dns-prefetch" href="https://www.hipi.co.in" />
      <link rel="dns-prefetch" href="https://devqa2.charmboard.com" />
      <link rel="dns-prefetch" href="https://hipigwapi.zee5.com"/>
      <link rel="dns-prefetch" href="https://mapi.charmboard.com"/>
      <link rel="dns-prefetch" href="https://xtra.zee5.com"/>
      {/* <link rel="dns-prefetch" href="https://ipapi.co"/> */}
      <link rel="dns-prefetch" href="https://websdk.getsocial.im"/>
      <link rel="dns-prefetch" href="https://akamaividz2.zee5.com"/>
      <link rel="dns-prefetch" href="https://preprod.hipi.co.in"/>
      <link rel="dns-prefetch" href="https://firebase.googleapis.com"/>
      <link rel="dns-prefetch" href="https://z5shorts.akamaized.net"/>
      <link rel="dns-prefetch" href="https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com"/>
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://api-js.mixpanel.com" />
     
      {/* get social link */}
     
      {/* <link rel="preload" href="https://websdk.getsocial.im/getsocial.min.js" as="script" />
      <link rel="dns-prefetch" href="https://websdk.getsocial.im/getsocial.min.js" as="script" /> */}

      {/* <script async src="https://vmax.charmboard.com/web-sdk/stg/1.3.2/ad.js"></script> */}
      {/* <script async src="https://vmax.charmboard.com/web-sdk/prod/1.3.3/ad.js"></script> */}
      <script async src="https://websdk.getsocial.im/getsocial.min.js"></script>
      <script defer type="text/javascript" src="/newrelic.js" />
 
      {/* <script defer crossOrigin="anonymous" src="https://eum.instana.io/eum.min.js" />
      <script type="text/javascript" src="/agents/instana.js" />

      <script type="text/javascript" src="/embeds/hipi.js" /> */}
      <meta name="theme-color" content="#fff" />
      {/* <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* google verification for SEO */}
      <meta name="google-site-verification" content="ENMIgg299KOVw-fxB4Auaasht3PjJSoPqDvgVZIC0to" />      
      <meta name="facebook-domain-verification" content="8cchm0hfnopz5r253ri0stnmuwoej1" />

      {/* <meta name="google-signin-client_id" content="1026747734321-0fobt02rbhi5j36kk6ft8el2k0tev9af.apps.googleusercontent.com" /> */}

      {/* IOS */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />

      {/* Android   */}
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Windows */}
      <meta name="msapplication-navbutton-color" content="red" />
      <meta name="msapplication-TileColor" content="red" />
      <meta name="msapplication-TileImage" content={withBasePath('icons/favicon.ico')} />
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
      <link href={withBasePath('favicon-16x16-dunplab-manifest-17016.png')} rel="icon" type="image/png" sizes="16x16" />
      <link href={withBasePath('favicon-32x32-dunplab-manifest-17016.png')} type="image/png" sizes="32x32" />
      <link href={withBasePath('favicon-96x96-dunplab-manifest-17016.png')} rel="icon" type="image/png" sizes="96x96" />

      {/* iOS  */}
      <link href={withBasePath('apple-touch-icon.png')} rel="apple-touch-icon" />
      <link href={withBasePath('apple-icon-76x76-dunplab-manifest-17016.png')} rel="apple-touch-icon" sizes="76x76" />
      <link href={withBasePath('apple-icon-120x120-dunplab-manifest-17016.png')} rel="apple-touch-icon" sizes="120x120" />
      <link href={withBasePath('apple-icon-152x152-dunplab-manifest-17016.png')} rel="apple-touch-icon" sizes="152x152" />
      <link href={withBasePath('apple-icon-180x180-dunplab-manifest-17016.png')} rel="apple-touch-icon" sizes="180x180" />
      <link href={withBasePath('apple-icon-144x144-dunplab-manifest-17016.png')} rel="apple-touch-icon" sizes="144x144" />
      <link href={withBasePath('icons/icon-512x512.png')} rel="apple-touch-icon" sizes="512x512" />
      
      <link href={withBasePath('android-icon-192x192-dunplab-manifest-17016.png')} rel="apple-touch-icon" sizes="192x192" />
      <link href={withBasePath('output-onlinepngtools_1.png')} rel="apple-touch-icon" sizes="57x57" />

      {/* Startup Image  - splash screens for i phones */}
      <link
        rel="apple-touch-startup-image"
        href={withBasePath('apple-icon-76x76-dunplab-manifest-17016.png')}
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('apple-icon-76x76-dunplab-manifest-17016.png')}
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('apple-icon-76x76-dunplab-manifest-17016.png')}
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('apple-icon-76x76-dunplab-manifest-17016.png')}
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('apple-icon-76x76-dunplab-manifest-17016.png')}
        media="(min-device-width: 768px) and (max-device-width: 1024px)
        and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('apple-icon-76x76-dunplab-manifest-17016.png')}
        media="(min-device-width: 834px) and (max-device-width: 834px)
        and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('apple-icon-76x76-dunplab-manifest-17016.png')}
        media="(min-device-width: 1024px) and (max-device-width: 1024px)
        and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      {/* Pinned Tab  */}
      <link href={withBasePath('favicon.ico')} rel="mask-icon" size="any" color="red" />

      {/* Android  */}
      <link href={withBasePath('android-chrome-192x192.png')} rel="icon" sizes="192x192" />
      <link href={withBasePath('android-chrome-192x192.png')} rel="icon" sizes="128x128" />

      {/* Others */}
      <link href={withBasePath('favicon.icon')} rel="shortcut icon" type="image/x-icon" />

      {/* UC Browser  */}
      <link href={withBasePath('images/hipi_logo_v01.png')} rel="apple-touch-icon-precomposed" sizes="57x57" />

      <link rel="shortcut icon" href={withBasePath('favicon.ico')} />

      {/* <script
          id="clevertapScript"
          type='text/javascript'
          async
          dangerouslySetInnerHTML = {{
            __html: `var clevertap = {event:[], profile:[], account:[], onUserLogin:[], notifications:[], privacy:[], region:'in1'};

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
                      })();`
            }}/> */}
    </>
  );
}

export default HeadMeta;
