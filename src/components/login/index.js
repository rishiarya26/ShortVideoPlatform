import Fb from '../commons/svgicons/facebook';

export default function Login() {
  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <div className="p-2 flex flex-col items-center">
        <h1 className="text-lg font-bold">Login to Hipi</h1>
        <p className="text-center text-sm">Manage your account, check notifications, comment on videos and more</p>
      </div>
      <div className="socail flex flex-col w-full">
        <div className="flex border border-2 border-gray-300 py-2 px-4 w-full my-2">
          <div className="justify-self-start"><Fb /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Use phone or email</p>
          </div>
        </div>
        <div className="flex border border-2 border-gray-300 py-2 px-4 w-full my-2">
          <div className="justify-self-start">dd</div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with facebook</p>
          </div>
        </div>
        <div className="flex border border-2 border-gray-300 py-2 px-4 w-full my-2">
          <div className="justify-self-start">dd</div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with google</p>
          </div>
        </div>
      </div>
    </div>
  );
}
