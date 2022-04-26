/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/display-name */
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { getProfileVideos, getUserProfile, getUserProfileWLogin, toFollow } from '../../sources/users/profile';
import { useFetcher } from '../commons/component-state-handler';
import { Back } from '../commons/svgicons/back';
import UserTab from '../commons/tabs/user-tab';
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
import useSnackbar from '../../hooks/use-snackbar';

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

function DeskHoverInfo({id}) {
  const [item, setItem] = useState({});
  const [selectedTab, setSelectedTab] = useState('all');
//   const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
//   const [showLoading, setShowLoading] = useState(isFetching)
  const [isFollowing,setIsFollowing] = useState();

//   useEffect(()=>{
//     setIsFollowing(isFollow);
//   },[isFollow])

//   useEffect(()=>{setShowLoading(isFetching)},[isFetching])

  const { show } = useDrawer();
  const { t } = useTranslation();

  const getProfileInfo = useAuth(getUserProfile ,getUserProfileWLogin)

  const dataFetcher = async() => {
    try{
        const resp = await getProfileInfo(id);
        resp?.data && setItem(resp.data);
        setIsFollowing(item?.data?.isFollowing);
    }catch(e){
      console.log(e);
    }
    }

  useEffect(()=>{
      dataFetcher();
  },[])

  const followUser = async(followerId,userId, follow) =>{
    const response = await toFollow({ userId:followerId,followerId:userId,follow:follow});
    if(response){
     setIsFollowing(!isFollowing);
  } 
  }

  const userId = localStorage.get('user-id');
  const followFunc = !isFollowing;

  const {showSnackbar} = useSnackbar();
  const showMessage=({message})=>{
    showSnackbar({message: message})
 }

  const toShowFollow = useAuth( ()=>show('',login, 'big',{showMessage:showMessage}), ()=>followUser(id, userId, followFunc))

  return (  
    <div className="flex flex-col z-50">
    <div className="flex bg-white relative pt-24">
    <div className="w-10/12 pl-8">
      <div className="profile-details flex flex-col w-1/2 relative text-gray-700"> 
         <div className="absolute right-4 top-4">
            <ShareOutline/>
         </div>
            <div className="flex items-center pb-2">
               <div className="flex items-center usrimg w-32 h-32 min-w-32 rounded-full overflow-hidden mr-4">
               <Img data={item?.profilePic} title="Hipi" fallback={fallbackUser?.src} />               </div>
               <div className="flex flex-col h-32 justify-between">
                  <div>
                  <h3 className=" mb-1 mt-1.5 font-bold text-2xl ">{item?.userHandle}</h3>
                  <p className="font-medium p-2 text-sm">{item?.firstName} {item?.lastName}</p>
                  </div>
                  <button 
        onClick={toShowFollow}
        // onClick={handleFollow} 
        className={isFollowing ? "font-semibold text-sm border border-black rounded-sm py-1 px-9 mr-1 bg-white text-black" : "font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 bg-hipired text-white"}>
          {isFollowing ? 'Following' : t('FOLLOW')}
        </button>
               </div>
            </div>
            <div className="list flex  mt-8">
                  <div className="flex text-gray-700 items-end">
                     <p className="font-semibold text-lg">{numberFormatter(item?.following)}</p>
                     <p className="pl-2">Following</p>
                  </div>
                  <div className="flex text-gray-700 items-end ml-4">
                     <p className="font-semibold text-lg">{numberFormatter(item?.followers)}</p>
                     <p className="pl-2">Followers</p>
                  </div>
                  <div className="flex text-gray-700 items-end ml-4">
                     <p className="font-semibold text-lg">{numberFormatter(item?.totalLikes)}</p>
                     <p className="pl-2">Likes</p>
                  </div>
            </div>
            <div className="Bio">
               <p className="py-4 pr-12 text-gray-00 text-md  h-full flex items-center">
                                 {item?.bio}
               </p>
            </div>
            </div>
    </div>
    </div>
    </div>
  );
}

export default withRouter(DeskHoverInfo);
