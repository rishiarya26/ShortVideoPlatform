import Logo from '../commons/svgicons/hipi-logo';
import { withBasePath } from '../../config';

export default function displayDeviceOS({ getOS }) {
  const storeImages = {
    android: 'icons/play_store.png',
    ios: 'icons/app_store.png'
  };

  return (
    <>
      <div className=" flex items-center justify-center flex-col bg-gray-900 w-full ">
        <Logo />
        <p className="text-white text-lg my-2">The best experience is in App</p>
        <img src={withBasePath(storeImages[`${getOS()}`])} className="" alt="playicon" />
      </div>
    </>
  );
}
