import { useState } from 'react';
import { getProfileVideos } from '../../sources/users/profile';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import VideoCard from '../video-card';
import Error from './error';
import Loader from './loader';

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loader />);

export default function VideoGallery({ id }) {
  const [items, setItems] = useState([]);
  const dataFetcher = () => getProfileVideos({ id });
  const onDataFetched = data => {
    setItems(data.data);
  };
  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;

  items?.length && console.log(items[0].videoThumbnail);
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div className="flex flex-wrap flex-row w-full space-x space-y">
        {items?.length
          ? items.map((data, id) => (
            <VideoCard data={data} id={id} />
          ))
          : (
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
          )}
      </div>
    </ComponentStateHandler>
  );
}
