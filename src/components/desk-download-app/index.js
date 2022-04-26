/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';

function DeskDownloadApp() {
  //Desktop links
  const stores = {
    android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
    ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
  };

  // const {close} = useDrawer();

  const onStoreRedirect =(device)=>{
    device && (window?.open(`${stores[device]}`));
  }

  return (
    <>
    <div className=" flex justify-between pt-8">
      <div className='flex w-1/2 flex-col justify-center items-center'>
          <p className='text-medium text-gray-800 text-center pb-4'>Scan QR code to download Hipi</p>
          <div className='flex px-4 border-r'>
            <img className="cursor-pointer " src={withBasePath('icons/qrcode.png')} alt="hipi logo" />
          </div>
      </div>
      <div className='flex w-1/2 flex-col items-center' >
      <p className='text-medium text-gray-800 text-center pb-4'>Download from app stores</p>
          <div className="flex w-full flex-col  items-center px-6 mt-6">
            <div onClick={()=>onStoreRedirect('android')} className=" w-full "> <img className="cursor-pointer " src={withBasePath('icons/play_store.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')} className=" w-full mt-6"><img src={withBasePath('icons/app_store.png')} className="cursor-pointer" alt="hipi logo" /> </div>
          </div></div>
      </div>
    </>
  )
}

export default DeskDownloadApp;

