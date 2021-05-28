

export default function VerifyOtp() {
 
    return (
     <div className="flex flex-col px-4 pt-10">
         <div className="mt-4 flex flex-col">
             <p className="font-bold w-full">Enter 4-digit code</p>
             <p className="text-gray-400 text-xs">Your code was messaged to +91 9999999999</p>
         </div>
         <div className="mt-4">
         <input className=" w-full border-b-2 border-grey-300 px-4 py-2" type="number" name="phone" placeholder="Phone Number"/>
         </div>
         <div className="mt-10">
             <button className="bg-red-400 w-full px-4 py-2 text-white font-semibold">Verify OTP </button>
         </div>
     </div>
    );
  }
  