import { getTopSearches } from "../../../sources/explore/top";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from '../top/loader';
import Error from '../top/error';
import { useState } from "react";
import { numberFormatter } from "../../../utils/convert-to-K";
import RightArrow from "../../commons/svgicons/right-arrow";
import Hash from "../../commons/svgicons/hash";
import Img from "../../commons/image";
import { useRouter } from "next/router";

import fallbackUsers from '../../../../public/images/users.png';
import { trimHash } from "../../../utils/string";
import { toTrackMixpanel } from "../../../analytics/mixpanel/events";
import { DISCOVER_SEARCH_RESULTS } from "../../../constants";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const TopItems = ({item, redirectTab}) =>{
    const [data, setData] = useState();

    const router = useRouter();

    const onDataFetched=(data)=>{
        setData(data?.data);
        /* mixpanel - Search Executed */
        const results = data?.data?.items;
        console.log("R-E",results,item)
        const resultsLength = (results?.users?.length || 0)+(results?.hashtags?.length || 0)+(results?.videos?.length || 0)
        toTrackMixpanel('searchExecuted',{pageName:DISCOVER_SEARCH_RESULTS},{query:item,resultsLength:resultsLength})
      }
     
     const dataFetcher = ()=> item && getTopSearches(item && item)
     const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched, item);

    //  const fetchCounts = (data) =>{
    //   return numberFormatter(data);
    //  } 

    const toHashtag =(value)=>{
      const trimmedHash = trimHash(value)
      router?.push(`/hashtag/${trimmedHash}`)
    }

     setRetry = retry && retry;
    return (
        <>
            <ComponentStateHandler
                state={fetchState}
                Loader={LoadComp}
                ErrorComp={ErrorComp}
            >
         {/* users */}
       {data?.items?.users?.length > 0 &&  <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-sm font-bold">USERS</p>
                    </div>
                    <div onClick={()=>redirectTab(1)} className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
           
                  <div className="card_list flex min-w-full overflow-x-auto no_bar">
                  {data?.items?.users?.map((item, id)=>(
                  <div onClick={()=>{
                    toTrackMixpanel('searchResultClicked',{pageName:DISCOVER_SEARCH_RESULTS},{creatorId:item?.userId,creatorHandle:item?.userHandle,objType:CREATOR_PROFILE})
                    router?.push(`/@${item?.userHandle}`)}} key={id} className="flex border-2 border-gray-100 py-2 px-4 mr-2">
                      <div className=" w-15v flex h-15v bg-gray-300 relative rounded-full overflow-hidden" >
                      <Img data={item?.userIcon} title="Hipi" fallback={fallbackUsers?.src}/>
                      </div>
                      <div className="flex flex-col justify-between pl-2 pb-2">
                        <p className="font-bold text-sm text-gray-700">{item?.userId} </p>
                        <p className="text-xs text-gray-400">{item?.userId}</p>
                        <p className="text-xs text-gray-400 whitespace-nowrap">{numberFormatter(item?.followers)} Followers</p>
                    </div>
                  </div>
                       )) }
                  </div>  
          </div>
        </div>}


{/* hashtags */}
{data?.items?.hashtags?.length > 0 && <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-sm font-bold">HASHTAGS</p>
                    </div>
                    <div onClick={()=>redirectTab(3)} className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
             
                 <div className="flex min-w-full overflow-x-auto no_bar">
                 {data?.items?.hashtags?.map((item, id)=>(
                 <div onClick={()=>toHashtag(item?.hashtag)} key={id}  className="m-1 flex relative">
                         <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-2 items-center">
                               <Hash/>
                             </div>
                               <p className="mx-3">{item?.hashtag}</p>
                         </div>
                       </div>
                       )) }
                 </div>  
          </div>
        </div>}



{/* Videos */}
      { data?.items?.videos?.length > 0 && <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-sm font-bold">VIDEOS</p>
                    </div>
                    <div onClick={()=>redirectTab(2)} className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
                <div className="flex min-w-full overflow-x-auto min-h-38 no_bar">
                   {data?.items?.videos?.map((item, id)=>(
                    <div onClick={()=>router?.push(`/single-video/${item?.id}`)} key={id} className="trending_card bg-gray-300 m-1 w-28v min-h-38 relative">
                        <Img data = {item?.thumbnailUrl} alt="image"/>
                      </div>
                   ))}
                </div>
          </div>
        </div>}
     
        </ComponentStateHandler>
        </>
    )
}

export default TopItems;