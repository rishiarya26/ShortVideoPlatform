import Error from 'next/error';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  SeoMeta,
  VideoJsonLd
} from '../src/components/commons/head-meta/seo-meta';
import DeskUsers from '../src/components/desk-profile';
import FooterMenu from '../src/components/footer-menu';
import Users from '../src/components/users';
import { getItem } from '../src/utils/cookie';
import { getUserProfile, getUserProfileWLogin } from '../src/sources/users/profile';
import { localStorage } from '../src/utils/storage';
import { updateUtmData } from '../src/utils/web';
import isEmptyObject from '../src/utils/is-object-empty';


// TODO enable mock mode here
export default function Hipi(params) {
  const [type,setType] = useState('others');
  const [item, setItem] = useState(params?.data || {});
  const [status,setStatus] = useState(params?.status === 'fail' ? 'pending' : 'success');
  let {
    errorCode,
    message,
  } = params;

  const [isFollowing, setIsFollowing] = useState(item?.isFollowing);

  const router = useRouter();
  const device = getItem('device-type');
  const trimmedUserHandle = router?.query?.id?.replace('@','');

  const profileApiRetry = async()=>{
   try{
      const resp = await getUserProfile(trimmedUserHandle);
    
    //if api fails at server side for special characters - retry call
    if(resp?.status === 'success'){
      setItem(resp?.data);
      setStatus('success');
      
    }else{
      setStatus('fail')
    }
    }catch(e){
      setStatus('fail')
    }
  }

  useEffect(()=>{
    try{ 

      //if api fails at server side for special characters - retry call
      if(status === 'pending' && isEmptyObject(item)){
        profileApiRetry();
     }

      let userType = 'others'
      const tokens = localStorage.get('tokens');
      const userId = localStorage.get('user-id')
      tokens && userId && userId === item?.id && (userType = 'self');
      setType(userType);

    /**** to get isfollowing if logged in ****/
      if(status === 'success' && tokens){
        const getProfileAfterLogin = async()=>{
       try{   
         const resp = await getUserProfileWLogin(trimmedUserHandle);
         setIsFollowing(resp?.data?.isFollowing);
        }catch(e){
             console.log("Error rrr",e);
        }
      }
        getProfileAfterLogin();
      }
   /*************/
        const queryStrings = router?.query;
        updateUtmData(queryStrings);
    }catch(e){
      console.log('something went wrong with id')
    }
  
    },[])

   const comp = {
     desktop :   <DeskUsers
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
     isFollow={isFollowing}
     userVerified={item?.tag}
   /> ,
     mobile:   <Users
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
     isFollow={isFollowing}
   /> 
   }

    // if(device === 'desktop'){
    //   return null;
    // }
  if (status === 'fail') {
    return <Error message={message} statusCode={errorCode} />;
  }
  return (
    <>
    <SeoMeta
        data={{
          title: `${item?.firstName || ''} ${item?.lastName || ''} on Hipi | ${item?.firstName || ''} ${item?.lastName || ''} Short Videos on Hipi `,
          // image: item?.thumbnail,
          description: `${item?.firstName || ''} ${item?.lastName || ''} on Hipi. Check out latest trending videos from ${item?.firstName || ''} ${item?.lastName || ''} on Hipi. Download the App Now!`,
          additionalMetaTags:[{
            name: 'keywords',
            content: `${item?.firstName || ''} ${item?.lastName || ''} on Hipi, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos on Hipi`
          }
        ],

        }}
     />
      {/* <VideoJsonLd
       hasPart={[
      { keywords:`${item?.firstName || ''} ${item?.lastName || ''} on Hipi, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos on Hipi.`        
      }
       ]}
      /> */}
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
      {status === 'success' && comp?.[device]}
     {device === 'mobile' && type === 'self' &&
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
