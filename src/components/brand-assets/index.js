/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';
import { useRouter } from 'next/router';
import StaticFooter from '../static-footer';

function Home() {
  //Desktop links
  const stores = {
    android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
    ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
  };

  const links={
    facebook : 'https://www.facebook.com/HiPiOfficialApp',
    twitter : 'https://twitter.com/HiPiOfficialApp',
    instagram : 'https://www.instagram.com/hipiofficialapp/?hl=en'
  }

 
	const router = useRouter();
  // const {close} = useDrawer();

  const onStoreRedirect =(device)=>{
    device && (window.location.href = `${stores[device]}`);
  }

  return (
    <div className="h-screen  w-screen flex flex-col justify-between">
      <div className=" header_landing w-full h-22 bg-red-600 flex items-center justify-center lg:justify-start lg:px-10 py-2">
        <img className="w-14 cursor-pointer" onClick={()=>router.push('/feed/for-you')}  src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
      </div>
      <div className="p-8 h-full flex-col justify-start">
        <p className="border-b-4 border-red-500 flex w-1/12 font-semibold text-xl py-2">Logo</p>
        <div className="flex px-4 py-8">
            <div className="shadow-md w-1/5 h-1/5 mx-2">
                <img src={withBasePath('assets/Hipi_Logo.png')} alt="hipi logo" />
                <div className="flex justify-end">
                <a href={withBasePath('assets/Hipi_Logo.png')} download>
                   <img className="w-12 p-2" src={withBasePath('assets/download.png')} alt="" />
                </a>
                </div>
            </div>
            <div className="shadow-md w-1/5 h-1/5 mx-2">
                <img src={withBasePath('assets/Hipi_Icon_Logo.png')} alt="hipi logo" />
                <div className="flex justify-end">
                <a href={withBasePath('assets/Hipi_Icon_Logo.png')}  download>
                   <img className="w-12 p-2" src={withBasePath('assets/download.png')} alt="" />
                </a>
                </div>
            </div>
        </div>
        <p className="border-b-4 border-red-500 flex w-1/12 font-semibold text-xl py-2 pt-8">Documents</p>
        <div className="flex px-4 py-8">
            <div className="shadow-md w-1/5 h-1/5">
              <div className="flex justify-center p-4">
                <img className="w-16 py-4 text-center" src={withBasePath('assets/document.png')} alt="hipi logo" />
                </div>
                <p className="flex justify-center" >Brand guidelines</p>
                <div className="flex justify-end">
                <a href={withBasePath('assets/Hipi_brand_guideline.pdf')} download>
                   <img className="w-12 p-2" src={withBasePath('assets/download.png')} alt="" />
                </a>
                </div>
            </div>
            
        </div>
      </div>
      <StaticFooter/>
    </div>
  );
}

export default Home;

