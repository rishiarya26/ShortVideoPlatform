import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
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
import { getHomeFeed } from '../../sources/feed';
import { canShop } from '../../sources/can-shop';

SwiperCore.use([Mousewheel]);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

export default function Feed({ id }) {
  const [items, setItems] = useState([]);
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [saveLook, setSaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: 'pending' });
  const { t } = useTranslation();

  const onDataFetched = data => {
    data && setItems(data?.data);
    data && setActiveVideoId(data?.data?.[0]?.content_id);
  };
  const dataFetcher = () => getHomeFeed({ type: id });
  let [fetchState, retry, data] = useFetcher(dataFetcher, onDataFetched, id);

  if (id === 'for-you') {
    const status = fetchState === 'success';
    const dataLength = data?.data?.length;
    fetchState = (status && !dataLength > 0) ? 'fail' : fetchState;
    data = (status && dataLength > 0) && data;
    retry = (status && !dataLength > 0) && retry;
  }

  const validItemsLength = items?.length > 0;
  setRetry = retry && retry;

  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };

  const getCanShop = async () => {
    let isShoppable = false;
    const shopContent = { ...shop };
    try {
      const response = await canShop({ videoId: activeVideoId });
      isShoppable = response?.canShop;
      shopContent.data = response?.data;
    } catch (e) {
      isShoppable = false;
    }
    isShoppable ? shopContent.isShoppable = 'success' : shopContent.isShoppable = 'fail';
    setShop(shopContent);
  };

  useEffect(() => {
    setShop({ isShoppable: 'pending' });
    getCanShop();
    setSaveLook(true);
  }, [activeVideoId]);

  const toggleSaveLook = () => {
    const data = [...items];
    const resp = data.findIndex(item => (item.content_id === activeVideoId));
    data[resp].saveLook = true;
    setItems(data);
    setSaveLook(!saveLook);
  };

  const tabs = [{ display: `${t('FORYOU')}`, path: `${t('FOR-YOU')}` },
    { display: `${t('FOLLOWING')}`, path: `${t('SFOLLOWING')}` }];

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div className="fixed mt-10 z-10 w-full">
        <FeedTabs items={tabs} />
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
          (validItemsLength ? items.map((
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
                // thumbnail={item.thumbnail}
                thumbnail={item.poster_image_url}
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
        <div className="w-full fixed bottom-2 py-2 flex justify-around items-center">
          <Shop
            videoId={activeVideoId}
            canShop={shop.isShoppable}
          />
        </div>
      </Swiper>

      {validItemsLength ? seekedPercentage
        ? <Seekbar seekedPercentage={seekedPercentage} />
        : <SeekbarLoading />
        : ''}
      <div id="cb_tg_d_wrapper">
        <div className="playkit-player" />
      </div>
    </ComponentStateHandler>

  );
}
