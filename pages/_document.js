import Document, {
  Html, Main, NextScript, Head
} from 'next/document';
import { getDeviceType } from '../src/hooks/use-device';

class Hipi extends Document {
  static async getInitialProps(ctx) {
    const userAgent = ctx?.req?.headers?.['user-agent'];
    const device = getDeviceType(userAgent);
    ctx?.res?.setHeader('Set-Cookie',`deviceType=${device}; HttpOnly; MaxAge=${(365 * 24 * 60 * 60)}; Path=/`);
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
