/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-no-duplicate-props */
/*eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import faq from '../../../public/stunner-FAQ.json';
import stunner from '../../../public/stunnerData.json';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { withBasePath } from '../../config';
import CloseFaq from '../commons/svgicons/close-faq';
import OpenFaq from '../commons/svgicons/open-faq';
import Header from '../desk-header';
import StaticFooter from '../static-footer';
import Form from './form';

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
// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);

function Stunner() {
 const [items, setItems] = useState(faq?.faq);
 const [stunnerData, setStunnerData] = useState(stunner.stunner);
 const [stunnerVideos, setStunnerVideos] = useState([])
 const [muted, setMuted] = useState(true);
 const router = useRouter()
 const challenge1Ref = useRef();
 const device = getItem('device-type')


 const links={
  facebook : 'https://www.facebook.com/HiPiOfficialApp',
  twitter : 'https://twitter.com/HiPiOfficialApp',
  instagram : 'https://www.instagram.com/hipiofficialapp/?hl=en'
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
( async function(){
  try{ 
    const response = await getHashTagVideos({ keyword: 'hipistunner' , offset: "1" });
    console.log("fetchedMore",response);
    if(response?.data?.length >= 7){
      setStunnerVideos(response?.data?.splice(2,7));
    }}catch(e){
      console.error("Error - hashtag video for stunner",e)
    }})()
  toTrackMixpanel('screenView',{pageName:'Hipi Stunner'})
},[])
  return (
    <>
       {/* <div className=" headerbar w-full h-18 flex items-center fixed top-0 lg:px-10 px-4 py-2 justify-between">
        <img className="w-16" src={withBasePath('images/stunner/stunner-logo.png')} alt="" /> 
        <div className='flex text-white font-medium'>
          <a className='px-4'>Challangers</a>
          <a className='px-4'>Winners</a>
          <a className='px-4'>Contact</a>
        </div>
      </div> */}
  <div className='hidden md:flex'><Header/></div>
<div className="flex items-center flex-col section_1 bg_1 md:min-h-screen relative md:pt-16">
<div className='w-full'>
		<img className='flex md:hidden' alt="Hipi Stunner 2022 Contest presented By Nikita Anand" src={withBasePath('images/stunner/Mob-Hipi-Stunner.jpeg')} />
		<img className='hidden md:flex'alt="Hipi Stunner 2022 Contest presented By Nikita Anand" src={withBasePath('images/stunner/Desk-Hipi-Stunner.jpeg')} />
		</div>
  <div className='py-8 md:py-20 w-full flex flex-col items-center bg_pastel_blue'>
    <h1 className='text-3xl font-bold purple_font mb-2'>Own the red carpet!</h1>
    <p className='px-8 md:w-1/2 md:pt-4 text-center text-gray-600 font-light'>
     Hipi Stunner is designed for you to celebrate your uniqueness both in body and style. It holds no boundaries, no types, no skin tones and no ethnicity. Showcase how you carry your fashion up your sleeve and walk the big stage in style. Be a tenner, a Hipi Stunner.
</p>
  </div>
</div>

<div className='py-8 md:pt-20 w-full flex flex-col items-center justify-center'>
<h1 className='text-3xl font-bold purple_font mb-2 px-4 text-center pb-2'> August Challenge 2 is now <span className='animate-pulse'>Live</span></h1>
    <p className='px-8 md:w-1/2 pb-6 md:pb-6 text-center text-gray-600 font-light'>
    Showcase your style & creativity with 5 <b>monsoon trends</b>. Check out these uber-cool entries for inspiration
