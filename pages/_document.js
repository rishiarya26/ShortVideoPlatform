/*eslint-disable @next/next/no-img-element */
import Document, {
  Html, Main, NextScript, Head
} from 'next/document';
import { FB_PIXEL_ID } from '../src/analytics/fb-pixel';
import { getDeviceInfo, getDeviceType, getMacInfo } from '../src/hooks/use-device';

class Hipi extends Document {
  static async getInitialProps(ctx) {
    const userAgent = ctx?.req?.headers?.['user-agent'];
  if(userAgent){  
    const device = getDeviceType(userAgent);
    const mac = getMacInfo(userAgent);
    const deviceOs = getDeviceInfo(userAgent);
    const maxAge = (365 * 24 * 60 * 60);
    ctx?.res?.setHeader('Set-Cookie', [`device-type=${device}; MaxAge=${maxAge}; Path=/;`,`device-info=${deviceOs}; MaxAge=${maxAge}; Path=/;`,`device-mac=${mac}; MaxAge=${maxAge}; Path=/;`]);
  }
   const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Hipi;
