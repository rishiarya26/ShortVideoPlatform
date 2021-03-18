import { useState } from 'react';
import Embedvideo from '../embedvideo';
import Error from './error';
import Loading from './loader';
import FooterMenu from '../footer-menu';
import { getSingleFeed } from '../../sources/feed/embed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

export default function EmbedFeed() {
  const [items, setItems] = useState([]);
  const dataFetcher = () => getSingleFeed({
    page: 1
  });
  const onDataFetched = data => {
    setItems(data.data);
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      {
        items.map(
          item => (
            <Embedvideo
              key={item.content_id}
              url={item.video_url}
              id={item.content_id}
              comments={item.commentsCount}
              likes={item.likesCount}
              music={item.musicCoverTitle}
              musicTitle={item.music_title}
              profilePic={item.userProfilePicUrl}
              userName={item.userName}
              musicCoverTitle={item.musicCoverTitle}
            />
          )
        )
      }
      <FooterMenu />
    </ComponentStateHandler>
  );
}
