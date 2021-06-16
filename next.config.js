
const withSourceMaps = require('@zeit/next-source-maps');
// const withPWA = require('next-pwa');

const {
  GEN_SOURCE_MAP,
  NODE_ENV,
  BASE_PATH,
  MOCK_MODE = 'n',
  APP_ENV = 'production'
} = process.env;

const dev = NODE_ENV !== 'production';
// const local = APP_ENV === 'local';
// const prod = NODE_ENV === 'production';
const genSourceMap = GEN_SOURCE_MAP === 'y';
const appVersion = require('./app-version');

// eslint-disable-next-line no-console
console.log(`running in ${dev ? 'dev' : 'production'} mode pointing to ${APP_ENV}`);

const nextConfig = {
  images: {
    loader: 'akamai',
    path: 'https://akamaividz2.zee5.com'
  },
  // would suggest keeping this false
  trailingSlash: false, // https://github.com/zeit/next.js/issues/8119
  experimental: { // this takes the module/nomodule approach -  https://nextjs.org/blog/next-9-1#module--nomodule
    modern: true
  },
  i18n: {
    localeDetection: false,
    locales: ['en-in', 'hi-in', 'bn-in'],
    defaultLocale: 'en-in'
  },
  pwa: {
    swSrc: './src/service-worker.js',
    dest: 'public'
  },
  generateEtags: true,
  assetPrefix: BASE_PATH || '',
  publicRuntimeConfig: {
    basePath: BASE_PATH,
    mockMode: MOCK_MODE,
    appEnv: APP_ENV
  },
  generateBuildId: async () => appVersion,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }
    config.output.publicPath = '';
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    });
    return config;
  }
};

// eslint-disable-next-line no-nested-ternary
// module.exports = genSourceMap ? withSourceMaps(nextConfig) : (!local ? withPWA(nextConfig) : nextConfig);
module.exports = genSourceMap ? withSourceMaps(nextConfig) : nextConfig;

