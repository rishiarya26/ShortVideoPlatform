import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import ComponentStateHandler from '../commons/component-state-handler';
import Seekbar from '../seekbar';
import SeekbarLoading from '../seekbar/loader.js';
// import FooterMenu from '../footer-menu';
import Tabs from '../commons/tabs';
import useTranslation from '../../hooks/use-translation';

// import { canShop } from '../../sources/can-shop';

SwiperCore.use([Mousewheel]);

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

export default function Feed({ fetchState, retry, data }) {
  const [items, setItems] = useState([]);
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const { t } = useTranslation();
  const validItemsLength = items?.length > 0;
  setRetry = retry && retry;

  // let vShop = false;

  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };

  useEffect(() => {
    data && setItems(data.data);
    data && setActiveVideoId(data.data[0].content_id);
    // data && verifyShop(data.data[0].content_id);
  }, [data]);

  // const verifyShop = async(id)=>{
  //  let response =  await canShop({});
  //  console.log(response)
  //  reponse && vShop = response
  // }

  const tabs = [{ display: 'For You', path: 'for-you' }, { display: 'Following', path: 'following' }];

  return (
    <ComponentStateHandler
      state={fetchState}
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
        // onSwiper={(swiper) => {
        //   const {slides, activeIndex} = swiper;
        // console.log(swiper.slides)
        // let activeId = slides[0].id
        // setActiveVideoId(activeId);
        // }}
        onSlideChange={swiperCore => {
          const {
            activeIndex, slides
          } = swiperCore;
          console.log('dsd');
          // verifyShop({activeId});
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
                activeVideoId={activeVideoId}
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
                thumbnail={item.thumbnail}
              />

            </SwiperSlide>
          )) : (
            <div className="h-screen bg-black flex justify-center items-center">
              <span className="mt-10 text-white">{t('NO_VIDEOS')}</span>
            </div>
          ))
        }

        <div className="w-full fixed bottom-2 py-2 flex justify-around items-center">
          <button
            className="rounded-lg text-white py-1 px-4 bg-hipipink  tracking-wide xxs:text-sm xs:text-base"
            // eslint-disable-next-line no-undef
            onClick={() => cbplugin && cbplugin.cbTouch({ videoId: activeVideoId })}
          >
            SHOP
            {' '}
            {/* {t('shop')} */}

          </button>
        </div>
      </Swiper>
      {validItemsLength ? seekedPercentage
        ? <Seekbar seekedPercentage={seekedPercentage} />
        : <SeekbarLoading />
        : ''}

    </ComponentStateHandler>

  );
}
