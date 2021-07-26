import Document, {
  Html, Main, NextScript, Head
} from 'next/document';
import { getDeviceType } from '../src/hooks/use-device';

class Hipi extends Document {
  static async getInitialProps(ctx) {
    const userAgent = ctx?.req?.headers?.['user-agent'];
    const device = getDeviceType(userAgent);
    const maxAge = (365 * 24 * 60 * 60);
    ctx?.res?.setHeader('Set-Cookie', `device-type=${device}; HttpOnly; MaxAge=${maxAge};`);
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