</p>

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
   
       {stunnerVideos?.length > 0 ? stunnerVideos?.map((item,id)=>(
       <>
        <SwiperSlide>
          {({ isActive }) => {
          const ref = useRef();
          if(isActive){
            ref?.current?.children[0]?.children[0]?.play && ref?.current?.children[0]?.children[0]?.play();
          }else{
            // ref?.current?.children[0]?.children[0]?.pause()
            ref?.current?.children[0]?.children[0]?.pause && ref?.current?.children[0]?.children[0]?.pause();
            ref?.current?.children[0]?.children[0]?.currentTime && 
            (ref.current.children[0].children[0].currentTime = 0);
          }
           return <div  key={id} ref={ref} className='w-full flex mx-2 relative'>
            <div onClick={()=>{
             device === 'mobile' ? router && router.push(`/hashtag-feed/hipistunner?videoId=${item?.content_id}`) : 
             device === 'desktop' && router && router.push(`/hashtag/hipistunner`) }} className='w-full shadow-md sliderSwipe  rounded-lg overflow-hidden  border border-gray-200 '>
            <video
              src={item?.video_url} 
              controlsList="nodownload"
              playsInline
              muted={muted}
              // autoPlay
              preload="auto"
              webkit-playsinline = "true"
              // onTimeUpdate={handleUpdateSeekbar}
              loop
              navigation
              // onClick={handleVideoPress}
              poster={item?.firstFrame}
              objectfit="cover"
              key={item?.video_url}
              ></video>
            </div>
            {muted && <div onClick={()=>setMuted(false)} className="absolute right-0 top-0 p-3 cursor-pointer"><MutedColor/></div>}
           </div>
          }}
        </SwiperSlide>
     </>
       )) : 
       [0,1].map((data,id)=>(
         <SwiperSlide key={id} className="h-250c">
         <div className=' cursor-pointer w-full h-full flex mx-2 justify-center items-center'>
            <div className='loader-stunner w-full flex shadow-md h-full rounded-lg overflow-hidden  border border-gray-200 justify-center items-center'>
             </div>
         </div>
     </SwiperSlide>
      ))
       }
       {stunnerVideos?.length > 0 &&
       <SwiperSlide className="h-250c">
       <div onClick={()=> router && router?.push('/hashtag/hipistunner')} className='cursor-pointer w-full h-full flex mx-2 justify-center items-center'>
          <div className='w-full flex shadow-md h-full rounded-lg overflow-hidden  border border-gray-200 justify-center items-center'>
          <div className='font-md font-light text-gray-600 '> See All
           </div>
           </div>
       </div>
       </SwiperSlide>
       }
         {/* <SwiperSlide>
            <div className='w-full flex mx-2 '>
            <div className='w-full shadow-md  rounded-lg overflow-hidden  border border-gray-200 '>
                <video src="https://z5shorts.akamaized.net/2022/5/5/6d842bea-0abe-4a25-95db-3f67a31c1295/6d842bea-0abe-4a25-95db-3f67a31c1295_1536.mp4?hdnea=st=1661228720~exp=1661243120~acl=/*~hmac=ec9ab718da079f377a2e4738b5cdfe4f484903499406cdbbe24c9c6d9099cf1c" />
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='w-full flex mx-2 '>
            <div className='w-full shadow-md  rounded-lg overflow-hidden  border border-gray-200 '>
                <video src="https://z5shorts.akamaized.net/2022/5/5/6d842bea-0abe-4a25-95db-3f67a31c1295/6d842bea-0abe-4a25-95db-3f67a31c1295_1536.mp4?hdnea=st=1661228720~exp=1661243120~acl=/*~hmac=ec9ab718da079f377a2e4738b5cdfe4f484903499406cdbbe24c9c6d9099cf1c" />
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='w-full flex mx-2 '>
            <div className='w-full shadow-md  rounded-lg overflow-hidden  border border-gray-200 '>
                <video src="https://z5shorts.akamaized.net/2022/6/27/035783e8-c916-4528-99e7-cea723b61899/035783e8-c916-4528-99e7-cea723b61899_1536.mp4?hdnea=st=1661164610~exp=1661179010~acl=/*~hmac=bf0372a87f6e92942860317666339a0ef72551279d3e4910b88093357fd80213" />
                </div>
            </div>
        </SwiperSlide> */}
        </Swiper>
        {/* <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> */}
    </div>


    <p className='px-8 md:px-16 md:w-1/2 pb-2 text-center text-gray-600 font-light'> 
    Participate in two challenges to win cash prize of INR 1,00,000 and much more.
    Missed August Challenge 1? Not a problem. Check out the details <span onClick={()=>challenge1Ref.current.scrollIntoView({behavior: 'smooth'})  } className='font-bold text-blue-600 cursor-pointer'>HERE</span>
    </p>


    </div>

