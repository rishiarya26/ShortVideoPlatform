import VideoSidebar from '../videosidebar/loader';
import VideoFooter from '../videofooter/loader';
import FooterMenu from '../footer-menu';
import Seekbar from '../seekbar/loader';

function Loader() {
  return (
    <>
      <div className="video_card relative flex w-full h-screen scroll-snap-start bg-hipidblue items-center justify-center">
        <VideoSidebar />
        <VideoFooter />
        <Seekbar />

      </div>
      <FooterMenu />
    </>
  );
}

export default Loader;
