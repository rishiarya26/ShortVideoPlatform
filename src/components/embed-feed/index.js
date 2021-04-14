import { useState } from 'react';
import Embedvideo from '../embedvideo';
import Error from './error';
import Loading from './loader';
import useDrawer from '../../hooks/use-drawer';
import { getSingleFeed } from '../../sources/feed/embed';
import { withBasePath } from '../../config';
import ShoppingWidget from '../shopping-widget';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

let retryFn;
const ErrorComp = () => (<Error retryFn={retryFn}/>);
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

  const [fetchState,data,setRetry] = useFetcher(dataFetcher, onDataFetched);
  retryFn = setRetry.bind(retryFn);
  
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      
       {  items &&
         <Embedvideo
         key={items.content_id}
         url={items.video_url}
         id={items.content_id}
         comments={items.commentsCount}
         likes={items.likesCount}
         music={items.musicCoverTitle}
         musicTitle={items.music_title}
         profilePic={items.userProfilePicUrl}
         userName={items.userName}
         musicCoverTitle={items.musicCoverTitle}
       />
         }
          
      <div className="w-full fixed bottom-28 py-2 flex justify-around items-center">
        <button
          className="rounded-full text-white py-1 px-4 bg-hipipink font-medium tracking-wide xxs:text-sm xs:text-base"
          onClick={() => show('', ShoppingWidget)}
        >
          SHOP
        </button>
      </div>
      <div className="absolute bottom-0 bg-white h-28 w-full flex justify-center items-center ">
        <button className="rounded-lg border border-gray-600 py-3 px-16 flex font-bold text-lg">
          <img src={withBasePath('images/zee5_logo_v01.png')} alt="hipi_logo" className="w-6 h-6 mr-2" />
          Watch more on Hipi
        </button>
      </div>
    </ComponentStateHandler>
  );
}
