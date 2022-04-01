import Error from 'next/error';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  SeoMeta
} from '../src/components/commons/head-meta/seo-meta';
import FooterMenu from '../src/components/footer-menu';
import Users from '../src/components/users';
import { getUserProfile } from '../src/sources/users/profile';
import { localStorage } from '../src/utils/storage';
import { updateUtmData } from '../src/utils/web';

// TODO enable mock mode here
export default function Hipi(params) {
  const [type,setType] = useState('others');
  const {
    data: item = {},
    errorCode,
    message,
    status,
  } = params;

  const router = useRouter();

  useEffect(()=>{
    try{ 
      let userType = 'others'
      const tokens = localStorage.get('tokens');
      const userId = localStorage.get('user-id')
      tokens && userId && userId === item?.id && (userType = 'self');
      setType(userType);
        const queryStrings = router?.query;
        updateUtmData(queryStrings);
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
          title: `${item?.firstName || ''} ${item?.lastName || ''} on Hipi - Indian Short Video App`,
          // image: item?.thumbnail,
          description: `${item?.firstName || ''} ${item?.lastName || ''} (${item?.userHandle || ''}) on Hipi. Checkout latest trending videos from ${item?.firstName || ''} ${item?.lastName || ''} that you can enjoy and share with your friends.`        
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
     {type === 'self' &&
       <FooterMenu 
         selectedTab="profile"
       />
     }
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
  const trimmedUserHandle = id && id.replace('@','');
  let data = {};
  try {
    data = await getUserProfile(trimmedUserHandle);
    // console.log(data)
  } catch (e) {
    console.log("joker ***",e)
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
