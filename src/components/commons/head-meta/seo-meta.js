import React from 'react';
import { NextSeo, VideoJsonLd } from 'next-seo';

// This link relation is used to indicate a relation between a desktop and a mobile website to search engines.

// mobileAlternate={{
//   media: 'only screen and (max-width: 640px)',
//   href: 'https://m.canonical.ie',
// }}

// language alternates

// languageAlternates={[{
//   hrefLang: 'de-AT',
//   href: 'https://www.canonical.ie/de',
// }]}

const defaultMeta = {
  // title: 'Hipi App: Free Short Video Making App for fun videos, memes & more',
  // // eslint-disable-next-line max-len
  // description: 'Dialogue Dubbing App: Download Hipi App for short music videos, create funny videos, dialogue dubbing video, dance videos & more and share on social media',
  // canonical: 'https://hipi.co.in/feed/for-you',
  // openGraph: {
  //   url: 'https://hipi.co.in/feed/for-you',
  //   title: 'Hipi App: Free Short Video Making App for fun videos, memes & more',
  //   // eslint-disable-next-line max-len
  //   description: 'Dialogue Dubbing App: Download Hipi App for short music videos, create funny videos, dialogue dubbing video, dance videos & more and share on social media',
  //   images: [
  //     {
  //       url: 'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
  //       width: 800,
  //       height: 600,
  //       alt: 'Hipi'
  //     },
  //     {
  //       url: 'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
  //       width: 900,
  //       height: 800,
  //       alt: 'Hipi'
  //     },
  //     { url: 'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg' },
  //     { url: 'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg' }
  //   ],
  //   site_name: 'Hipi'
  // },
  // twitter: {
  //   handle: '@hipi',
  //   site: '@hipi',
  //   cardType: 'summary_large_image'
  // }
};

const SeoMeta = ({ data = {} }) => {
  const meta = { ...defaultMeta, ...data };
  return (
    <NextSeo
      // noindex
      // nofollow
      // // eslint-disable-next-line react/jsx-props-no-spreading
      // {...meta}
    />
  );
};

const DonotIndex = () => (<NextSeo />);

export {
  SeoMeta,
  DonotIndex,
  VideoJsonLd
};
