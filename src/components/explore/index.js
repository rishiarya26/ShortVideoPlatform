import { useState } from 'react';
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

let toRetry;
const ErrorComp = () => (<Error  retry={toRetry && toRetry}/>);
const LoadComp = () => (<Loader />);

function Explore() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const onDataFetched = data => {
    window.sessionStorage.removeItem('search-feed');
    window.sessionStorage.setItem("searchList",JSON.stringify(data?.data));
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
    router.push(`/tag/${hashTag}`);
  }

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div className="h-screen  w-screen flex flex-col relative">
        <div className="search_box w-full z-10 fixed top-0">
        <SearchItems type='explore'/>
          <div />
        </div>
        <div className="poster w-full mt-40" />

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
                    return (
                      <div key={id} id={content?.widgetName} onClick={(e)=>toSearchFeed(e, d?.video?.id )} className="bg-gray-300 m-1 min-w-28 min-h-38 relative">
                        <Img data={d?.video?.thumbnailUrl} title={d?.videoTitle} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )
              : (
                <div key={id} className="p-2 circle_tray">
                  <div className="w-full flex justify-between">
                    <p className="text-base font-medium">{content?.widgetName}</p>
                    <div onClick={()=> toUserList(content?.widgetName)} className="flex items-center justify-center">
                      <RightArrow />
                    </div>
                  </div>
                  <div className="flex min-w-full overflow-x-auto min-h-32 no_bar py-4">
                    
                      { content?.widgetList?.length > 0 && content.widgetList.map((d, id) => {
                        return (
                          <>
                          <div key={id} onClick={()=>router.push(`/users/${d?.user?.id}`)} className="my-1 px-2 flex flex-col justify-center items-center">
                                <div className="bg-gray-300 min-w-1/6 overflow-hidden  min-h-1/6 rounded-full relative">
                                  <Img data={d?.user?.profilePicImgUrl} title={d?.user?.userName} />
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
      </div>
      <FooterMenu selectedTab="search"/>
    </ComponentStateHandler>
  );
}
export default Explore;
