
function VideoFooter() {
  return (
    <>
      <div className="w-full absolute bottom-16 px-4 mb-12 flex flex-col">
        <div className="w-3/12 h-2 bg-gray-500 my-2 rounded-lg shimmer" />
        <div className="w-4/12 h-2 bg-gray-500 my-2 rounded-lg shimmer" />
        <div className="w-5/12 h-2 bg-gray-500 my-2 rounded-lg shimmer" />
        <div className="w-5/12 h-2 bg-gray-500 my-2 rounded-lg shimmer" />
      </div>
      <div className="bottom-16 z-10 app_cta p-3 absolute h-52 left-0 justify-between text-white w-full bg-black bg-opacity-70 flex items-center ">
        <p className="text-sm">
         {/* Get the full experience on the Hipi app. */}
         #HipiStunner is Live. Win Rs 1 Lac
        </p>
      </div>
    </>
  );
}

export default VideoFooter;
