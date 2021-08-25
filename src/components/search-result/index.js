
import Hash from '../commons/svgicons/hash';
import Search from '../commons/svgicons/search-black';
import RightArrow from '../commons/svgicons/right-arrow'

function SearchResult() {

  return (
    <div>
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

        {/* users */}
        <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">USERS</p>
                      <p className="text-sm text-gray-400">1035 results</p>
                    </div>
                    <div className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
                <div className="card_list flex min-w-full overflow-x-auto no_bar">
                    <div className="flex border-2 border-gray-200 p-2 min-w-3/5 mr-2">
                        <div className=" w-16.6v flex h-16.6v bg-gray-300 relative rounded-full" />
                        <div className="flex flex-col justify-between pl-2 pb-2">
                          <p className="font-medium text-lg text-gray-700">Romantic Songs </p>
                          <p className="text- text-gray-400">Romantic Songs</p>
                          <p className="text- text-gray-400">585 Followers</p>
                      </div>
                    </div>
                    <div className="flex border-2 border-gray-200 p-2 min-w-3/5 mr-2">
                        <div className=" w-16.6v flex h-16.6v bg-gray-300 relative rounded-full" />
                        <div className="flex flex-col justify-between pl-2 pb-2">
                          <p className="font-medium text-lg text-gray-700">Romantic Songs </p>
                          <p className="text- text-gray-400">Romantic Songs</p>
                          <p className="text- text-gray-400">585 Followers</p>
                      </div>
                    </div>
                    <div className="flex border-2 border-gray-200 p-2 min-w-3/5 mr-2">
                        <div className=" w-16.6v flex h-16.6v bg-gray-300 relative rounded-full" />
                        <div className="flex flex-col justify-between pl-2 pb-2">
                          <p className="font-medium text-lg text-gray-700">Romantic Songs </p>
                          <p className="text- text-gray-400">Romantic Songs</p>
                          <p className="text- text-gray-400">585 Followers</p>
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
                      <p className="text-base font-medium">HASHTAGS</p>
                      <p className="text-sm text-gray-400">1035 results</p>
                    </div>
                    <div className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
                <div className="flex min-w-full overflow-x-auto no_bar">
                <div className="m-1 flex relative">
                        <div className="flex items-center">
                            <div className="flex rounded-full border-2 border-gray-200 p-2 items-center">
                              <Hash/>
                            </div>
                              #hashtag
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
                      <p className="text-base font-medium">VIDEOS</p>
                      <p className="text-sm text-gray-400">1035 results</p>
                    </div>
                    <div className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
                <div className="flex min-w-full overflow-x-auto min-h-38 no_bar">
                    <div className="bg-gray-300 m-1 min-w-28 min-h-38 relative">
                        <img data="#" title="#" />
                      </div>
                </div>
                
          </div>
        </div>

{/* SOUNDS */}
        <div className="flex flex-col p-4">
          <div className="users flex flex-col">
                <div className=" head w-full flex mb-2 justify-between">
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">SOUNDS</p>
                      <p className="text-sm text-gray-400">1035 results</p>
                    </div>
                    <div className="flex items-center justify-center text-gray-400">
                      See more
                      <RightArrow />
                    </div>
                </div>
                <div className="card_list flex min-w-full overflow-x-auto no_bar">
                    <div className="flex p-2 min-w-3/5 mr-2">
                        <div className=" w-16.6v flex h-16.6v bg-gray-300 relative " />
                        <div className="flex flex-col justify-between pl-2 pb-2">
                          <p className="font-medium text-lg text-gray-700">Romantic Songs </p>
                          <p className="text- text-gray-400">Romantic Songs</p>
                          <p className="text- text-gray-400">22:20</p>
                      </div>
                    </div>
                    <div className="flex p-2 min-w-3/5 mr-2">
                        <div className=" w-16.6v flex h-16.6v bg-gray-300 relative " />
                        <div className="flex flex-col justify-between pl-2 pb-2">
                          <p className="font-medium text-lg text-gray-700">Romantic Songs </p>
                          <p className="text- text-gray-400">Romantic Songs</p>
                          <p className="text- text-gray-400">22:20</p>
                      </div>
                    </div>
                    <div className="flex  p-2 min-w-3/5 mr-2">
                        <div className=" w-16.6v flex h-16.6v bg-gray-300 relative " />
                        <div className="flex flex-col justify-between pl-2 pb-2">
                          <p className="font-medium text-lg text-gray-700">Romantic Songs </p>
                          <p className="text- text-gray-400">Romantic Songs</p>
                          <p className="text- text-gray-400">22:20</p>
                      </div>
                    </div>
                </div>
          </div>
        </div>



        
        
      </div>
    </div>
      
  );
}
export default SearchResult;
