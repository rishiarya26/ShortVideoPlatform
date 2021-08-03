import Link from 'next/link';
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { getProfileVideos } from '../../sources/users/profile';
import { useFetcher } from '../commons/component-state-handler';
import { Back } from '../commons/svgicons/back';
import UserTab from '../commons/tabs/user-tab';
import VideoGallery from '../video-gallery';

function UserProfile({
  userHandle, profilePic, followers, following, totalLikes, firstName, id, router, type
}) {
  const [videoData, setVideoData] = useState({});
  const [selectedTab, setSelectedTab] = useState('all');

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
        <Link href={`/edit-profile/${id}`}>
          <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 bg-hipired text-white">
            Edit Profile
          </button>
        </Link>
        <button className="font-semibold text-sm border rounded-sm px-2 py-1">
          --
        </button>
            </>
    },
    tabs: {
      others: [
        {
          icon: 'all',
          type: 'all'
        },
        {
          icon: 'liked',
          type: 'liked'
        }
      ],
      self: [
        {
          icon: 'all',
          type: 'all'
        },
        {
          icon: 'liked',
          type: 'liked'
        },
        {
          icon: 'private',
          type: 'PRIVATE'
        }
      ]
    }
  };

  return (
    <div>
      <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-between">
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
            <p className="font-semibold text-sm">{following}</p>
            <p className="text-xs">Following</p>
          </div>
          <div className="flex flex-col items-center px-9">
            <p className="font-semibold text-sm">{followers}</p>
            <p className="text-xs">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold text-sm">{totalLikes}</p>
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
      />
    </div>
  );
}

export default withRouter(UserProfile);
