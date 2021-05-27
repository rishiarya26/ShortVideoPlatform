

export default function ResetPassword() {
 
    return (
     <div className="flex flex-col px-4 pt-10">
         <div className="mt-4 flex flex-col">
             <p className="font-bold w-full">Reset Password</p>
             <p className="text-gray-400 text-xs">Use 8-20 characters from atleast 2 categories: letters, numbers, special characters</p>
         </div>
         <div className="mt-4">
         <input className=" w-full border-b-2 border-grey-300 px-4 py-2" type="password" name="password" placeholder="Password"/>
         </div>
         <div className="mt-10">
             <button className="bg-red-400 w-full px-4 py-2 text-white font-semibold">Submit </button>
         </div>
     </div>
    );
  }
  