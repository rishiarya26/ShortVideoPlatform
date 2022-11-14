import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toTrackClevertap } from '../../analytics/clevertap/events';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { toTrackReco } from '../../analytics/view-events';
import { DISCOVER_SEARCH_RESULTS } from '../../constants';
import useTranslation from '../../hooks/use-translation';
import { localStorage } from '../../utils/storage';
import ComponentStateHandler from '../commons/component-state-handler';
import Refresh from '../commons/svgicons/refresh';
import VideoCard from '../video-card';
import Error from './error';
import Loading from './loader';

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

export default function VideoGallery({
  items, status, retry, userId='', type = 'all', page ='profile', hashTag='', showLoading, fetchMoreListItems, searchTerm
}) {

  const { t } = useTranslation();
  const router = useRouter();

  useEffect(()=>{
    window.onunload = function () {
      window?.scrollTo(0, 0);
    }
  },[])

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
      <p className="font-semibold text-gray-600">{t('NO_VIDEOS')}</p>
      <p className="text-center text-sm text-gray-500 my-2">
        {t('NO_VIDEOS_PUBLISHED')}
      </p>
    </>,
    PRIVATE: <>
      <p className="font-semibold text-gray-600">{t('NO_VIDEOS')}</p>
      <p className="text-center text-sm text-gray-500 my-2">
        {t('NO_VIDEOS_PUBLISHED')}
      </p>
    </>,
    shoppable: <>
      <p className="font-semibold">No Shoppable Videos</p>
      <p className="text-center text-sm text-gray-500 my-2">
        Shoppable videos of this user will appear here
      </p>
    </>
  };

  setRetry = retry;
  const validItemsLength = items?.length > 0;

  const toProfileFeed = (userId, videoId, type)=>{
    const index = items.findIndex((data)=>data.content_id === videoId);
    index !== -1 && localStorage.set('selected-profile-video',items[index]);
     router && router?.push(`/profile-feed/${userId}?videoId=${videoId}&type=${type}`)
  }

  const toHashTagFeed =(hashTag, videoId, type)=>{
    const index = items.findIndex((data)=>data?.content_id === videoId);
    index !== -1 && localStorage.set('selected-hashtag-video',items[index]);
     router && router?.push(`/hashtag-feed/${hashTag}?videoId=${videoId}&type=${type}`)
  }

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
               <span className="w-1/3 p-1" key={id} onClick={
               page === 'search' 
               ? ()=> {
                try{
                  toTrackMixpanel('searchResultClicked',{pageName:DISCOVER_SEARCH_RESULTS, tabName:'Videos'},{creatorId:item?.videoOwners?.id,creatorHandle:item?.videoOwners?.userName,objType:'Video',content_id:item?.id, query:searchTerm})
                  toTrackClevertap('searchResultClicked',{pageName:DISCOVER_SEARCH_RESULTS, tabName:'Videos'},{creatorId:item?.videoOwners?.id,creatorHandle:item?.videoOwners?.userName,objType:'Video',content_id:item?.id, query:searchTerm})
                  toTrackReco('search_result_click_event',{"objectID": item?.id || item?.objectID, "position": item?.clickPosition, "queryID": item?.correlation_id, pageName:DISCOVER_SEARCH_RESULTS, tabName:'Videos'})
                 }catch(e){
                   console.error('search result click',e)
                 } 
                 router && router?.push(`/search-feed/${item?.id}?type=normal`)}  
               : page === 'profile' 
                  ? ()=>toProfileFeed(userId,item?.content_id,type)
                  : ()=>toHashTagFeed(hashTag,item?.content_id,type)}>
               {/* // <Link  className="w-1/3 p-1" href={page === 'search' ? `/search-feed/${item?.content_id}?type=normal` : `/profile-feed/${userId}?videoId=${data?.content_id}&type=${type}`}> */}
                <VideoCard 
                  thumbnailUrl={item?.thumbnailUrl} 
                  videoTitle ={item?.videoTitle} 
                  viewCount={item.viewCount} 
                  likesCount={item.likescount}
                  shoppable = {item.shoppable}
                  id={id} 
                  page={page}
                  tag={item?.tag}
                />
             </span>
             ))}
              {showLoading &&  
        <div onClick={fetchMoreListItems} className="w-full flex justify-center py-2">
          <Refresh/>
        </div>
        }
             {/* {isFetching && 'Loading more items...'} */}
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
