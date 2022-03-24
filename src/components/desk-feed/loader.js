import VideoSidebar from '../videosidebar/loader';
import VideoFooter from '../videofooter/loader';
import FooterMenu from '../footer-menu';

function Loader() {
  return (
    <div className="w-8/12 flex flex-col overflow-scroll no_bar">
    <div class="feed_card  border-b-2 border-gray-300 p-8 ">
    <div class="flex justify-between">
        <div class="avatar">
            <div class="flex items-center w-16 h-16 overflow-hidden rounded-full bg-gray-200"></div>
        </div>
        <div class="video_section flex flex-col  w-full ml-4">
            <div class="header flex flex-col relative">
                <div class="w-44 bg-gray-300 h-6
    ">

                </div>
                <div class="w-60 mt-2 bg-gray-300 h-6
    ">

                </div>
                <div class="w-44 mt-2 bg-gray-300 h-6
    ">

                </div>
                <div class="absolute rounded-md right-4 top-0 w-24 h-6 p-1 bg-gray-300"></div>
            </div>
            <div class="Video flex items-end">
                <div class="desk-feed mt-4 flex rounded-md overflow-hidden relative bg-gray-300 w-64 h-72"></div>
                <div class="sidebar flex flex-col items-center ml-4">
                    <div class="flex flex-col w-12 h-12 bg-gray-300 items-center my-4 rounded-full"></div>
                    <div class="flex flex-col w-12 h-12 bg-gray-300 items-center my-4 rounded-full"></div>
                    <div class="flex flex-col w-12 h-12 bg-gray-300 items-center my-4 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  );
}

export default Loader;
