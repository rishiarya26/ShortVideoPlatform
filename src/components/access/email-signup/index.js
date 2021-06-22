
export default function EmailSignup() {
  return (
    <div className="flex flex-col px-4 pt-10">
      <div className="mt-4">
        <input className=" w-full border-b-2 border-grey-300 px-4 py-2" type="email" name="emial" placeholder="Email Address" />
      </div>
      <div className="flex justify-end text-sm font-semibold mt-2 px-2">
        <p className="text-gray-400 text-xs">
          By continuing, you agree to Hipi's
          <span>Terms of Use</span>
          {' '}
          and confirm that you have read Hipi's
          <span>Privacy Policy</span>
          . if you sign up with SMS, SMS fee may apply.
        </p>
      </div>
      <div className="mt-10">
        <button className="bg-red-400 w-full px-4 py-2 text-white font-semibold">Next </button>
      </div>
    </div>
  );
}
