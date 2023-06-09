/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/display-name */
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import useTranslation from '../../hooks/use-translation';
import { getProfileVideos, toFollow, getOwnProfileVideos } from '../../sources/users/profile';
import { useFetcher } from '../commons/component-state-handler';
import UserTab from '../commons/tabs/user-tab';
import VideoGallery from '../video-gallery';
import { numberFormatter } from '../../utils/convert-to-K';
import useDrawer from '../../hooks/use-drawer';
import useInfiniteScroll from '../../hooks/use-infinite-scroll';
import Img from '../commons/image';
// import fallbackUser from '../../../public/images/users.png' 
import { getItem } from '../../utils/cookie';
import { ShareComp } from '../commons/share';
import { share } from '../../utils/app';
import useAuth from '../../hooks/use-auth';
import login from "../auth-options"
import { localStorage } from '../../utils/storage';
import {  toTrackMixpanel } from '../../analytics/mixpanel/events';
import LikedList from '../commons/svgicons/liked-list';
import Lock from '../commons/svgicons/lock';
import Listing from '../commons/svgicons/listing';
import { Back } from '../commons/svgicons/back';
import { videoSchema } from '../../utils/schema';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';
import Verified from '../commons/svgicons/verified';
import { toTrackReco } from '../../analytics/view-events';
import { toTrackClevertap } from '../../analytics/clevertap/events';
import { getPlaylistDetails } from "../../sources/playlist";
import PlaylistBadge from '../commons/svgicons/playlistBadge';

