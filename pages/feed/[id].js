/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChooseOnType from '../../src/components/choose-on-type';
//import DeskFeed from '../../src/components/desk-feed';
import Feed from '../../src/components/feed';
//import FeedIphone from '../../src/components/feed-iphone';
import { getItem } from '../../src/utils/cookie';
import { getCanonicalUrl, getUrl, updateCampaignId, updateUtmData } from '../../src/utils/web';
import {websiteSchema, organisationSchema} from '../../src/utils/schema'
// import { getSingleFeed } from '../../src/sources/feed/embed';
import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';
import dynamic from 'next/dynamic';

const DeskFeed = dynamic(()=> import('../../src/components/desk-feed'),{
  loading: () => <div />,
  ssr: false
})

// const Feed = dynamic(()=> import('../../src/components/feed'),{
//   loading: () => <div />,
//   ssr: false
// })

const FeedIphone = dynamic(()=> import('../../src/components/feed-iphone'),{
  loading: () => <div />,
  ssr: false
})

export default function Hipi({data ={}}) {
  const router = useRouter();
  const device = getItem('device-type');
  let { thumbnail= 'https://www.hipi.co.in/icons/icon-512x512.png', content_description='www.hipi.co.in', music_title='' } = data;
  
  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
    updateCampaignId(queryStrings);
  },[])

  return (
    <>
      <SeoMeta
        data={{
          title: 'Discover Popular Videos |  Hipi - Indian Short Video App',
          description: 'Hipi is a short video app that brings you the latest trending videos that you can enjoy and share with your friends or get inspired to make awesome videos. Hipi karo. More karo.',
          canonical: getCanonicalUrl && getCanonicalUrl(),
          openGraph: {
            title: 'HIPI.CO.IN',
            description: content_description,
            url: getUrl(),
            images: [
              {
                url: thumbnail,
                width: 512,
                height: 512,
                alt: music_title
              },
            ],
            type: 'image/png',
            site_name: 'Hipi'
          }
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
    {device === 'desktop' ?  <DeskFeed/> : 
    device === 'mobile' &&
    <ChooseOnType android={<Feed/>} ios={<FeedIphone/>}/>}
    </>
  );
}

// export async function getServerSideProps({query}) {
//   const { videoId } = query;
//   let data = {};
//   try {
//     data = await getSingleFeed({id:videoId});
//   } catch (e) {
//     data = {
//       status: e?.status || 400,
//       errorCode: e?.errorCode || 400,
//       'http-status': e['http-status'],
//       message: e?.message || 'something went wrong',
//       thumbnail: "https://www.hipi.co.in/icons/icon-512x512.png",
//       content_description: 'www.hipi.co.in',
//       music_title:""
//     };
//   }
//   return {
//     props: {
//       ...data
//     }
//   };
// }

