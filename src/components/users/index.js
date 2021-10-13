/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/display-name */
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { getProfileVideos, toFollow } from '../../sources/users/profile';
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

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function Users({
  userHandle, profilePic, followers, following, totalLikes, firstName= '',lastName = '', id, router, type, bio=''
}) {
  const [videoData, setVideoData] = useState({});
  const [selectedTab, setSelectedTab] = useState('all');
  const [isFetching, setIsFetching] = useInfiniteScroll(showPopUp);
  const [showLoading, setShowLoading] = useState(isFetching)
  const [offset, setOffset] = useState(2)


  async function showPopUp(){
    show('', detectDeviceModal, 'extraSmall');
    setIsFetching(false);
  }

  useEffect(()=>{console.log(' in profile')},[])
  // async function fetchMoreListItems() {
  //  try{
  //   const response = await getProfileVideos({ id, type: selectedTab, offset: `${offset}` });
  //   console.log(response)
  //   if(response?.data?.length > 0){
  //     let data = {...videoData};
  //     data.items = data?.items?.concat(response?.data);
  //     console.log("items",data)
  //     setVideoData(data);
  //     setOffset(offset+1);
  //     setIsFetching(false);
  //   }
  //   setShowLoading(false)
  //  }
  //  catch(e){
  //    console.log("e",e)
  //  }
  // }

  // useEffect(()=>{
  //   window.onunload = function () {
  //     window?.scrollTo(0, 1);
  //   }
  // },[])

  // useEffect(()=>{
  //   document?.documentElement?.scrollTop(0);
  // },[])

  const { show } = useDrawer();
  const { t } = useTranslation();

  const onTabChange = selected => {
    setSelectedTab(selected);
  };

  const onLikedVideosTab = selected => {
    // setSelectedTab(selected);
    // setVideoData([]);
  };

  const dataFetcher = () => getProfileVideos({ id, type: 'all' });
  // eslint-disable-next-line no-unused-vars
  const [fetchState, retry, data] = useFetcher(dataFetcher);
  // const [fetchState, retry, data] = useFetcher(dataFetcher, null, selectedTab);
  console.log(data)

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

  const info = {
    menu: {
      button: {
        others: <Back />,
        self: '++'
      },
      notification: {
        others: <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2
           .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          />
        </svg>,
        self: ''
      },
      settings: {
        others: 'share',
        self: 'setting & logout'
      }
    },
    function: {
      others: <>
        <button 
        onClick={()=>show('',detectDeviceModal, 'extraSmall')}
        // onClick={handleFollow} 
        className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 bg-hipired text-white">
          {t('FOLLOW')}
        </button>
      </>,
      self: <>
        {/* <Link href={`/edit-profile/${id}`}> */}
          <button onClick={() => show('', detectDeviceModal, 'extraSmall', {text: "edit Profile"})}  className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 bg-hipired text-white">
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
          type: 'liked'
        }
      ],
      self: [
        {
          icon: <Listing />,
          type: 'all'
        },
        {
          icon: <LikedList/>,
          type: 'liked'
        },
        {
          icon: <Lock />,
          type: 'PRIVATE'
        }
      ]
    }
  };

  // console.log(videoData?.items?.filter((data)=>(data?.shoppable === true)))

  const toShowData = {
    all : videoData?.items,
    liked : videoData?.items?.filter((data)=>(data?.shoppable === true))
  }

  const value = getItem('device-type');

  return (
    <div>
      <div className="sticky headbar w-full flex h-16 shadow-md bg-white items-center justify-between">
        <div onClick={handleBackClick} className="p-4 h-full flex items-center justify-center">
          { info.menu.button[type] }
        </div>
        <div className="font-bold">{userHandle}</div>
        {/* <div className="p-4 h-full flex items-center justify-center"> */}
        <div
        onClick={(value === 'desktop') ? () => show('Share', null, 'medium'): (value === 'mobile') && (()=>shareProfile(id))}
        className="flex relative py-2  px-3 text-center items-end flex-col"
      >
      <ShareComp type={'profile'}/>
      </div>
        {/* </div> */}
      </div>
      <div className="header flex w-full flex-col items-center pt-7 pb-2">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Img data={profilePic} title="Hipi" fallback={fallbackUser?.src} />
          </div>
          <p className="font-medium p-2 text-sm">{firstName} {lastName}</p>
        </div>
        <div className="followboard flex justify-around w-1/2 py-2">
          <div className="flex flex-col items-center">
            <p className="font-semibold text-sm">{numberFormatter(following)}</p>
            <p className="text-xs">Following</p>
          </div>
          <div className="flex flex-col items-center px-9">
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
      </div>
      <div className="tabs flex justify-around  border-t-2 border-grey-600" />
      <UserTab
        onTabChange={onTabChange}
        items={info.tabs[type]}
        selected={selectedTab}
        onLikedVideosTab={onLikedVideosTab}
      />
   
      <VideoGallery
        items={toShowData?.[selectedTab]}
        status={videoData?.status}
        retry={retry && retry}
        userId={id}
        type={selectedTab}
        page='profile'
        isFetching={isFetching}
        // fetchMoreListItems={fetchMoreListItems}
      />
     

    </div>
  );
}

export default withRouter(Users);
