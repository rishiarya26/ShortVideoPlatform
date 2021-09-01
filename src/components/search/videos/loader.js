// import VideoSidebar from '../videosidebar/loader';
// import VideoFooter from '../videofooter/loader';
// import Seekbar from '../seekbar/loader';

function Loader() {
  return (
    <>
      <div className="video_card relative flex w-full h-screen scroll-snap-start">
      <div className="flex flex-wrap flex-row w-full space-x space-y p-1">
            <span className="w-1/3 h-1/3 p-1 m-1 bg-gray-200"></span>
            <span className="w-1/3 h-1/3 p-1 m-1 bg-gray-200"></span>
      </div>
      </div>
      {/* <FooterMenu /> */}
    </>
  );
}

export default Loader;
