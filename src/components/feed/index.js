import Video from '../video';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function Feed() {
  return (
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

    // <div className="grid h-full">
    //   <div className="relative overflow-scroll w-full max-w-screen-sm Video_sheet">
    //     <Video />
    //     <Video />
    //     <Video />
    //   </div>
    // </div>
  );
}
