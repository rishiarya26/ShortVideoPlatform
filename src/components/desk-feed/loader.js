import VideoSidebar from '../videosidebar/loader';
import VideoFooter from '../videofooter/loader';
import FooterMenu from '../footer-menu';

function Loader() {
  return (
    <div className="w-8/12 flex flex-col overflow-scroll no_bar">
    <div className="feed_card  border-b-2 border-gray-300 p-8 ">
    <div className="flex justify-between">
        <div className="avatar">
            <div className="flex items-center w-16 h-16 overflow-hidden rounded-full cursor-pointer bg-gray-200"></div>
        </div>
        <div className="video_section flex flex-col  w-full ml-4">
            <div className="header flex flex-col relative">
                <div className="w-44 bg-gray-300 h-6
    ">

                </div>
                <div className="w-60 mt-2 bg-gray-300 h-6
    ">

                </div>
                <div className="w-44 mt-2 bg-gray-300 h-6
    ">

                </div>
                <div className="absolute rounded-md right-4 top-0 w-24 h-6 p-1 bg-gray-300"></div>
            </div>
            <div className="Video flex items-end">
                <div className="desk-feed mt-4 flex rounded-md overflow-hidden relative bg-gray-300 w-64 h-72"></div>
                <div className="sidebar flex flex-col items-center ml-4">
                    <div className="flex flex-col w-12 h-12 bg-gray-300 items-center my-4 rounded-full"></div>
                    <div className="flex flex-col w-12 h-12 bg-gray-300 items-center my-4 rounded-full"></div>
                    <div className="flex flex-col w-12 h-12 bg-gray-300 items-center my-4 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  );
}

export default Loader;
