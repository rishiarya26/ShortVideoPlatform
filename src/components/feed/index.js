import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import { getHomeFeed } from '../../sources/feed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import useDrawer from '../../hooks/use-drawer';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

export default function Feed() {
  const [items, setItems] = useState({});
  const { show } = useDrawer();
  const dataFetcher = () => getHomeFeed();
  const onDataFetched = data => {
    setItems(data);
    console.log(JSON.stringify(data));
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
          [0, 1, 2, 3, 4].map(
            item => <SwiperSlide key={item}><Video /></SwiperSlide>
          )
        }
      </Swiper>
      <div className="w-full bg-black fixed bottom-0 py-2 flex justify-center">
        <button
          className="rounded-full text-white py-1 px-4 bg-red-600 font-medium tracking-wide"
          onClick={() => show()}
        >
          SHOP
        </button>
      </div>
    </ComponentStateHandler>
  );
}
