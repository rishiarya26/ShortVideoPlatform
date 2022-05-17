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
                      <p className="text-sm font-bold">Users</p>
                    </div>
                    <div className="flex items-center justify-center w-24 bg-gray-200">
                      
                    </div>
                </div>
           
                  <div className="card_list flex flex-col flex min-w-full overflow-x-auto no_bar">
                
                  <div  className="flex py-2 pl-2 pr-4 mr-2">
                      <div className=" w-16 flex h-16 bg-gray-200 relative rounded-full overflow-hidden" >
                      
                      </div>
                      <div className="flex flex-col justify-between pl-2">
                        <p className="h-4 w-24 bg-gray-200  "> </p>
                        <p className="h-4 w-24 mt-2 bg-gray-200"></p>
                        <p className="h-2 w-24 mt-2 bg-gray-200"></p>
                        
                        
                    </div>
                  </div>
                     
                  </div>  
          </div>
        </div>
    </>
  );
}

export default Loader;
