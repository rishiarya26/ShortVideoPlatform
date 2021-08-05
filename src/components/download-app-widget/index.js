/*eslint-disable @next/next/no-img-element*/
import HipiLogo from '../commons/svgicons/hipi-logo-black';
import { withBasePath } from '../../config';
import { getOS } from '../../utils/device-details';

export default function downloadAppWidget() {
  const storeImages = {
    android: 'icons/play_store.png',
    ios: 'icons/app_store.png'
  };

  return (
    <>
      <div className=" flex items-center flex-col w-full mt-10">
        <HipiLogo />
        <p className="text-sm my-2 text-center px-4 py-3">For best experience kindly download the Hipi Mobile App from Google PlayStore</p>
        <img src={withBasePath(storeImages[`${getOS()}`])} className="" alt="playicon" />
      </div>
    </>
  );
}