<div className='w-full flex flex-col md:flex-row py-4 md:pb-8 items-center justify-center bg_1 relative'>
            <div className='absolute left-0 top-0 h-full flex items-center'>
            <img alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_left.png')} />
            </div>
            <div className='hidden md:flex absolute right-0 top-0 h-full items-center'>
            <img alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_right.png')} />
            </div>
        <div className='w-full flex-col flex py-8 md:p-8 px-8  max_800'>        
            <div className='w-full justify-center flex'><h2 className='text-3xl font-bold purple_font'>Who is a Hipi Stunner?</h2></div>
            <p className='text-gray-600 font-light text-lg py-4'>You’ve always been a Hipi Stunner! How? See for yourself:</p>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You enjoy dressing up, have a knack for style and bond with clothes like no one you know does.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You are a content creator or not, a serious fashion follower or not, a trendsetter in your family or college, a home entrepreneur, a known fashionista at work or just someone who likes to keep it stylish and fashionable on a daily basis.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You may not have fashionable clothes, but you are always ready to consume anything even remotely related to fashion.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You aspire to be recognized for your talent and celebrated in a way that not only reinstates your belief in yourself but also wins the confidence of people around you.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You’re looking for validation of your skills from the industry’s best of the best and want to be mentored and guided by a top fashion maestro.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You love the spotlight and it’s about time you turn your love for fashion into something bigger.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You want to leverage a platform to be seen and for exposure into the world of fashion.</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-600 font-light'>You want the world to see you as someone who has made a mark, an achiever, as someone who has rightfully earned a place amongst the best and one whose evolution journey is nothing short of remarkable.</p></div>
            <p className='text-gray-600 font-light text-lg pt-4' >If your answer to any of the above or most of the above is a Yes, then you could be a Hipi Stunner and we are looking for you.</p>
        </div>
    </div>

    <div className='w-full flex justify-center items-center flex-col-reverse md:flex-row  py-4 md:pb-8 bg_pastel_blue '>
        {/* <div className='md:w-1/2 w-full  md:pl-32 md:p-8 px-8 '>
            <img alt="Get cash rewards with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Cash Rewards.png')} /> 
        </div> */}
      
        <div className='max_800 w-full flex-col flex py-8 md:p-8 px-8 justify-center'>
            <h3 className='text-3xl text-center font-bold purple_font pb-4'>How does Hipi Stunner unfold</h3>
            <p className='text-gray-500 font-light text-lg pt-4'>It’s a 6-month contest for everyone and anyone who loves fashion irrespective of gender, age, height, weight or marital status. It’s a platform for all entertainment-loving people to come together to:</p>
            <div className='flex pt-4'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-500 font-light'>Create and consume great fashion-based content</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-500 font-light'>Share and showcase their talent with individuality</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-500 font-light'>Grow into the business of fashion</p></div>
            <div className='flex'><span className='pr-1'>•</span><p className='mb-2 pl-4 text-gray-500 font-light'>Feel validated and by being seen, heard, loved and followed.</p></div>
         <p className='text-gray-500 font-light text-lg pt-4'>Each month the participants enter two fashion-based challenges presented by Nikita Anand that leads to content that is unique, fresh and entertaining.</p>
         <p className='text-gray-500 font-light text-lg pt-4'>The best performing videos would get visibility in the Discover section of Hipi App.</p>
         <p className='text-gray-500 font-light text-lg pt-4'>At the end of each month, the very best content creator amongst the best performing videos is chosen by Nikita Anand for the title of the Hipi Stunner in a memorable and a very special coronation ceremony.</p>
         <p className='text-gray-500 font-light text-lg pt-4'>Hipi Stunner gets a cash prize of Rs 1,00,000, and a blue ticked verified account on Hipi App.</p>
         <p className='text-gray-500 font-light text-lg pt-4'>At the end of six months, the six Hipi Stunners get a taste of life in the limelight that many only dream of as they walk the red carpet of the Zee Cine Awards, telecasted worldwide on TV.</p>
         {/* <p className='text-gray-500 text-right w-full font-light text-xs pt-8 '>* Winners Terms and conditions apply</p> */}
         
        </div>
    </div>


    <div className='w-full flex flex-col md:flex-row py-4 md:pb-8 items-center justify-center bg_1 relative'>
        <div className='absolute hidden md:flex  left-0 top-0 h-full flex items-center w-1/5'>
            <img alt="" className="object-contain"  src={withBasePath('images/stunner/hipistunner_bg_left.png')} />
            </div>
            <div className='absolute hidden md:flex  right-0 top-0 h-full flex items-center w-1/5'>
            <img alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_right.png')} />
            </div>
        <div className='w-full flex flex-col py-8 md:p-8 px-8  max_800'>  
          
        <h3 className='text-3xl text-center font-bold purple_font pb-4'>Challenges</h3>
        
          <div className='flex  w-full flex-col md:flex-row justify-center'>
           {stunnerData.map((item,id)=>(
           <div key={id} ref={id == 0 ? challenge1Ref : null} className='w-full md:w-1/2 flex flex-col bg-white rounded-xl overflow-hidden my-4 md:mx-8 box_shadow_1 h-fit ease-in duration-300'>
              <div className='overflow-hidden cursor-pointer' onClick={()=>item?.promoUrl&&window?.open(item?.promoUrl)}>
              <img className=''alt="Hipi Stunner Challenges " src={withBasePath(`images/stunner/${item?.imageURL}`)} />
              </div>
              <div className='w-full flex flex-col justify-center items-center py-4'>
              <h4 className="font-medium text-gray-600  bg-white border border-gray-300 -mt-12 px-4 w-40 text-gray-600 text-center">{item?.tag}</h4>
              <h4 className="font-medium text-gray-600 p-4 pb-0 bg-white purple_font">{item?.name}</h4>
              <p className='text-gray-700 font-light text-sm'>{item?.date}</p>
              {item.show&& <p className='text-sm px-4 text-gray-500 font-light text-lg py-4' id={id}>{item?.content}</p>}
              {item?.promoUrl&& <div className="rounded-full text-sm font-semibold  px-8 p-2 purple_bg text-white my-2 cursor-pointer" onClick={()=>window.open(item.promoUrl)}>Watch challenge video</div>}
              <div id={id} className="cursor-pointer flex items-center w-full px-4" onClick={()=>handleClickStunner(id)}>
              <span className=" text-sm pr-2 font-light flex w-full justify-center text-gray-600 py-2" >{item.show ? "- Read less": "+ Read more"}</span>
              </div>
              {/* <button class="rounded text-sm font-semibold  px-8 p-2 bg-hipired text-white">Learn more</button>  */}
                    
              </div>
          </div>))}
          </div>

        </div>
    </div>

    <div className='w-full flex justify-center items-center flex-col-reverse md:flex-row  py-4 md:py-20 bg_pastel_blue relative'>
        {/* <div className='md:w-1/2 w-full  md:pl-32 md:p-8 px-8 '>
            <img alt="Get cash rewards with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Cash Rewards.png')} /> 
        </div> */}
        <div className='max_800 w-full  flex-col flex py-8 md:p-8 px-8 justify-center'>
            <h3 className='text-3xl text-center font-bold purple_font pb-4'>How To Participate</h3>
            <p className='text-gray-500 font-light text-lg pt-4'>Step 1: Download Hipi</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Step 2: Login to Hipi/ Create an Account</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Step 3: Create your fashion videos based on the challenges of the month</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Step 4: Upload your videos on Hipi using the hashtag #HipiStunner</p>
        </div>
    </div>



    <div className='w-full flex flex-col md:flex-row  md:py-16 bg_1 py-6 '>
        <div className='md:w-1/2 w-full flex-col flex py-6 md:pl-32 md:p-8 px-8 justify-center '>
            <p>The Host</p>
            <h4 className='text-3xl font-bold purple_font'>Nikita Anand</h4>
            <p>Miss India Universe 2003</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Nikita won the title of Miss India Universe in 2003. Since then, she has been seen on numerous magazine covers, fashion weeks, designer shoots, ad campaigns, and Bollywood films. She rubs shoulders with the top industry experts in the fashion and lifestyle circuit and has been a muse for top fashion designers like Ritu Kumar, JJ Vallaya, and Mona Pali.</p>
        </div>
        <div className='w-full md:w-1/2 flex justify-center md:justify-end items-center py-4 md:py-20 bg-host br_40'>
            <img alt="Nikita Anand - Miss Universe at Hipi Stunner 2022"  className='object-contain br_40 w-10/12 box_shadow_1' src={withBasePath('images/stunner/hipistunner_thehost.jpg')} /> 
        </div>
    </div>

<div className="flex w-full justify-center bg_pastel_blue">
  <div className='flex flex-col p-8 md:px-4 max_800'>
  <div className='w-full flex justify-center text-3xl font-semibold pb-6 purple_font text-center'>Frequently Asked Questions</div>
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
</div>
    

<div className='w-full flex py-8 px-4 md:px-2 md:py-16 justify-center relative bg_1'>
<div className='absolute hidden md:flex  left-0 top-0 h-full flex items-center'>
        <img alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_left.png')} />
        </div>
        <div className='absolute hidden md:flex  right-0 top-0 h-full flex items-center'>
        <img alt="" className="object-contain" src={withBasePath('images/stunner/hipistunner_bg_right.png')} />
        </div>
        <Form/>
    </div>
</>

   
  );
}

export default Stunner;

