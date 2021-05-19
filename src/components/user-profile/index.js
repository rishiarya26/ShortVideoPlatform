import Router from 'next/router';
import { useEffect, useState } from 'react';
import { getProfileVideos } from '../../sources/users/profile';
import { useFetcher } from '../commons/component-state-handler';
import VideoGallery from '../video-gallery';

export default function UserProfile({
  userHandle, profilePic, followers, following, totalLikes, firstName, id
}) {
  const [videoData, setVideoData] = useState({});
  const dataFetcher = () => getProfileVideos({ id });
  // eslint-disable-next-line no-unused-vars
  const [fetchState, retry, data] = useFetcher(dataFetcher);

  useEffect(() => {
    const videos = {};
    fetchState && (videos.status = fetchState);
    data && (videos.items = data.data);
    setVideoData(videos);
  }, [fetchState]);

  const handleClick = () => {
    Router.push({
      pathname: '/profile-feed/[pid]',
      query: { pid: id }
    });
  };
  return (
    <div>
      <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-between">
        <div className="p-4 h-full flex items-center justify-center">
          <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
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
          <div className="w-28 rounded-full overflow-hidden">
            <img src={profilePic} alt="PP" />
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
      </div>
      <div className="tabs flex justify-around  border-t-2 border-grey-600" />
      <VideoGallery handleClick={handleClick} items={videoData.items} status={videoData.status} retry={retry && retry} />
    </div>
  );
}

