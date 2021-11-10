import Error from 'next/error';
import { useState, useEffect } from 'react';
import {
  SeoMeta
} from '../../src/components/commons/head-meta/seo-meta';
import Users from '../../src/components/users';
import { getUserProfile } from '../../src/sources/users/profile';
import { localStorage } from '../../src/utils/storage';

// TODO enable mock mode here
export default function Hipi(params) {
  const [type,setType] = useState('others');
  const {
    data: item = {},
    errorCode,
    message,
    status,
  } = params;

  console.log("print",item)

  useEffect(()=>{
  try{ 
    console.log('in')
    let userType = 'others'
    const tokens = localStorage.get('tokens');
    const userId = localStorage.get('user-id')
    console.log("****",tokens, userId, item?.id)
    tokens && userId && userId === item?.id && (userType = 'self');
    setType(userType);
  }catch(e){
    console.log('something went wrong with id')
  }

  },[])

  if (status === 'fail') {
    return <Error message={message} statusCode={errorCode} />;
  }
  return (
    <>
     <SeoMeta
        data={{
          title: `${item?.firstName} ${item?.lastName} on HiPi - Watch the latest short videos from Anjusha on HiPi`,
          // image: item?.thumbnail,
          description: `${item?.firstName} ${item?.lastName} videos - Check out ${item?.firstName} ${item?.lastName} videos and followers on HiPi community. Join HiPi and follow various users and celebrities for the best short video content`
        }}
     />
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
  <Users
        followers={item?.followers}
        following={item?.following}
        totalLikes={item?.totalLikes}
        userHandle={item?.userHandle}
        profilePic={item?.profilePic}
        firstName={item?.firstName}
        lastName={item?.lastName}
        id={item?.id}
        bio={item?.bio}
        type={type}
        isFollow={item?.isFollowing}
      /> 
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
  console.log("id",id);
  let data = {};
  try {
    data = await getUserProfile(id);
    console.log("data",data);
  } catch (e) {
    data = {
      status: e?.status || 400,
      errorCode: e?.errorCode || 400,
      'http-status': e['http-status'],
      message: e?.message || 'something went wrong'
    };
  }

  return {
    props: {
      // uri,
      ...data
    }
  };
}
