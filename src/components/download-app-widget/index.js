/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-key */
import HipiLogo from '../commons/svgicons/hipi-logo-black';
import { withBasePath } from '../../config';
import { getOS } from '../../utils/device-details';
import useDevice, { devices } from '../../hooks/use-device';

export default function DownloadAppWidget() {
  const storeImages = {
    android: 'icons/play_store.png',
    ios: 'icons/app_store.png'
  };

  const value = useDevice(devices, [
    <div className="flex justify-center">
      <img src={withBasePath(storeImages.android)} className="mr-2" alt="playicon" />
      <img src={withBasePath(storeImages.ios)} className="" alt="playicon" />
    </div>,
    <img src={withBasePath(storeImages[`${getOS()}`])} className="" alt="playicon" />]);

  return (
    <>
      <div className=" flex items-center flex-col w-full mt-10">
        <HipiLogo />
        <p className="text-sm my-2 text-center px-4 py-3">For best experience kindly download the Hipi Mobile App from Google PlayStore</p>
        {value && value}
      </div>
    </>
  );
}
