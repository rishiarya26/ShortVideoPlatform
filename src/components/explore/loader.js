// import VideoSidebar from '../videosidebar/loader';
// import VideoFooter from '../videofooter/loader';
// import Seekbar from '../seekbar/loader';
import { useState } from 'react';
import Hash from '../commons/svgicons/hash';
import Search from '../commons/svgicons/search-black';
import RightArrow from '../commons/svgicons/right-arrow';
// import Error from './error';
// import Loader from './loader';
import FooterMenu from "../footer-menu";

function Loader() {
  return (
    <>
       <div className="h-screen  w-screen flex flex-col ">
        <div className="search_box p-4 w-full">
          <div className="relative">
            <input
              className=" w-full bg-gray-100 px-4 py-2 pl-8"
              type="text"
              name="Search"
              placeholder="Search"
            />
            <div className="absolute left-1 top-2">
              <Search />
            </div>
          </div>
          <div />
        </div>
        <div className="poster w-full" />

              <div className="p-2 tray">
                <div className="w-full flex mb-2 justify-between">
                  <div className="flex">
                    <div className="p-2 rounded-full border-2 border-gray-300 mr-2">
                      <Hash />
                    </div>
                    <div className="head flex flex-col">
                      <p className="text-base font-medium"></p>
                      <p className="text-sm text-gray-400">trending</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <RightArrow />
                  </div>
                </div>

                <div className="flex min-w-full overflow-x-auto min-h-38 no_bar">
                      <div className="bg-gray-300 m-1 min-w-28 min-h-38 relative">
                      </div>
                </div>
              </div>
                {/* <div  className="p-2 circle_tray">
                  <div className="w-full flex justify-between">
                    <p className="text-base font-medium"></p>
                    <div className="flex items-center justify-center">
                      <RightArrow />
                    </div>
                  </div>
                  <div className="flex min-w-full overflow-x-auto min-h-32 no_bar py-4">
                  
                          <>
                    <div className="my-1 px-2 flex flex-col justify-center items-center">
                            <div  className="bg-gray-300 min-w-1/6 overflow-hidden  min-h-1/6 rounded-full relative">
                            </div>
                            <p className="text-xs pt-2"></p>
                          
                    </div>
                          </>

                  </div>
                </div> */}
<FooterMenu/>
      </div>
      
      </>
              )}

export default Loader;
