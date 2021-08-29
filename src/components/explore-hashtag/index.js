import Save from '../commons/svgicons/save';
import { Back } from '../commons/svgicons/back';

function HashTag() {
  return (
    <div>
      <div className="headbar w-full flex h-16 shadow-md bg-white items-center p-4">

        <Back />
      </div>
      <div className="w-full flex flex-col p-4">
        <div className="flex w-full">
          <div className="min-w-25 flex min-h-25 bg-gray-300 relative" />
          <div className="flex flex-col px-4 justify-between">
            <div className="flex flex-col">
              <p className="font-medium text-lg">#Hashtag </p>
              <p className="text-sm text-gray-400">50k views</p>
            </div>
            <div className="flex  border-2 border-gray-300 p-2">
              <Save />
          
              <p className="pl-2 font-medium">Add to favorites</p>
            </div>
          </div>
        </div>
        <div className="flex text-sm text-gray-400 py-2">
          <p>
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
            <span className="font-medium text-gray-500">#hashtag</span>
           
            of type and scrambled it to make a type specimen book. */}
          </p>
        </div>
      </div>
    </div>
  );
}
export default HashTag;
