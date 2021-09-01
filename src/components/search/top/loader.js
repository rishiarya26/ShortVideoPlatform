// import VideoSidebar from '../videosidebar/loader';
// import VideoFooter from '../videofooter/loader';
// import Seekbar from '../seekbar/loader';

function Loader() {
  return (
    <>
      <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-sm font-bold w-14 h-2 bg-gray-200"></p>
                     {/* <p className="text-sm text-gray-400">{numberFormatter(data?.count?.users)} results</p> */}
                    </div>
                    <div className="flex items-center justify-center text-gray-400 w-14 h-2 bg-gray-200">
                     
                    </div>
                </div>
                  <div className="card_list flex min-w-full overflow-x-auto no_bar">
                  
                  <div  className="flex border-2 border-gray-100 py-2 px-4 mr-2">
                      <div className=" w-15v flex h-15v bg-gray-300 relative rounded-full overflow-hidden" >
                      </div>
                      <div className="flex flex-col justify-between pl-2 pb-2">
                        <p className="font-bold text-sm text-gray-700 w-14 h-4 bg-gray-200"></p>
                        <p className="text-xs text-gray-400 w-10 h-2 bg-gray-200"></p>
                        <p className="text-xs text-gray-400 whitespace-nowrap w-14 h-2 bg-gray-200"></p>
                    </div>
                  </div>
                  </div>
         
          </div>
        </div>


{/* hashtags */}
<div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-sm font-bold w-14 h-4 bg-gray-200"></p>
                      {/* <p className="text-sm text-gray-400">{numberFormatter(data?.count?.hashtags)} results</p> */}
                    </div>
                    <div className="flex items-center justify-center text-gray-400 w-14 h-2 bg-gray-200">
                     
                    </div>
                </div>
             
                 <div className="flex min-w-full overflow-x-auto no_bar">
                 <div   className="m-1 flex relative">
                         <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-2 items-center">

                             </div>
                               <p className="mx-3 w-14 h-2 bg-gray-200"></p>
                         </div>
                       </div>
                 </div>
               
                
          </div>
        </div>



{/* Videos */}
        <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-sm font-bold w-14 h-4 bg-gray-200"></p>
                      {/* <p className="text-sm text-gray-400">{numberFormatter(data?.count?.videos)} results</p> */}
                    </div>
                    <div className="flex items-center justify-center text-gray-400 w-14 h-2 bg-gray-200">
                     
                    </div>
                </div>
                <div className="flex min-w-full overflow-x-auto min-h-38 no_bar">
                    <div  className="bg-gray-300 m-1 min-w-28 min-h-38 relative  bg-gray-200">
                      </div>
                </div>
                
          </div>
        </div>


    </>
  );
}

export default Loader;
