
import Logo from '../commons/svgicons/hipi-logo';
import { withBasePath } from '../../config';

export default function detectOperatingSystemModal({ handleOperatingsystem }) {
  return (
    <>
      <div className=" flex items-center justify-center flex-col bg-gray-900 w-full ">
        <Logo />
        <p className="text-white text-lg my-2">The best experience is in App</p>
        {/* {handleOperatingsystem()} */}
        { handleOperatingsystem() === 'android'
          ? <img src={withBasePath('icons/play_store.png')} className="" alt="playicon" /> : <img src={withBasePath('icons/app_store.png')} className="" alt="playicon" />}
        {' '}

      </div>
    </>
  );
}
