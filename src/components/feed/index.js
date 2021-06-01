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
import Tabs from '../commons/tabs';
import useTranslation from '../../hooks/use-translation';
import { canShop } from '../../sources/can-shop';
import { Shop } from '../commons/button/shop';
import { getNetworkConnection } from '../../utils/device-details';

SwiperCore.use([Mousewheel]);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

export default function Feed({ fetchState: status, retry: putRetry, data: resp }) {
  const [items, setItems] = useState([]);
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const { t } = useTranslation();
  const validItemsLength = items?.length > 0;
  setRetry = putRetry && putRetry;

  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };

  useEffect(() => {
    console.log(getNetworkConnection())
    resp && setItems(resp.data);
    resp && setActiveVideoId(resp.data[0].content_id);
  }, [resp]);

  const dataFetcher = () => canShop({ videoId: activeVideoId });

  // eslint-disable-next-line no-unused-vars
  const [fetchState, retry, data] = useFetcher(dataFetcher, null, activeVideoId);

  const tabs = [{ display: 'For You', path: 'for-you' }, { display: 'Following', path: 'following' }];

  return (
    <ComponentStateHandler
      state={status}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div className="fixed mt-10 z-10 w-full"><Tabs items={tabs} /></div>
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
                videoid={item.content_id}
                hashTags={item.hashtags}
                videoOwnersId={item.videoOwnersId}
                // thumbnail={item.thumbnail}
                thumbnail={item.poster_image_url}
                videoShopData={{ activeId: activeVideoId, canShop: data && data.canShop }}
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
             data={data} 
             setRetry={retry}
             status={fetchState}
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
