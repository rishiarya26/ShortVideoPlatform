import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/use-translation';
import { localStorage } from '../../utils/storage';
import { trimHash } from '../../utils/string';
import ComponentStateHandler from '../commons/component-state-handler';
import Refresh from '../commons/svgicons/refresh';
import DeskVideoCard from '../desk-video-card';
import Error from './error';
import Loading from './loader';

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

export default function DeskVideoGallery({
  items, status, retry, userId='', type = 'all', page ='profile', hashTag='',
   showLoading, fetchMoreListItems, updateActiveIndex,lastItemInView
}) {
  const [activeHoverIndex, setActiveHoverIndex ] = useState(null);
  const [delayHandler, setDelayHandler] = useState(null)

  const handleMouseEnter = (index) => {
         delayHandler && clearTimeout(delayHandler);
         setDelayHandler(setTimeout(() => {
         setActiveHoverIndex(index);
      }, 200));
  }

  const { t } = useTranslation();
  const router = useRouter();

  // useEffect(()=>{
  //   window.onunload = function () {
  //     window?.scrollTo(0, 0);
  //   }
  // },[])

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
  const redirect = (item) =>{
   

  try{  if(item?.indexOf('#')!==-1){
      const trimmedHashtag = trimHash(item);
      console.log("item",trimmedHashtag);
      router?.push(`/hashtag/${trimmedHashtag}`)
    }}catch(e){
      console.log("error in hashtag redirect",e)
    }
    // }else{
    //   if(item?.indexOf('@')){
    //     router?.push(`/@${item}`)
    //   }
    // }
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
              (id === items?.length-1) ? 
              <span ref={lastItemInView} className="w-1/5 flex flex-col items-center p-1 tab-card" key={id} 
               onMouseOver={()=>handleMouseEnter(id)}
              //  onClick={()=>updateActiveIndex(id)}
                  >
               {/* // <Link  className="w-1/3 p-1" href={page === 'search' ? `/search-feed/${item?.content_id}?type=normal` : `/profile-feed/${userId}?videoId=${data?.content_id}&type=${type}`}> */}
               <div className='flex flex-col w-full min-h-28 tab-card-h max-h-28 '> 
               <DeskVideoCard 
                  thumbnailUrl={item?.thumbnailUrl} 
                  videoTitle ={item?.videoTitle} 
                  viewCount={item?.viewCount} 
                  likesCount={item?.likescount}
                  shoppable = {item?.shoppable}
                  id={id} 
                  videoUrl = {item?.video_url}
                  activeHoverIndex={activeHoverIndex}
                />
                </div>
                <div className='truncate text-sm w-full mb-2 mt-1 text-gray-700 pr-1'>{ item?.content_description }</div>
             </span> :
               <span className="w-1/5 flex flex-col items-center p-1 tab-card" key={id} 
               onMouseOver={()=>handleMouseEnter(id)}
              //  onClick={()=>updateActiveIndex(id)}
                  >
               {/* // <Link  className="w-1/3 p-1" href={page === 'search' ? `/search-feed/${item?.content_id}?type=normal` : `/profile-feed/${userId}?videoId=${data?.content_id}&type=${type}`}> */}
               <div className='flex flex-col w-full min-h-28 tab-card-h max-h-28'> 
               <DeskVideoCard 
                  thumbnailUrl={item?.thumbnailUrl} 
                  videoTitle ={item?.videoTitle} 
                  viewCount={item?.viewCount} 
                  likesCount={item?.likescount}
                  shoppable = {item?.shoppable}
                  id={id} 
                  videoUrl = {item?.video_url}
                  activeHoverIndex={activeHoverIndex}
                />
                </div>
                <div className='truncate text-sm w-full mb-2 mt-1 text-gray-700 pr-1'>
                  {item?.content_description?.split(' ')?.map((item)=>(
              <p className='inline-block'><span className={`pl-1 cursor-pointer ${(item?.indexOf('#')!==-1 || item?.indexOf('@')!==-1)?'font-semibold':''} `} onClick={ (item?.indexOf('#')!==-1 || item?.indexOf('@')!==-1) ? ()=>redirect(item) : null}>
                {item}
              </span>
              </p>
            ))}
                </div>
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
