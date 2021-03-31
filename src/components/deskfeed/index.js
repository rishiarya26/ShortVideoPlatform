import { useState } from 'react';
import DeskVideo from '../desk-video';
import Error from './error';
import Loading from './loader';
import { withBasePath } from '../../config';
import { getHomeFeed } from '../../sources/feed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

export default function DeskFeed() {
  const [items, setItems] = useState([]);
  const dataFetcher = () => getHomeFeed();
  const onDataFetched = data => {
    setItems(data.data);
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);

  return (
    <div>
      <div id="header" className=" w-full h-24 shadow px-12 flex items-center fixed top-0 z-10 bg-white">
        <div>
          <img className="w-20" src={withBasePath('icons/android-icon-192x192-dunplab-manifest-17016.png')} alt="zee logo" />
        </div>
      </div>
      <div className="flex pt-24 relative">
        <div id="navbar" className="w-1/4 px-12 flex flex-col fixed top-28 justify-end items-end">
          <p className="text-lg font-semibold px-6 py-2 rounded-full border border-purple-800 text-purple-800">Trending</p>
          <p className="text-lg font-semibold px-6 py-2 rounded-full">Following</p>
        </div>
        <div className="w-96 left-1/4 top-24 absolute">
          <ComponentStateHandler
            state={fetchState}
            Loader={LoadComp}
            ErrorComp={ErrorComp}
          >
            {
              items.map(
                item => (
                  <DeskVideo
                    url={item.video_url}
                    id={item.content_id}
                    comments={item.commentsCount}
                    likes={item.likesCount}
                    music={item.musicCoverTitle}
                    musicTitle={item.music_title}
                    profilePic={item.userProfilePicUrl}
                    userName={item.userName}
                    musicCoverTitle={item.musicCoverTitle}
                  />
                )
              )
            }

          </ComponentStateHandler>
        </div>
        <div id="Download" className="w-1/4 px-12 flex flex-col fixed top-28 right-40">
          <p className=" p-4 text-xl font-semibold">Download Hipi on your phone from the below links</p>
          <div className="flex">
            <img className="w-32 m-4" src={withBasePath('images/google-play.svg')} alt="android link" />
            <img className="w-32 m-4" src={withBasePath('images/app-store.svg')} alt="android link" />
          </div>
        </div>
      </div>
    </div>
  );
}
