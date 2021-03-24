import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { data } from 'autoprefixer';
import Video from '../video';
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
              <SwiperSlide
                key={item.content_id}
              >
                <Video
                  url={item.video_url}
                  id={item.content_id}
                  comments={item.commentsCount}
                  likes={item.likesCount}
                  music={item.musicCoverTitle}
                  musicTitle={item.music_title}
                  profilePic={item.userProfilePicUrl}
                  userName={item.userName}
                  musicCoverTitle={item.musicCoverTitle}
                  videoid={item.id}
                />
              </SwiperSlide>
            )
          )
        }
      </Swiper>
    </ComponentStateHandler>
  );
}
