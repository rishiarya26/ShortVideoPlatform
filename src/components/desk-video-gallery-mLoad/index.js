import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { localStorage } from '../../utils/storage';
import LoadMore from '../commons/button/load-more';
import ComponentStateHandler from '../commons/component-state-handler';
import Img from '../commons/image';
import Refresh from '../commons/svgicons/refresh';
import DeskVideoCard from '../desk-video-card';
import Error from './error';
import Loading from './loader';
import fallbackUsers from '../../../public/images/users.png'
import CircularLoaderSearch from '../commons/circular-loader-search';
let setRetry;
const ErrorComp = () => (
<Error retry={setRetry} />
);
const LoadComp = () => (
<Loading />
);
export default function DeskVideoGallery({
items, status, retry, userId='', type = 'all', page ='profile', hashTag='',
showLoading, fetchMoreListItems, updateActiveIndex,lastItemInView, offset,
hasMore
}) {
const [activeHoverIndex, setActiveHoverIndex ] = useState(null);
const [delayHandler, setDelayHandler] = useState(null);
useEffect(()=>{console.log(items)},[])
const handleMouseEnter = (index) => {
delayHandler && clearTimeout(delayHandler);
setDelayHandler(setTimeout(() => {
setActiveHoverIndex(index);
}, 200));
}
const { t } = useTranslation();
const router = useRouter();
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
shoppable: <>
<p className="font-semibold">No Shoppable Videos</p>
<p className="text-center text-sm text-gray-500 my-2">
   Shoppable videos of this user will appear here
</p>
</>
};
setRetry = retry;
const validItemsLength = items?.length > 0;
// const toProfileFeed = (userId, videoId, type)=>{
//   const index = items.findIndex((data)=>data.content_id === videoId);
//   index !== -1 && localStorage.set('selected-profile-video',items[index]);
//   router?.push(`/profile-feed/${userId}?videoId=${videoId}&type=${type}`)
// }
// const toHashTagFeed =(hashTag, videoId, type)=>{
//   const index = items.findIndex((data)=>data?.content_id === videoId);
//   index !== -1 && localStorage.set('selected-hashtag-video',items[index]);
//   router?.push(`/hashtag-feed/${hashTag}?videoId=${videoId}&type=${type}`)
// }
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
      <span className="w-1/3 flex flex-col items-center p-1 tab-card" key={id} 
         >
         {/* // <Link  className="w-1/3 p-1" href={page === 'search' ? `/search-feed/${item?.content_id}?type=normal` : `/profile-feed/${userId}?videoId=${data?.content_id}&type=${type}`}> */}
         <div className='flex flex-col w-full min-h-28 tab-card-h max-h-28'
             onMouseOver={()=>handleMouseEnter(id)}
             onClick={()=>updateActiveIndex(id)}>
            <DeskVideoCard 
               thumbnailUrl={item?.thumbnailUrl} 
               videoTitle ={item?.videoTitle} 
               viewCount={item?.viewCount} 
               likesCount={item?.likescount}
               shoppable = {item?.shoppable}
               id={id} 
               videoUrl = {item?.selected_video_url}
               activeHoverIndex={activeHoverIndex}
               />
         </div>
         <div className='truncate text-sm w-full mb-1 mt-1 text-gray-600 font-light pr-1'>
               {item?.description}
            </div>
         {/* <div className='truncate text-sm w-full mb-2 mt-1 text-gray-700 pr-1'>{ item?.content_description }</div> */}
         <div className='cursor-pointer flex w-full mb-3 justify-start items-center' onClick={()=>router?.push(`/@${item?.videoOwners?.userName}`)}>
            <div className='flex w-6 min-w-6 h-6 border border-gray-100 overflow-hidden rounded-full'><Img  data={item?.videoOwners?.profilePicImgUrl} fallback={fallbackUsers?.src}/></div>
            <p className='pl-1 text-base truncate text-gray-700'>{item?.videoOwners?.userName}</p>
         </div>
      </span>
      ))}
      {showLoading ?  
      <div className="flex w-full justify-center py-2"><CircularLoaderSearch/></div>
      :
      offset > 1 &&  
      <LoadMore onClick={fetchMoreListItems} hasMore={hasMore}/>
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