import { useState } from 'react';
import Error from 'next/error';
import EmbedVideo from '../../src/components/embedvideo';
import { getSingleFeed } from '../../src/sources/feed/embed';
import { SeoMeta, VideoJsonLd } from '../../src/components/commons/head-meta/seo-meta';
import { supportedLanguages } from '../../src/hooks/use-translation';
import EmbedSeekbar from '../../src/components/emded-seekbar';

const languageCodes = Object.keys(supportedLanguages).map(keyName => supportedLanguages[keyName].code);

// TODO enable mock mode here
export default function Hipi(params) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const {
    data: item = {},
    errorCode, message,
    status
  } = params;
  const vobj = { videoId: item.content_id };
  console.log(vobj);
  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };
  if (status === 'fail') {
    return <Error message={message} statusCode={errorCode} />;
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
        thumbnailUrls={[
          item.poster_image_url
        ]}
        watchCount={item.likesCount}
        regionsAllowed={languageCodes}
      />
      <EmbedVideo
        updateSeekbar={updateSeekbar}
        socialId={item.getSocialId}
        url={item.video_url}
        id={item.content_id}
        comments={item.commentsCount}
        likes={item.likesCount}
        music={item.musicCoverTitle}
        musicTitle={item.music_title}
        profilePic={item.userProfilePicUrl}
        userName={item.userName}
        musicCoverTitle={item.musicCoverTitle}
      />
      <div className="w-full fixed bottom-4 py-2 flex justify-around items-center">
        <button
          className="rounded-full text-white py-1 px-4 bg-hipipink font-medium tracking-wide xxs:text-sm xs:text-base"
          // eslint-disable-next-line no-undef
          onClick={() => cbplugin && cbplugin.cbTouch(vobj)}
        >
          SHOP
        </button>
      </div>
      <EmbedSeekbar seekedPercentage={seekedPercentage} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  // const contentId = ctx?.query?.id;
  const {
    req, params, locale,
    defaultLocale, locales
  } = ctx;
  const uri = (new URL(req.url, `http://${req.headers.host}`)).href;
  const { id } = params;
  let data = {};
  try {
    data = await getSingleFeed({
      page: id
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
      uri,
      locale,
      locales,
      defaultLocale,
      ...data
    }
  };
}
