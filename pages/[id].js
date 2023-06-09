/* eslint-disable react/display-name */
import Error from 'next/error';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getItem } from '../src/utils/cookie';
import { localStorage } from '../src/utils/storage';
import FooterMenu from '../src/components/footer-menu';
import isEmptyObject from '../src/utils/is-object-empty';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';
import { breadcrumbSchema, pageSchema, personSchema, videoSchema } from '../src/utils/schema';
import { getCanonicalUrl, getProfileUrlSeo, getSmallcaseUsernameUrl, updateCampaignId, updateUtmData } from '../src/utils/web';
import { getProfileVideos, getUserProfile, getUserProfileWLogin } from '../src/sources/users/profile';
import { customProfileDescSeo, customProfileTitleSeo } from '../src/utils/seo';
// import DeskUsers from '../src/components/desk-profile';
import Users from '../src/components/users';

const DeskUsers = dynamic(() => import('../src/components/desk-profile'),{
  loading: () => <div />,
  ssr: false
});

// const Users = dynamic(() => import('../src/components/users'),{
//   loading: () => <div />,
//   ssr: false
// });



// TODO enable mock mode here
export default function Hipi(params) {
  const [type,setType] = useState('others');
  const [item, setItem] = useState(params?.data || {});
  const [status,setStatus] = useState(params?.status === 'fail' ? 'pending' : 'success');
  const [url, setUrl] = useState('');
  let {
    errorCode,
    message,
  } = params;

  //console.log("PU**",params.uri)

  const [isFollowing, setIsFollowing] = useState(item?.isFollowing);
  const [videoSchemaItems, setVideoSchemaItems] = useState([]);

  const getVideoSchemaItems = async() =>{
    const response = await getProfileVideos({ id:item?.id, type: 'all', offset: '1', limit : '10', sortType:'view' });
    if(response?.data?.length > 0){
      setVideoSchemaItems(response.data);
    }
  }

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

  useEffect(() => {
    if(item !== {} && item?.id !== params?.data?.id) {
      router?.reload(window.location.pathname);
    }
  }, [params])

  useEffect(()=>{
    console.log("logout page load *")
    try{ 
      setUrl(document?.location?.href);
      //if api fails at server side for special characters - retry call
      if(status === 'pending' && isEmptyObject(item)){
        profileApiRetry();
     }
     let userType = 'others'
     const tokens = localStorage.get('tokens');
     const userId = localStorage.get('user-id');
     const userDetails = localStorage?.get('user-details');
     const userHandle = userDetails?.userHandle;
      tokens && userId && (userId === item?.id || userHandle === item?.userHandle) && (userType = 'self');
      setType(userType);
      console.log(tokens, userId, item)

    /**** to get isfollowing if logged in ****/
      if(tokens){
        console.log("inside")
        const getProfileAfterLogin = async()=>{
       try{   
         const resp = await getUserProfileWLogin(trimmedUserHandle);
         console.log('inside',resp)
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
        updateCampaignId(queryStrings);
        console.log("logout page load **")

          let timer;
           timer = setTimeout(()=>{
            getVideoSchemaItems();
           },1000)
        
           console.log("typo", type);
        
        
        window.onunload = function () {
          window?.scrollTo(0, 0);
        }
        return ()=>{clearTimeout(timer);}
 
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
     userVerified={item?.tag}
   /> 
   }

    // if(device === 'desktop'){
    //   return null;
    // }
  if (status === 'fail') {
    console.error("logout profile page failed *",message,errorCode)
    return <Error message={message} statusCode={errorCode} />;
  }

  const name = item && `${item?.firstName || ''} ${item?.lastName || ''}`
  return (
    <>
      {item && 
      <>
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema({userName:item?.userHandle})) }}
        />
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema({name:name, desc:item?.bio || '', userHandle:item?.userHandle}))}}
        />
        {videoSchemaItems?.length > 0 &&
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema({name:name, userHandle:item?.userHandle, videoId:videoSchemaItems[0]?.id})) }}
        />
       }
      </>
      }
      {videoSchemaItems?.length > 0 && 
      /* eslint-disable-next-line react/jsx-key */      
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema(videoSchemaItems))}}
        />
    }
    <SeoMeta
      data={{
        title: customProfileTitleSeo({item}),
        // image: item?.thumbnail,
        description: customProfileDescSeo({item}),
        additionalMetaTags:[{
        name:'keywords',
        content:`${item?.firstName|| ''} ${item?.lastName || ''} on Hipi, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos on Hipi, ${item?.firstName || ''} ${item?.lastName || ''},${item?.userHandle || ''}`
        }
        ],
        canonical:url && getProfileUrlSeo(url,item?.userHandle?.replace('@',''))
        }}
     />

      {/* <VideoJsonLd
       hasPart={[
      { keywords:`${item?.firstName || ''} ${item?.lastName || ''} on Hipi, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos, ${item?.firstName || ''} ${item?.lastName || ''} Short Videos on Hipi.`        
      }
       ]}
      /> */}
      {status === 'success' && comp?.[device]}
      {device === 'mobile' && type === 'self' &&
        <FooterMenu 
          selectedTab="profile"
          //  pageName={type === 'self' ? 'My Profile' : type === 'others' && 'Creator Profile'}
          //  tabName={''}
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
  //const uri = new URL(req.url, `http://${req.headers.host}`).href;
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
      ...data
    }
  };
}
