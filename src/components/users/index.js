/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/display-name */
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { getProfileVideos } from '../../sources/users/profile';
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

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function Users({
  userHandle, profilePic, followers, following, totalLikes, firstName, id, router, type
}) {
  const [videoData, setVideoData] = useState({});
  const [selectedTab, setSelectedTab] = useState('all');
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [showLoading, setShowLoading] = useState(isFetching)
  const [offset, setOffset] = useState(2)

  async function fetchMoreListItems() {
   try{
    const response = await getProfileVideos({ id, type: selectedTab, offset: `${offset}` });
    console.log(response)
    if(response?.data?.length > 0){
      let data = {...videoData};
      data.items = data?.items?.concat(response?.data);
      console.log("items",data)
      setVideoData(data);
      setOffset(offset+1);
      setIsFetching(false);
    }
    setShowLoading(false)
   }
   catch(e){
     console.log("e",e)
   }
  }

  // useEffect(()=>{
  //   document?.documentElement?.scrollTop(0);
  // },[])

  const { show } = useDrawer();
  const { t } = useTranslation();

  const onTabChange = selected => {
    setSelectedTab(selected);
  };

  const onLikedVideosTab = selected => {
    setSelectedTab(selected);
    setVideoData([]);
  };

  const dataFetcher = () => getProfileVideos({ id, type: selectedTab });
  // eslint-disable-next-line no-unused-vars
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
        <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 bg-hipired text-white">
          {t('FOLLOW')}
        </button>
        <button className="font-semibold text-sm border rounded-sm px-2 py-1">
          --
        </button>
      </>,
      self: <>
        {/* <Link href={`/edit-profile/${id}`}> */}
          <button onClick={() => show('', detectDeviceModal, 'extraSmall', {text: "edit Profile"})}  className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 bg-hipired text-white">
            Edit Profile
          </button>
        {/* </Link> */}
        <button className="font-semibold text-sm border rounded-sm px-2 py-1">
          --
        </button>
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

  return (
    <div>
      <div className="sticky headbar w-full flex h-16 shadow-md bg-white items-center justify-between">
        <div onClick={handleBackClick} className="p-4 h-full flex items-center justify-center">
          { info.menu.button[type] }
        </div>
        <div className="font-bold">{userHandle}</div>
        <div className="p-4 h-full flex items-center justify-center">
          { info.menu.notification[type] }
        </div>
      </div>
      <div className="header flex w-full flex-col items-center pt-7 pb-2">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img src={profilePic} alt="PP" className="object-cover" />
          </div>
          <p className="font-medium p-2 text-sm">{firstName}</p>
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
      </div>
      <div className="tabs flex justify-around  border-t-2 border-grey-600" />
      <UserTab
        onTabChange={onTabChange}
        items={info.tabs[type]}
        selected={selectedTab}
        onLikedVideosTab={onLikedVideosTab}
      />
      <VideoGallery
        items={videoData?.items}
        status={videoData?.status}
        retry={retry && retry}
        userId={id}
        type={selectedTab}
        page='profile'
        isFetching={showLoading}
        fetchMoreListItems={fetchMoreListItems}
      />
    </div>
  );
}

export default withRouter(Users);
