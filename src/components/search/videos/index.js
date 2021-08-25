import { useEffect, useState } from "react";
import { getVideos } from "../../../sources/explore/videos";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import VideoGallery from "../../video-gallery"
import Loader from "./loader";
import Error from "./error";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const Videos = ({item}) =>{
    const [items, setItems] = useState();

    useEffect(()=>{window.sessionStorage.removeItem("searchList")},[]);

    const onDataFetched=(data)=>{
      console.log("videos",data)
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
        <VideoGallery
        items={items}
        status={fetchState}
        retry={retry && retry}
        page='search'
      />
      </ComponentStateHandler>
        </>
    )
}

export default Videos;