import { getTopSearches } from "../../../sources/explore/top";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from './loader';
import Error from './error';
import { useState } from "react";
import { numberFormatter } from "../../../utils/convert-to-K";
import RightArrow from "../../commons/svgicons/right-arrow";
import Hash from "../../commons/svgicons/hash";
import Img from "../../commons/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import fallbackUsers from '../../../../public/images/users.png';
import { trimHash } from "../../../utils/string";
import Videos from "../videos";
import DeskDownloadAppGoTop from "../../commons/desk-download-go-top";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const TopItems = ({item, redirectTab}) =>{
    const [data, setData] = useState();

    const router = useRouter();

    const onDataFetched=(data)=>{
        setData(data?.data);
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
                      <p className="text-base font-semibold">Users</p>
                    </div>
                    <div onClick={()=>redirectTab(1)} className="cursor-pointer flex items-center justify-center text-sm text-gray-500">
                      See more
                      <RightArrow />
                    </div>
                </div>
           
                  <div className="card_list flex flex-col flex min-w-full overflow-x-auto no_bar">
                  {data?.items?.users?.map((item, id)=>(
                  <div onClick={()=>router?.push(`/@${item?.userHandle}`)} key={id} className="flex border-b cursor-pointer border-gray-300 hover:bg-gray-100 py-4 pl-2 pr-4 mr-2">
                      <div className=" w-16 flex h-16 bg-gray-300 relative rounded-full overflow-hidden" >
                      <Img data={item?.userIcon} title="Hipi" fallback={fallbackUsers?.src}/>
                      </div>
                      <div className="flex flex-col justify-between pl-2">
                        <p className="font-semibold text-base text-gray-700 ">{item?.userId} </p>
                        <p className="text-sm text-gray-600 font-light ">{`${item?.firstName} ${item?.lastName}`}</p>
                        <p className="text-sm text-gray-600 font-light pt-1 whitespace-nowrap"><span className="font-semibold">{numberFormatter(item?.followers)}</span> Followers</p>
                        
                        
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
                    <div onClick={()=>redirectTab(3)} className="flex items-center justify-center text-sm text-gray-500 cursor-pointer">
                      See more
                      <RightArrow />
                    </div>
                </div>
             
                 <div className="flex min-w-full overflow-x-auto no_bar">
                 {data?.items?.hashtags?.map((item, id)=>(
                 <div onClick={()=>toHashtag(item?.hashtag)} key={id}  className="m-1 flex relative cursor-pointer">
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
<div className="flex flex-col p-4">
<div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-base font-semibold">Videos</p>
                    </div>
                    {/* <div onClick={()=>redirectTab(1)} className="flex items-center justify-center text-sm text-gray-500">
                      See more
                      <RightArrow />
                    </div> */}
                </div>
           
{item && <Videos item={item}/>}
</div>
</div>
      {/* { data?.items?.videos?.length > 0 && <div className="flex flex-col p-4">
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
        </div>} */}
     <DeskDownloadAppGoTop/>
        </ComponentStateHandler>
        </>
    )
}

export default TopItems;