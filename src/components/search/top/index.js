import { getTopSearches } from "../../../sources/explore/top";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from '../top/loader';
import Error from '../top/error';
import { useState } from "react";
import { numberFormatter } from "../../../utils/convert-to-K";
import RightArrow from "../../commons/svgicons/right-arrow";
import Hash from "../../commons/svgicons/hash";
import Img from "../../commons/image";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const TopItems = ({item, redirectTab}) =>{
    const [data, setData] = useState();

    const onDataFetched=(data)=>{
        setData(data?.data);
      }
     
     const dataFetcher = ()=> item && getTopSearches(item && item)
     const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);

     setRetry = retry && retry;
    return (
        <>
            <ComponentStateHandler
                state={fetchState}
                Loader={LoadComp}
                ErrorComp={ErrorComp}
            >
         {/* users */}
         <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">USERS</p>
                      <p className="text-sm text-gray-400">{numberFormatter(data?.count?.users)} results</p>
                    </div>
                    <div onClick={()=>redirectTab(1)} className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
           
                  <div className="card_list flex min-w-full overflow-x-auto no_bar">
                  {data?.items?.users?.map((item, id)=>(
                  <div key={id} className="flex border-2 border-gray-200 p-2 min-w-3/5 mr-2">
                      <div className=" w-16.6v flex h-16.6v bg-gray-300 relative rounded-full" />
                      <div className="flex flex-col justify-between pl-2 pb-2">
                        <p className="font-medium text-lg text-gray-700">{item?.userId} </p>
                        <p className="text- text-gray-400">{item?.userId}</p>
                        <p className="text- text-gray-400">{numberFormatter(item?.followers)} Followers</p>
                    </div>
                  </div>
                       )) }
                  </div>
         
          </div>
        </div>


{/* hashtags */}
<div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">HASHTAGS</p>
                      <p className="text-sm text-gray-400">{numberFormatter(data?.count?.hashtags)} results</p>
                    </div>
                    <div onClick={()=>redirectTab(4)} className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
             
                 <div className="flex min-w-full overflow-x-auto no_bar">
                 {data?.items?.hashtags.map((item, id)=>(
                 <div key={id}  className="m-1 flex relative">
                         <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-2 items-center">
                               <Hash/>
                             </div>
                               {item?.hashtag}
                         </div>
                       </div>
                       )) }
                 </div>
               
                
          </div>
        </div>



{/* Videos */}
        <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">VIDEOS</p>
                      <p className="text-sm text-gray-400">{numberFormatter(data?.count?.videos)} results</p>
                    </div>
                    <div onClick={()=>redirectTab(2)} className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
                <div className="flex min-w-full overflow-x-auto min-h-38 no_bar">
                   {data?.items?.videos.map((item, id)=>(
                    <div key={id} className="bg-gray-300 m-1 min-w-28 min-h-38 relative">
                        <Img data = {item?.thumbnailUrl} alt="image"/>
                      </div>
                   ))}
                </div>
                
          </div>
        </div>

{/* SOUNDS */}
        <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">SOUNDS</p>
                      <p className="text-sm text-gray-400">{numberFormatter(data?.count?.sounds)} results</p>
                    </div>
                    <div onClick={()=>redirectTab(3)} className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
                <div className="card_list flex min-w-full overflow-x-auto no_bar">
                {data?.items?.sounds.map((item, id)=>(

                    <div key={id} className="flex p-2 min-w-3/5 mr-2">
                        <div className=" w-16.6v flex h-16.6v bg-gray-300 relative " />
                        <div className="flex flex-col justify-between pl-2 pb-2">
                        <audio src={item?.musicUrl} controls></audio>
                          <p className="font-medium text-lg text-gray-700"> {item?.musicTitle}</p>
                          <p className="text- text-gray-400">{item?.musicArtistName}</p>
                          <p className="text- text-gray-400">22:20</p>
                      </div>
                    </div>
                    ))}
                </div>
          </div>
        </div>
        </ComponentStateHandler>
        </>
    )
}

export default TopItems;