const LandscapeView = dynamic(() => import('../landscape'),{
  loading: () => <div />,
  ssr: false
});
const AppBanner = dynamic(() => import('../app-banner'),{
  loading: () => <div />,
  ssr: false
});

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function Users({
  userHandle, profilePic, followers, following, totalLikes, firstName= '',lastName = '', id, router, type, bio='',
  isFollow=false, userVerified

}) {
  const tabType = router?.query?.type;
  const [videoData, setVideoData] = useState({});
  const [selectedTab, setSelectedTab] = useState('all');
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [showLoading, setShowLoading] = useState(isFetching)
  const [offset, setOffset] = useState(2)
  const [isFollowing,setIsFollowing] = useState();
  const [playlistArr, setPlaylistArr] = useState([]);
  // const [videoSchemaItems, setVideoSchemaItems] = useState([])

  const pageName = type === 'others' ? 'Creator Profile' : type === 'self' && 'My Profile'
  const tabName = selectedTab === 'all' ? 'All videos' : selectedTab === 'shoppable' && 'Shoppable videos'

  const tokens = localStorage.get('tokens');
  const userId = localStorage.get('user-id');
  const typeOfUser = tokens && userId && userId === id ? 'self': 'others';
  // const userId = localStorage?.get('user-id');

  useEffect(()=>{
    setIsFollowing(isFollow);
  },[isFollow])

  // const getVideoSchemaItems = async() =>{
  //   const response = await getProfileVideos({ id, type: 'all', offset: '1', limit : '10', sortType:'view' });
  //   if(response?.data?.length > 0){
  //     setVideoSchemaItems(response.data);
  //   }
  // }

  // useEffect(()=>{
  // let timer;
  //  timer = setTimeout(()=>{
  //   getVideoSchemaItems();
  //  },1000)
  //  return ()=>{clearTimeout(timer);}
  // },[])

  // async function showPopUp(){
  //   show('', detectDeviceModal, 'extraSmall');
  //   setIsFetching(false);
  // }

  useEffect(() => {
    if(tabType === "shoppable") {
      setSelectedTab("shoppable");
     }
  },[])

  useEffect(()=>{setShowLoading(isFetching)},[isFetching])


  async function fetchMoreListItems() {
   try{
    //const response = await getProfileVideos({ id, type: selectedTab, offset: `${offset}` });
    let response;
    if(typeOfUser === 'self') {
      response = await getOwnProfileVideos({ type: selectedTab, offset: `${offset}` });
    }else{
      response = await getProfileVideos({ id, type: selectedTab, offset: `${offset}` });
    }
    console.log(response)
    if(response?.data?.length > 0){
      let data = {...videoData};
      data.items = data?.items?.concat(response?.data);
      console.log("items",data)
      setVideoData(data);
      setOffset(offset+1);
      setIsFetching(false);
      setShowLoading(false)
    }else{
      console.log("inelse",response.data.length)
      setShowLoading(false);
     }
     setShowLoading(false)
   }
   catch(e){
     console.log("e",e)
   }
  }

  // useEffect(()=>{
  //   window.onunload = function () {
  //     window?.scrollTo(0, 1);
  //   }
  // },[])

  // useEffect(()=>{
  //   document?.documentElement?.scrollTop(0);
  // },[])

  const getPlaylists = async() => {
    try{
      const { playlists } = await getPlaylistDetails({creatorId: id});
      setPlaylistArr([...playlists]);
    }catch(e){
      console.log("no playlist found")
    }
  }

  useEffect(() =>{ 
    getPlaylists();
  }, [])

  useEffect(()=>{
    setIsFetching(false);
    setOffset(2);
  },[selectedTab])
  
  useEffect(() => {
    setTimeout(()=>{
      toTrackFirebase('screenView', {'page':'Profile'});
      // toTrack('Screen View', {pageName: 'Profile'});
      ToTrackFbEvents('screenView');
      // fbq.event('Screen View')
      // trackEvent('Screen_View',{'Page Name' :'Profile'})
      if(type === 'others'){
        toTrackMixpanel('screenView',{pageName:pageName, tabName:tabName},{userId:id, userName:userHandle})
        toTrackClevertap('screenView',{pageName:pageName, tabName:tabName},{userId:id, userName:userHandle})
      }
    },500);
  }, []);

  const { show } = useDrawer();
  const { t } = useTranslation();
  const deviceType = getItem('device-type');
  const device = getItem('device-info') || 'android';

  const onTabChange = selected => {
    setSelectedTab(selected);
    if(selected === "shoppable") {
      router.replace(`/${userHandle}?type=shoppable`);
    } else {
      router.replace(`/${userHandle}`);
    }
  };

  const onLikedVideosTab = selected => {
    // setSelectedTab(selected);
    // setVideoData([]);
  };

  //const dataFetcher = () => getProfileVideos({ id, type: selectedTab });
  const dataFetcher = () => {
    if(typeOfUser === 'self') {
      return getOwnProfileVideos({ type: selectedTab});
    } else{
      return getProfileVideos({ id, type: selectedTab });
    }
  }
  // eslint-disable-next-line no-unused-vars
  // const [fetchState, retry, data] = useFetcher(dataFetcher);
  const [fetchState, retry, data] = useFetcher(dataFetcher, null, selectedTab);

  const dynamicImgUrl = (url)=>{
    let imgUrl = url;
    if(imgUrl?.includes('/w_')){
      imgUrl = imgUrl?.replace(/upload\/w_+([0-9]*)/,'upload/w_120');
      if(imgUrl.includes('.jpg')){
        imgUrl = imgUrl?.replaceAll('.jpg','.webp');
      }
      return imgUrl
    }else{
      if(imgUrl?.includes('/upload') && !imgUrl?.includes('w_')){
        imgUrl = imgUrl?.replaceAll("/upload", "/upload/w_120").replaceAll('.jpg','.webp');
        return imgUrl
      }
    }
    return imgUrl
  }

  useEffect(() => {
    const videos = {};
    fetchState && (videos.status = fetchState);
    data && (videos.items = data?.data);
    new Image().src = dynamicImgUrl(data?.data?.[0]?.thumbnailUrl);
    new Image().src = dynamicImgUrl(data?.data?.[1]?.thumbnailUrl);
    // new Image().src = data?.data?.[2]?.thumbnailUrl;
    setVideoData(videos);
  }, [fetchState]);

  const handleBackClick = () => {
    const previousPage = window.sessionStorage.getItem('previous-page') || null;
    console.log("back",previousPage,window.sessionStorage.getItem('previous-page'))
    previousPage ? router?.back() : router?.push("/feed/for-you")
  };

  const followUser = async(followerId,userId, follow) =>{
    try{
    const response = await toFollow({ userId:followerId,followerId:userId,follow:follow});
    if(response){
      if(isFollowing){
        toTrackMixpanel('unFollow',{pageName:pageName,tabName:tabName},{userName:userHandle, userId:id})
        toTrackClevertap('unFollow',{pageName:pageName,tabName:tabName},{userName:userHandle, userId:id})
      }else{
        toTrackMixpanel('follow',{pageName:pageName,tabName:tabName},{userName: userHandle, userId:id});
        toTrackClevertap('follow',{pageName:pageName,tabName:tabName},{userName: userHandle, userId:id});
      }  
     setIsFollowing(!isFollowing);
  } 
}catch(e){
console.log("onClick follow btn issue ",e);
}
  }

  //const userId = localStorage?.get('user-id');
  const followFunc = !isFollowing;

  const onFollowClick = ()=>{
    if(isFollowing){
     toTrackMixpanel('cta',{pageName:pageName,tabName:tabName, name: 'Unfollow - Creator Profile', type: 'Button'},{userName:userHandle, userId:id})
    }else{
      toTrackMixpanel('cta',{pageName:pageName, tabName:tabName, name: 'Follow - Creator Profile', type: 'Button'},{userName:userHandle, userId:id})
    } 
    followUser(id, userId, followFunc)
  }

  const toShowFollow = useAuth( ()=>show('',login, 'medium',{pageName:pageName, tabName:tabName}), onFollowClick)

  const info = {
    header: {
      leftButton: { 
        others: <Back />,
        self: <Back />}, 
        // <AddUser/>       },
      notification: {
        others:'' ,
        self: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" >
        <g clipPath="url(#clip0_1962:147)">
        <path d="M13.5799 11.8549L13.2999 11.7095C12.4599 11.0549 11.8999 10.0367 11.8999 9.01855V5.45492C11.8999 3.56401 10.9199 1.74583 9.30992 0.727646C7.90992 -0.217809 6.08992 -0.217809 4.68992 0.727646C3.07992 1.74583 2.09992 3.49128 2.09992 5.45492V8.94583C2.09992 10.0367 1.60992 10.9822 0.699922 11.6367L0.419922 11.8549C0.0699219 12.1458 -0.0700781 12.5822 -7.81268e-05 13.0186C0.139922 13.4549 0.559922 13.7458 0.979922 13.7458H4.19992C4.47992 14.9822 5.59992 15.9276 6.92992 15.9276C8.25992 15.9276 9.30992 14.9822 9.65992 13.7458H12.8799C13.3699 13.7458 13.7199 13.4549 13.8599 13.0186C14.0699 12.6549 13.9299 12.1458 13.5799 11.8549ZM6.99992 14.5458C6.50992 14.5458 6.01992 14.2549 5.80992 13.8186H8.25992C7.97992 14.2549 7.48992 14.5458 6.99992 14.5458ZM9.79992 12.364H4.19992H2.09992C3.00992 11.4913 3.49992 10.2549 3.49992 8.94583V5.45492C3.49992 4.0731 4.19992 2.69128 5.45992 1.96401C6.43992 1.30946 7.62992 1.30946 8.60992 1.96401C9.79992 2.69128 10.4999 4.00037 10.4999 5.45492V8.94583C10.4999 10.2549 10.9899 11.4186 11.8999 12.364H9.79992Z" fill="#161722"/>
        </g>
        <defs>
        <clipPath id="clip0_1962:147">
        <rect width="14" height="16" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        ,
       },
      rightButton: {
        others:   
      <div
        onClick={(deviceType === 'desktop') ? () => show('Share', null, 'medium'): (deviceType === 'mobile') && (()=>share({id: userHandle, type:'profile'}))}
        className="flex relative py-2  px-3 text-center items-end flex-col"
      >
      <ShareComp type={'profile'}/>
      </div>, 
        self: <div onClick={()=> router && router?.push('/profile-settings')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
        <path d="M7 12C7 13.1046 6.10458 14 5 14C3.89542 14 3 13.1046 3 12C3 10.8954 3.89542 10 5 10C6.10458 10 7 10.8954 7 12Z" fill="#161722"/>
        <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#161722"/>
        <path d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z" fill="#161722"/>
        </svg>
        </div>
        
      }
    },
    function: {
      others: <>
        <button 
        onClick={() => {
           if(isFollowing) {
            toTrackReco("unfollow", {page: "profile", tab: "NA", user_id: id, objectID: id, objectType: "creator"});
           } else {
            toTrackReco("follow", {page: "profile", tab: "NA", user_id: id, objectID: id, objectType: "creator"});
           }
          toShowFollow()
        }}
        // onClick={handleFollow} 
        className={isFollowing ? "font-semibold text-sm border border-black rounded-sm py-1 px-9 mr-1 bg-white text-black" : "font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 bg-hipired text-white"}>
          {isFollowing ? 'Following' : t('FOLLOW')}
        </button>
      </>,
      self: <>
        {/* <Link href={`/edit-profile/${id}`}> */}
          <button onClick={() =>{
            device === 'ios' && show('', detectDeviceModal, 'extraSmall');
            device === 'android' && setShowAppBanner(true)}}  className="font-semibold text-sm border border-gray-400 rounded-sm py-2 px-12 mr-1 bg-white text-black">
            Edit Profile
          </button>
        {/* </Link> */}
      </>
    },
    tabs: {
      others: [
        {
          icon: <Listing />,
          type: 'all'
        },
        {
          icon: <LikedList/>,
          type: 'shoppable'
        }
      ],
      self: [
        {
          icon: <Listing />,
          type: 'all'
        },
        {
          icon: <LikedList/>,
          type: 'shoppable'
        },
        {
          icon: <Lock />,
          type: 'PRIVATE'
        }
      ]
    }
  };

const[ShowAppBanner, setShowAppBanner]=useState(false);
const notNowClick=()=>{
  setShowAppBanner(false);
}
  
    
// const onStoreRedirect = async ()=>{
//   // toTrackMixpanel('downloadClick');
//   let link = ONE_TAP_DOWNLOAD;
//   const device = getItem('device-info');
//   console.log(device)
// try{  
//  if(device === 'android' && videoId){ 
//    try{ const resp = await getOneLink({videoId : videoId});
//     link = resp?.data;
//     console.log("one link resp",resp);}
//     catch(e){
//       console.log('error android onelink',e)
//     }
//   }
//  }
//   catch(e){
//   }
//   console.log("final onelink",link);
//   window?.open(link);
// }



  // console.log(videoData?.items?.filter((data)=>(data?.shoppable === true)))

  // const toShowData = {
  //   all : videoData?.items,
  //   liked : videoData?.items?.filter((data)=>(data?.shoppable === true))
  // }

  const toShowFollowing = useAuth( ()=>show('',login, 'medium',{pageName:pageName,tabName:tabName} ), ()=> router && router?.push(`/profile-detail/${id}?type=following`))
  const toShowFollowers = useAuth( ()=>show('',login, 'medium',{pageName:pageName,tabName:tabName}), ()=> router && router?.push(`/profile-detail/${id}?type=followers`))

  const chipOnClick = (id,name) => {
    toTrackMixpanel("playlistClickedProfile", {pageName:"Creator Profile",playlistName: name, playlistId: id})
    router.push({pathname: `/playlist/${id}`});
  }

  return (
    <>
    {/* {videoSchemaItems?.length > 0 && videoSchemaItems?.map((item)=>(
       eslint-disable-next-line react/jsx-key    
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema({name:`${firstName} ${lastName}`, videoId:item?.id, userThumnail:profilePic, createdOn:item?.createdOn,desc:item?.content_description}))}}
        />
    ))} 
    */}
    <div className="relative">
      <div className="sticky headbar w-full flex h-16 shadow-md bg-white items-center justify-center">
        <div onClick={handleBackClick} className="p-4 h-full flex items-center absolute left-0 top-0 justify-center">
          { info.header.leftButton[type] }
        </div>
        <div className="font-bold ">{userHandle}</div>
        <div className="p-4 h-full flex items-center justify-between absolute right-0 top-0">
        {/* { info.header.notification[type] } */}
        { info.header.rightButton[type] }
       </div>
      </div>
      <div className="header flex w-full flex-col items-center pt-7 pb-2">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Img data={dynamicImgUrl(profilePic)} title="Hipi" fallback={'/images/users.png'} />
          </div>
          <h1 className="font-medium p-2 text-sm flex">{firstName} {lastName}
          {userVerified === 'Verified' ? <div className="ml-2 mt-1"><Verified/></div>:''}
          </h1>
        </div>
        <div className="followboard flex justify-around w-1/2 py-2">
          <div onClick={toShowFollowing} className="flex flex-col items-center">
            <p className="font-semibold text-sm">{numberFormatter(following)}</p>
            <p className="text-xs">Following</p>
          </div>
          <div onClick={toShowFollowers} className="flex flex-col items-center px-9">
            <p className="font-semibold text-sm">{numberFormatter(followers)}</p>
            <p className="text-xs">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold text-sm">{numberFormatter(totalLikes)}</p>
            <p className="text-xs">Likes</p>
          </div>
        </div>
        <div className="p-4 h-full flex items-center justify-center">
          {info.function[type]}
        </div>
        <div className="pb-4 px-12  text-gray-400 text-sm text-center h-full flex items-center justify-center break-all">
          {bio}
        </div>
      </div>
      <div className="tabs flex justify-around  border-t-2 border-grey-600" />
      <UserTab
        onTabChange={onTabChange}
        items={info.tabs[type]}
        selected={selectedTab}
        onLikedVideosTab={onLikedVideosTab}
      />
     {selectedTab === 'all' && playlistArr && playlistArr.length > 0 && <div className='w-full h-16 py-3 pl-3 flex flex-row bg-gray-50 overflow-x-auto'>
        {playlistArr.map((playlist) => (
          <div key={playlist?.id} onClick={() => chipOnClick(playlist?.id, playlist?.name)} className='mr-2 px-3 py-4 border flex items-center justify-center cursor-pointer bg-white min-w-max rounded'>
            <span className='mr-2'><PlaylistBadge /></span>{playlist.name}
          </div>
        ))}
      </div>}
      <VideoGallery
        items={videoData?.items}
        status={videoData?.status}
        retry={retry && retry}
        userId={id}
        userType={type}
        type={selectedTab}
        page='profile'
        showLoading={showLoading}
        fetchMoreListItems={fetchMoreListItems}
      />
     
      <LandscapeView/>
      {/* {type === 'others' && <div className="bottom-0 app_cta p-3 sticky h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center flex items-center z-10">
            <p className="text-sm">
            Get the full experience on the Hipi app
            </p>
            <div onClick={onStoreRedirect} className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
               Open
            </div>
         </div>} */}
    </div>
      {device === 'android' && ShowAppBanner ? <AppBanner notNowClick={notNowClick}/> : ''}
    </>
  );
}

export default withRouter(Users);
