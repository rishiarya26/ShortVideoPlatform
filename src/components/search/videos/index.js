import { useEffect, useState } from "react";
import { getVideos } from "../../../sources/explore/videos";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import VideoGallery from "../../video-gallery"
import Loader from "./loader";
import Error from "./error";
import useTranslation from "../../../hooks/use-translation";
import useInfiniteScroll from "../../../hooks/use-infinite-scroll";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const Videos = ({item}) =>{
    const [items, setItems] = useState();
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    const [offset, setOffset] = useState(2);
    const [showLoading, setShowLoading] = useState(isFetching)

    const {t} = useTranslation();

    useEffect(()=>{window.sessionStorage.removeItem("searchList")},[]);

    useEffect(()=>{setShowLoading(isFetching)},[isFetching])

    const onDataFetched=(data)=>{
      setItems(data?.data);
      window.sessionStorage.setItem("searchList",JSON.stringify(data?.data))
      }

      async function fetchMoreListItems() {
        try{
         const response = item && await getVideos({keyword: item, offset: `${offset}` });
         console.log('resp',response)
         if(response?.data?.length > 0){
           let data = [...items];
           window?.sessionStorage?.setItem("searchList",JSON.stringify(response?.data))
           data = data?.concat(response?.data);
           console.log("items",data)
           setItems(data);
           setOffset(offset+1);
           setIsFetching(false);
           setShowLoading(false)
         }else{
           console.log("inelse",response.data.length)
           setShowLoading(false);
          }
          setShowLoading(false)
        }
        catch(e){
          console.log("e",e)
        }
       }
     
     const dataFetcher = ()=> item && getVideos({keyword: item})
     const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);

     setRetry = retry && retry;
    return (
        <>
               <ComponentStateHandler
                state={fetchState}
                Loader={LoadComp}
                ErrorComp={ErrorComp}
            >
       {items?.length > 0 ? 
       <VideoGallery
        items={items}
        status={fetchState}
        retry={retry && retry}
        page='search'
        showLoading={showLoading}
        fetchMoreListItems={fetchMoreListItems}
      /> : 
      <div className="flex w-full h-1/3 justify-center items-center">{t('NO_ITEM_SEARCH_RESULTS')}</div>
      }
      </ComponentStateHandler>
        </>
    )
}

export default Videos;