/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';

function Landscape() {
  return (
    <div className=" landscape_screen w-full h-full flex flex-col justify-center items-center z-11 bg-gray-400 bg-opacity-70 fixed top-0 left-0 overflow-hidden">
      <img className="w-16 h-16" src={withBasePath('images/mobile-switch-white.png')} alt="hipi logo" /> 
      <p className="text-white text-2xl">Please rotate your device</p>
    </div>
  );
  }
export default Landscape;

