/* eslint-disable max-len */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { createSecureHeaders } = require("next-secure-headers");
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

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   // disable: process.env.NODE_ENV === 'development',
//   register: true,
// });


const nextConfig = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        { key: 'X-Download-Options', value: 'noopen' },
        { key: 'X-Content-Type-Options', value: 'false' },
        { key: 'X-XSS-Protection', value: '1' }]
    }];
  },
  images: {
    domains: ["a.storyblok.com",'akamaividz2.zee5.com', 'assets2.charmboard.com','zee5-staging-ressh.cloudinary.com','hipi-assets.s3.ap-south-1.amazonaws.com']
  },
  // would suggest keeping this false
  trailingSlash: false, // https://github.com/zeit/next.js/issues/8119
  experimental: { // this takes the module/nomodule approach - https://nextjs.org/blog/next-9-1#module--nomodule
    modern: true
    },
  i18n: {
    localeDetection: false,
    locales: ['en-in', 'hi-in', 'bn-in'],
    defaultLocale: 'en-in'
  },
    pwa: {
      register : true,
    // reactStrictMode : true,
    // skipWaiting: true,
    // swSrc: './src/service-worker.js',
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
  webpack: config => {
    config.output.publicPath = '';
    config.resolve.fallback = { ...config.resolve.fallback, ...{ fs: false } };
    config.plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false,
      generateStatsFile: true,
      analyzerMode: 'json',
      excludeAssets: ['node_modules', 'coverage', 'tools', 'public', 'perf'],
      statsOptions: {
        exclude: ['node_modules', 'coverage', 'tools', 'public', 'perf'],
        hash: false,
        cached: false,
        cachedAssets: false,
        reasons: false,
        source: true,
        warnings: false,
        errors: false,
        errorDetails: false,
        publicPath: false,
        modulesSort: 'size',
        chunksSort: 'size',
        assetsSort: 'size'
      }
    }));
    // config.plugins.push(new WebpackObfuscator({
    //   rotateStringArray: true
    // }));
    return config;
  },
    // async redirects() {
    //   return [
    //     {
    //       source: '/(g|G)(o|O)(a|A)(t|T)/',
    //       destination: '/goat',
    //       permanent: true,
    //     }
    //   ]
    // },
    async rewrites() {
      return [
        {
          source: '/(g|G)(o|O)(a|A)(t|T)',
          destination: '/goat',
        },
        {
          source: '/(s|S)(t|T)(u|U)(n|N)(n|N)(e|E)(r|R)',
          destination: '/stunner',
        }
      ]
    }
};

// eslint-disable-next-line no-nested-ternary
module.exports = withPWA(nextConfig);
// module.exports = genSourceMap ? withSourceMaps(nextConfig) : (withPWA(nextConfig));
// module.exports = genSourceMap ? withSourceMaps(nextConfig) : nextConfig;

