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
function HipiCreatorsInApp() {
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
</div>
</>
);
}
export default HipiCreatorsInApp;