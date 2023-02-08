/* eslint-disable react/no-unknown-property */
/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/no-unescaped-entities*/
/*eslint-disable react/jsx-no-duplicate-props */
/*eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import faq from '../../../public/lipsync-FAQ.json';
import stunner from '../../../public/stunnerData.json';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { withBasePath } from '../../config';
import CloseFaq from '../commons/svgicons/close-faq';
import OpenFaq from '../commons/svgicons/open-faq';
import Header from '../desk-header';
import Form from './form';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import {getCanonicalUrl} from '../../utils/web';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import SwiperCore, {
Autoplay,Pagination,Navigation
} from 'swiper';
import { getHashTagVideos } from '../../sources/explore/hashtags-videos';
import Mute, { MutedColor } from '../commons/svgicons/mute';
import { getItem } from '../../utils/cookie';
import { toTrackFirebase } from '../../analytics/firebase/events';
import { ToTrackFbEvents } from '../../analytics/fb-pixel/events';
import { toTrackClevertap } from '../../analytics/clevertap/events';
import StaticFooter from '../static-footer';
// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);

function ZeeAwards({type= 'stunner'}) {
 const [items, setItems] = useState(faq?.faq);
 const [stunnerData, setStunnerData] = useState(stunner.stunner);
 const [stunnerVideos, setStunnerVideos] = useState([])
 const [muted, setMuted] = useState(true);
 const router = useRouter()
 const [url, setUrl] = useState('');
 const challenge1Ref = useRef();
 const challenge2Ref = useRef();
 const device = getItem('device-type')
 const deviceType = getItem('device-info')

 const links={
  onelink : 'https://hipiapp.onelink.me/hGT6/ZCA1'
}

const stores = {
  android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
  ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
};

const onStoreRedirect =(device)=>{
  device && (window.location.href = `${stores[device]}`);
}

 const handleClick = (id) =>{
   let updateItem = [...items];
   updateItem[id].show = !(updateItem[id]?.show);
   setItems(updateItem);
 }
 const handleClickStunner = (id) =>{
  let updateItem = [...stunnerData];
  updateItem[id].show = !(updateItem[id]?.show);
  setStunnerData(updateItem);
}

useEffect(()=>{
  setUrl(document?.location?.href);
( async function(){
  try{ 
    const response = await getHashTagVideos({ keyword: 'hipistunner' , offset: "1" });
    
    if(response?.data?.length >= 7){
      let videos = []
      videos?.push(response?.data?.[0]);
      console.log("fetchedMore",response, videos);
      videos?.push(...response?.data?.splice(2,7));
      console.log("fetchedMore",response, videos);
      setStunnerVideos(videos);
    }}catch(e){
      console.error("Error - hashtag video for stunner",e)
    }})()

},[])
  return (
    <>
      
<SeoMeta
data={{
title: 'Download Hipi App for the Zee Cine Awards, 2023 Voting | Hipi',
// image: item?.thumbnail,
description: " Hipi, your favourite video-streaming app, has been chosen as the official voting platform for the Zee Cine Awards, 2023. Download Hipi App Now!",
canonical: url && getCanonicalUrl(url),
openGraph: {
title: 'Download Hipi App for the Zee Cine Awards, 2023 Voting | Hipi',
description: 'hipi.co.in',
url:url && getCanonicalUrl(url) ,
images: [
{
url: 'https://www.hipi.co.in/icons/icon-512x512.png',
width: 512,
height: 512,
alt: "hipi logo",
}
],
type: 'image/png',
site_name: 'Hipi'
}
}}
/>
  <div className='hidden md:flex'><Header/></div>
<div className="flex items-center flex-col section_1 bg_1 md:min-h-screen relative md:pt-16">
<div className='w-full min-h-49 md:min-h-25 cursor-pointer' onClick={()=> window?.open(links.onelink)} >
		<img className='flex md:hidden' alt="Zee Cine Awards 2023 Voting on Hipi Plantform" src={withBasePath('images/zca/mob_banner.jpg')} />
		<img className='hidden md:flex'alt="Zee Cine Awards 2023 Voting on Hipi Plantform" src={withBasePath('images/zca/desk_banner.jpg')} />
		</div>
    {/* <div className='p-2 w-full flex justify-between bg-hipired items-center text-white md:hidden px-4 text-sm'>
        <p>Check Daily Leaderboard</p>
        <div className='border border-white p-1 rounded-md ml-2 text-sm px-2' onClick={()=>router && router.push('/lipsync-leaderboard')}>View</div>
    </div> */}
  <div className='py-8 md:py-20 w-full flex flex-col items-center stunner_purpl'>
    <h1 className='text-3xl font-bold px-6 mb-2 text-center purple_font md:w-3/4'>Cast your votes on the Hipi app for the ‘Viewer's Choice at Zee Cine Awards 2023’</h1>
    <p className='px-8 md:w-7/12 md:px-12 md:pt-4 text-center text-gray-600 font-light'>
    The nominations for the coveted Zee Cine Awards 2023 are here! You can now choose from the exciting line-up for Best Film, Best Actor-Male, Best Actor-Female, and Best Song. The nominations for this year’s awards reflect a diverse mix of films that went up the screens last year. They span multiple genres capturing the audience’s imaginations from historical to biographical, action to fantasy, comedy to family drama, and much more.
</p>
<p className='px-8 md:w-7/12 md:px-12 md:pt-4 text-center text-gray-600 font-light'>
You can vote for Viewer’s choice awards from the Hipi App which has always brought an array of exclusive content of your favorite movies, celebs, behind-the-scenes and fun challenges. This year it gives you the power to decide the winner of the Zee Cine Awards 2023 in various categories. Don't wait any longer. Sign up or log on to the Hipi app and lock in your favourites from each category. 
</p>

  </div>
