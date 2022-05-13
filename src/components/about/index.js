/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import StaticFooter from '../static-footer';
import { useRouter } from "next/router";
import Header from '../desk-header';

function About() {
  //Desktop links
  const stores = {
    android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
    ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
  };

 
  // const {close} = useDrawer();

  const onStoreRedirect =(device)=>{
    device && (window.location.href = `${stores[device]}`);
  }

  const router = useRouter();

  return (
    <>
     <SeoMeta
        data={{
          title: 'Discover Popular Videos |  Hipi - Indian Short Video App',
          // image: item?.thumbnail,
          description: 'Hipi is a short video app that brings you the latest trending videos that you can enjoy and share with your friends or get inspired to make awesome videos. Hipi karo. More karo.'
        }}
      />
    <div className="h-screen  w-screen flex flex-col justify-between">
      {/* <div className="w-full h-24 head-shadow flex items-center justify-center lg:justify-start lg:px-10 py-4">
        <div className="w-12 cursor-pointer" onClick={()=>router.push('/feed/for-you')} >
        <img  src={withBasePath('icons/Logo_hipi.png')} alt="hipi logo" /> 
        </div>  
      </div> */}
      <Header/>
      <div className='w-full flex '>
          <div className='w-1/2 bg-gray-300 h-screen'>
          <img  src={withBasePath('images/about/about_hipi_desk.jpg')} alt="hipi logo" /> 
          </div>
          <div className='w-1/2 flex-col flex p-8 px-20 justify-center'> 
             <h1 className='text-5xl font-bold text-gray-8  px-16'>
             Hipi with us</h1>
             <p className='text-gray-500 text-lg pt-4 px-16'>
             Hipi is the leading short form video destination that inspires creativity and passion. Made in India, Hipi has already become India’s favourite short video platform for many talented creators. Hipi brings moments of joy, inspiration, and discovery. The platform empowers brands and merchants to harness the power of storytelling and product discovery in an industry-changing, retail marketing environment. Hipi can be downloaded on the Google Play store and the Apple App Store.
             </p>
          </div>
      </div>
    
      <StaticFooter/>
    </div>
    </>
  );
}

export default About;

