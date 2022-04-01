/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/display-name */
import { useCallback, useEffect, useRef, useState, createRef } from 'react';
import DeskVideo from '../desk-video';
import Error from './error';
import Loading from './loader';
import { getHomeFeed, getHomeFeedWLogin } from '../../sources/feed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import CloseSolid from "../commons/svgicons/close-solid";
import Search from "../commons/svgicons/search";
import { withBasePath } from '../../config';
import useAuth from '../../hooks/use-auth';
import {FixedSizeList} from "react-window"
import { withRouter } from 'next/router';
import Card from '../desktop/card'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Video from '../desk-video';
import Mute from "../commons/svgicons/mute";
import MusicBlack from "../commons/svgicons/music-black";
import Comment from "../commons/svgicons/comment-black"
import Like from "../commons/svgicons/like-black";
import Share from "../commons/svgicons/share-black";
import dynamic from 'next/dynamic';
import useDrawer from '../../hooks/use-drawer';
import { localStorage } from '../../utils/storage';
import Refresh from '../commons/svgicons/refresh';
import InfiniteScroll from "react-infinite-scroll-component";
import Header from '../desk-header';
import SideBar from '../desk-menu';
import DeskMenu from '../desk-menu';
import VideoDetail from '../desk-video-detail';

SwiperCore?.use([Mousewheel]);

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

 function DeskFeed({ router }) {
  const [items, setItems] = useState([]);
  const [muted, setMuted] = useState(true)
  const [fetchState, setFetchState] = useState('pending');
  const [activeIndex, setActiveIndex] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [showVideoDetail, setShowVideoDetail] = useState(false);
  const [videoDetailData, setVideoDetailData] = useState({})

  const { id = 'for-you' } = router?.query;

  // selecting home feed api based on before/after login
  const dataFetcher = () => getHomeFeed({ type: id});
  const dataFetcherWLogin = () => getHomeFeedWLogin({ type: id});

  const fetchData =  useAuth(dataFetcher,dataFetcherWLogin);

  useEffect(()=>{console.log("items changed to - ",items)},[items])

  useEffect(()=>{
    window.onunload = function () {
      window?.scrollTo(0, 0);
    }
    getInitialData();
  },[])

  const getInitialData = async() =>{
    let updateItems = [...items];
     try{
       const data = await fetchData({ type: id });
       console.log('GOT Inital ITEMS *****', data?.data)
       if(data?.data?.length > 0){
        updateItems = updateItems.concat(data?.data);
         console.log('appended Inital',updateItems);
         setItems(updateItems);
         setFetchState('success')
       }
      }
     catch(err){
      setFetchState('fail')
     }
  } 

  const getFeedData = async() =>{
    let updateItems = [...items];
    console.log('present items',updateItems);
     try{
       const data = await fetchData({ type: id });
       console.log('GOT MORE ITEMS *****', data?.data)
       if(data?.data?.length > 0){
        updateItems = updateItems.concat(data?.data);
         console.log('appended',updateItems);
         setItems(updateItems);
       }
      }
     catch(err){
     }
  } 

  useEffect(()=>{console.log("id changed",id)},[id]);

const refs = items?.length > 0 && items.reduce((acc, value, index) => {
  acc[index] = createRef();
  return acc;
}, {});

const handleClick = id =>
  refs[id].current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

const unMute = (value)=>{
  setMuted(false);
}

const updateActiveIndex = (value)=>{
  console.log("clicked on video - detail : -", value);
  setShowVideoDetail(true);
  setActiveIndex(value);
  setVideoDetailData(items?.[value]);
  console.log('item',items[value])
}

const handleUpClick=()=>{
 if(activeIndex+1 < items.length-1){
  updateActiveIndex(activeIndex+1);
  handleClick(activeIndex+1)
 } 
}

const handleDownClick=()=>{
  if(activeIndex-1 >= 0){
  updateActiveIndex(activeIndex-1);
  handleClick(activeIndex-1)
 }
}

const hideVideoDetail = ()=>{
  setShowVideoDetail(false);
  window.history.replaceState('Feed Page','Feed',`/feed/${id}`);
}

useEffect(()=>{console.log("ActiveIndex changed - ",activeIndex)},[activeIndex])

  return (
    <>
    <div className="flex flex-col w-full thin_bar pt-28 items-center">
       {showVideoDetail && 
       <div className='z-50 fixed top-0 left-0 w-full'>
         <VideoDetail
         userName={videoDetailData?.userName} 
         likesCount={videoDetailData?.likesCount} 
         music_title={videoDetailData?.music_title} 
         userProfilePicUrl={videoDetailData?.userProfilePicUrl} 
         url={videoDetailData?.video_url} 
         firstFrame={videoDetailData?.firstFrame} 
         firstName={videoDetailData?.firstName}
         lastName={videoDetailData?.lastName} 
         description={videoDetailData?.content_description} 
         updateActiveIndex={updateActiveIndex} 
         videoId={videoDetailData?.content_id}
         handleUpClick={handleUpClick} 
         handleDownClick={handleDownClick}
         hideVideoDetail={hideVideoDetail}
         shareCount={videoDetailData?.shareCount}
         />
       </div>}
        <Header />
        <div className="flex mt-2 bg-white justify-between relative thin_bar w-feed">
            <DeskMenu handleUpClick={handleUpClick} handleDownClick={handleDownClick} />
            { fetchState === 'success' ?
            <div className="W-feed-vid flex flex-col no_bar">
                <InfiniteScroll 
                 dataLength={items?.length} 
                 next={getFeedData} 
                 hasMore={hasMore} 
                 loader={<h3> Loading...</h3>}
                 endMessage={<h4>Error</h4>}
                >
                    {items && items?.length > 0 && items.map((item,id)=>
                    <span key={id} ref={refs[id]}>
                        <Video 
                         index={id} 
                         userName={item?.userName} 
                         likesCount={item?.likesCount} 
                         music_title={item?.music_title} 
                         userProfilePicUrl={item?.userProfilePicUrl} 
                         url={item?.video_url} 
                         firstFrame={item?.firstFrame} 
                         muted={muted} unMute={unMute} 
                         firstName={item?.firstName} 
                         lastName={item?.lastName} 
                         description={item?.content_description} 
                         updateActiveIndex={updateActiveIndex} 
                         showVideoDetail={showVideoDetail}
                         shareCount={item?.shareCount || null}
                         />
                    </span>
                    )}
                </InfiniteScroll>
            </div>
            :
            fetchState === 'pending' ?
            <LoadComp /> :
            fetchState === 'fail' &&
            <ErrorComp />
            }
        </div>
        <button onClick={()=>window?.scrollTo({ top: 0, behavior: 'smooth' })} className='fixed bottom-0 right-0 w-10 h-10 bg-red white'>UP</button>
    </div>
</>
          
  );
}

export default withRouter(DeskFeed);