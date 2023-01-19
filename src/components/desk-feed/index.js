/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/display-name */
import { useEffect, useState, createRef } from 'react';
import Error from './error';
import Loading from './loader';
import { getHomeFeed, getHomeFeedWLogin } from '../../sources/feed';
import useAuth from '../../hooks/use-auth';
import { withRouter } from 'next/router';
import Video from '../desk-video';
import { localStorage } from '../../utils/storage';
import InfiniteScroll from "react-infinite-scroll-component";
import Header from '../desk-header';
import DeskMenu from '../desk-menu';
import VideoDetail from '../desk-video-detail';
import LoginFollowing from '../desk-login-following';
import DeskDownloadAppGoTop from '../commons/desk-download-go-top';
import CircularLoaderSearch from '../commons/circular-loader-search';
import usePreviousValue from '../../hooks/use-previous';
import VideoUnavailable from '../video-unavailable';
import SnackCenter from '../commons/snack-bar-center';
import { webPush } from '../../analytics/clevertap';
import { toTrackClevertap } from '../../analytics/clevertap/events';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';

const ErrorComp = ({retry}) => (<Error retry={retry}/>);
const LoadComp = () => (<Loading />);

 function DeskFeed({ router }) {
  const [items, setItems] = useState([]);
  const [muted, setMuted] = useState(true)
  const [fetchState, setFetchState] = useState('pending');
  const [activeIndex, setActiveIndex] = useState();
  const [activeFeedIndex, setActiveFeedIndex] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [showVideoDetail, setShowVideoDetail] = useState(false);
  const [videoDetailData, setVideoDetailData] = useState({})
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [retry, setRetry] = useState(false);
  const [reload, setReload] = useState(false);
  const [tokens, setTokens] = useState(localStorage.get('tokens') || false);
  const [loadFeed, setLoadFeed] = useState(true);
  const [noSound, setNoSound] = useState(false);
  const [initialPlayStarted, setInitialPlayStarted] = useState({
    started: false,
    activeId: null,
    prevActiveId: null,
  });
  const { id } = router?.query;
  const tabName = id && (id === 'following') ? 'Following' : 'ForYou';

  useEffect(() => {
    if(initialPlayStarted.started && initialPlayStarted.activeId !== initialPlayStarted.prevActiveId) {
      toTrackClevertap('play',{pageName : 'Feed',tabName:tabName, playlistId: items[activeFeedIndex]?.playlistId, playlistName: items[activeFeedIndex]?.playlistName},items?.[activeFeedIndex]);
      toTrackMixpanel('play', {pageName : 'Feed',tabName:tabName, playlistId: items[activeFeedIndex]?.playlistId, playlistName: items[activeFeedIndex]?.playlistName},items?.[activeFeedIndex]);
    }
  }, [initialPlayStarted])

  const updateActiveFeedIndex = (id) => {
    setActiveFeedIndex(id);
  }

  const checkNoSound =()=>{
    if(!items?.[activeIndex]?.videoSound){
      setNoSound(true);
      setTimeout(()=>{setNoSound(false)},3000)
    }
  }

  const preTokensValue = usePreviousValue({tokens});
  const tokensPresent = localStorage.get('tokens') || null;
  const { videoId } = router?.query;
  let { campaign_id = null} = router?.query;
  // campaign_id = campaign_id ? campaign_id :  (localStorage?.get('campaign_id') || null);
  campaign_id = campaign_id ? campaign_id :  ( JSON.parse(window.sessionStorage.getItem('campaign_id')) || null);
 
  // selecting home feed api based on before/after login
  const dataFetcher = () => getHomeFeed({ type: id, videoId: videoId, firstApiCall:firstApiCall, campaign_id:campaign_id});
  const dataFetcherWLogin = () => getHomeFeedWLogin({ type: id,videoId:videoId, firstApiCall:firstApiCall, campaign_id:campaign_id});

  const fetchData =  useAuth(dataFetcher,dataFetcherWLogin);

  useEffect(() => {
    if(activeFeedIndex > 8) {
      webPush();
    }
  }, [activeFeedIndex])

  useEffect(()=>{console.log("items changed to - ",items)},[items])

  useEffect(()=>{
    window.onunload = function () {
      window?.scrollTo(0, 0);
    }
    toTrackClevertap('screenView', {pageName: 'Feed'})
    toTrackMixpanel('screenView', {pageName: 'Feed'})
  },[])

  useEffect(()=>{
   if(id){ 
    setItems([]);
    setFetchState('pending');
    getInitialData();
  }
  },[id])

  const doReload = ()=>{
    setReload(true);
  }

  useEffect(()=>{
  if(!tokens && tokensPresent){
    setTokens(true);
  }
  },[tokensPresent])

  useEffect(()=>{
    //prevalue is false & current token is true i.e. user has logged in & feed needs reload
    console.log('preValue',preTokensValue?.tokens, tokens, tokensPresent)
    preTokensValue?.tokens === false && tokens && doReload();
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
       console.log("data",data)
       if(data?.status !== 'notFound'){
         console.log('GOT Inital ITEMS *****', data?.data)
       if(data?.data?.length > 0){
        updateItems = updateItems.concat(data?.data);
         console.log('appended Inital',updateItems);
         setItems(updateItems);
         setFetchState('success');
         setFirstApiCall(false);
         checkNoSound();
       }else{
         setFetchState('success');
         setItems([]);
       }}else{
         console.log("in else")
         setFetchState('notFound')
        //  setLoadFeed(false);
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
  checkNoSound();
 } 
}

const handleDownClick=()=>{
  if(activeIndex-1 >= 0){
  updateActiveIndex(activeIndex-1);
  handleAutoScroll(activeIndex-1)
  checkNoSound();
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

useEffect(()=>{console.log("ActiveIndex changed - ",activeIndex, noSound)
checkNoSound();
},[activeIndex])

useEffect(()=>{
  if(retry){
    console.log("from retry")
    setFetchState('pending');
    getInitialData();
    setRetry(false);
  }
},[retry])

const convivaItemInfo = (item = {}) => {
  let obj = {};

  let {content_id, music_title, video_url, language,
        content_description, userName, videoOwnersId, creatorTag,
          createdOn, videoDuration}  = item;

  obj = {content_id, music_title, video_url, language,
    content_description, userName, videoOwnersId, creatorTag,
      createdOn, videoDuration}

      return obj;
}

const FeedComp =  <div className="W-feed-vid pt-24 flex flex-col no_bar">
{items && items?.length > 0 ? <InfiniteScroll 
 dataLength={items?.length} 
 next={getFeedData} 
 hasMore={hasMore} 
 loader={<div className='w-full flex justify-center pb-6'><CircularLoaderSearch/></div>}
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
          muted={item?.videoSound === false ? true : muted}
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
          convivaItemInfo={()=>convivaItemInfo(item)}
          videoSound={item?.videoSound}
          noSound={noSound}
          activeIndex={activeIndex}
          checkNoSound={checkNoSound}
          fetchState={fetchState}
          updateActiveFeedIndex={updateActiveFeedIndex}
          activeFeedIndex={activeFeedIndex}
          initialPlayStarted={initialPlayStarted}
          setInitialPlayStarted={setInitialPlayStarted}
          />
      </span>
     )}
</InfiniteScroll>
: <div className=' w-full flex justify-center p-28 text-gray-600 items-center'>No Videos Found</div>}

</div>

const showLoginFollowing = <LoginFollowing/>;
  
const toShowFollowing =  useAuth(showLoginFollowing, FeedComp);

const info ={
  'for-you' : FeedComp,
  'following' : toShowFollowing
}

  return (
    <>
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
         convivaItemInfo={()=>convivaItemInfo(videoDetailData)}
         videoSound={videoDetailData?.videoSound}
         noSound={noSound}
         checkNoSound={checkNoSound}
         userId={videoDetailData?.userId}
         playlistId={videoDetailData?.playlistId || "NA"}
         playlistName={videoDetailData?.playlistName || "NA"}
         />
       </div>}
        <Header doReload={doReload} typeParam={id}/>
        <div className="flex mt-2 bg-white justify-between relative thin_bar w-feed">
          <div className='w-feed-menu menu-sm '>
          <DeskMenu width={'w-feed-menu menu-sm-w'}/>
          </div>
          
           { fetchState === 'success' ?
            info?.[id]
            :
            fetchState === 'pending' ?
            <LoadComp /> :
            fetchState === 'fail' ?
            <ErrorComp retry={doRetry}/>
            : fetchState === 'notFound' &&
            <VideoUnavailable/>
            }
           
        </div>
       <DeskDownloadAppGoTop/>
    </div>
</>
          
  );
}

export default withRouter(DeskFeed);