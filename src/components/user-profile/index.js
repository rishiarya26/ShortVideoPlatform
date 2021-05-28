import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { getProfileVideos } from '../../sources/users/profile';
import { useFetcher } from '../commons/component-state-handler';
import { Back } from '../commons/svgicons/back';
import VideoGallery from '../video-gallery';

function UserProfile({
  userHandle, profilePic, followers, following, totalLikes, firstName, id, router
}) {
  console.log(id);
  const [videoData, setVideoData] = useState({});
  const dataFetcher = () => getProfileVideos({ id });
  // eslint-disable-next-line no-unused-vars
  const [fetchState, retry, data] = useFetcher(dataFetcher);
  console.log(fetchState, data);
  const { t } = useTranslation();

  useEffect(() => {
    const videos = {};
    fetchState && (videos.status = fetchState);
    data && (videos.items = data.data);
    data && console.log(data);
    setVideoData(videos);
  }, [fetchState]);

  const handleVideoClick = () => {
    router.push({
      pathname: '/profile-feed/[pid]',
      query: { pid: id }
    });
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-between">
        <div onClick={handleBackClick} className="p-4 h-full flex items-center justify-center">
          <Back />
        </div>
        <div className="font-bold">{userHandle}</div>
        <div className="p-4 h-full flex items-center justify-center">
          <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2
               .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
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
          <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 bg-hipired text-white">
            {t('FOLLOW')}
          </button>
          <button className="font-semibold text-sm border rounded-sm px-2 py-1">
            --
          </button>
        </div>
      </div>
      <div className="tabs flex justify-around  border-t-2 border-grey-600" />
      <VideoGallery handleClick={handleVideoClick} items={videoData.items} status={videoData.status} retry={retry && retry} />
    </div>
  );
}

export default withRouter(UserProfile);
