// import VideoSidebar from '../videosidebar/loader';
// import VideoFooter from '../videofooter/loader';
// import Seekbar from '../seekbar/loader';

function Loader() {
  return (
    <>
     <div>
              <div className="flex p-2 min-w-3/5 mr-2">
                      <div className=" w-15v flex h-15v bg-gray-300 relative rounded-full overflow-hidden" >
                          </div>
                      <div className="flex flex-col justify-between pl-2 pb-2">
                        <p className="font-medium text-sm text-gray-700 w-14 h-4 bg-gray-200"> </p>
                        <p className="text-xs text-gray-400 w-10  h-2 bg-gray-200"></p>
                        <p className="text-xs text-gray-400 w-10 h-2 bg-gray-200"></p>
                    </div>
                  </div>   
           </div>
    </>
  );
}

export default Loader;
