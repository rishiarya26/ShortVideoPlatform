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
import { canShop } from '../../sources/can-shop';
import { getProfileVideos } from '../../sources/users/profile';
import { Back } from '../commons/svgicons/back';

SwiperCore.use([Mousewheel]);

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loading />);

function ProfileFeed({ router }) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [items, setItems] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [saveLook, setsaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });

  const { id } = router.query;

  const dataFetcher = () => getProfileVideos({ id });
  const onDataFetched = data => {
    data && setItems(data?.data);
    data && setActiveVideoId(data?.data?.[0]?.content_id);
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
      response?.canShop ? shopContent.isShoppable = 'success' : shopContent.isShoppable = 'fail';
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

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <>
        <div onClick={handleBackClick} className="fixed z-10 w-full p-4">
          <Back />
        </div>
        <Swiper
          direction="vertical"
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
          {
            items?.map(
              item => (
                <SwiperSlide
                  key={item.content_id}
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
                    videoid={item.content_id}
                    hashTags={item.hashTags}
                    videoOwnersId={item.videoOwnersId}
                    thumbnail={item.poster_image_url}
                    canShop={shop.isShoppable}
                    shopCards={shop.data}
                    handleSaveLook={handleSaveLook}
                    saveLook={saveLook}
                    saved={item.saveLook}
                    activeVideoId={activeVideoId}
                    profileFeed
                  />

                </SwiperSlide>
              )
            )
          }
        </Swiper>
        {validItemsLength ? seekedPercentage
          ? <Seekbar seekedPercentage={seekedPercentage} />
          : <SeekbarLoading />
          : ''}
        <div id="cb_tg_d_wrapper">
          <div className="playkit-player" />
        </div>
      </>
    </ComponentStateHandler>
  );
}

export default withRouter(ProfileFeed);
