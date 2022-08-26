import Error from 'next/error';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';
import FooterMenu from '../../src/components/footer-menu';
import Users from '../../src/components/users';
import { getUserProfile } from '../../src/sources/users/profile';
import { getItem } from '../../src/utils/cookie';
import { localStorage } from '../../src/utils/storage';
import { updateCampaignId, updateUtmData } from '../../src/utils/web';

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
        updateCampaignId(queryStrings);
    }catch(e){
      console.log('something went wrong with id')
    }
  },[])

  if (status === 'fail') {
    return <Error message={message} statusCode={errorCode} />;
  }

  const device = getItem('device-type')

  if(device === 'desktop'){
     router && router?.push('/');
    return null;
  }

  return (
    <>
     <SeoMeta
        data={{
          title: `${item?.firstName || ''} ${item?.lastName || ''} on Hipi - ${item?.firstName || ''} ${item?.lastName || ''} Short Videos on Hipi `,
          // image: item?.thumbnail,
          description: `${item?.firstName || ''} ${item?.lastName || ''} on Hipi. Check out latest trending videos from ${item?.firstName || ''} ${item?.lastName || ''} on Hipi. Download the App Now!`,
          keywords : `${item?.firstName || ''} ${item?.lastName || ''} on Hipi, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos on Hipi.`,        
        }}
     />
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
    params
  } = ctx;
  // const uri = new URL(req.url, `http://${req.headers.host}`).href;
  const { id } = params;
  const trimmedUserHandle = id && id.replace('@','');
  let data = {};
  try {
    data = await getUserProfile(trimmedUserHandle);
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
