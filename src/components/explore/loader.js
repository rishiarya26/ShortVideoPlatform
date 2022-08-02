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

       <div className="h-screen  w-screen flex flex-col mt-20">
        <div className="search_box w-full z-10 fixed top-4">
        <div className="flex relative bg-white p-4 items-center">
          <input 
          className=" w-full bg-gray-100 px-4 py-2 pl-8" 
          type="text" 
          autoComplete="off" 
          name="Search" 
          placeholder="Search" 
          defaultValue=""/>
            {/* <button className="absolute right-0 top-2 p-4 text-semibold text-gray-600 text-sm">
              <svg  height="24px" viewBox="0 0 24 24" width="24px" fill="#535353"><path d="M0 0h24v24H0z" fill="none"></path><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
              </button> */}
            </div>
          <div />
        </div>
        <div className="explore_carousel flex min-w-full bg-gray-200 overflow-x-auto h-56v no_bar">

        </div>

        <div className="p-2 circle_tray mt-2">
                  <div className="w-full flex justify-between">
                    <p className="text-base font-medium bg-gray-200 w-20 h-4"></p>
                    <div  className="flex items-center justify-center">
                      <RightArrow />
                    </div>
                  </div>
                  <div className="flex min-w-full overflow-x-auto min-h-32 no_bar pt-2">
                    
                          <div  className="my-1 px-2 flex flex-col justify-center items-center">
                                <div className="bg-gray-300 min-w-1/6 overflow-hidden  min-h-1/6 rounded-full relative">
                                </div>
                                <p className="text-xs pt-2 truncate max-w-20v text-center w-16 h-2 mt-2 bg-gray-200"></p>
                          </div>
                          <div  className="my-1 px-2 flex flex-col justify-center items-center">
                                <div className="bg-gray-300 min-w-1/6 overflow-hidden  min-h-1/6 rounded-full relative">
                                </div>
                                <p className="text-xs pt-2 truncate max-w-20v text-center w-16 h-2 mt-2 bg-gray-200"></p>
                          </div>
                          <div  className="my-1 px-2 flex flex-col justify-center items-center">
                                <div className="bg-gray-300 min-w-1/6 overflow-hidden  min-h-1/6 rounded-full relative">
                                </div>
                                <p className="text-xs pt-2 truncate max-w-20v text-center w-16 h-2 mt-2 bg-gray-200"></p>
                          </div>
                          <div  className="my-1 px-2 flex flex-col justify-center items-center">
                                <div className="bg-gray-300 min-w-1/6 overflow-hidden  min-h-1/6 rounded-full relative">
                                </div>
                                <p className="text-xs pt-2 truncate max-w-20v text-center w-16 h-2 mt-2 bg-gray-200"></p>
                          </div>
                        
                  </div>
                </div>

              <div className="p-2 tray">
                <div className="w-full flex mb-2 justify-between">
                  <div className="flex">
                    <div className="p-2 rounded-full border-2 border-gray-300 mr-2">
                      <Hash />
                    </div>
                    <div className="head flex flex-col justify-around">
                      <p className="text-base font-medium bg-gray-200 w-20 h-4"></p>
                      <p className="text-sm bg-gray-200 w-20 h-2"></p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <RightArrow />
                  </div>
                </div>

                <div className="flex min-w-full  overflow-x-auto min-h-38 no_bar">
                      <div className="bg-gray-300 m-1 min-w-28 min-h-38 relative">
                      </div>
                      
                      <div className="bg-gray-300 m-1 min-w-28 min-h-38 relative"></div>
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
      
              )}

export default Loader;
