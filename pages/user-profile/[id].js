import Error from 'next/error';
import {
  SeoMeta
  // VideoJsonLd
} from '../../src/components/commons/head-meta/seo-meta';
// import { supportedLanguages } from '../../src/hooks/use-translation';
import UserProfile from '../../src/components/user-profile';
import { getUserProfile } from '../../src/sources/users/profile';

// const languageCodes = Object.keys(supportedLanguages).map(
//   keyName => supportedLanguages[keyName].code
// );

// TODO enable mock mode here
export default function Hipi(params) {
  const {
    data: item = {},
    errorCode,
    message,
    status
  } = params;

  if (status === 'fail') {
    return <Error message={message} statusCode={errorCode} />;
  }
  return (
    <>
      <SeoMeta
        data={{
          title: item.userHandle,
          image: item.profilePic,
          description: item.bio,
          canonical: params.uri,
          openGraph: {
            title: item.userHandle,
            description: item.bio,
            url: params.uri,
            images: [
              {
                url: item.profilePic,
                width: 800,
                height: 600,
                alt: item.userHandle
              },
              { url: item.profilePic }
            ],
            type: 'profile',
            video: {
              actors: [
                {
                  role: item.userHandle
                }
              ],
              tag: item.tag
            },
            site_name: 'Hipi'
          }
        }}
      />
      <UserProfile
        followers={item.followers}
        following={item.following}
        totalLikes={item.totalLikes}
        userHandle={item.userHandle}
        profilePic={item.profilePic}
      />
    </>
  );
}

export async function getServerSideProps(ctx) {
  // const contentId = ctx?.query?.id;
  const {
    req, params, locale, defaultLocale, locales
  } = ctx;
  const uri = new URL(req.url, `http://${req.headers.host}`).href;
  const { id } = params;
  let data = {};

  try {
    data = await getUserProfile({
      params: id
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
