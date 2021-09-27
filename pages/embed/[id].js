import { useState, useEffect } from 'react';
import Error from 'next/error';
import EmbedVideo from '../../src/components/embed-video';
import { getSingleFeed } from '../../src/sources/feed/embed';
import {
  SeoMeta,
  VideoJsonLd
} from '../../src/components/commons/head-meta/seo-meta';
import { supportedLanguages } from '../../src/hooks/use-translation';
import { getEffectiveVideoUrl } from '../../src/utils/content';
import { getItem } from '../../src/utils/cookie';
import { useRouter } from 'next/router';
// import { Shop } from '../../src/components/commons/button/shop';

const languageCodes = Object.keys(supportedLanguages).map(
  keyName => supportedLanguages[keyName].code
);

// TODO enable mock mode here
export default function Hipi(params) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);

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

  useEffect(() => {
    const videoUrl = getEffectiveVideoUrl(item.video_urls);
    setVideoUrl(videoUrl);
  }, []);

  if (status === 'fail') {
    return <Error message={message} statusCode={errorCode} />;
  }

  const device = getItem('device-type')

  if(device === 'desktop'){
    router.push('/');
    return null;
  }

  return (
    <>
      <SeoMeta
        data={{
          title: item.musicCoverTitle,
          image: item.poster_image_url,
          description: item.content_description,
          canonical: params.uri,
          openGraph: {
            title: item.musicCoverTitle,
            description: item.content_description,
            url: params.uri,
            images: [
              {
                url: item.poster_image_url,
                width: 800,
                height: 600,
                alt: item.musicCoverTitle
              },
              { url: item.userProfilePicUrl }
            ],
            type: 'video.movie',
            video: {
              actors: [
                {
                  role: item.userName
                }
              ],
              tag: item.genre
            },
            site_name: 'Hipi'
          }
        }}
      />
      <VideoJsonLd
        name={item.musicCoverTitle}
        description={item.content_description}
        contentUrl={item.video_url}
        embedUrl={params.uri}
        thumbnailUrls={[item.poster_image_url]}
        watchCount={item.likesCount}
        regionsAllowed={languageCodes}
      />
      <EmbedVideo
        updateSeekbar={updateSeekbar}
        socialId={item.getSocialId}
        url={videoUrl}
        id={item.content_id}
        comments={item.commentsCount}
        likes={item.likesCount}
        music={item.musicCoverTitle}
        musicTitle={item.music_title}
        profilePic={item.userProfilePicUrl}
        userName={item.userName}
        musicCoverTitle={item.musicCoverTitle}
        hashTags={item.hashTags}
        canShop={canShop}
        shopCards={shopCards}
        videoId={videoId}
        poster={item.thumbnail}
        seekedPercentage={seekedPercentage}
      />
      {/* <div className="w-full fixed bottom-0 py-2 flex justify-around items-center">
        <Shop videoId={videoId} canShop={canShop} />
      </div> */}
    </>
  );
}

export async function getServerSideProps(ctx) {
  // const contentId = ctx?.query?.id;
  const {
    req, params
    // , locale,
    // defaultLocale, locales
  } = ctx;
  const uri = new URL(req.url, `http://${req.headers.host}`).href;
  const { id } = params;
  let data = {};

  try {
    data = await getSingleFeed({
      id
    });
    console.log('data----',data)
  } catch (e) {
    data = {
      status: e.status,
      errorCode: e.errorCode,
      'http-status': e['http-status'],
      message: e.message
    };
    console.log('error',e)
  }
  return {
    props: {
      uri,
      // locale,
      // locales,
      // defaultLocale,
      ...data
    }
  };
}
