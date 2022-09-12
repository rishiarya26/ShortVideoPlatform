import Refresh from "../commons/svgicons/refresh";

function VideoUnavailable() {

  return (
    <>
     <div className="md:hidden bg-gray-900 h-screen w-screen flex justify-center items-center text-white flex-col">
        <h1 className="text-xl font-semibold">The content you are seeking is unavailable.</h1>
        <p className="font-light"> Click here to continue </p>
        <div className='mt-2 cursor-pointer' onClick={()=>{window.location.href = '/feed/for-you'}}><Refresh/></div>
     </div>
     <div className="hidden md:flex w-full h-screen justify-center items-center W-feed-vid pt-24 flex-col">
     <h1 className="text-xl font-semibold">The content you are seeking is unavailable.</h1>
        <p className="font-light"> Tap here to continue </p>
         <div className='mt-4 cursor-pointer' onClick={()=>{window.location.href = '/feed/for-you'}}><Refresh/></div>
     </div>
    </>
  ); 
}

export default VideoUnavailable;

