// import VideoSidebar from '../videosidebar/loader';
// import VideoFooter from '../videofooter/loader';
// import Seekbar from '../seekbar/loader';

import Hash from "../../commons/svgicons/hash";

function Loader() {
  return (
    <><div className="p-4">
       <div className="flex cursor-pointer justify-between my-4 items-center">
                         <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-2 items-center">
                               <Hash/>
                             </div>
                             <p className="ml-4 h-6 w-24 bg-gray-200 flex">
                              
                               </p>
                         </div>
                         <div className="text-sm w-8 h-4 bg-gray-300 items-center">
                        </div>
                       </div>
                       <div className="flex cursor-pointer justify-between my-4 items-center">
                         <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-2 items-center">
                               <Hash/>
                             </div>
                             <p className="ml-4 h-6 w-24 bg-gray-200 flex">
                              
                               </p>
                         </div>
                         <div className="text-sm w-8 h-4 bg-gray-300 items-center">
                        </div>
                       </div>
                       </div>
    </>
  );
}

export default Loader;
