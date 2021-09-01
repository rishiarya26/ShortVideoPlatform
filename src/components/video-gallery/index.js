import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import ComponentStateHandler from '../commons/component-state-handler';
import VideoCard from '../video-card';
import Error from './error';
import Loading from './loader';

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

export default function VideoGallery({
  items, status, retry, userId='', type = 'all', page ='profile', hashTag=''
}) {
  // const [data, setData] = useState(items || []);
  // const [isFetching, setIsFetching] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  // useEffect(() => {
  //   window?.addEventListener('scroll', handleScroll);
  //   return () => window?.removeEventListener('scroll', handleScroll);
  // }, []);

  // function handleScroll() {
  //   if (window?.innerHeight + document?.documentElement?.scrollTop !== document?.documentElement?.offsetHeight) return;
  //   console.log('Fetch more list items!');
  // }

  const noData = {
    all: <>
      <p className="font-semibold">{t('NO_VIDEOS')}</p>
      <p className="text-center text-sm text-gray-500 my-2">
        {t('NO_VIDEOS_PUBLISHED')}
      </p>
    </>,
    PRIVATE: <>
      <p className="font-semibold">{t('NO_VIDEOS')}</p>
      <p className="text-center text-sm text-gray-500 my-2">
        {t('NO_VIDEOS_PUBLISHED')}
      </p>
    </>,
    liked: <>
      <p className="font-semibold">No Liked Videos</p>
      <p className="text-center text-sm text-gray-500 my-2">
        Videos Liked by this user will appear here
      </p>
    </>
  };

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
          {validItemsLength
            ? (
            <div className="flex flex-wrap flex-row w-full space-x space-y p-1">
            { items?.map((item, id) => (
               <span className="w-1/3 p-1" key={id} onClick={page === 'search' 
               ? ()=> router.push(`/search-feed/${item?.id}?type=normal`)  
               : page === 'profile' 
                  ? ()=>router.push(`/profile-feed/${userId}?videoId=${item?.content_id}&type=${type}`)
                  : ()=>router.push(`/hashtag-feed/${hashTag}?videoId=${item?.content_id}&type=${type}`)}>
               {/* // <Link  className="w-1/3 p-1" href={page === 'search' ? `/search-feed/${item?.content_id}?type=normal` : `/profile-feed/${userId}?videoId=${data?.content_id}&type=${type}`}> */}
                <VideoCard 
                  thumbnailUrl={item?.thumbnailUrl} 
                  videoTitle ={item?.videoTitle} 
                  viewCount={item.viewCount} 
                  likesCount={item.likescount}
                  shoppable = {item.shoppable}
                  id={id} 
                />
             </span>
             ))}
            </div>
            )
            : (
              <div className="flex flex-wrap flex-row w-full space-x space-y p-1 justify-center">
                <div className="video-layout flex flex-col p-10 items-center ">
                  {noData[type]}
                </div>
              </div>
            )}

        </ComponentStateHandler>
      )}
    </>
  );
}
