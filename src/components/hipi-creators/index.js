/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import StaticFooter from '../static-footer';
import { useRouter } from "next/router";
import Header from '../desk-header';
import { getCanonicalUrl } from '../../utils/web';
import { useEffect, useState } from 'react';
import Quote from '../commons/svgicons/quote';
import { getItem } from '../../utils/cookie';
import Form from './form';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import SwiperCore, {
Autoplay,Pagination,Navigation
} from 'swiper';
// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);
function HipiCreators() {
const [url, setUrl] = useState('');
useEffect(()=>{
setUrl(document?.location?.href); 
},[]);
//Desktop links
const stores = {
android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
};
const onStoreRedirect =(device)=>{
device && (window.location.href = `${stores[device]}`);
}
const router = useRouter();
const device = getItem('device-type');
const iFrameReward = {
'desktop' : <iframe width="560" height="315" src="https://www.youtube.com/embed/MG-AP1Kt8qg?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> ,
'mobile': <iframe width="280" height="158" src="https://www.youtube.com/embed/MG-AP1Kt8qg?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> 
}
return (
<>
<SeoMeta
data={{
title: 'Join Hipi - Short Video App | Get Cash Rewards & Gifts with Hipi',
// image: item?.thumbnail,
description: "Hipi is india's fastest growing short video app. Join Hipi & kick start your career as an influencer to get cash rewards & gifts.",
canonical: url && getCanonicalUrl(url),
}}
/>
<div className="h-screen  w-screen flex flex-col justify-between">
    <div className='hidden md:flex '>
        <Header/>
    </div>
    <div className="md:hidden headerbar w-full h-18 bg-red-600 flex items-center justify-start lg:px-10 px-4 py-2" ><img className="w-16" src={withBasePath('images/logo_hipi.png')}/></div>
    <div className='w-full flex-col md:flex-row flex md:pt-24 md:pb-4 py-4'>
        <div className='md:w-1/2 w-full md:pl-52 pr-8 md:p-8 px-8'>
            <img alt="earn with Hipi - short video app"  className='object-contain' src={withBasePath('images/reward/Shine_with_Hipi_1.png')} /> 
        </div>
        <div className='md:w-1/2 w-full flex-col flex md:p-8 px-8 pt-8 md:pr-32 justify-center'>
            <h1 className='text-3xl font-bold text-gray-800'>Shine and Earn with Hipi</h1>
            <p className='text-gray-500 font-light text-lg pt-4'>Hipi is India’s fastest growing short video app. It’s a new favourite for talented creators and provides a perfect opportunity for creators to fulfil their dreams. </p>
            <p className='text-gray-500 font-light text-lg pt-4'>Join Hipi and kick start your career as an influencer. With Hipi you can earn with every step you take as a budding star. Learn more about the opportunities that Hipi can provide you.</p>
        </div>
    </div>

    <div className='w-full flex py-4 px-4 md:px-2 md:pb-8 justify-center '>
        <Form/>
    </div>

    <div className='w-full flex flex-col md:flex-row py-4 md:pb-8'>
        <div className='md:w-1/2 w-full flex-col flex py-8 md:pl-32 md:p-8 px-8 justify-center'>
            <h2 className='text-3xl font-bold text-gray-800'>Get Stardom and Live Your Dream</h2>
            <p className='text-gray-500 font-light text-lg pt-4'>Showcase your talent on Hipi and rise to stardom just like Chirag Tomar, who is living his dream. This film features Hipi G.O.A.T winner Chirag Tomar and his mother, and is based on true events. Check out his super inspiring journey in the film #HipiKaroMoreKaro,</p>
        </div>
        <div className='md:w-1/2 w-full flex justify-center px-8 md:pr-32  '>
            {device && iFrameReward[device]}
        </div>
    </div>
    <div className='w-full flex flex-col-reverse md:flex-row  py-4 md:pb-0'>
        <div className='md:w-1/2 w-full  md:pl-32 md:p-8 px-8 '>
            <img alt="Get cash rewards with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Cash Rewards.png')} /> 
        </div>
        <div className='md:w-1/2 w-full  flex-col flex py-8 md:p-8 px-8 md:pr-32 justify-center'>
            <h3 className='text-3xl font-bold text-gray-800'>Get Cash Rewards</h3>
            <p className='text-gray-500 font-light text-lg pt-4'>Achieve easy milestones and earn money.</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Enrolling into Hipi’s Creator Incentive Program is easy, Simple and comes with no minimum eligibility criteria.</p>
            <p className='text-gray-500 font-light text-lg pt-4'>Contact us to talk to our Creator support specialist to know more about the incentive structure.</p>
        </div>
    </div>
    <div className='w-full flex flex-col md:flex-row  py-4 md:pb-8 md:pt-0'>
        <div className='md:w-1/2 w-full flex-col flex py-8 md:pl-32 md:p-8 px-8 justify-center'>
            <h4 className='text-3xl font-bold text-gray-800'>Get Assured Gifts</h4>
            <p className='text-gray-500 font-light text-lg pt-4'>As you grow on Hipi, with every milestone you achieve, we send you a goodie bag as a token of appreciation. We value your efforts.</p>
        </div>
        <div className='md:w-1/2 w-full flex justify-center px-8 md:pr-32 '>
            <img alt="Get assured gifts with Hipi"  className='object-contain' src={withBasePath('images/reward/Get Assured Gifts.png')} /> 
        </div>
    </div>

    <div className='w-full flex'>
        <div className='w-full flex-col flex md:py-8 md:px-8 p-4 justify-center items-center'>
            <p className='text-3xl font-bold text-gray-800'>Testimonials </p>
        </div>
    </div>
    <div className="testimonials_swiper pb-6 md:pb-8">
        <Swiper
        draggable="true"
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true} 
        autoplay={{
        "delay": 2500,
        "disableOnInteraction": false
        }} 
        pagination={{"clickable": true}} 
        >
        <SwiperSlide>
        <div className='w-screen flex justify-center'>
                <div className='w-3/4 md:w-3/4 bg-white shadow-md border border-gray-200 md:p-8 p-8 md:pb-6 flex flex-col justify-center md:flex-row relative items-center min-h-85v  md:min-h-72'>
                    <div className='flex mb-4 md:mb-0 justify-center min-w-44 w-44 h-44 rounded-full overflow-hidden'>
                        <img src={withBasePath('images/reward/Chirag_Tomar.jpg')} />
                    </div>
                    <div className='w-full pl-6'>
                    <div className='absolute rotate-180  top-0 left-0'>
                        <Quote/>
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <Quote/>
                    </div>
                    <p className='text-gray-500 font-light text-lg text-center pb-2'> Hear what <span className='text-gray-800 font-medium'>Chirag Tomar</span> Hipi G.O.A.T Winner has to say</p>
                    <p className='text-gray-500 font-light text-lg '> Hipi has changed my life and gave me a chance to perform at Zee Sa Re Ga Ma Pa 2022 Finale along with Grammy Nominee Shilpa Rao, in front of A-List of the Music Industry. It all started with me participating in Hipi G.O.A.T contest. Hipi has given me the greatest opportunity to showcase my talent in social media and on Hipi App. Once again thank you so much Hipi for giving me all these opportunities.</p>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='w-screen flex justify-center'>
            <div className='w-3/4 md:w-3/4 bg-white shadow-md border border-gray-200 md:p-8 p-8 md:pb-6 flex flex-col justify-center md:flex-row relative items-center min-h-85v  md:min-h-72'>
                    <div className='flex mb-4 md:mb-0 justify-center min-w-44 w-44 h-44 rounded-full overflow-hidden'>
                        <img src={withBasePath('images/reward/Sid_Patil.png')} />
                    </div>
                    <div className='w-full pl-6'>
                    <div className='absolute rotate-180  top-0 left-0'>
                        <Quote/>
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <Quote/>
                    </div>
                    <p className='text-gray-500 font-light text-lg text-center pb-2'> Hear what <span className='text-gray-800 font-medium'>Sid Patill</span> Hipi Creator has to say</p>
                    <p className='text-gray-500 font-light text-lg '>I was your typical next-door guy uploading videos for fun... until Hipi happened to me! The Hipi team guided me in both, technical and ideation aspects of creating videos to make my content highly engaging and of top-notch quality. Being a content creator on Hipi helped me level up my content game so much that I landed a chance to be a part of the Zee Rishtey awards. It was a surreal experience, shaking hands with my favorite stars and walking the red carpet of such prestigious TV awards! I heartily thank Hipi for all the love and learning I’ve received; it changed my life for the better! </p>
                </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='w-screen flex justify-center'>
            <div className='w-3/4 md:w-3/4 bg-white shadow-md border border-gray-200 md:p-8 p-8 md:pb-6 flex flex-col md:flex-row justify-center relative items-center min-h-85v  md:min-h-72'>
                    <div className='flex mb-4 md:mb-0 justify-center min-w-44 w-44 h-44 rounded-full overflow-hidden'>
                        <img src={withBasePath('images/reward/Sara_Gurpal.jpg')} />
                    </div>
                    <div className='w-full pl-6'>
                    <div className='absolute rotate-180  top-0 left-0'>
                        <Quote/>
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <Quote/>
                    </div>
                    <p className='text-gray-500 font-light text-lg text-center pb-2'> Hear what <span className='text-gray-800 font-medium'>Sara Gurpal</span> Hipi Creator has to say</p>
                    <p className='text-gray-500 font-light text-lg '>Hipi for me is like a second home, where I can just be myself and do my thing. The platform has helped me get in touch with my fans and expand my fanbase with a newer audience. As an avid content creator, I personally love all the features of the app, and their contests are the cherry on top with crazy good rewards! I was invited to be a part of celebs special episode of the most iconic game reality show, Antakshari on Zee Punjab, and it was a super-hit! Hipi will always be my fun space❤️ Hipi karo, more karo!</p>
                </div>
                </div>
            </div>
        </SwiperSlide>
        </Swiper>
    </div>


    <StaticFooter/>
</div>
</>
);
}
export default HipiCreators;