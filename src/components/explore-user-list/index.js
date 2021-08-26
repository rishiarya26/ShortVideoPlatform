import { Back } from '../commons/svgicons/back';

function ExploreUserList() {
    return (
    <div>
    <div className="headbar w-full flex h-16 shadow-md bg-white items-center justify-center relative">
        <div  className="p-4 h-full flex items-center justify-center absolute left-0 top-0">
          <Back/>
        </div>
        <div className="font-bold">Top Hipi Stars</div>
        
      </div>
    <div className="flex flex-col p-4 ">
    <div className="flex p-2 min-w-3/5 mr-2 justify-between">
        <div className="flex">
            <div className=" w-16.6v flex h-16.6v bg-gray-300 relative rounded-full" />
            <div className="flex flex-col justify-between pl-2 pb-2">
                <p className="font-medium text-lg text-gray-700">Romantic Songs </p>
                <p className="text- text-gray-400">Romantic Songs</p>
                <p className="text- text-gray-400">585 Followers</p>
            </div>
        </div>
        <div className="flex items-center justify-self-end">
            <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-3 mr-1 bg-hipired text-white">
            Follow
            </button>
        </div>
    </div>
    <div className="flex p-2 min-w-3/5 mr-2 justify-between">
        <div className="flex">
            <div className=" w-16.6v flex h-16.6v bg-gray-300 relative rounded-full" />
            <div className="flex flex-col justify-between pl-2 pb-2">
                <p className="font-medium text-lg text-gray-700">Romantic Songs </p>
                <p className="text- text-gray-400">Romantic Songs</p>
                <p className="text- text-gray-400">585 Followers</p>
            </div>
        </div>
        <div className="flex items-center justify-self-end">
            <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-3 mr-1 bg-hipired text-white">
            Follow
            </button>
        </div>
    </div>
    </div>
    </div>
    );
    }
    export default ExploreUserList;