/*eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import { withRouter } from 'next/router';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Seekbar from '../seekbar';
import SeekbarLoading from '../seekbar/loader.js';
// import FooterMenu from '../footer-menu';
import FeedTabs from '../commons/tabs/feed-tab';
import useTranslation from '../../hooks/use-translation';
import { Shop } from '../commons/button/shop';
import { clearHomeFeed, getHomeFeed, getHomeFeedWLogin } from '../../sources/feed';
import { canShop } from '../../sources/can-shop';
import useWindowSize from '../../hooks/use-window-size';
import FooterMenu from '../footer-menu';
import dynamic from 'next/dynamic';
import Play from '../commons/svgicons/play';
import Img from '../commons/image';
import usePreviousValue from '../../hooks/use-previous';
import useAuth from '../../hooks/use-auth';
import LoginFollowing from '../login-following';
import useDrawer from '../../hooks/use-drawer';
import Mute from '../commons/svgicons/mute';
import {
  SeoMeta,
  VideoJsonLd
} from '../../components/commons/head-meta/seo-meta';
// import Like from '../commons/svgicons/like';
import CircularProgress from '../commons/circular-loader'
// import {sessionStorage} from "../../utils/storage"
 
SwiperCore?.use([Mousewheel]);

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

//TO-DO segregate SessionStorage
function FeedIphone({ router }) {
  const [items, setItems] = useState([]);
  // const [item,setSeoItem] = useState({})
  const [toShowItems, setToShowItems] = useState([])
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [videoActiveIndex, setVideoActiveIndex] = useState(0)
  const [saveLook, setSaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });
  const [initialPlayButton, setInitialPlayButton] = useState(true)
  const [currentTime, setCurrentTime] = useState(null)
  const [muted, setMuted] = useState(true);
  const [toInsertElements, setToInsertElements] = useState(4);
  const [deletedTill, setDeletedTill] = useState();
  // const [offset, setOffset] = useState(1)
  const preActiveVideoId = usePreviousValue({videoActiveIndex});
  const pretoInsertElemant = usePreviousValue({toInsertElements});

  const { t } = useTranslation();
  const { id } = router?.query;

  const {show} = useDrawer();

  const onDataFetched = data => {
    if(data){
      // console.log('showItems', toShowItems)
      // console.log('items',items)
      // console.log('currentIndex',videoActiveIndex)
      // console.log('id',activeVideoId)
      // console.log('preId',preActiveVideoId)
      //   setVideoActiveIndex(0)
      //   setActiveVideoId(null)
        
        let toUpdateShowData = [];
        const videoIdInitialItem = data?.data?.[0]?.content_id
        //set first three item in showItems
        // toUpdateShowData.push(data?.data?.[0]);
        // toUpdateShowData.push(data?.data?.[1]);
        // toUpdateShowData.push(data?.data?.[2]);
        setItems(data?.data);
        setToShowItems(data?.data);
        setActiveVideoId(videoIdInitialItem);
        setToInsertElements(4);
        // setSeoItem(data?.data[0]);
    }
  }

  // selecting home feed api based on before/after login
  const dataFetcher = () => getHomeFeed({ type: id });
  const dataFetcherWLogin = () => getHomeFeedWLogin({ type: id });

  const fetchData =  useAuth(dataFetcher,dataFetcherWLogin);

  // const getFeedData = async() =>{
  //   let updateItems = [...items];
  //    try{
  //      const data =  await fetchData({ type: id });
  //      console.log(data)
  //      updateItems = updateItems.concat(data?.data);
  //     //  setOffset(offset+1)
  //      setItems(updateItems);
  //     }
  //    catch(err){
  //    }
  //    return updateItems;
  // } 

  const getFeedData = async() =>{
    let updateItems = [...items];
    let data = []
     try{
       data =  await fetchData({ type: id });
       updateItems = updateItems.concat(data?.data);
      //  setOffset(offset+1)
       setItems(updateItems);
      }
     catch(err){
     }
     return data?.data;
  } 

  let [fetchState, retry, data] = useFetcher(fetchData, onDataFetched, id);
  setRetry = retry && retry

  useEffect(()=>{
    setToShowItems([]),
    setItems([])
    setVideoActiveIndex(0)
    setActiveVideoId(null)
  },[id])

  if (id === 'for-you') {
    const status = fetchState === 'success';
    const dataLength = data?.data?.length;
    fetchState = (status && !dataLength > 0) ? 'fail' : fetchState;
    data = (status && dataLength > 0) && data;
    retry = (status && !dataLength > 0) && retry;
  }

  const validItemsLength = toShowItems?.length > 0;
  // setRetry = retry && retry;

  const updateSeekbar = percentage => {
    setInitialPlayButton(false)
    setSeekedPercentage(percentage);
  };

  const getCanShop = async () => {
    let isShoppable = false;
    const shopContent = { ...shop };
    console.log(activeVideoId);
    try {
      const response = await canShop({ videoId: activeVideoId });
      isShoppable = response?.isShoppable;
      shopContent.data = response?.data;
    } catch (e) {
      isShoppable = false;
    }
    isShoppable ? shopContent.isShoppable = 'success' : shopContent.isShoppable = 'fail';
    setShop(shopContent);
  };

 const incrementShowItems = async() =>{
 try{ 
  let updateShowItems = [...toShowItems];
  let deletedTill = pretoInsertElemant?.toInsertElements-12;
  let dataItem = [...items];

  console.log('adding items')
  const arr = await getFeedData();
  arr && (dataItem = dataItem?.concat(arr));
  //add
  for(let i=0;i<=5;i++){
    if(dataItem?.[videoActiveIndex+i+2]){ 
      updateShowItems.push(dataItem[videoActiveIndex+i+2])
    }
    // else{

    // updateShowItems.push(dataItem[videoActiveIndex+i+2]);
    // }
  }
  //delete
  if(videoActiveIndex >= 10)
  { for(let i=0;i<=pretoInsertElemant?.toInsertElements-6-1;i++){
    console.log("delete",updateShowItems[i])
    updateShowItems[i] && (updateShowItems[i] = null);
   
    // items?.[videoActiveIndex+i+2] && updateShowItems.push(items[videoActiveIndex+i+2]);
  }
  }
  deletedTill = pretoInsertElemant?.toInsertElements-6-1;
  setDeletedTill(deletedTill);
  setMuted(true);
  show('', detectDeviceModal, 'extraSmall', {text: "see more", setMuted:setMuted});
  // arr && console.log(updateShowItems,updateShowItems?.concat(arr))
  // arr && (updateShowItems = updateShowItems?.concat(arr));
  setToShowItems(updateShowItems);
}
  catch(e){
console.log('error',e)
  }
}

 const decrementingShowItems = async() =>{

  let updateShowItems = [...toShowItems];
  const dataItem = [...items];
  for(let i=0;i<=5;i++){
    updateShowItems[deletedTill-i] = dataItem[deletedTill-i];
  }
  setMuted(true);
  show('', detectDeviceModal, 'extraSmall', {text: "see more", setMuted:setMuted});
  setDeletedTill(deletedTill-5);
  setToShowItems(updateShowItems);
 }

  useEffect(()=>{
    if(videoActiveIndex > preActiveVideoId?.videoActiveIndex){
      //swipe-down
      if(toShowItems.length > 0 && toInsertElements === videoActiveIndex){
        incrementShowItems();
        setToInsertElements(toInsertElements +6);
      }
    }
    else{
      //swipe-up
      if(toShowItems.length > 0 && deletedTill === videoActiveIndex){
       decrementingShowItems();
      }
    }
  },[videoActiveIndex])

  useEffect(() => {
    setShop({ isShoppable: 'pending' });
    getCanShop();
    setSaveLook(true);
  }, [activeVideoId]);

  const toggleSaveLook = () => {
    const data = [...toShowItems];
    const resp = data.findIndex(item => (item?.content_id === activeVideoId));
    data[resp].saveLook = true;
    setToShowItems(data);
    setSaveLook(!saveLook);
  };

  const tabs = [
    { display: `${t('FOLLOWING')}`, path: `${t('SFOLLOWING')}` },{ display: `${t('FORYOU')}`, path: `${t('FOR-YOU')}` }];

  const size = useWindowSize();
  const videoHeight = `${size.height}`;

  const swiper = () => <Swiper
              className="max-h-full"
              direction="vertical"
              draggable="true"
              spaceBetween={0}
              calculateheight="true"
              slidesPerView={1}
              mousewheel
              scrollbar={{ draggable: true }}
              autoplay= {{
                  disableOnInteraction: false
              }}
          
              onSlideChange={swiperCore => {
                const {
                  activeIndex, slides
                } = swiperCore;
                if(slides[activeIndex]?.firstChild?.firstChild?.currentTime > 0){
                  slides[activeIndex].firstChild.firstChild.currentTime = 0
                }
                // if(slides[activeIndex]?.firstChild?.firstChild?.muted === true){
                //   slides[activeIndex].firstChild.firstChild.muted = false
                // }
                     
                const activeId = slides[activeIndex]?.attributes?.itemid?.value;
                // const dataItems = [...items];
                // const seoItem = dataItems?.find(item => item?.content_id === activeId);

                // seoItem && setSeoItem(seoItem);
                activeIndex && setVideoActiveIndex(activeIndex);
                activeId && setActiveVideoId(activeId);
              }}
            >
              {
                (validItemsLength ? toShowItems.map((
                  item, id
                ) => (
                  <SwiperSlide
                    key={id}
                    id={item?.watchId}
                    itemID={item?.content_id}
                  >
                  {item !==null &&  <Video
                      updateSeekbar={updateSeekbar}
                      socialId={item?.getSocialId}
                      url={item?.video_url}
                      id={item?.content_id}
                      comments={item?.commentsCount}
                      likes={item?.likesCount}
                      music={item?.musicCoverTitle}
                      musicTitle={item?.music_title}
                      profilePic={item?.userProfilePicUrl}
                      userName={item?.userName}
                      musicCoverTitle={item?.musicCoverTitle}
                      // videoid={item.content_id}
                      hashTags={item?.hashtags}
                      videoOwnersId={item?.videoOwnersId}
                      thumbnail={item?.thumbnail}
                      // thumbnail={item.poster_image_url}
                      canShop={shop?.isShoppable}
                      shopCards={shop?.data}
                      handleSaveLook={toggleSaveLook}
                      saveLook={saveLook}
                      saved={item?.saveLook}
                      activeVideoId={activeVideoId}
                      comp="feed"
                      currentTime={currentTime}
                      initialPlayButton={initialPlayButton}
                      muted={muted}
                      // setMuted={setMuted}
                    />}
                  </SwiperSlide>
                )) : (
                  <div className="h-screen bg-black flex justify-center items-center">
                    <span className="mt-10 text-white">{t('NO_VIDEOS')}</span>
                  </div>
                ))
              }
              <div
                className="absolute top-1/2 justify-center w-screen flex"
                style={{ display: (validItemsLength && seekedPercentage > 0) ? 'none' : 'flex text-white' }}
              >
                <CircularProgress/>
              </div>
              {/* <div
                onClick={()=>setInitialPlayButton(false)}
                className="absolute top-1/2 justify-center w-screen"
                style={{ display: initialPlayButton ? 'flex' : 'none' }}
              >
                <Play/>
              </div> */}
              {<div
                onClick={()=>setMuted(false)}
                className="absolute top-6 left-4 items-center bg-gray-200 bg-opacity-30 rounded-sm flex justify-center p-4"
                style={{ display: !initialPlayButton && muted ? 'flex' : 'none' }}
              >
               <Mute/>
              </div>}
              {validItemsLength ? seekedPercentage > 0
              ? <Seekbar seekedPercentage={seekedPercentage} type={'aboveFooterMenu'} />
              : <SeekbarLoading type={'aboveFooterMenu'}/>
              : ''}
              <FooterMenu 
              videoId={activeVideoId}
              canShop={shop.isShoppable}
              type="shop"
              selectedTab="home"
              />
            </Swiper>

  const showLoginFollowing = ()=> <LoginFollowing/>;
  
  // const toShowFollowing = useAuth(showLoginFollowing, swiper);

  const info = {
    'for-you' : swiper,
    'following' : showLoginFollowing
  }

  let hostname;
  if (typeof window !== 'undefined') {
    hostname = window?.location?.hostname;
 }

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
       <SeoMeta
        data={{
          title: 'HiPi - Indian Short Video Platform for Fun Videos, Memes & more',
          // image: item?.thumbnail,
          description: 'Short Video Community - Watch and create entertaining dance, romantic, funny, sad & other short videos. Find fun filters, challenges, famous celebrities and much more only on HiPi',
        }}
      />
      {/* <VideoJsonLd
        name={item.music_title}
        description={item.content_description}
        contentUrl={item.video_url}
        embedUrl={hostname}
        thumbnailUrls={item.thumbnailUrls}
        watchCount={item.likesCount}
      /> */}
    <>
      <div className="feed_screen overflow-hidden" style={{ height: `${videoHeight}px` }}>
        <div className="fixed mt-10 z-10 w-full">
          <FeedTabs items={tabs} />
        </div>
        {info?.[id]()}
        <div id="cb_tg_d_wrapper">
          <div className="playkit-player" />
        </div>
      </div>
    </>
    </ComponentStateHandler>

  );
}

export default withRouter(FeedIphone);
