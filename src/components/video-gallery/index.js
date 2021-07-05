import Link from 'next/link';
import useTranslation from '../../hooks/use-translation';
import ComponentStateHandler from '../commons/component-state-handler';
import VideoCard from '../video-card';
import Error from './error';
import Loading from './loader';

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

export default function VideoGallery({
  items, status, retry, userId
}) {
  setRetry = retry;
  const validItemsLength = items?.length > 0;
  const { t } = useTranslation();

  return (
    <>
      {status && (
        <ComponentStateHandler
          state={status}
          Loader={LoadComp}
          ErrorComp={ErrorComp}
        >
          {validItemsLength
            ? (
              <div className="flex flex-wrap flex-row w-full space-x space-y p-1">
                { items.map((data, id) => (
                  <Link key={id} href={`/profile-feed/${userId}?videoId=${data?.content_id}`}>
                    <span className="w-1/3 p-1">
                      <VideoCard data={data} id={id} />
                    </span>
                  </Link>
                ))}
              </div>
            )
            : (
              <div className="flex flex-wrap flex-row w-full space-x space-y p-1 justify-center">
                <div className="video-layout flex flex-col p-10 items-center ">
                  <p className="font-semibold">{t('NO_VIDEOS')}</p>
                  <p className="text-center text-sm text-gray-500 my-2">
                    {t('NO_VIDEOS_PUBLISHED')}
                  </p>
                </div>
              </div>
            )}

        </ComponentStateHandler>
      )}
    </>
  );
}
