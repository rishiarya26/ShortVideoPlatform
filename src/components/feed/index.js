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
import { clearHomeFeed, getHomeFeed } from '../../sources/feed';
import { canShop } from '../../sources/can-shop';
import useWindowSize from '../../hooks/use-window-size';
import FooterMenu from '../footer-menu';
import dynamic from 'next/dynamic';
import Play from '../commons/svgicons/play';
import Img from '../commons/image';
// import {sessionStorage} from "../../utils/storage"
 
SwiperCore?.use([Mousewheel]);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

//TO-DO segregate SessionStorage
function Feed({ router }) {
  const [items, setItems] = useState([]);
  const [toShowItems, setToShowItems] = useState([])
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [videoActiveIndex, setVideoActiveIndex] = useState(null)
  const [saveLook, setSaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });
  const [initialPlayButton, setInitialPlayButton] = useState(true)
  const { t } = useTranslation();
  const { id } = router?.query;
  let { videoId = '' } = router?.query;

  const getFeedData = async() =>{
    let updateItems = JSON.parse(window.sessionStorage?.getItem("feedList"));
     try{
       const response =  await getHomeFeed({ type: id });
       updateItems = updateItems.concat(response?.data);
       window.sessionStorage.setItem("feedList",JSON.stringify(updateItems));
      }
     catch(err){
     }
     return updateItems;
  } 

  const onDataFetched = data => {
    videoId === '' && (videoId = data?.data?.[0]?.content_id);
    if(data){
      const feed = JSON.parse(window.sessionStorage.getItem("feedList"));
      const dataItems = feed || data?.data
      setItems(dataItems);
      window.sessionStorage.setItem("feedList",JSON.stringify(dataItems));
      if(dataItems.length<=6){
        window.sessionStorage.clear();
        window.sessionStorage.setItem("feedList",JSON.stringify(data?.data));
        let toUpdateShowData = [...toShowItems];
        //set first one item in showItems
        toUpdateShowData.push(data?.data[0]);
        setToShowItems(toUpdateShowData);
        setActiveVideoId(videoId);
      }
    }
  }

  const dataFetcher = () => getHomeFeed({ type: id });
  let [fetchState, retry, data] = useFetcher(dataFetcher, onDataFetched, id);

  if (id === 'for-you') {
    const status = fetchState === 'success';
    const dataLength = data?.data?.length;
    fetchState = (status && !dataLength > 0) ? 'fail' : fetchState;
    data = (status && dataLength > 0) && data;
    retry = (status && !dataLength > 0) && retry;
  }

  const validItemsLength = toShowItems?.length > 0;
  setRetry = retry && retry;

  const updateSeekbar = percentage => {
    setInitialPlayButton(false)
    setSeekedPercentage(percentage);
  };

  const getCanShop = async () => {
    let isShoppable = false;
    const shopContent = { ...shop };
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

 const incrementShowItems =async() =>{
  // let updateByValues = 1;
  let updateShowItems = [...toShowItems];
  const dataItem = JSON.parse(window.sessionStorage.getItem("feedList"));
  for(let i=1; i<=2; i++){
    let insertItemIndex = (videoActiveIndex*2)+i
    const arr = dataItem?.length-1 >= insertItemIndex ? dataItem : await getFeedData();
    arr && updateShowItems?.push(arr[insertItemIndex]);
  }
  setToShowItems(updateShowItems);
 }

useEffect(()=>{
  window.onunload = function () {
   window.sessionStorage.removeItem('feedList');
  }
},[])

  useEffect(()=>{
    router?.asPath === '/feed/for-you' &&  window.sessionStorage.clear();
  },[])

  useEffect(()=>{
    toShowItems.length > 0 && incrementShowItems();
      const indexToRedirect = items?.findIndex((data)=>(data?.content_id === videoId));
      if(indexToRedirect !== -1){
      let insertItemIndex = (indexToRedirect*2)+3
      const updateIndex = items?.length-1 >= insertItemIndex && insertItemIndex || items?.length-1
      const updateShowItems =  items?.slice(0,updateIndex);
     setToShowItems(updateShowItems);
     setVideoActiveIndex(indexToRedirect);
}
  },[items])

  useEffect(()=>{
    toShowItems.length > 0 && incrementShowItems();
  },[videoActiveIndex])

  useEffect(() => {
    setShop({ isShoppable: 'pending' });
    getCanShop();
    setSaveLook(true);
  }, [activeVideoId]);


  const toggleSaveLook = () => {
    const data = [...toShowItems];
    const resp = data.findIndex(item => (item.content_id === activeVideoId));
    data[resp].saveLook = true;
    setToShowItems(data);
    setSaveLook(!saveLook);
  };

  const tabs = [{ display: `${t('FORYOU')}`, path: `${t('FOR-YOU')}` },
    { display: `${t('FOLLOWING')}`, path: `${t('SFOLLOWING')}` }];

  const size = useWindowSize();
  const videoHeight = `${size.height}`;

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div style={{ height: `${videoHeight}px` }}>
        <div className="fixed mt-10 z-10 w-full">
          <FeedTabs items={tabs} />
        </div>

        <Swiper
          className="max-h-full"
          direction="vertical"
          draggable="true"
          spaceBetween={0}
          calculateheight="true"
          mousewheel
          scrollbar={{ draggable: true }}
          onSwiper={swiper => {
            if(videoId){
              const slideToId = swiper?.slides?.findIndex(data => data?.id === videoId);
              console.log("slideId",slideToId)
              swiper?.slideTo(slideToId, 0);
            }
          }}
          onSlideChange={swiperCore => {
            const {
              activeIndex, slides
            } = swiperCore;
            const activeId = slides[activeIndex]?.id;
            if(activeIndex > videoActiveIndex){
              setVideoActiveIndex(activeIndex)
            }
            setActiveVideoId(activeId);
            router.replace(`/feed/${id}?videoId=${activeId}`);
          }}
        >
          {
            (validItemsLength ? toShowItems.map((
              item, id
            ) => (
              <SwiperSlide
                key={id}
                id={item.content_id}
              >
                <Video
                  updateSeekbar={updateSeekbar}
                  socialId={item.getSocialId}
                  url={item.video_url}
                  id={item.content_id}
                  comments={item.commentsCount}
                  likes={item.likesCount}
                  music={item.musicCoverTitle}
                  musicTitle={item.music_title}
                  profilePic={item.userProfilePicUrl}
                  userName={item.userName}
                  musicCoverTitle={item.musicCoverTitle}
                  // videoid={item.content_id}
                  hashTags={item.hashtags}
                  videoOwnersId={item.videoOwnersId}
                  thumbnail={item.thumbnail}
                  // thumbnail={item.poster_image_url}
                  canShop={shop.isShoppable}
                  shopCards={shop.data}
                  handleSaveLook={toggleSaveLook}
                  saveLook={saveLook}
                  saved={item.saveLook}
                  activeVideoId={activeVideoId}
                  comp="feed"
                />
              </SwiperSlide>
            )) : (
              <div className="h-screen bg-black flex justify-center items-center">
                <span className="mt-10 text-white">{t('NO_VIDEOS')}</span>
              </div>
            ))
          }
          <div
             onClick={()=>setInitialPlayButton(false)}
             className="absolute top-1/2 justify-center w-screen"
             style={{ display: initialPlayButton ? 'flex' : 'none' }}
          >
            <Play/>
          </div>
          {validItemsLength ? seekedPercentage
          ? <Seekbar seekedPercentage={seekedPercentage} type={'aboveFooterMenu'} />
          : <SeekbarLoading type={'aboveFooterMenu'}/>
          : ''}
          <FooterMenu 
           videoId={activeVideoId}
           canShop={shop.isShoppable}
           type="shop"
           />
        </Swiper>

        <div id="cb_tg_d_wrapper">
          <div className="playkit-player" />
        </div>
      </div>
    </ComponentStateHandler>

  );
}

export default withRouter(Feed);
