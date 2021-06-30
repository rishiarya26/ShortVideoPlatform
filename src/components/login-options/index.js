import Link from 'next/link';
import Fb from '../commons/svgicons/facebook';
import Google from '../commons/svgicons/google';
import Instagram from '../commons/svgicons/instagram';
import Twitter from '../commons/svgicons/twitter';
import Mobile from '../commons/svgicons/mobile';
import useDrawer from '../../hooks/use-drawer';

export default function Login({ toggle }) {
  const { close } = useDrawer();
  return (
    <div className="px-4 py-2 flex flex-col items-center">
      <div className="p-2 flex flex-col items-center">
        <h1 className="text-lg font-bold">Login to Hipi</h1>
        <p className="text-center text-sm">Manage your account, check notifications, comment on videos and more</p>
      </div>
      <div className="socail flex flex-col w-full my-4">
        <div className="flex border border-2 border-gray-300 py-2 px-4 w-full my-2">
          <div className="justify-self-start"><Mobile /></div>
          <div onClick={() => close()} className="flex justify-center w-full font-semibold">
            <Link href="/login/phone">
              <p>Use phone or email</p>
            </Link>
          </div>
        </div>
        <div className="flex border border-2 border-gray-300 py-2 px-4 w-full my-2">
          <div className="justify-self-start"><Fb /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with facebook</p>
          </div>
        </div>
        <div className="flex border border-2 border-gray-300 py-2 px-4 w-full my-2">
          <div className="justify-self-start"><Google /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with google</p>
          </div>
        </div>
        <div className="flex border border-2 border-gray-300 py-2 px-4 w-full my-2">
          <div className="justify-self-start"><Twitter /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with Twitter</p>
          </div>
        </div>
        <div className="flex border border-2 border-gray-300 py-2 px-4 w-full my-2">
          <div className="justify-self-start"><Instagram /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with Instagram</p>
          </div>
        </div>
      </div>
      <div className="my-2 ">
        <p>
          Don't have an account?
          <span onClick={() => toggle('signup')} className="text-red-600">Sign Up</span>
        </p>
      </div>
    </div>
  );
}
