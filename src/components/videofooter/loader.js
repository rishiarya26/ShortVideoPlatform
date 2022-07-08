
function VideoFooter() {
  return (
    <>
      <div className="w-full absolute bottom-16 px-4 mb-8 animate-pulse">
        <div className="w-3/12 h-3 bg-gray-500 my-4 rounded-full" />
        <div className="w-4/12 h-3 bg-gray-500 my-4 rounded-full" />
        <div className="w-5/12 h-3 bg-gray-500 my-4 rounded-full" />
        <div className="w-5/12 h-3 bg-gray-500 my-4 rounded-full" />
      </div>
      <div className="bottom-16 z-10 app_cta p-3 absolute h-52 left-0 justify-between flex text-white w-full bg-black bg-opacity-70 items-center flex items-center ">
        <p className="text-sm">
        Get the full experience on the Hipi app
        </p>
      </div>
      {/* <div className="w-full absolute bottom-16 px-4 mb-2" style={{color:"#fff"}}>Get the full experience on the Hipi app</div> */}
    </>
  );
}

export default VideoFooter;
