import { useEffect, useState } from "react";
import { getVideos } from "../../../sources/explore/videos";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import VideoGallery from "../../video-gallery"
import Loader from "./loader";
import Error from "./error";
import useTranslation from "../../../hooks/use-translation";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const Videos = ({item}) =>{
    const [items, setItems] = useState();

    const {t} = useTranslation();

    useEffect(()=>{window.sessionStorage.removeItem("searchList")},[]);

    const onDataFetched=(data)=>{
      setItems(data?.data);
      window.sessionStorage.setItem("searchList",JSON.stringify(data?.data))
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
      /> : 
      <div className="flex w-full h-1/3 justify-center items-center">{t('NO_ITEM_SEARCH_RESULTS')}</div>
      }
      </ComponentStateHandler>
        </>
    )
}

export default Videos;