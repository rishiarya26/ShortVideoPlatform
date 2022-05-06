/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/display-name */
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { getProfileVideos, toFollow } from '../../sources/users/profile';
import { useFetcher } from '../commons/component-state-handler';
import { Back } from '../commons/svgicons/back';
import UserTab from '../commons/tabs/desk-user-tab';
import VideoGallery from '../video-gallery';
import LikedList from '../commons/svgicons/liked-list';
import Lock from '../commons/svgicons/lock';
import Listing from '../commons/svgicons/listing';
import { numberFormatter } from '../../utils/convert-to-K';
import useDrawer from '../../hooks/use-drawer';
import dynamic from 'next/dynamic';
import useInfiniteScroll from '../../hooks/use-infinite-scroll';
import Img from '../commons/image';
import fallbackUser from '../../../public/images/users.png' 
import { getItem } from '../../utils/cookie';
import { ShareComp } from '../commons/share';
import { shareProfile } from '../../utils/app';
import AddUser from '../commons/svgicons/add-user';
import useAuth from '../../hooks/use-auth';
import login from "../auth-options"
import { localStorage } from '../../utils/storage';
import { commonEvents } from '../../analytics/mixpanel/events';
import { track } from '../../analytics';
import { ONE_TAP_DOWNLOAD } from '../../constants';
import { getOneLink } from '../../sources/social';
import * as fbq from '../../analytics/fb-pixel'
import { trackEvent } from '../../analytics/firebase';
import DeskVideoGallery from '../desk-video-gallery';
import ShareOutline from '../commons/svgicons/share-outline';
import { withBasePath } from '../../config';
import CloseSolid from '../commons/svgicons/close-solid';
import SearchBlack from '../commons/svgicons/search-black';
import Header from '../desk-header';
import DeskMenu from '../desk-menu';
import VideoDetail from '../desk-video-detail';
import Mute from '../commons/svgicons/mute';
import Play from '../commons/svgicons/play-outlined';
import CartLg from '../commons/svgicons/cart-lg';
import CartLgLight from '../commons/svgicons/cart-lg-light';
import VerifiedLg from '../commons/svgicons/verified-lg';

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const LandscapeView = dynamic(
  () => import('../landscape'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function DeskUsers({
  userHandle, profilePic, followers, following, totalLikes, firstName= '',lastName = '', id, router, type, bio='',
  isFollow=false, userVerified
}) {
  const [videoData, setVideoData] = useState({});
  const [selectedTab, setSelectedTab] = useState('all');
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [showLoading, setShowLoading] = useState(isFetching)
  const [offset, setOffset] = useState(2)
  const [isFollowing,setIsFollowing] = useState();
  /****** for video detail - start ******/
  const [showVideoDetail, setShowVideoDetail] = useState(false);
  const [vDetailActiveIndex, setVDetailActiveIndex] = useState();
  const [videoDetailData, setVideoDetailData] = useState({});

  const updateActiveIndex = (value)=>{
    console.log("clicked on video - detail : -", value);
    setShowVideoDetail(true);
    setVDetailActiveIndex(value);
    setVideoDetailData(videoData?.items?.[value]);
    console.log('item',videoData?.items?.[value]);
  }

  useEffect(()=>{
    setIsFollowing(isFollow);
  },[isFollow])
  
  const hideVideoDetail = ()=>{
    setShowVideoDetail(false);
    window.history.replaceState('Profile Page','Profile',`/${userHandle}`);
  }

  const handleUpClick=()=>{
   if(vDetailActiveIndex+1 < videoData?.items?.length-1){
    updateActiveIndex(vDetailActiveIndex+1);
    // handleAutoScroll(vDetailActiveIndex+1);
    if(vDetailActiveIndex+1 === videoData?.items?.length-2){
      fetchMoreListItems();
    }
   } 
  }
  
  const handleDownClick=()=>{
    if(vDetailActiveIndex-1 >= 0){
    updateActiveIndex(vDetailActiveIndex-1);
    // handleAutoScroll(vDetailActiveIndex-1)
   }
  }  

  /****** for video detail - end ******/

  // async function showPopUp(){
  //   show('', detectDeviceModal, 'extraSmall');
  //   setIsFetching(false);
  // }

  useEffect(()=>{setShowLoading(isFetching)},[isFetching])


  async function fetchMoreListItems() {
   try{
    const response = await getProfileVideos({ id, type: selectedTab, offset: `${offset}`});
    console.log("fetchedMore",response)
    if(response?.data?.length > 0){
      let data = {...videoData};
      if(data.items){
        data.items = data?.items?.concat(response?.data);
        data.status = 'success';
      }else{
        const resp = await getProfileVideos({ id, type: selectedTab, offset: `1`});
        data.items = resp?.data?.concat(response?.data);
        data.status = 'success';
      }
      console.log("items",data)
      setVideoData(data);
      setOffset(offset+1);
      setIsFetching(false);
      setShowLoading(false);
    }else{
      console.log("inelse",response.data.length);
      setShowLoading(false);
     }
     setShowLoading(false);
   }
   catch(e){
     console.log("e",e)
   }
  }

  useEffect(()=>{
    window.onunload = function () {
      window?.scrollTo(0, 0);
    }
  },[])

  // useEffect(()=>{
  //   document?.documentElement?.scrollTop(0);
  // },[])

  useEffect(()=>{
    setIsFetching(false);
    setOffset(2);
  },[selectedTab])
  
  useEffect(() => {
    setTimeout(()=>{
      const mixpanelEvents = commonEvents();
      mixpanelEvents['Page Name'] = 'Profile';
      fbq.event('Screen View')
      trackEvent('Screen_View',{'Page Name' :'Profile'})
      track('Screen View',mixpanelEvents );
    },500);
  }, []);

  const { show } = useDrawer();
  const { t } = useTranslation();
  const deviceType = getItem('device-type');

  const onTabChange = selected => {
    setSelectedTab(selected);
  };

  const onLikedVideosTab = selected => {
    // setSelectedTab(selected);
    // setVideoData([]);
  };

  const dataFetcher = () => getProfileVideos({ id, type: selectedTab });
  // eslint-disable-next-line no-unused-vars
  // const [fetchState, retry, data] = useFetcher(dataFetcher);
  const [fetchState, retry, data] = useFetcher(dataFetcher, null, selectedTab);

  useEffect(() => {
    const videos = {};
    fetchState && (videos.status = fetchState);
    data && (videos.items = data?.data);
    setVideoData(videos);
  }, [fetchState]);

  const handleBackClick = () => {
    router.back();
  };

  // const handleFollow = async()=>{
  //   let response = {}
  //   try{
  //   response = await toFollow({followerId:id})
  //   }catch(e){

  //   }
  // }

  const followUser = async(followerId,userId, follow) =>{
    const response = await toFollow({ userId:followerId,followerId:userId,follow:follow});
    if(response){
     setIsFollowing(!isFollowing);
  } 
  }

  const userId = localStorage.get('user-id');
  const followFunc = !isFollowing;

  const toShowFollow = useAuth( ()=>show('',login, 'medium'), ()=>followUser(id, userId, followFunc))

  const info = {
    header: {
      leftButton: {
        others: <Back />,
        self: ''}, 
        // <AddUser/>       },
      notification: {
        others:'' ,
        self: <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        onClick={(deviceType === 'desktop') ? () => show('Share', null, 'medium'): (deviceType === 'mobile') && (()=>shareProfile(id))}
        className="flex relative py-2  px-3 text-center items-end flex-col"
      >
      <ShareComp type={'profile'}/>
      </div>, 
        self: <div onClick={()=>router?.push('/profile-settings')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        onClick={toShowFollow}
        // onClick={handleFollow} 
        className={isFollowing ? "font-semibold text-sm border border-black rounded py-1 px-9 mr-1 bg-white text-black" : "font-semibold text-sm border border-hipired rounded py-1 px-9 mr-1 bg-hipired text-white"}>
          {isFollowing ? 'Following' : t('FOLLOW')}
        </button>
      </>,
      self: <>
        {/* <Link href={`/edit-profile/${id}`}> */}
          <button onClick={() => show('', detectDeviceModal, 'extraSmall', {text: "edit Profile"})}  className="font-semibold text-sm border border-gray-400 rounded-sm py-2 px-12 mr-1 bg-white text-black">
            Edit Profile
          </button>
        {/* </Link> */}
      </>
    },
    tabs: {
      others: [
        {
          text: 'Videos',
          type: 'all'
        },
        {
          text: 'Shoppable',
          icon:{
            active: <CartLg/>,
            InActive:<CartLgLight/>
          },
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

  // const toShowFollowing = useAuth( ()=>show('',login, 'medium'), ()=>router?.push(`/profile-detail/${id}?type=following`))
  // const toShowFollowers = useAuth( ()=>show('',login, 'medium'), ()=>router?.push(`/profile-detail/${id}?type=followers`))

  // const refs = items?.length > 0 && items.reduce((acc, value, index) => {
  //   acc[index] = createRef();
  //   return acc;
  // }, {});
  
  // const handleAutoScroll = id =>
  //   refs[id].current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //   });
  

  return (
    <div className="flex flex-col w-screen h-screen">
     {showVideoDetail && 
       <div className='z-20 fixed top-0 left-0 w-full'>
         <VideoDetail
         userName={videoDetailData?.userName} 
         likesCount={videoDetailData?.likesCount} 
         music_title={videoDetailData?.music_title} 
         userProfilePicUrl={videoDetailData?.userProfilePicUrl} 
         url={videoDetailData?.video_url} 
         firstFrame={videoDetailData?.firstFrame} 
         firstName={videoDetailData?.firstName}
         lastName={videoDetailData?.lastName} 
         description={videoDetailData?.content_description} 
         updateActiveIndex={updateActiveIndex} 
         videoId={videoDetailData?.content_id}
         handleUpClick={handleUpClick} 
         handleDownClick={handleDownClick}
         hideVideoDetail={hideVideoDetail}
         shareCount={videoDetailData?.shareCount}
         activeIndex={vDetailActiveIndex}
         socialId={videoDetailData?.getSocialId}
         userVerified={userVerified === 'Verified' ? 'verified' : ''}
         />
       </div>}
    <Header/>
    <div className="flex w-screen h-screen bg-white relative pt-24">
    <div className='w-2/12 w-prof-menu menu-sm'>
    <DeskMenu width={'w-prof-menu menu-sm-w'}/>
    </div>
    
    <div className="w-10/12 pl-8">
      <div className="profile-details flex flex-col w-1/2 relative text-gray-700"> 
         {/* <div className="absolute right-4 top-4">
            <ShareOutline/>
         </div> */}
            <div className="flex items-center pb-2">
               <div className="flex items-center usrimg w-32 h-32 min-w-32 rounded-full overflow-hidden mr-4">
               <Img data={profilePic} title="Hipi" fallback={fallbackUser?.src} />               </div>
               <div className="flex flex-col h-32 justify-between">
                  <div>
                  <h3 className=" mb-1 mt-1.5 flex items-center font-bold text-2xl ">{userHandle} <div className="ml-2">{userVerified === 'Verified' ?<VerifiedLg/> : ''} </div></h3>
                  <p className="font-medium text-gray-600 py-1 p-2 text-lg">{firstName} {lastName}</p>
                  
                  </div>
                  {/* <button className="font-semibold text-md border border-hipired rounded-md py-1 px-24 mr-1 h-10 bg-hipired text-white"> */}
          {info.function[type]}
        {/* </button> */}
               </div>
            </div>
            <div className="list flex  mt-8">
                  <div className="flex text-gray-700 items-end">
                     <p className="font-semibold text-lg">{numberFormatter(following)}</p>
                     <p className="pl-2">Following</p>
                  </div>
                  <div className="flex text-gray-700 items-end ml-4">
                     <p className="font-semibold text-lg">{numberFormatter(followers)}</p>
                     <p className="pl-2">Followers</p>
                  </div>
                  <div className="flex text-gray-700 items-end ml-4">
                     <p className="font-semibold text-lg">{numberFormatter(totalLikes)}</p>
                     <p className="pl-2">Likes</p>
                  </div>
            </div>
            <div className="Bio">
               <p className="py-4 pr-12 text-gray-00 text-md h-full flex items-center">
                                 {bio}
               </p>
            </div>
            </div>
      {/* <div className="header flex w-full flex-col items-center pt-7 pb-2">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Img data={profilePic} title="Hipi" fallback={fallbackUser?.src} />
          </div>
          <p className="font-medium p-2 text-sm">{firstName} {lastName}</p>
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
        <div className="p-4 px-12 text-gray-400 text-sm text-center h-full flex items-center justify-center">
          {bio}
        </div>
      </div> */}
      <div className="tabs flex justify-around  border-t-2 border-grey-600" />
      <div className='w-1/3'>
      <UserTab
        onTabChange={onTabChange}
        items={info.tabs[type]}
        selected={selectedTab}
        onLikedVideosTab={onLikedVideosTab}
      />
   </div>
      <DeskVideoGallery
        items={videoData?.items}
        status={videoData?.status}
        retry={retry && retry}
        userId={id}
        type={selectedTab}
        page='profile'
        showLoading={showLoading}
        fetchMoreListItems={fetchMoreListItems}
        updateActiveIndex={updateActiveIndex}
      />
     
{/* <LandscapeView/> */}
      {/* {type === 'others' && <div className="bottom-0 app_cta p-3 sticky h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center flex items-center z-10">
            <p className="text-sm">
            Get the full experience on the Hipi app
            </p>
            <div onClick={onStoreRedirect} className="font-semibold text-sm border border-hipired rounded py-1 px-2 mr-1 bg-hipired text-white">
               Open
            </div>
         </div>} */}
    </div>
    </div>
    </div>
  );
}

export default withRouter(DeskUsers);
