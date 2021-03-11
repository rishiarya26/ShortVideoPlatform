import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Video from '../video';
import Error from './error';
import Loading from './loader';
import { getHomeFeed } from '../../sources/feed';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loading />);

export default function Feed() {
  const [items, setItems] = useState({});
  const dataFetcher = () => getHomeFeed();
  const onDataFetched = data => {
    console.log(JSON.stringify(data));
    setItems(data, () => {
      console.log(items);
    });
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
        calculateHeight="true"
      >
        {
          [0, 1, 2, 3, 4].map(
            item => <SwiperSlide key={item}><Video /></SwiperSlide>
          )
        }
      </Swiper>
    </ComponentStateHandler>
  );
}
