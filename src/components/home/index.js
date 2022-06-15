/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';
import { getCanonicalUrl } from '../../utils/web';
import { SeoMeta } from '../commons/head-meta/seo-meta';
import StaticFooter from '../static-footer';

function Home() {
  //Desktop links
  const stores = {
    android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
    ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
  };

 
  // const {close} = useDrawer();

  const onStoreRedirect =(device)=>{
    device && (window.location.href = `${stores[device]}`);
  }

  return (
    <>
     <SeoMeta
        data={{
          title: 'Discover Popular Videos |  Hipi - Indian Short Video App',
          // image: item?.thumbnail,
          description: 'Hipi is a short video app that brings you the latest trending videos that you can enjoy and share with your friends or get inspired to make awesome videos. Hipi karo. More karo.',
        }}
      />
    <div className="h-screen  w-screen flex flex-col justify-between">
      <div className=" header_landing w-full h-28 bg-red-600 flex items-center justify-center lg:justify-start lg:px-10 py-2">
        <div className="w-16">
        <img  src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
        </div>
      </div>
      <div className="bg_grad flex items-center p-10 relative h-full">
        <div className="flex justify-end pr-10 items-center w-5/12 ">
          <img className="w-60" src={withBasePath('images/hipi_screenshot.png')} alt="hipi logo" /> 
        </div>
        <div className="flex items-start justify-start flex-col w-7/12 text-white pr-60">
          <h1 className="text-5xl leading-snug font-semibold py-10">Hipi is best experienced on mobile device.</h1>
          <p className="font-medium leading-normal mb-4 text-2xl font-light">
          Download the App or hit www.hipi.co.in on your Android or iOS mobile device.
          </p>
          <div className="flex w-full mt-6">
           <div onClick={()=>onStoreRedirect('android')}> <img className="pr-2 cursor-pointer" src={withBasePath('icons/play_store_1.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')}><img src={withBasePath('icons/app_store_1.png')} className="cursor-pointer" alt="hipi logo" /> </div>
          </div>
        </div>
      </div>
      <StaticFooter/>
    </div>
    </>
  );
}

export default Home;

