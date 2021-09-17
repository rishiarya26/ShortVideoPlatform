import VideoSidebar from '../videosidebar/loader';
import VideoFooter from '../videofooter/loader';
import Seekbar from '../seekbar/loader';
import FooterMenu from '../footer-menu';
// import Like from '../commons/svgicons/like';
import CircularProgress from '../commons/circular-loader'

function Loader() {
  return (
    <>
      <div className="video_card relative flex w-full h-screen scroll-snap-start bg-hipidblue">
        <VideoSidebar />
        <VideoFooter />
            <div
                className="absolute top-1/2 justify-center w-screen flex"
                style={{ display: 'flex text-white' }}
              >
                <CircularProgress/>
             </div>
        <Seekbar type={'aboveFooterMenu'} />
      </div>
      <FooterMenu />
    </>
  );
}

export default Loader;
