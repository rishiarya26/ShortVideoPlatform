
export default function UserProfile({
  userHandle, profilePic, followers, following, totalLikes
}) {
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
          <p className="font-medium p-2 text-sm">Guest User</p>
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
          <button className="font-semibold text-sm border rounded-sm py-1 px-4 mr-1 ">
            Edit Profile
          </button>
          <button className="font-semibold text-sm border rounded-sm px-2 py-1">
            --
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="tabs flex justify-around  border-t-2 border-grey-600">
          <div>
            <p className="font-semibold p-4 border-b-2 border-black">400</p>
          </div>
          <div className="bg-grey-100">
            <p className="font-semibold p-4">400</p>
          </div>
        </div>
        <div className="video-layout flex flex-col p-10 items-center">
          <p className="font-semibold">No published videos</p>
          <p className="text-center text-sm text-gray-500 my-2">
            You haven't
            published any video yet. Start creating your short videos.
          </p>
          <button className="bg-black rounded-full text-white px-4 py-2 my-4">
            Create video
          </button>
        </div>
      </div>
    </div>
  );
}
