/*eslint-disable @next/next/no-img-element*/
import {useRef } from 'react';
import { withBasePath } from '../../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css'
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);

export default function Carousel({id, slideData, Children, description=false, ...restProps}){
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  console.log("debug length", slideData);
  if(description) {
    return(
      <div className="relative customCarousel" style={{ width: "212px"}}>
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                modules={[Navigation]}
                navigation={{
                  nextEl: nextButtonRef.current,
                  prevEl: prevButtonRef.current,
                  disabledClass: "hidden",
                }}
                className={`w-full relative swiper-mini-${id}`}
                draggable="true"
                direction={"vertical"}
                freeMode={true}
                onSlideChange={({activeIndex}) => {console.log("debug index", activeIndex)}}
                autoHeight="true"
              >
                {slideData.length > 0 &&
                  slideData.map((data, id) => (
                    <SwiperSlide
                      className='descriptionSlide'
                      key={id}
                    >
                      <Children data={data} {...restProps}/>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
    )
  }
  return(
    <div className="relative customCarousel" style={{ width: "135px"}}>
            <Swiper
              spaceBetween={10}
              slidesPerView={2}
              modules={[Navigation]}
              navigation={{
                nextEl: nextButtonRef.current,
                prevEl: prevButtonRef.current,
                disabledClass: "hidden",
              }}
              className={`w-full h-full relative swiper-mini-${id}`}
              draggable="true"
              direction={"horizontal"}
            >
              {slideData.length > 0 &&
                slideData.map((data, id) => (
                  <SwiperSlide key={id}>
                    <Children data={data} {...restProps}/>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div style={{position: 'absolute', height: '56px', top: '0px', width: "100%"}}>
              <div
                className="w-6 h-6 absolute -left-4 opacity-60 top-1/2 transform -translate-y-1/2 z-10"
                ref={prevButtonRef}
              >
                <img src={withBasePath("icons/backarrow.svg")} />
              </div>
              <div
                className="w-6 h-6 absolute -right-4 opacity-60 top-1/2 transform -translate-y-1/2 z-10"
                ref={nextButtonRef}
              >
                <img src={withBasePath("icons/frontarrow.svg")} />
              </div>
            </div>
    </div>
  )
}