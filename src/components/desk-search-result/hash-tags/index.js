import { useState } from "react";
import { getHashTags } from "../../../sources/explore/hashtags";
import { numberFormatter } from "../../../utils/convert-to-K";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from "./loader";
import Error from "./error";
import Hash from "../../commons/svgicons/hash";
import useTranslation from "../../../hooks/use-translation";
import { trimHash } from "../../../utils/string";
import { useRouter } from "next/router";
import LoadMore from "../../commons/button/load-more";
// import { getHashTags } from "../../../sources/explore/hashTags";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

function HashTags({item}) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const {t} = useTranslation();
  const router = useRouter();

    const onDataFetched=(data)=>{
      setItems(data?.data);
      if(data?.data?.length > 0){
        setHasMore(true);
        setOffset(offset+1);
      }else{
        setHasMore(false);
      }
      }
     
     const dataFetcher = ()=> item && getHashTags({keyword: item, offset:offset});
     const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);

     const toHashtag =(value)=>{
      const trimmedHash = trimHash(value)
      router?.push(`/hashtag/${trimmedHash}`)
    }

    const fetchMoreItems = async() =>{
      try{
        setShowLoading(true);
        console.log("&&")
       const resp = await getHashTags({keyword: item, offset:offset});
       console.log("&&", resp)
       if(resp?.data?.length > 0){
        console.log("&&", resp)
         let data = [...items];
         console.log("**",data,resp.data )
         data = data?.concat(resp.data);
         setItems(data);
         setHasMore(true);
         setOffset(offset+1);
       }else{
         setHasMore(false);
       }
        setShowLoading(false);
      }catch(e){
        setHasMore(false);
        setShowLoading(false);
      }
    }

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
             
             <div className="flex flex-col w-full ">
                 {items?.length > 0 ? items.map((item, id)=>(
                 <div key={id} onClick={()=>toHashtag(item?.hashtag)}  className="flex justify-between my-4 items-center">
                         <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-2 items-center">
                               <Hash/>
                             </div>
                             <p className="ml-4">
                               {item?.hashtag}
                               </p>
                         </div>
                         <div className="text-sm text-gray-300 items-center">
                            {numberFormatter(item?.hashtagPlayCount)} {` views`}
                        </div>
                       </div>
                       )):
                       <div className="flex w-full h-36 justify-center items-center">{t('NO_ITEM_SEARCH_RESULTS')}</div>
                       }
                       {showLoading ? 'loading...' : 
                       offset > 1 && 
                       <LoadMore onClick={fetchMoreItems} hasMore={hasMore}/>}
                 </div>
          </div>
        </div>
        </ComponentStateHandler>
        </>
  );
}
export default HashTags;
