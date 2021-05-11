
import Logo from '../commons/svgicons/hipi-logo';
import { withBasePath } from '../../config';

export default function detectDevice({ deviceDetails }) {
  return (
    <>
      <div className=" flex items-center justify-center flex-col bg-gray-900 w-full ">
        <Logo />
        <p className="text-white text-lg my-2">The best experience is in App</p>
        { deviceDetails() === 'android'
          ? <img src={withBasePath('icons/play_store.png')} className="" alt="playicon" />
          : deviceDetails() === 'ios'
            ? <img src={withBasePath('icons/app_store.png')} className="" alt="playicon" />
            : (
              <span className="text-white">
                WEB
              </span>
            )}
        {' '}
      </div>
    </>
  );
}
