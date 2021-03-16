
const withSourceMaps = require('@zeit/next-source-maps');
const withPWA = require('next-pwa');

const {
  GEN_SOURCE_MAP,
  NODE_ENV,
  BASE_PATH,
  MOCK_MODE = 'n',
  APP_ENV = 'production'
} = process.env;

const dev = NODE_ENV !== 'production';
const prod = NODE_ENV === 'production';
const genSourceMap = GEN_SOURCE_MAP === 'y';
const appVersion = require('./app-version');

// eslint-disable-next-line no-console
console.log(`running in ${dev ? 'dev' : 'production'} mode...`);

function getLocale() {
  return (BASE_PATH || '').split('/')[1] || 'en-in';
}

const nextConfig = {
  // would suggest keeping this false
  trailingSlash: false, // https://github.com/zeit/next.js/issues/8119
  experimental: { // this takes the module/nomodule approach -  https://nextjs.org/blog/next-9-1#module--nomodule
    modern: true
  },
  generateEtags: true,
  assetPrefix: BASE_PATH || '',
  publicRuntimeConfig: {
    locale: getLocale(),
    basePath: BASE_PATH,
    mockMode: MOCK_MODE,
    appEnv: APP_ENV
  },
  generateBuildId: async () => appVersion,
  webpack: config => {
    config.output.publicPath = '';
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    });

    return config;
  }
};

// eslint-disable-next-line no-nested-ternary
// module.exports = genSourceMap ? withSourceMaps(nextConfig) : (prod ? withPWA(nextConfig) : nextConfig);
module.exports = genSourceMap ? withSourceMaps(nextConfig) : nextConfig;

