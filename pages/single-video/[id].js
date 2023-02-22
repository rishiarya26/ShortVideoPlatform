/*eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { getSingleFeed } from '../../src/sources/feed/embed';
import SingleVideo from '../../src/components/single-video';
import { getItem } from '../../src/utils/cookie';
import { isReffererGoogle } from '../../src/utils/web';
import dynamic from 'next/dynamic';

const AdditonalThings = dynamic(
  () => import('./additonal-things'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const DeskSingleVideo = dynamic(
  () => import('../../src/components/desk-single-video'),
  {
    loading: () => <div />,
    ssr: false
  }
);
// const languageCodes = Object.keys(supportedLanguages).map(
//   keyName => supportedLanguages[keyName].code
// );

// TODO enable mock mode here
export default function Hipi(params={}) {
  const device = getItem('device-type');
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showAdditionalThings, setShowAdditionalThings] = useState(false);

  const {
    data: item = {},
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
        //if api fails at server side for special characters - retry call
    // const videoUrl = getEffectiveVideoUrl(item?.video_urls);
    console.log(item)
    const videoUrl = item?.video_urls?.fast ||  item?.video_urls?.medium || item?.video_urls?.low;
    setVideoUrl(videoUrl);
    if(status === 'fail' && isReffererGoogle()){
      window.location.href='/feed/for-you'
   }
   setTimeout(()=>{setShowAdditionalThings(true)},3000)
  }, []);



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


  // const comp = {
  //   desktop : 
  //   <DeskSingleVideo
  //   item= {item}
  //   videoUrl={videoUrl}
  //   status={status}
  // /> 
  //     ,
  //   mobile : <SingleVideo
  //   updateSeekbar={updateSeekbar}
  //   socialId={item?.getSocialId}
  //   url={videoUrl}
  //   id={item?.content_id}
  //   comments={item?.commentsCount}
  //   likes={item?.likesCount}
  //   music={item?.musicCoverTitle}
  //   musicTitle={item?.music_title}
  //   profilePic={item?.userProfilePicUrl}
  //   userName={item?.userName}
  //   musicCoverTitle={item?.musicCoverTitle}
  //   hashTags={item?.hashTags}
  //   canShop={canShop}
  //   shopCards={shopCards}
  //   videoId={videoId}
  //   poster={item?.firstFrame}
  //   seekedPercentage={seekedPercentage}
  //   description={item?.content_description}
  //   userId={item?.userId}
  //   genre={item?.genre}
  //   status={status}
  //   adData={item?.adData}
  //   videoSound={item?.videoSound}
  //   campaignId={item?.canShop?.campaignId}
  //   playlistId={item?.playlistId || "NA"}
  //   playlistName={item?.playlistName || "NA"}
  // />
  // }

  return (
    <>
   {device === 'mobile' && item &&
     <SingleVideo
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
     playlistId={item?.playlistId || "NA"}
     playlistName={item?.playlistName || "NA"}
   />
   } 
   {device === 'desktop' && item && 
    <DeskSingleVideo
        item= {item}
        videoUrl={videoUrl}
        status={status}
      />}
      {showAdditionalThings && 
      <AdditonalThings
        videoUrl={videoUrl}
        item={item}
      />}
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
