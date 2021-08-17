// import VideoSidebar from '../videosidebar/loader';
// import VideoFooter from '../videofooter/loader';
// import Seekbar from '../seekbar/loader';

import FooterMenu from "../footer-menu";

function Loader() {
  return (
    <>
      <div className="video_card relative flex w-full h-screen scroll-snap-start bg-hipidblue">
        Loading...
      </div>
      <FooterMenu />
    </>
  );
}

export default Loader;
