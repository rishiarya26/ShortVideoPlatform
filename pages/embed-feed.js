import Embedvideo from '../src/components/embedvideo';
import FooterMenu from '../src/components/footer-menu';
import { getSingleFeed } from '../src/sources/feed/embed';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';

export default function Hipi(params) {
  const { data: item = {} } = params;
  console.log(item);
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
            type: 'video.movie',
            video: {
              images: [
                {
                  url: item.poster_image_url,
                  width: 800,
                  height: 600,
                  alt: item.musicCoverTitle
                }
              ],
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
      <Embedvideo
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
  const contentId = ctx?.query?.id;
  const { req } = ctx;
  const uri = (new URL(req.url, `http://${req.headers.host}`)).href;
  let data = {};
  try {
    data = await getSingleFeed({
      page: contentId
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
      ...data
    }
  };
}
