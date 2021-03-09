
import VideoFooter from '../../videofooter/index';
import VideoSidebar from '../../videosidebar/index';

function Loading() {


    return (
      <div className="video_card relative flex w-full h-screen scroll-snap-start bg-gray-400 items-center justify-center">
       <VideoSidebar />
       <div className="w-9/12 absolute bottom-8 left-4">
    <div className="w-6/12 h-6 bg-gray-500 my-2.5"></div>
    <div className="w-9/12 h-4 bg-gray-500 my-2.5"></div>
    <div className="w-full h-4 bg-gray-500 my-2.5"></div>
</div>
      </div>
    );
  }
  
  export default Loading;
  