/*eslint-disable react/no-unescaped-entities*/
import Link from 'next/link';
import Fb from '../commons/svgicons/facebook-blue';
import Google from '../commons/svgicons/google';
import Instagram from '../commons/svgicons/instagram';
import Twitter from '../commons/svgicons/twitter';
import Mobile from '../commons/svgicons/mobile';
import useDrawer from '../../hooks/use-drawer';
import { useRouter } from 'next/router';
import { GoogleButton } from '../social-login/google';
import Close from '../commons/svgicons/close-black';
import { getItem } from '../../utils/cookie';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';

export default function Signup({ toggle, setAuth, pageName, tabName=null }) {
  const router= useRouter();
  const { close } = useDrawer();
  const device = getItem('device-type')

  useEffect(()=>{
    toTrackMixpanel('popupLaunch',{pageName:pageName, tabName:(tabName && tabName) || '', name:'Signup'})
  },[])

  const chooseComp = {
    mobile :   
      <div onClick={()=>{
        toTrackMixpanel('popupCta',{pageName:pageName, tabName:(tabName && tabName) || '',name:'Signup',ctaName:'Phone or Email',elemant:'Phone or Email'})
        router.push('/signup/phone')}}>
      <div onClick={() => close()} className="flex border border-1 border-gray-400 py-3 px-4 w-full my-2">
        <div className="justify-self-start"><Mobile /></div>
        <div className="flex justify-center w-full font-semibold">
          <p>Use phone or Email</p>
        </div>
      </div>
    </div>,
    desktop : 
      <div onClick={()=>setAuth('signup')}>
      <div className="flex border border-1 border-gray-400 py-3 px-4 w-full my-2">
        <div className="justify-self-start"><Mobile /></div>
        <div className="flex justify-center w-full font-semibold">
          <p>Use phone or Email</p>
        </div>
      </div>
    </div>
  }

  return (
    <div className="px-4 py-2 flex w-full flex-col items-center">
       {device === 'mobile' && <div onClick={close} className='flex w-full justify-end p-2'>
      <Close/>
   </div>}
      <div className="p-2 flex flex-col items-center">
        <h1 className="text-lg font-bold">Sign Up to Hipi</h1>
        <p className="text-center text-sm">Create a profile, follow other accounts, make your own videos and more</p>
      </div>
      <div className="socail flex flex-col w-full my-4">
        {chooseComp[device]}
        <GoogleButton type='signup' pageName={pageName} tabName={tabName || null}/>
        {/* <div className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
          <div className="justify-self-start"><Fb /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with facebook</p>
          </div>
        </div>
        <div className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
          <div className="justify-self-start"><Google /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with google</p>
          </div>
        </div> */}
        {/* <div className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
          <div className="justify-self-start"><Twitter /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with Twitter</p>
          </div>
        </div>
        <div className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
          <div className="justify-self-start"><Instagram /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with Instagram</p>
          </div>
        </div> */}
      </div>

      <div className="my-2 flex flex-col items-center">
        <p className="text-sm text-center mb-4 text-xs">
          By continuing, you agree to Hipi's
          <span onClick={()=>router.push('/terms-conditions.html')} className="font-semibold"> Term of Use </span>
          and confirm that you have read Hipi's
          <span onClick={()=>router.push('/privacy-policy.html')} className="font-semibold"> Privacy Policy </span>
        </p>
        <p>
          Already have an account?
          <span onClick={() => toggle('login')} className="text-red-600 font-medium"> Log in</span>
        </p>
      </div>
    </div>
  );
}
