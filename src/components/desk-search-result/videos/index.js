import { useEffect, useState } from "react";
import { getVideos } from "../../../sources/explore/videos";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import VideoGallery from "../../video-gallery"
import Loader from "./loader";
import Error from "./error";
import useTranslation from "../../../hooks/use-translation";
import DeskVideoGallery from "../../desk-video-gallery-mLoad";
import VideoDetail from '../../desk-video-detail';
import DeskDownloadAppGoTop from "../../commons/desk-download-go-top";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const Videos = ({item}) =>{
    const [items, setItems] = useState();
    const [offset, setOffset] = useState(1);
    const [showLoading, setShowLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
     /****** for video detail - start ******/
  const [showVideoDetail, setShowVideoDetail] = useState(false);
  const [vDetailActiveIndex, setVDetailActiveIndex] = useState();
  const [videoDetailData, setVideoDetailData] = useState({});
  const [noSound, setNoSound] = useState(false);

  const checkNoSound =()=>{
    if(!items?.[vDetailActiveIndex]?.videoSound){
      setNoSound(true);
      setTimeout(()=>{setNoSound(false)},3000)
    }
  }
  const updateActiveIndex = (value)=>{
    console.log("clicked on video - detail : -", value);
    setShowVideoDetail(true);
    setVDetailActiveIndex(value);
    setVideoDetailData(items?.[value]);
    if(value === items?.length-1) fetchMoreListItems();
    console.log('item',items?.[value]);
  }

  useEffect(()=>{
    window.onunload = function () {
      window?.scrollTo(0, 0);
    }
  },[])
  
  const hideVideoDetail = ()=>{
    setShowVideoDetail(false);
    window.history.replaceState('Search Page','videos',`/search?term=${item}`);
  }

  const handleUpClick=()=>{
    console.log("V***",vDetailActiveIndex, items.length-1)
   if(vDetailActiveIndex <= items?.length-1){
    // handleAutoScroll(vDetailActiveIndex+1);
    if(vDetailActiveIndex+1 > items?.length-2){
      console.log('fetched more', vDetailActiveIndex, items?.length-1);
      fetchMoreListItems();
    }
    updateActiveIndex(vDetailActiveIndex+1);
   } 
  }
  
  const handleDownClick=()=>{
    if(vDetailActiveIndex-1 >= 0){
    updateActiveIndex(vDetailActiveIndex-1);
    // handleAutoScroll(vDetailActiveIndex-1)
   }
  }  

  /****** for video detail - end ******/

  async function fetchMoreListItems() {
    try{
      setShowLoading(true);
     const response = await getVideos({keyword: item , offset:offset})
     console.log("fetchedMore",response)
     if(response?.data?.length > 0){
       let data = [...items];
       if(data){
         data = data?.concat(response?.data);
       }
       console.log("items",data)
       setItems(data);
       setOffset(offset+1);
      //  setIsFetching(false);
       setShowLoading(false);
       if(response?.data?.length === 12){
        setHasMore(true);
        }else{
          setHasMore(false);
        }
     }else{
      //  console.log("inelse",response.data.length);
       setShowLoading(false);
       setHasMore(false);
      }
      setShowLoading(false);
    }
    catch(e){
      setHasMore(false);
      console.log("e",e)
    }
   }

    const {t} = useTranslation();

    // useEffect(()=>{window.sessionStorage.removeItem("searchList")},[]);

    const onDataFetched=(data)=>{
        setItems(data?.data);
        setOffset(offset+1);
        if(data?.data?.length > 0){
          if(data?.data?.length === 12){
          setHasMore(true);
          }else{
            setHasMore(false);
          }
        }else{
          setHasMore(false);
        }

     // window.sessionStorage.setItem("searchList",JSON.stringify(data?.data));
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
               {showVideoDetail && 
       <div className='z-20 fixed top-0 left-0 w-full'>
         <VideoDetail
         userName={videoDetailData?.videoOwners?.userName} 
         likesCount={videoDetailData?.likeCount} 
         music_title={videoDetailData?.music_title} 
         userProfilePicUrl={videoDetailData?.videoOwners?.profilePicImgUrl} 
         url={videoDetailData?.selected_video_url} 
         firstFrame={videoDetailData?.thumbnailUrl} 
         firstName={videoDetailData?.videoOwners?.firstName || ''}
         lastName={videoDetailData?.videoOwners?.lastName || ''} 
         description={videoDetailData?.description} 
         updateActiveIndex={updateActiveIndex} 
         videoId={videoDetailData?.id}
         handleUpClick={handleUpClick} 
         handleDownClick={handleDownClick}
         hideVideoDetail={hideVideoDetail}
         shareCount={videoDetailData?.shareCount || ''}
         activeIndex={vDetailActiveIndex}
         socialId={videoDetailData?.getSocialId}
         commentCount={videoDetailData?.commentCount || ''}
         userVerified = {videoDetailData?.verified || ''}
         videoSound={videoDetailData?.videoSound}
         noSound={noSound}
         checkNoSound={checkNoSound}
         playlistId={videoDetailData?.playlistId || "NA"}
         playlistName={videoDetailData?.playlistName || "NA"}
         />
       </div>}
       {items?.length > 0 ? 
            <DeskVideoGallery
            items={items}
            status={fetchState}
            retry={retry && retry}
            // userId={id}
            // type={selectedTab}
            page='search'
            showLoading={showLoading}
            fetchMoreListItems={fetchMoreListItems}
            updateActiveIndex={updateActiveIndex}
            offset={offset}
            hasMore={hasMore}
          />
        : 
      <div className="flex w-full h-36 justify-center items-center">{t('NO_ITEM_SEARCH_RESULTS')}</div>
      }
      {items?.length > 0 && <DeskDownloadAppGoTop/>}
      </ComponentStateHandler>
        </>
    )
}

export default Videos;