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
import { clearHomeFeed, getHomeFeed } from '../../sources/feed';
import { canShop } from '../../sources/can-shop';
import useWindowSize from '../../hooks/use-window-size';
import FooterMenu from '../footer-menu';
import dynamic from 'next/dynamic';
import Play from '../commons/svgicons/play';
import Img from '../commons/image';
import usePreviousValue from '../../hooks/use-previous';
// import {sessionStorage} from "../../utils/storage"
 
SwiperCore?.use([Mousewheel]);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

//TO-DO segregate SessionStorage
function Feed({ router }) {
  const [items, setItems] = useState([]);
  const [toShowItems, setToShowItems] = useState([])
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [videoActiveIndex, setVideoActiveIndex] = useState(0)
  const [saveLook, setSaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });
  const [initialPlayButton, setInitialPlayButton] = useState(true)
  const [currentTime, setCurrentTime] = useState(null)
  const [offset, setOffset] = useState(1)
  const preActiveVideoId = usePreviousValue({videoActiveIndex});
  const { t } = useTranslation();
  const { id } = router?.query;

  const getFeedData = async() =>{
    let updateItems = [...items];
     try{
       const data =  await getHomeFeed({ type: id , offset: offset });
       updateItems = updateItems.concat(data?.data);
       setOffset(offset+1)
       setItems(updateItems);
      }
     catch(err){
     }
     return updateItems;
  } 

  const onDataFetched = data => {
    if(data){
        let toUpdateShowData = [...toShowItems];
        const videoIdInitialItem = data?.data?.[0]?.content_id
        //set first three item in showItems
        toUpdateShowData.push(data?.data?.[0]);
        toUpdateShowData.push(data?.data?.[1]);
        toUpdateShowData.push(data?.data?.[2]);
        setItems(data?.data);
        setToShowItems(toUpdateShowData);
        setActiveVideoId(videoIdInitialItem);
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

 const incrementShowItems = async() =>{
  let updateShowItems = [...toShowItems];
  const dataItem = [...items]

  /* Increment */
    const incrementGap = 2;
    let insertItemIndex = videoActiveIndex+incrementGap;
    const arr = dataItem?.length-1 >= insertItemIndex ? dataItem : await getFeedData();
    arr && updateShowItems?.push(arr[insertItemIndex]);
    // console.log(videoActiveIndex,"+",incrementGap,insertItemIndex, updateShowItems)

  /* Delete */
    const decrementGap = 3;
    let deleteItemIndex = videoActiveIndex-decrementGap;
    if(deleteItemIndex >=0 && videoActiveIndex >=3){
      updateShowItems[deleteItemIndex] = null;
      // console.log('deleted', updateShowItems)
      // console.log(videoActiveIndex,"-",decrementGap,deleteItemIndex, updateShowItems)
    }
  // console.log("increment",items,updateShowItems);
  setToShowItems(updateShowItems);
 }

 const decrementingShowItems = async() =>{
  let updateShowItems = [...toShowItems];
  const dataItem = [...items]

  /* Add */
  const  incrementGap = 2;
  let insertItemIndex = videoActiveIndex-incrementGap;
  if(insertItemIndex >=0 && videoActiveIndex >=2){
    updateShowItems[insertItemIndex] = dataItem?.[insertItemIndex];
    // console.log('added', updateShowItems)
    // console.log(videoActiveIndex,"-",incrementGap,insertItemIndex, updateShowItems)
  }

  /* Delete */
    const  decrementGap=  3;
    let deleteItemIndex = videoActiveIndex+decrementGap;
     deleteItemIndex >= 3 && updateShowItems?.splice(deleteItemIndex,1);
    // console.log(videoActiveIndex,"+",decrementGap,deleteItemIndex, updateShowItems)
    // console.log("increment",items,updateShowItems);
    setToShowItems(updateShowItems);
 }

  useEffect(()=>{
    if(videoActiveIndex > preActiveVideoId?.videoActiveIndex){
      //swipe-down
      toShowItems.length > 0 && incrementShowItems();
    }else{
      //swipe-up
      toShowItems.length > 0 && decrementingShowItems();
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
      <>
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
          slidesPerView={1}
          mousewheel
          // speed = '5000'
          scrollbar={{ draggable: true }}
          autoplay= {{
              // delay: 2000,
              // delay: 5000,
              disableOnInteraction: false
          }}
          // onSwiper={swiper => {
          //   if(videoId){
          //     const slideToId = swiper?.slides?.findIndex(data => data?.id === videoId);
          //     console.log("slideId",slideToId)
          //     swiper?.slideTo(slideToId, 0);
          //   }
          // }}
          onSlideChange={swiperCore => {
            const {
              activeIndex, slides
            } = swiperCore;
            if(slides[activeIndex]?.firstChild?.firstChild?.currentTime > 0){
              slides[activeIndex].firstChild.firstChild.currentTime = 0
            }
           
            const activeId = slides[activeIndex]?.attributes?.itemid?.value;
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
                />}
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
           selectedTab="home"
           />
        </Swiper>

        <div id="cb_tg_d_wrapper">
          <div className="playkit-player" />
        </div>
      </div>
</>
    </ComponentStateHandler>

  );
}

export default withRouter(Feed);
