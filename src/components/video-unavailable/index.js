/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';

function VideoUnavailable() {

  return (
    <>
     <div className="md:hidden bg-gray-900 h-screen w-screen flex justify-center items-center text-white flex-col">
        <h1 className="text-xl font-semibold text-center px-4">The content you are seeking is unavailable.</h1>
        {/* <p className="font-light"> Click here to continue </p> */}
        <div className='mt-4 cursor-pointer' onClick={()=>{window.location.href = '/feed/for-you'}}><button className="rounded text-sm font-semibold  px-8 p-2 bg-hipired text-white">Continue</button></div>
     </div>
     <div className="hidden md:flex w-full h-screen justify-center items-center W-feed-vid pt-24 flex-col border-l border-gray-100">
      <div className="w-24 mb-4">
        <img src={withBasePath('images/video-player.webp')} />
      </div>
     <h1 className="text-lg font-semibold">The content you are seeking</h1>
     <h1 className="text-lg font-semibold">is unavailable.</h1>
        {/* <p className="font-light"> Tap here to continue </p> */}
         <div className='mt-4 cursor-pointer' onClick={()=>{window.location.href = '/feed/for-you'}}><button className="rounded text-sm font-semibold  px-8 p-2 bg-hipired text-white">Continue</button></div>
     </div>
    </>
  ); 
}

export default VideoUnavailable;

