/*eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import EmbedVideo from '../../src/components/embed-video';
import { getSingleFeed } from '../../src/sources/feed/embed';
import {
  SeoMeta,
  VideoJsonLd
} from '../../src/components/commons/head-meta/seo-meta';
import { supportedLanguages } from '../../src/hooks/use-translation';
import { getEffectiveVideoUrl } from '../../src/utils/content';
import SingleVideo from '../../src/components/single-video';
import { getItem } from '../../src/utils/cookie';
import { useRouter } from 'next/router';
import Error from '../../src/components/404';
import VideoDetail from '../../src/components/desk-video-detail';
import DeskMenu from '../../src/components/desk-menu';
import Header from '../../src/components/desk-header';
import { singleVideoSchema } from '../../src/utils/schema';
import { getCanonicalUrl, isReffererGoogle } from '../../src/utils/web';
import VideoUnavailable from '../../src/components/video-unavailable';

const languageCodes = Object.keys(supportedLanguages).map(
  keyName => supportedLanguages[keyName].code
);

// TODO enable mock mode here
export default function Hipi(params={}) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [url, setUrl] = useState('');


  const router = useRouter();
  const {
    data: item = {},
    errorCode,
    message,
    status
  } = params;
  const canShop = item?.canShop?.status || 'fail';
  const shopCards = item?.canShop?.data;
  const videoId = item?.content_id;
  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };
// console.log(item)
  useEffect(() => {
    // console.log(item)
        setUrl(document?.location?.href);
        //if api fails at server side for special characters - retry call
    const videoUrl = getEffectiveVideoUrl(item.video_urls);
    setVideoUrl(videoUrl);
    console.log('created-on',item);
    if(status === 'fail' && isReffererGoogle()){
      window.location.href='/feed/for-you'
   }
  }, []);
  const device = getItem('device-type')


  // if (status === 'fail') {
  //   if(device === 'desktop'){
  //     return <div>
  //       Not Found
  //       <div onClick={()=>window.location.href = '/feed/for-you'}></div>
  //     </div>
  //   }else if(device === 'mobile'){
  //     return <div>
  //       Not Found
  //       <div onClick={()=>window.location.href = '/feed/for-you'}></div>
  //     </div>
  //   }
  //   // return <Error/> ;
  // }



  const comp = {
    desktop :  
    <div className='flex flex-col'>
    <Header/>
    <div className='flex w-full pt-16 mt-2 relative'>
    <div className='w-2/12 w-prof-menu -mt-24 menu-sm'>
    <DeskMenu width={'w-prof-menu menu-sm-w'}/>
    </div>
   {status !== 'fail' ? <div className="w-10/12 flex flex-col pl-4">
    <div onClick={()=>router && router && router.push('/feed/for-you')} className='flex py-6  items-center cursor-pointer'>
      <svg  width="20" height="20" viewBox="0 0 48 48" fill="currentColor" ><path fillRule="evenodd" clipRule="evenodd" d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L8.82843 24L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z"></path></svg>
      <p className="text-gray-600 font-medium">Back to For You</p>
    </div>
    <VideoDetail
    userName={item?.userName} 
    likesCount={item?.likesCount} 
    music_title={item?.music_title} 
    userProfilePicUrl={item?.userProfilePicUrl} 
    url={videoUrl && videoUrl} 
    firstFrame={item?.firstFrame} 
    firstName={item?.videoOwnersDetail?.firstName}
    lastName={item?.videoOwnersDetail?.lastName} 
    description={item?.content_description} 
    videoId={item?.content_id}
    shareCount={item?.shareCount}
    socialId={item?.getSocialId}
    commentCount={item?.commentCount}
    userVerified = {item?.verified}
    comp = 'deskSingleVideo'
    videoSound={item?.videoSound}
    />
    </div> : 
   <VideoUnavailable/>
    }
    </div>
    </div>,
    mobile : <SingleVideo
    updateSeekbar={updateSeekbar}
    socialId={item?.getSocialId}
    url={videoUrl}
    id={item?.content_id}
    comments={item?.commentsCount}
    likes={item?.likesCount}
    music={item?.musicCoverTitle}
    musicTitle={item?.music_title}
    profilePic={item?.userProfilePicUrl}
    userName={item?.userName}
    musicCoverTitle={item?.musicCoverTitle}
    hashTags={item?.hashTags}
    canShop={canShop}
    shopCards={shopCards}
    videoId={videoId}
    poster={item?.firstFrame}
    seekedPercentage={seekedPercentage}
    description={item?.content_description}
    userId={item?.userId}
    genre={item?.genre}
    status={status}
    adData={item?.adData}
    videoSound={item?.videoSound}
    campaignId={item?.canShop?.campaignId}
  />
  }

  return (
    <>
     <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(singleVideoSchema({name:`${item?.videoOwnersDetail?.firstName || ''} ${item?.videoOwnersDetail?.lastName || ''}`, videoId:item?.content_id, userThumnail:item?.firstFrame, desc:item?.content_description, createdOn:item?.createdOn}))}}
        />
     { <SeoMeta
        data={{
          title: `${item?.content_description || ''} | ${item?.videoOwnersDetail?.firstName || ''} ${item?.videoOwnersDetail?.lastName || ''}’s Video on Hipi`,
          description: `${item?.likesCount} likes Watch trending Hipi videos from ${item?.videoOwnersDetail?.firstName || ''} ${item?.videoOwnersDetail?.lastName || ''} (@${item?.userName || ''}). Download the App Now!`,        
          canonical : url && getCanonicalUrl(url),
        }}
     />}
      {item && comp?.[device]}
    </>
  );
}

export async function getServerSideProps(ctx) {
  // const contentId = ctx?.query?.id;
  const {
     params
    // , locale,
    // defaultLocale, locales
  } = ctx;
  //const uri = new URL(req.url, `http://${req.headers.host}`).href;
  const { id } = params;
  let data = {};

  try {
    data = await getSingleFeed({
      id
    });
  } catch (e) {
    data = {
      status: e.status,
      errorCode: e.errorCode,
      'http-status': e['http-status'],
      message: e.message
    };
  }
  return {
    props: {
      // uri,
      // locale,
      // locales,
      // defaultLocale,
      ...data
    }
  };
}
