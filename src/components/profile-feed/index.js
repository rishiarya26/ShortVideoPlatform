import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import ComponentStateHandler, { useFetcher }  from '../commons/component-state-handler';
import Seekbar from '../seekbar';
import SeekbarLoading from '../seekbar/loader.js';
import FooterMenu from '../footer-menu';
import { withRouter } from 'next/router'
import { getProfileVideos } from '../../sources/users/profile';

let retry;
const ErrorComp = () => (<Error  retry={retry}/>);
const LoadComp = () => (<Loading />);

function ProfileFeed({router}) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [items, setItems] = useState([])

  const id = router.query.id;
  const dataFetcher = () =>  getProfileVideos({ id });
  const onDataFetched = data => {
    setItems(data.data);
  };

  const [fetchState,setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;

  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
    <>
      <Swiper
        spaceBetween={50}
        direction="vertical"
        draggable="true"
        calculateheight="true"
      >
        {
          items && items.map(
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
                  hashTags={item.hashTags}
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
</>
</ComponentStateHandler>
  );
}

export default withRouter(ProfileFeed)