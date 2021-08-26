/*eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import { withRouter } from 'next/router';
import Video from '../video';
import Error from '../profile-feed/error';
import Loading from './loader';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Seekbar from '../seekbar';
import SeekbarLoading from '../seekbar/loader.js';
import { canShop } from '../../sources/can-shop';
import { getProfileVideos } from '../../sources/users/profile';
import { Back } from '../commons/svgicons/back';
import useWindowSize from '../../hooks/use-window-size';
import { getNetworkConnection } from '../../utils/device-details';
import SwiperSlideComp from '../swiper.js';


SwiperCore.use([Mousewheel]);

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loading />);

function SearchFeed({ router }) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [items, setItems] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [saveLook, setsaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });

  const { id } = router?.query;
  const { ref = '' } = router?.query;
  const {type = 'normal'} = router?.query;
//   const path = router?.asPath
//   console.log(path)
  const { videoId = items?.[0]?.content_id } = router?.query;

  const selectVideoUrl = (video) => {
    const networkConnection = getNetworkConnection();
    let videoUrls = {}
    videoUrls.fast = video?.videoUrl?.AkamaiURL?.[2];
    videoUrls.medium = video?.videoUrl?.AkamaiURL?.[1];
    videoUrls.low = video?.akamaiUrl;
    return videoUrls[networkConnection];
  }

  const transformResponse = (data) =>{  
    const feedData = data.filter((content) => (content.widgetName === `#${ref}`));
    const [content = []] = feedData;
    const {widgetList= []} = content;
    const finalTData = []
    widgetList.forEach((d)=>{
        const video = d?.video;
        selectVideoUrl(video);
        video.selected_video_url = videoUrl;
        finalTData.push(video);
    })
    console.log("f",finalTData)
    return finalTData;
  }

  const dataFetcher = () => JSON.parse(window.sessionStorage.getItem('searchList'));
  const onDataFetched = data => {
      const info = {
          normal : data,
          withHash : transformResponse(data)
      }
      data && setItems(info?.[type]);
      data && setActiveVideoId(videoId);
  };

  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;
  const validItemsLength = items?.length > 0;

  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };

  const handleBackClick = () => {
    router.back();
  };

  const getCanShop = async () => {
    const shopContent = { ...shop };
    shopContent.isShoppable = 'fail';
    try {
      const response = await canShop({ videoId: activeVideoId });
      response?.isShoppable ? shopContent.isShoppable = 'success' : shopContent.isShoppable = 'fail';
      shopContent.data = response?.data;
    } catch (e) {
      console.log('error in canShop');
    }
    setShop(shopContent);
  };

  useEffect(() => {
    setShop({ isShoppable: 'pending' });
    getCanShop();
    setsaveLook(true);
  }, [activeVideoId]);

  const handleSaveLook = () => {
    const data = [...items];
    data.forEach(item => {
      if (item.content_id === activeVideoId) item.saveLook = true;
    });
    setItems(data);
    setsaveLook(!saveLook);
  };

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
          <div onClick={handleBackClick} className="fixed z-10 w-full p-4">
            <Back />
          </div>
            <Swiper
            className="max-h-full"
            direction="vertical"
            onSwiper={swiper => {
            const slideToId = swiper?.slides?.findIndex(data => data?.id === id);
            console.log(videoId,slideToId)
            swiper?.slideTo(slideToId, 0);
              router.replace(`/search-feed/${id}`);
            }}
            draggable="true"
            spaceBetween={0}
            calculateheight="true"
            mousewheel
            scrollbar={{ draggable: true }}
            onSlideChange={swiperCore => {
            const {
                activeIndex, slides
            } = swiperCore;
            const activeId = slides[activeIndex]?.id;
            setActiveVideoId(activeId);
            }}
        >
    {   items?.map(
            item => (
                <SwiperSlide
                key={item?.id}
                id={item?.id}

              >
          <Video
             updateSeekbar={updateSeekbar}
             socialId={item.getSocialId}
             url={item?.selected_video_url}
             id={item?.id}
             comments={item.commentsCount}
             likes={item.likesCount}
             music={item.musicCoverTitle}
             musicTitle={item?.sound?.name}
             profilePic={item.userProfilePicUrl}
             userName={`@${item.videoOwners?.userName}`}
             musicCoverTitle={item.musicCoverTitle}
             videoid={item.content_id}
             hashTags={item.hashTags}
             videoOwnersId={item.videoOwnersId}
             thumbnail={item.thumbnailUrl}
             canShop={shop.isShoppable}
             shopCards={shop.data}
             handleSaveLook={handleSaveLook}
             saveLook={saveLook}
             saved={item.saveLook}
             activeVideoId={activeVideoId}
             comp="profile"
             profileFeed
          />
          </SwiperSlide>
          ))}
      
         </Swiper>

          {validItemsLength ? seekedPercentage
            ? <Seekbar seekedPercentage={seekedPercentage} type={'onBottom'}/>
            : <SeekbarLoading type={'onBottom'}/>
            : ''}
          <div id="cb_tg_d_wrapper">
            <div className="playkit-player" />
          </div>
        </div>
      </>
    </ComponentStateHandler>
  );
}

export default withRouter(SearchFeed);
