/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import StaticFooter from '../static-footer';
import { useRouter } from "next/router";
import Header from '../desk-header';
import { getCanonicalUrl } from '../../utils/web';
import { useEffect, useState } from 'react';

function About() {
  const [url, setUrl] = useState('');

  useEffect(()=>{
    setUrl(document?.location?.href);
  },[]);
  //Desktop links
  const stores = {
    android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
    ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
  };

 
  // const {close} = useDrawer();

  // const onStoreRedirect =(device)=>{
  //   device && (window.location.href = `${stores[device]}`);
  // }

  // const router = useRouter();

  return (
    <>
     <SeoMeta
        data={{
          title: 'About Us | Hipi Karo More Karo | Know Everything About Hipi',
          // image: item?.thumbnail,
          description: 'Hipi -India’s favorite short trending video platform brings you with the best and latest content available that you can enjoy, About Us - Know everything about Hipi here',
          canonical: url && getCanonicalUrl(url),
        }}
      />
    <div className="h-screen  w-screen flex flex-col justify-between">
      {/* <div className="w-full h-24 head-shadow flex items-center justify-center lg:justify-start lg:px-10 py-4">
        <div className="w-12 cursor-pointer" onClick={()=>router && router.push('/feed/for-you')} >
        <img  src={withBasePath('icons/Logo_hipi.png')} alt="hipi logo" /> 
        </div>  
      </div> */}
      <div className='hidden md:flex'><Header/></div>
      <div className='w-full flex flex-col md:flex-row'>
          <div className='w-full md:w-1/2 bg-gray-300 md:h-screen'>
          <img  src={withBasePath('images/about/hipi_about.jpg')} alt="hipi logo" /> 
          </div>
          <div className='w-full md:w-1/2  flex-col flex p-8 md:px-20 justify-center'> 
             <h1 className='text-5xl font-bold text-gray-8  px-4 md:px-16'>
             Hipi with us</h1>
             <h2 className='text-gray-600 text-2xl pt-4 px-4 md:px-16'>Hipi is the leading short form video destination that inspires creativity and passion.</h2>
             <p className='text-gray-500 font-light text-lg pt-4 px-4 md:px-16'>Hipi brings moments of joy, inspiration, and discovery. The platform empowers creators, brands and merchants to harness the power of storytelling and product discovery in an industry-changing, retail marketing environment. </p>
             <p className='text-gray-500 font-light text-lg pt-4 px-4 md:px-16'>
             Hipi can be downloaded on the Google Play store and the Apple App Store.
             </p>
          </div>
      </div>
    
      <StaticFooter/>
    </div>
    </>
  );
}

export default About;

