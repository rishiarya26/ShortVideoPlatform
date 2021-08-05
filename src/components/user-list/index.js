import { Back } from '../commons/svgicons/back';

function UserList() {
  return (
    <div>
      <div className="headbar w-full flex h-16 shadow-md bg-white items-center p-4 justify-center">
        <div className="absolute left-2 h-16 top-0 flex items-center">
          <Back />
        </div>
        <div className="font-bold">Top HiPi Stars</div>
      </div>
      <div className="w-full flex flex-col p-4">
        <div className="user_card flex justify-between">
          <div className="flex">
            <div className=" w-20v flex h-20v bg-gray-300 relative rounded-full" />
            <div className="flex flex-col justify-between pl-4 pb-2">
              <p className="font-medium text-lg text-gray-700">Username </p>
              <p className="text- text-gray-400">Full Name</p>
              <p className="text- text-gray-400">50k views</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-5 mr-1 bg-hipired text-white">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserList;
