

export default function MobileLoginOtp() {
 
    return (
     <div className="flex flex-col px-4 pt-10">
         <div className="mt-4">
         <input className=" w-full border-b-2 border-grey-300 px-4 py-2" type="number" name="phone" placeholder="Phone Number"/>
         </div>
         <div className="flex justify-end text-sm font-semibold mt-2 px-2">
          <p className="text-blue-400">Login with Password</p>
         </div>
         <div className="mt-10">
             <button className="bg-red-400 w-full px-4 py-2 text-white font-semibold">Send OTP </button>
         </div>
     </div>
    );
  }
  