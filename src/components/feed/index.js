import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { data } from 'autoprefixer';
import Video from '../video';
import Footmenu from '../footmenu';
import Error from './error';
import Loading from './loader';
import { getHomeFeed } from '../../sources/feed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

export default function Feed() {
  const [items, setItems] = useState([]);
  const dataFetcher = () => getHomeFeed();
  const onDataFetched = data => {
    setItems(data.data);
    console.log(data);
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  console.log(items);

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <Swiper
        spaceBetween={50}
        direction="vertical"
        draggable="true"
        calculateheight="true"
      >
        {
          items.map(
            item => (
              <SwiperSlide id={item.data_id}>
                <Video
                  url={item.video_url}
                  id={item.content_id}
                  cmntcount={item.commentsCount}
                  likes={item.likesCount}
                  music={item.musicCoverTitle}
                  musictitle={item.music_title}
                  propic={item.userProfilePicUrl}
                  usrnme={item.userName}
                />
              </SwiperSlide>
            )
          )
        }
      </Swiper>

      <Footmenu />
    </ComponentStateHandler>
  );
}
