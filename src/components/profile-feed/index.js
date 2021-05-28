import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { withRouter } from 'next/router';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Seekbar from '../seekbar';
import SeekbarLoading from '../seekbar/loader.js';
import { getProfileVideos } from '../../sources/users/profile';
import { Back } from '../commons/svgicons/back';

let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loading />);

function ProfileFeed({ router }) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [items, setItems] = useState([]);

  const { id } = router.query;

  const dataFetcher = () => getProfileVideos({ id });
  const onDataFetched = data => {
    setItems(data.data);
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  const updateSeekbar = percentage => {
    setSeekedPercentage(percentage);
  };

  const handleBackClick = () => {
    router.back();
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
          spaceBetween={50}
          direction="vertical"
          draggable="true"
          calculateheight="true"
        >
          {
            items?.map(
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
        {seekedPercentage
          ? <Seekbar seekedPercentage={seekedPercentage} />
          : <SeekbarLoading />}
      </>
    </ComponentStateHandler>
  );
}

export default withRouter(ProfileFeed);
