
function Loader() {
  return (
    <div className="flex flex-col bg-white p-6 rounded-md w-320 shadow-lg border border-gray-100">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex items-center w-12 h-12 bg-gray-200 rounded-full">
            </div><h3 className="w-32 my-2 h-6 bg-gray-200"></h3>
            <p className="w-32 mb-2 h-4 bg-gray-200"></p>
            </div>
          <div><button className="w-24 h-8 rounded bg-gray-200"></button></div>
          </div>
        <div className="list flex mt-2">
          <div className="flex text-gray-700 items-center ">
            <p className="font-bold text-lg">--</p>
            <p className="pl-2 font-normal">Followers</p>
          </div>
          <div className="flex text-gray-700 items-center ml-4">
            <p className="font-bold text-lg">--</p>
            <p className="pl-2 font-normal ">Likes</p>
          </div>
        </div>
        <div className="Bio border-t ">
          <p className="w-48 my-2 h-6 bg-gray-200">
          </p>
        </div>
      </div>
  );
}

export default Loader;
