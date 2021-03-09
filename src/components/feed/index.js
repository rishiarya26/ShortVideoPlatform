import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Video from '../video';
import Reload from '../appshell/reload'
import Loading from '../appshell/videoLoad'
import { getHomeFeed } from '../../sources/home';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const ErrorComp = () => (<Reload/>);
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
      ErrorComp={ErrorComp}>
        <Loading/>
      <Swiper
        spaceBetween={50}
        direction="vertical"
        draggable="true"
        calculateHeight="true">
        {
          [0, 1, 2, 3, 4].map(
            item => <SwiperSlide key={item}><Video /></SwiperSlide>
          )
        }
      </Swiper>
    </ComponentStateHandler>
  );
}
