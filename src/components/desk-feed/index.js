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
import Top from '../commons/svgicons/top'
import LoginFollowing from '../desk-login-following';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import { removeItem } from '../../utils/cookie';

SwiperCore?.use([Mousewheel]);

const ErrorComp = ({retry}) => (<Error retry={retry}/>);
const LoadComp = () => (<Loading />);

const DeskDownloadApp = dynamic(
  () => import('../desk-download-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

 function DeskFeed({ router }) {
  const [items, setItems] = useState([]);
  const [muted, setMuted] = useState(true)
  const [fetchState, setFetchState] = useState('pending');
  const [activeIndex, setActiveIndex] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [showVideoDetail, setShowVideoDetail] = useState(false);
  const [videoDetailData, setVideoDetailData] = useState({})
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [retry, setRetry] = useState(false);
  const [reload, setReload] = useState(false);
  // const [tokens, setTokens] = useState();
  const tokens = localStorage.get('tokens') || null;
  // const [id, setId] = useState('for-you');

  let { id = 'for-you' } = router?.query;
  console.log(id)
  const { videoId } = router?.query;
  let { campaign_id = null} = router?.query;
  campaign_id = campaign_id ? campaign_id : (localStorage?.get('campaign_id') || null);

  const {show} = useDrawer();

  // selecting home feed api based on before/after login
  const dataFetcher = () => getHomeFeed({ type: id, videoId: videoId, firstApiCall:firstApiCall, campaign_id:campaign_id});
  const dataFetcherWLogin = () => getHomeFeedWLogin({ type: id,videoId:videoId, firstApiCall:firstApiCall, campaign_id:campaign_id});

  const fetchData =  useAuth(dataFetcher,dataFetcherWLogin);

  useEffect(()=>{console.log("items changed to - ",items)},[items])

  useEffect(()=>{

    window.onunload = function () {
      window?.scrollTo(0, 0);
    }
    // setId(router?.query?.id);
    // getInitialData();
  },[])

  useEffect(()=>{
    setItems([]);
    setFetchState('pending');
    getInitialData();
  },[id])

  const doReload = ()=>{
    setReload(true);
  }

  useEffect(()=>{
  if(!tokens){
    doReload();
  }
  },[tokens])

  useEffect(()=>{
    if(reload){
      console.log("FROM RELOAD");
      window?.scrollTo(0,0);
      setItems([]);
      setFetchState('pending');
      getInitialData();
      setReload(false);
    }
  },[reload])

  const getInitialData = async() =>{
    let updateItems = [];
     try{
       const data = await fetchData({ type: id });
       console.log('GOT Inital ITEMS *****', data?.data)
       if(data?.data?.length > 0){
        updateItems = updateItems.concat(data?.data);
         console.log('appended Inital',updateItems);
         setItems(updateItems);
         setFetchState('success');
         setFirstApiCall(false);
       }else{
         setFetchState('success');
         setItems([]);
       }
      }
     catch(err){
      setFetchState('fail');
      setFirstApiCall(false);
     }
  } 

  const getFeedData = async() =>{
    let updateItems = [...items];
    console.log('present item',updateItems);
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

  // useEffect(()=>{console.log("id changed",id)},[id]);

const refs = items?.length > 0 && items.reduce((acc, value, index) => {
  acc[index] = createRef();
  return acc;
}, {});

const handleAutoScroll = id =>
  refs[id].current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

const handleUpClick=()=>{
 if(activeIndex+1 < items.length-1){
  updateActiveIndex(activeIndex+1);
  handleAutoScroll(activeIndex+1)
 } 
}

const handleDownClick=()=>{
  if(activeIndex-1 >= 0){
  updateActiveIndex(activeIndex-1);
  handleAutoScroll(activeIndex-1)
 }
}  

const toggleMute = (value)=>{
  setMuted(value);
}

const updateActiveIndex = (value)=>{
  console.log("clicked on video - detail : -", value);
  setShowVideoDetail(true);
  setActiveIndex(value);
  setVideoDetailData(items?.[value]);
  console.log('item',items[value])
}

const hideVideoDetail = ()=>{
  setShowVideoDetail(false);
  window.history.replaceState('Feed Page','Feed',`/feed/${id}`);
}

const doRetry = (value) =>{
  setRetry(value);
}

useEffect(()=>{console.log("ActiveIndex changed - ",activeIndex)},[activeIndex])

useEffect(()=>{
  if(retry){
    console.log("from retry")
    setFetchState('pending');
    getInitialData();
    setRetry(false);
  }
},[retry])

// const toggleFeed = (value)=>{
//   setId(id);
// }

const FeedComp =  <div className="W-feed-vid pt-24 flex flex-col no_bar">
{items && items?.length > 0 ? <InfiniteScroll 
 dataLength={items?.length} 
 next={getFeedData} 
 hasMore={hasMore} 
 loader={<h3> Loading...</h3>}
 endMessage={<h4>Error</h4>}
>
     {items.map((item,id)=>
    <span key={id} ref={refs[id]}>
        <Video 
         index={id} 
         userName={item?.userName} 
         likesCount={item?.likesCount} 
         music_title={item?.music_title} 
         userProfilePicUrl={item?.userProfilePicUrl} 
         url={item?.video_url} 
         firstFrame={item?.firstFrame} 
         muted={muted} 
         toggleMute={toggleMute} 
         firstName={item?.firstName} 
         lastName={item?.lastName} 
         description={item?.content_description} 
         updateActiveIndex={updateActiveIndex} 
         showVideoDetail={showVideoDetail}
         shareCount={item?.shareCount || null}
         commentCount={item?.commentCount || null}
         videoId={item?.content_id}
         socialId={item?.getSocialId}
         userVerified = {item?.verified}
         />
    </span>
     )}
</InfiniteScroll>
: <div className=' w-full flex justify-center p-28 items-center'>No Videos Found</div>}
</div>

const showLoginFollowing = <LoginFollowing/>;
  
const toShowFollowing =  useAuth(showLoginFollowing, FeedComp);

const info ={
  'for-you' : FeedComp,
  'following' : toShowFollowing
}

  return (
    <>
     <SeoMeta
        data={{
          title: 'Discover Popular Videos |  Hipi - Indian Short Video App',
          description: 'Hipi is a short video app that brings you the latest trending videos that you can enjoy and share with your friends or get inspired to make awesome videos. Hipi karo. More karo.',
        }}
      />
    <div className="flex flex-col w-full thin_bar items-center font-sans">
       {showVideoDetail && 
       <div className='z-20 fixed top-0 left-0 w-full'>
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
         activeIndex={activeIndex}
         socialId={videoDetailData?.getSocialId}
         commentCount={videoDetailData?.commentCount}
         userVerified = {videoDetailData?.verified}
         />
       </div>}
        <Header doReload={doReload} typeParam={id}/>
        <div className="flex mt-2 bg-white justify-between relative thin_bar w-feed">
          <div className='w-feed-menu menu-sm pt-24'>
          <DeskMenu width={'w-feed-menu menu-sm-w'}/>
          </div>
            { fetchState === 'success' ?
             info?.[id]
            :
            fetchState === 'pending' ?
            <LoadComp /> :
            fetchState === 'fail' &&
            <ErrorComp retry={doRetry}/>
            }
        </div>
        <div className='px-4 py-2 rounded-full border-gray-300 border text-gray-600 fixed right-4 cursor-pointer bottom-12 bg-white text-xs font-bold' onClick={()=>show('Download App',DeskDownloadApp,'broad')}>Get App</div>
        <button onClick={()=>window?.scrollTo({ top: 0, behavior: 'smooth' })} className='fixed bottom-2 right-4 p-2 flex justify-center items-center rounded-full bg-hipired white'>
            <Top/>
        </button>
    </div>
</>
          
  );
}

export default withRouter(DeskFeed);