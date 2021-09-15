import Document, {
  Html, Main, NextScript, Head
} from 'next/document';
import { getDeviceInfo, getDeviceType } from '../src/hooks/use-device';

class Hipi extends Document {
  static async getInitialProps(ctx) {
    const userAgent = ctx?.req?.headers?.['user-agent'];
  if(userAgent){  
    const device = getDeviceType(userAgent);
    const deviceOs = getDeviceInfo(userAgent);
    const maxAge = (365 * 24 * 60 * 60);
    ctx?.res?.setHeader('Set-Cookie', [`device-type=${device}; MaxAge=${maxAge}; Path=/;`,`device-info=${deviceOs}; MaxAge=${maxAge}; Path=/;`]);
  }
   const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Hipi;
