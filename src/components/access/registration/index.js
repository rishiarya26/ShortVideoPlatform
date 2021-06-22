
export default function Registration() {
  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4 flex flex-col">
        <p className="font-bold w-full">Tell us more to serve you better!</p>
        <p className="text-gray-400 text-xs">Use your Name, Gender and other info for better result. You can update this info anytime.</p>
      </div>
      <div className="mt-4">
        <input
          id="Name"
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="text"
          name="Namr"
          placeholder="Full Name"
        />
      </div>
      <div className="mt-4">
        <input
          id="gender"
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="text"
          name="gender"
          placeholder="Gender"
        />
      </div>
      <div className="mt-4">
        <input
          id="password"
          className=" w-full border-b-2 border-grey-300 px-4 py-2"
          type="password"
          name="phone"
          placeholder="Password"
        />
      </div>
      <div className="mt-10">
        <button className="bg-gray-300 w-full px-4 py-2 text-white font-semibold">Next </button>
      </div>
    </div>
  );
}