</div>




<div className='py-8 md:pt-20 w-full flex flex-col items-center justify-center bg_pastel_blue '>
            <h3 className='text-3xl text-center font-bold purple_font pb-2 px-6'>Check out the nominations</h3>
            <p className='px-8 md:w-1/2 text-center text-gray-600 font-light pb-6'>Make your favourites win! Vote on Hipi app </p>
            {/* <p className='px-8 md:w-1/2 pb-6 md:pb-6 text-center text-gray-600 font-light'>Check out the monthly challenges  </p>  */}
            {/* <span onClick={()=>challenge1Ref.current.scrollIntoView({behavior: 'smooth'})  } className='font-bold text-blue-600 cursor-pointer'>HERE</span> */}
            <div className="stunner_swiper relative testimonials_swiper carousel">
        <Swiper
        modules={[Navigation, Pagination]}
        draggable="true"
        spaceBetween={10}
        slidesPerView={2}
        centeredSlides={true} 
        className='h-full'
        navigation
        // autoplay={{
        // // "delay": 2500,
        // // "disableOnInteraction": false
        // }} 
        // navigation={{enabled : (device === 'desktop') ?  true : false}}
        pagination={{"clickable": true}} 
        >
      <SwiperSlide>
            <div className='w-full h-full flex mx-2 cursor-pointer' onClick={()=> window?.open(links.onelink)} >
            <div className='w-full shadow-md  rounded-lg overflow-hidden  border border-gray-200 '>
                
                <video src={withBasePath('videos/zca/ZCA-Best-Actor-Female.mp4')} controlsList="nodownload" playsInline  loop autoPlay muted webkit-playsinline="true" objectfit="cover"/>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='w-full h-full flex mx-2 cursor-pointer' onClick={()=> window?.open(links.onelink)} >
            <div className='w-full h-full shadow-md  rounded-lg overflow-hidden  border border-gray-200 '>
            <video src={withBasePath('videos/zca/ZCA-Best-Actor-Male.mp4')} controlsList="nodownload" playsInline  loop autoPlay muted webkit-playsinline="true" objectfit="cover" /> 
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='w-full h-full flex mx-2 cursor-pointer' onClick={()=> window?.open(links.onelink)} >
            <div className='w-full h-full shadow-md  rounded-lg overflow-hidden  border border-gray-200 '>
            <video src={withBasePath('videos/zca/ZCA-Best-Film.mp4')} controlsList="nodownload" playsInline  loop autoPlay muted webkit-playsinline="true" objectfit="cover" /> 
                </div>
            </div>
        </SwiperSlide><SwiperSlide>
            <div className='w-full h-full flex mx-2 cursor-pointer' onClick={()=> window?.open(links.onelink)} >
            <div className='w-full h-full shadow-md  rounded-lg overflow-hidden  border border-gray-200 '>
            <video src={withBasePath('videos/zca/ZCA-Song-of-the Year.mp4')} controlsList="nodownload" playsInline  loop autoPlay muted webkit-playsinline="true" objectfit="cover" /> 
            </div>
            </div>
        </SwiperSlide>
        </Swiper>
    </div>
    </div>



{/* 
<div className="flex w-full justify-center bg_1">
  <div className='flex flex-col p-8 md:px-4 max_800'>
  <div className='w-full flex justify-center text-3xl font-semibold pb-6 lipsync_font text-center'>Frequently Asked Questions</div>
{items?.map((data, id)=>(
  <div key={id} className="mt-6">
  <div id={id} className="cursor-pointer transition duration-500 ease-in-out flex items-center font-medium" onClick={()=>handleClick(id)}>
    <span className="pr-2 flex" >{data.show ? <CloseFaq/> : <OpenFaq/>}</span>
     {data.ques}
     </div>
  {data.show && <div id={id} className="pt-2 pl-6 text-gray-700 transition duration-500 ease-in-out"> {data.ans}</div>}
  </div>
))}
</div>
</div> */}
    

{/* <div className='w-full flex py-8 px-4 md:px-2 md:py-16 justify-center relative'>
 <div className='absolute hidden md:flex  left-0 top-0 h-full flex items-center'>
        <img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_left.png')} />
        </div>
        <div className='absolute hidden md:flex  right-0 top-0 h-full flex items-center'>
        <img loading="lazy"  alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_right.png')} />
        </div> 
        <Form/>
    </div> */}

<div className="flex md:hidden w-full p-4 bg-white sticky bottom-0 z-20 shadow-inner items-center justify-between">
        <div className="flex flex-row items-center">
            <img className="w-12 h-12 mr-2" src={withBasePath('icons/Hipi-Logo-RGB.png')} alt="hipi logo" /> 
            <div className="flex flex-col justify-center ">
              <p className="text-sm font-semibold">Download Hipi App to Vote</p>
              {/* <p className="text-xs ">Participate in #HipiStunner</p>
              <p className="text-xs ">Win Rs 1 Lac</p> */}
            </div>
        </div>
        <div>
            {/* <a className="border-2 border-gray-400 text-gray-600 px-3 py-1 mx-4 rounded-md text-sm" target="_blank" href="https://hipi.onelink.me/tMco/HSTest" rel="noreferrer" >Install</a> */}

            <div className="border-2 border-gray-400 text-gray-600 px-3 py-1 mx-4 rounded-md text-sm cursor-pointer" onClick={()=> window?.open(links.onelink)} >Install</div>
        </div>
      </div>
      <StaticFooter/>
</>

   
  );
}

export default ZeeAwards;

