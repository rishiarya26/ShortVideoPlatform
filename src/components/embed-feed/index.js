import { useState } from 'react';
import Embedvideo from '../embedvideo';
import Error from './error';
import Loading from './loader';
import useDrawer from '../../hooks/use-drawer';
import { getSingleFeed } from '../../sources/feed/embed';
import { withBasePath } from '../../config';
import ShoppingWidget from '../shopping-widget';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

export default function EmbedFeed() {
  const [items, setItems] = useState([]);
  const { show } = useDrawer();

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
      <div className="w-full fixed bottom-28 py-2 flex justify-around items-center">
      <button
      className="rounded-full text-white py-0.5 px-4 bg-hipipink font-medium tracking-wide xxs:text-sm xs:text-base"
      onClick={() => show('', ShoppingWidget)}
    >SHOW
    </button></div>
    <div className="absolute bottom-0 bg-white h-28 w-full flex justify-center items-center ">
        <button className="rounded-lg border border-gray-600 py-3 px-16 flex font-bold text-lg" >
          <img src= {withBasePath('images/zee5_logo_v01.png')} className="w-6 h-6 mr-2"/>
          Watch more on Hipi</button>
    </div>
    </ComponentStateHandler>
  );
}
