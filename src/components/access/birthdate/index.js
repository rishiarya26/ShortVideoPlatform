
export default function BirthDate() {
  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">when's you birthday</p>
        <p className="text-gray-400 text-xs">Your birthday won't be shown publicly</p>
      </div>
      <div className="flex justify-center">
        date picker goes here
      </div>
      <div className="mt-10">
        <button className="bg-gray-300 w-full px-4 py-2 text-white font-semibold">Next </button>
      </div>
    </div>
  );
}
