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
    console.log(device, deviceOs)
    const maxAge = (365 * 24 * 60 * 60);
    ctx?.res?.setHeader('Set-Cookie', [`device-info=${deviceOs}; MaxAge=${maxAge}; Path=/;`,`device-type=${device}; HttpOnly; MaxAge=${maxAge}; Path=/;`]);
  }
  console.log(ctx?.res)
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
