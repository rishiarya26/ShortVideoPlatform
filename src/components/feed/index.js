import { useState } from 'react';
import Video from '../video';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getHomeFeed } from '../../sources/home';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<div>Failed to fetch</div>);
const LoadComp = () => (<div>div that shimmers</div>);

export default function Feed() {
  const [items, setItems] = useState({});
  const dataFetcher = () => getHomeFeed();
  const onDataFetched = data => {
    console.log(data);
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
    direction='vertical'
    draggable='true'
    calculateHeight='true'
    >
      <SwiperSlide><Video /></SwiperSlide>
      <SwiperSlide><Video /></SwiperSlide>
      <SwiperSlide><Video /></SwiperSlide>
      <SwiperSlide><Video /></SwiperSlide>
      ...
    </Swiper>

    </ComponentStateHandler>
  );
}
