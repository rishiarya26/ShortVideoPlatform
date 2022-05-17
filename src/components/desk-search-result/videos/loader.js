// import VideoSidebar from '../videosidebar/loader';
// import VideoFooter from '../videofooter/loader';
// import Seekbar from '../seekbar/loader';

function Loader() {
  return (
    <>
     
     <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                 
                    
                </div>
           
                  <div className="card_list flex flex-col flex min-w-full overflow-x-auto no_bar">
                
                  <div  className="flex py-2 pl-2 pr-4 mr-2">
                     <div className="flex w-1/3 bg-gray-200 flex-col m-1 w-full min-h-28 tab-card-h max-h-28"></div>
                     <div className="flex w-1/3 bg-gray-200 flex-col m-1 w-full min-h-28 tab-card-h max-h-28"></div>
                     <div className="flex w-1/3 bg-gray-200 flex-col m-1 w-full min-h-28 tab-card-h max-h-28"></div>
                  </div>
                     
                  </div>  
          </div>
        </div>
    </>
  );
}

export default Loader;
