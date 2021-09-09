/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-key */
import HipiLogo from '../commons/svgicons/hipi-logo-black';
import { withBasePath } from '../../config';
import { getOS } from '../../utils/device-details';
import useDevice, { devices } from '../../hooks/use-device';

export default function DownloadAppWidget({text, setMuted}) {
  const storeImages = {
    android: 'icons/play_store.png',
    ios: 'icons/app_store.png'
  };

  // const value = useDevice(devices, [
  //   <div className="flex justify-center">
  //     <img src={withBasePath(storeImages.android)} className="mr-2" alt="playicon" />
  //     <img src={withBasePath(storeImages.ios)} className="" alt="playicon" />
  //   </div>,
  //   <img src={withBasePath(storeImages[`${getOS()}`])} className="" alt="playicon" />]);

  return (
    <>
      <div className=" flex flex-col items-center w-full ">
        <div className="flex w-full py-4">
          <div className="flex w-1/4 justify-center px-4">
              <HipiLogo />
          </div>
          <div className="flex w-3/4 flex-col p-1">
            <p className="font-semibold text-xl ">Hipi -  Open in the app</p>
            <p className="text-md text-gray-500">Open in Hipi to {text}</p>
          </div>
          </div>
        <div className="flex w-full border-t-2 border-gray-200 h-12">
          <div className="flex justify-center items-center w-1/2 ">
            <p className="text-lg">Not now</p>
          </div>
          <div className="flex justify-center items-center  border-l-2 border-gray-200 w-1/2">
            {/* To-Do send download links to useDevice in second param & onClick call whatever is returned.  */}
          <p className="text-red-400 font-semibold text-lg">Open in app</p>
          </div>
          <div>
          <p onClick={()=>setMuted(true)} className="text-red-400 font-semibold text-lg">continue with web</p>
          </div>
        </div>
       
        {/* {value && value} */}

      </div>
    </>
  );
}
