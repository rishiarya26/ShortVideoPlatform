import { useState } from "react";
import { getHashTags } from "../../../sources/explore/hashTags";
import { numberFormatter } from "../../../utils/convert-to-K";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from "./loader";
import Error from "./error";
import Hash from "../../commons/svgicons/hash";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

function HashTags({item}) {
  const [items, setItems] = useState();

    const onDataFetched=(data)=>{
      console.log("hashtags",data)
      setItems(data?.data);
      }
     
     const dataFetcher = ()=> item && getHashTags({keyword: item})
     const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);

     setRetry = retry && retry;
    return (
        <>
            <ComponentStateHandler
                state={fetchState}
                Loader={LoadComp}
                ErrorComp={ErrorComp}
            >
    <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                {/* <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">HASHTAGS</p>
                      <p className="text-sm text-gray-400">{numberFormatter(data?.count?.hashtags)} results</p>
                    </div>
                    <div className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div> */}
             
             <div className="flex flex-col w-full p-4">
                 {items?.map((item, id)=>(
                 <div key={id}  className="flex justify-between my-4">
                         <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-2 items-center">
                               <Hash/>
                             </div>
                               {item?.hashtag}
                         </div>
                         <div className="text-sm text-gray-300 items-center">
                            2k views
                        </div>
                       </div>
                       )) }
                 </div>
          </div>
        </div>
        </ComponentStateHandler>
        </>
  );
}
export default HashTags;
