/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';

function Landscape() {
  return (
    <div className=" landscape_screen w-full h-full flex justify-center items-center z-90 bg-gray-400 bg-opacity-70 absolute top-0 left-0">
      <img className="w-16" src={withBasePath('images/mobile-switch-white.png')} alt="hipi logo" /> 
      <p className="text-white text-2xl">Please rotate your device</p>
    </div>
  );
  }
export default Landscape;

