import React from 'react';
import NextSeo from 'next-seo';

const DEFAULT_SEO = {
  title: 'hipi',
  description: 'watch videos on hipi',
  openGraph: {
    type: 'website',
    locale: 'en-IN',
    url: 'https://hipi-web.s3.ap-south-1.amazonaws.com/feed.html',
    title: 'hipi',
    description: 'watch videos on hipi',
    image:
      'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
    site_name: 'hipi.com',
    imageWidth: 1200,
    imageHeight: 1200
  },
  twitter: {
    handle: '@hipi',
    cardType: 'summary_large_image'
  }
};

// function isNewPage(prevProps, newProps) {
//   return (prevProps.path === newProps.path);
// }

// const Meta = props => (
//   <>
//     <link rel="canonical" href={props.path || '//hipi.com'} />
//     <meta property="og:type" content="article" />
//     <meta property="og:title" content={props.title || 'watch hipi'} />
//     <meta property="og:image" content={props.image || ''} />
//     <meta property="og:url" content={props.path} />
//     <meta
//       property="og:description"
//       content="This project is a starter kit that can be used to build a robust and high performance web app."
//     />

//     <meta name="twitter:card" content="summary" />
//     <meta name="twitter:title" content="hipi Web Starter Kit" />
//     {/* twitter needs absolute urls for image */}
//     {/* <meta name="twitter:image" content="https://covid.bhaarat.ai/img_fb.jpg" /> */}
//     <meta name="twitter:image:alt" content="hipi Web Starter Kit" />

//     <meta
//       name="description"
//       itemProp="description"
//       content="This project is a starter kit that can be used to build a robust and high performance web app"
//     />
//     <meta name="keywords" content="hipi web starter kit" />
//     <meta name="format-detection" content="telephone=no" />
//   </>
// );

// const SeoMeta = React.memo(Meta, isNewPage);

const SeoMeta = () => (<NextSeo config={DEFAULT_SEO} />);

export default SeoMeta;
