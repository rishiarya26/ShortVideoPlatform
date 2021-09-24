import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Hash from '../commons/svgicons/hash';
import RightArrow from '../commons/svgicons/right-arrow';
import { getSearchData } from '../../sources/explore';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Error from './error';
import Loader from './loader';
import Img from '../commons/image';
import FooterMenu from '../footer-menu';
import { useRouter } from 'next/router';
import SearchItems from '../search-items';
import useInfiniteScroll from '../../hooks/use-infinite-scroll';
import DynamicImg from '../commons/image-dynamic';

let toRetry;
const ErrorComp = () => (<Error  retry={toRetry && toRetry}/>);
const LoadComp = () => (<Loader />);

function Explore() {
  const [data, setData] = useState([]);
  const [crousalItems, setCrousalItems] = useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [showLoading, setShowLoading] = useState(isFetching)
  const [offset, setOffset] = useState(2)

  async function fetchMoreListItems() {
    try{
     const response = await getSearchData({ offset: `${offset}` });
     if(response?.data?.length > 0){
       let updateData = [...data];
       updateData = updateData?.concat(response?.data);
       let sessionData = JSON.parse(window?.sessionStorage?.getItem("searchList"));
       sessionData = sessionData?.concat(response?.data);
       window.sessionStorage.setItem("searchList",JSON.stringify(sessionData));
       setData(updateData);
       setOffset(offset+1);
       setIsFetching(false);
     }
     setShowLoading(false)
    }
    catch(e){
      console.log("e",e)
    }
   }

  const router = useRouter();

  const onDataFetched = data => {
    const crousalData = (data?.data?.[0]?.widgetType === 'carousel_banner') && data?.data?.[0]?.widgetList;
    window.sessionStorage.removeItem('search-feed');
    window.sessionStorage.setItem("searchList",JSON.stringify(data?.data));
    setCrousalItems(crousalData)
    setData(data?.data);
  };

  const dataFetcher = () => getSearchData();
  const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);
  toRetry = retry;
  const validateData = data?.length > 0;

  const trimHash = (hashTag) =>{
    hashTag = hashTag.replace(/^\#+|\#+$/g, '');
    return hashTag
  }

  const toUserList = (value)=>{
    const hashTag = trimHash(value);
    router.push(`/user-list?ref=${hashTag}`);
  }

  const toSearchFeed = (e, videoId)=>{
    let hashTag = e.currentTarget.id;   
    hashTag = trimHash(hashTag);
    router.push(`/search-feed/${videoId}?ref=${hashTag}&type=withHash`);
  }

  const toHashtagDetails = (hashTag)=>{
    hashTag = trimHash(hashTag);
    router.push(`/hashtag/${hashTag}`);
  }

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div className="h-full  w-screen flex flex-col relative overflow-scroll pb-16">
        <div className="search_box w-full z-10 fixed top-0">
        <SearchItems type='explore'/>
          <div />
        </div>
        {/* <div className="poster w-full mt-40" />  */}
        <div className="explore_carousel flex min-w-full overflow-x-auto min-h-38 no_bar mt-20">
           {crousalItems?.length > 0  && crousalItems.map((data,id)=>{
             return(
            <div key={id} onClick={()=>router.push(`/tag/${data?.displayName}`)} className="carousel_item bg-gray-300 m-1 min-w-full min-h-38 relative">
                 <Img data={data?.thumbnail} title={data?.name || data?.displayName}/>
            </div>
           )})}
            {/* <div className=" carousel_item bg-green-300 m-1 min-w-full min-h-38 relative">

            </div>
            <div className=" carousel_item bg-red-300 m-1 min-w-full min-h-38 relative">

            </div> */}
        </div>

        {validateData && data?.map((content, id) => {
          return (
            content?.widgetContentType === 'Video' ? (
              <div key={id} className="p-2 tray">
                <div className="w-full flex mb-2 justify-between">
                  <div className="flex">
                    <div className="p-2 rounded-full border-2 border-gray-300 mr-2">
                      <Hash />
                    </div>
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">{content?.widgetName}</p>
                      <p className="text-sm text-gray-400">trending</p>
                    </div>
                  </div>
                  <div onClick={()=>toHashtagDetails(content?.widgetName)} className="flex items-center justify-center">
                    <RightArrow />
                  </div>
                </div>

                <div className="flex min-w-full overflow-x-auto min-h-38 no_bar">
                  {content?.widgetList?.length > 0 && content.widgetList.map((d, id) => {
                     if(id > 5) return null;
                    return (
                      <div key={id} id={content?.widgetName} onClick={(e)=>toSearchFeed(e, d?.video?.id )} className="bg-gray-300 m-1 min-w-28 min-h-38 relative">
                        <DynamicImg data={d?.video?.thumbnailUrl} title={d?.videoTitle} width='w_100'/>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
              : content?.widgetContentType === 'User' &&  (
                <div key={id} className="p-2 circle_tray">
                  <div className="w-full flex justify-between">
                    <p className="text-base font-medium">{content?.widgetName}</p>
                    <div onClick={()=> toUserList(content?.widgetName)} className="flex items-center justify-center">
                      <RightArrow />
                    </div>
                  </div>
                  <div className="flex min-w-full overflow-x-auto min-h-32 no_bar pt-2">
                    
                      { content?.widgetList?.length > 0 && content.widgetList.map((d, id) => {
                         if(id > 5) return null;
                        return (
                          <>
                          <div key={id} onClick={()=>router.push(`/users/${d?.user?.id}`)} className="my-1 px-2 flex flex-col justify-center items-center">
                                <div className="bg-gray-300 min-w-1/6 overflow-hidden  min-h-1/6 rounded-full relative">
                                 <DynamicImg data={d?.user?.profilePicImgUrl} title={d?.user?.userName}  width='w_100'/>
                                </div>
                                <p className="text-xs pt-2">{d?.user?.userName}</p>
                          </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              ));
        })}
        {showLoading && 'Loading more items...'}
      </div>
      <FooterMenu selectedTab="search"/>
    </ComponentStateHandler>
  );
}
export default Explore;
