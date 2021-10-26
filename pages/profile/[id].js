import Error from 'next/error';
import {
  SeoMeta
} from '../../src/components/commons/head-meta/seo-meta';
import Users from '../../src/components/users';
import { getUserProfile } from '../../src/sources/users/profile';

// TODO enable mock mode here
export default function Hipi(params) {
  const {
    data: item = {},
    errorCode,
    message,
    status,
    type,
    tokens
  } = params;

  console.log("print",item)

  if (status === 'fail') {
    return <Error message={message} statusCode={errorCode} />;
  }
  return (
    <>
      {/* <SeoMeta
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
      /> */}
      {tokens ? <Users
        followers={item?.followers}
        following={item?.following}
        totalLikes={item?.totalLikes}
        userHandle={item?.userHandle}
        profilePic={item?.profilePic}
        firstName={item?.firstName}
        lastName={item?.lastName}
        id={item?.id}
        bio={item?.bio}
        type={type && type}
      /> : 'Forbidden'}
    </>
  );
}

export async function getServerSideProps(ctx) {
  // const contentId = ctx?.query?.id;
  const {
    req, params
  } = ctx;
  // const uri = new URL(req.url, `http://${req.headers.host}`).href;
  const { id } = params;
  let type = 'others'
  const userId = req?.cookies['user-id'];
  let tokens = req?.cookies['tokens'];
  if(!tokens){
  tokens = null;
  }  
  userId && (userId === id) && (type = 'self')
  let data = {};
  try {
    console.log("called api")
    data = await getUserProfile(id);
  } catch (e) {
    console.log("error")
    data = {
      status: e?.status || 400,
      errorCode: e?.errorCode || 400,
      'http-status': e['http-status'],
      message: e?.message || 'something went wrong'
    };
  }

  return {
    props: {
      type,
      tokens,
      // uri,
      ...data
    }
  };
}
