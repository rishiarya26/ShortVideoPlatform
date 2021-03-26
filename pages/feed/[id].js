import EmbedVideo from '../../src/components/embedvideo';
import FooterMenu from '../../src/components/footer-menu';
import { getSingleFeed } from '../../src/sources/feed/embed';
import { SeoMeta, VideoJsonLd } from '../../src/components/commons/head-meta/seo-meta';
import { supportedLanguages } from '../../src/hooks/use-translation';

const languageCodes = Object.keys(supportedLanguages).map(keyName => supportedLanguages[keyName].code);

export default function Hipi(params) {
  const { data: item = {} } = params;
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
      <FooterMenu />
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
      notFound: true,
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
