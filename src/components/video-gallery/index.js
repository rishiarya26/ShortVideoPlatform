import ComponentStateHandler from '../commons/component-state-handler';
import VideoCard from '../video-card';
import Error from './error';
import Loading from './loader';

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

export default function VideoGallery({
  handleClick, items, status, retry
}) {
  setRetry = retry;
  const validItemsLength = items?.length > 0;

  return (
    <>
      {status && (
        <ComponentStateHandler
          state={status}
          Loader={LoadComp}
          ErrorComp={ErrorComp}
        >
          <div className="flex flex-wrap flex-row w-full space-x space-y">
            {validItemsLength
              ? items.map((data, id) => (
                <span onClick={() => handleClick()}>
                  <VideoCard data={data} id={id} />
                </span>
              ))
              : (
                <div className="video-layout flex flex-col p-10 items-center">
                  <p className="font-semibold">No published videos</p>
                  <p className="text-center text-sm text-gray-500 my-2">
                    You haven't
                    published any video yet. Start creating your short videos.
                  </p>
                </div>
              )}
          </div>
        </ComponentStateHandler>
      )}
    </>
  );
}
