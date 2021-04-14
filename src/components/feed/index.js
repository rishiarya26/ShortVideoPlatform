import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import { getHomeFeed } from '../../sources/feed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Seekbar from '../seekbar';
import SeekbarLoading from '../seekbar/loader.js';
import FooterMenu from '../footer-menu';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);
// const vidid=document.getElementsByClassName('asad')[0]
// console.log(vidid);
export default function Feed() {
  const [items, setItems] = useState([]);
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const dataFetcher = () => getHomeFeed();
  const onDataFetched = data => {
    setItems(data.data);
    console.log(data);
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);

  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };

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
                />

              </SwiperSlide>
            )
          )
        }
      </Swiper>
      {seekedPercentage && seekedPercentage > 0
        ? <Seekbar seekedPercentage={seekedPercentage} />
        : <SeekbarLoading />}
      <FooterMenu />

    </ComponentStateHandler>
  );
}
