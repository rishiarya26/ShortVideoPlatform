/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-key */
import HipiLogo from '../commons/svgicons/hipi-logo-black';
import { withBasePath } from '../../config';
import { getOS } from '../../utils/device-details';
import useDevice, { devices } from '../../hooks/use-device';
import useDrawer from '../../hooks/use-drawer';

export default function DownloadAppWidget({text, setMuted}) {
  const stores = {
    android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
    ios: 'https://apps.apple.com/in/app/zee5-shows-live-tv-movies/id743691886'
  };

  const {close} = useDrawer();

  const onStoreRedirect =()=>{
    const device = getOS();
    device && (window.location.href = `${stores[device]}`);
  }

  // const value = useDevice(devices, [
  //   <div className="flex justify-center">
  //     <img src={withBasePath(storeImages.android)} className="mr-2" alt="playicon" />
  //     <img src={withBasePath(storeImages.ios)} className="" alt="playicon" />
  //   </div>,
  //   <img src={withBasePath(storeImages[`${getOS()}`])} className="" alt="playicon" />]);

// const handleWeb=()=>{
//   setMuted(true);
//   close();
// }

  return (
    <>
      <div className=" flex flex-col items-center w-full ">
        <div onClick={onStoreRedirect} className="flex py-3 items-center">
          <div className="flex w-20v h-16v object-contain justify-center px-4">
              <img src={withBasePath('icons/Hipi-Logo-RGB.png')}></img>
          </div>
          <div onClick={onStoreRedirect} className="flex w-3/4 flex-col p-1">
            <p className="font-semibold text-xl ">Hipi -  Open in the App</p>
            <p className="text-xs text-gray-500">More ways to interact with the video. And, to create your own. Only on the App.</p>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="flex justify-center items-center w-1/2 ">
            <p onClick={()=>close()} className="text-lg text-hipired">Not now</p>
          </div>
        </div>
       {/* {setMuted && <div>
          <p onClick={handleWeb} className="text-red-400 font-semibold text-lg p-4">continue with web</p>
        </div>} */}
        {/* {value && value} */}

      </div>
    </>
  );
}
