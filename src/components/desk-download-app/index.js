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
    <div className=" flex flex-col justify-between">
          <div className="flex w-full mt-6">
           <div onClick={()=>onStoreRedirect('android')}> <img className="pr-2 cursor-pointer" src={withBasePath('icons/play_store.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')}><img src={withBasePath('icons/app_store.png')} className="cursor-pointer" alt="hipi logo" /> </div>
          </div>
      </div>
    </>
  )
}

export default DeskDownloadApp;

