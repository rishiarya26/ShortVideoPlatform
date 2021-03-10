import useTranslation from '../../../hooks/use-translation';
import appVersion from '../../../../app-version';
import { withBasePath } from '../../../config';

function HeadMeta() {
  const APP_NAME = 'hipi Starter Kit';
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <title>{APP_NAME}</title>
      <script type="text/javascript" src="/agents/instana.js" />

      <link rel="canonical" href="https://nextpwa-72153.web.app" />
      <meta name="theme-color" content="red" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />

      <meta
        name="description"
        itemProp="description"
        content="This project is a starter kit that can be used to build a robust and high performance web app"
      />
      <meta name="keywords" content="hipi web starter kit" />
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
      <link href={withBasePath('icons/favicon-16x16-dunlab-manifest-17016.png')} rel="icon" type="image/png" sizes="16x16" />
      <link href={withBasePath('icons/favicon-32x32-dunlab-manifest-17016.png')} type="image/png" sizes="32x32" />
      <link href={withBasePath('icons/favicon-96x96-dunlab-manifest-17016.png')} rel="icon" type="image/png" sizes="96x96" />

      {/* iOS  */}
      <link href={withBasePath('icons/apple-touch-icon.png')} rel="apple-touch-icon" />
      <link href={withBasePath('icons/apple-icon-76x76-dunlab-manifest.png')} rel="apple-touch-icon" sizes="76x76" />
      <link href={withBasePath('icons/apple-icon-120x120-dunlab-manifest.png')} rel="apple-touch-icon" sizes="120x120" />
      <link href={withBasePath('icons/apple-icon-152x152-dunlab-manifest.png')} rel="apple-touch-icon" sizes="152x152" />
      <link href={withBasePath('icons/apple-icon-180x180-dunlab-manifest.png')} rel="apple-touch-icon" sizes="180x180" />

      {/* Startup Image  - splash screens for i phones */}
      <link
        rel="apple-touch-startup-image"
        href={withBasePath('icons/apple-icon-76x76-dunlab-manifest.png')}
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('icons/apple-icon-76x76-dunlab-manifest.png')}
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('icons/apple-icon-76x76-dunlab-manifest.png')}
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('icons/apple-icon-76x76-dunlab-manifest.png')}
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('icons/apple-icon-76x76-dunlab-manifest.png')}
        media="(min-device-width: 768px) and (max-device-width: 1024px)
        and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('icons/apple-icon-76x76-dunlab-manifest.png')}
        media="(min-device-width: 834px) and (max-device-width: 834px)
        and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link
        rel="apple-touch-startup-image"
        href={withBasePath('icons/apple-icon-76x76-dunlab-manifest.png')}
        media="(min-device-width: 1024px) and (max-device-width: 1024px)
        and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      {/* Pinned Tab  */}
      <link href={withBasePath('icons/favicon.ico')} rel="mask-icon" size="any" color="red" />

      {/* Android  */}
      <link href={withBasePath('icons/android-chrome-192x192.png')} rel="icon" sizes="192x192" />
      <link href={withBasePath('icons/android-chrome-192x192.png')} rel="icon" sizes="128x128" />

      {/* Others */}
      <link href={withBasePath('icons/favicon.icon')} rel="shortcut icon" type="image/x-icon" />

      {/* UC Browser  */}
      <link href={withBasePath('images/hipi_logo_v01.png')} rel="apple-touch-icon-precomposed" sizes="57x57" />

      <link rel="shortcut icon" href={withBasePath('/icons/favicon.ico')} />

      <link rel="manifest" href={withBasePath(`/manifest.json?v=${appVersion}`)} />

      {/* Social Media */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content="hipi Web Starter Kit" />
      <meta property="og:image" content={withBasePath('images/hipi_logo_v01.png')} />
      <meta property="og:url" content="https://localhost:5000/" />
      <meta
        property="og:description"
        content="This project is a starter kit that can be used to build a robust and high performance web app."
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="hipi Web Starter Kit" />
      {/* twitter needs absolute urls for image */}
      {/* <meta name="twitter:image" content="https://covid.bhaarat.ai/img_fb.jpg" /> */}
      <meta name="twitter:image:alt" content="hipi Web Starter Kit" />
    </>
  );
}

export default HeadMeta;
