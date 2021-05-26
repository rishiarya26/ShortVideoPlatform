

export default function MobileLogin() {
 
  return (
   <div className="flex flex-col px-4 pt-10">
       <div className="mt-4">
       <input className=" w-full border-b-2 border-grey-300 px-4 py-2" type="number" name="phone" placeholder="Phone Number"/>
       </div>
       <div className="mt-4">
       <input className=" w-full border-b-2 border-grey-300 px-4 py-2" type="password" name="phone" placeholder="Password"/>
       </div>
       <div className="flex justify-between text-sm font-semibold mt-2 px-2">
        <p >Forgot password?</p>
        <p className="text-blue-400">Login with OTP</p>
       </div>
       <div className="mt-10">
           <button className="bg-red-400 w-full px-4 py-2 text-white font-semibold">Log In </button>
       </div>
   </div>
  );
}
