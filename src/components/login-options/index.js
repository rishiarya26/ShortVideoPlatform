/*eslint-disable react/no-unescaped-entities */
import Mobile from '../commons/svgicons/mobile';
import useDrawer from '../../hooks/use-drawer';
import {GoogleButton} from '../social-login/google'
import { useRouter } from 'next/router';
import Close from '../commons/svgicons/close-black';
import { getItem } from '../../utils/cookie';
import { useEffect } from 'react';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';

export default function Login({ toggle, loading, setAuth, pageName, tabName=null }) {
  const { close } = useDrawer();
  const router = useRouter();
  const device = getItem('device-type')

  useEffect(()=>{
    toTrackMixpanel('popupLaunch',{pageName:pageName, tabName:(tabName && tabName) || '', name:'Login'})
  },[])

  // const {showSnackbar} = useSnackbar();
  // useEffect(()=>{showSnackbar({message : 'working 3'})},[])

  const chooseComp = {
    mobile :   
       <div onClick={()=>{
        toTrackMixpanel('popupCta',{pageName:pageName, tabName:(tabName && tabName) || '',name:'Login',ctaName:'Phone or Email', elemant:'Phone or Email'})
         router && router.push('/login/phone?option=password')}}>
        <div onClick={() => close()} className="flex border border-1 border-gray-400 py-3 px-4 w-full my-2">
          <div className="justify-self-start"><Mobile /></div>
          <div className="flex justify-center items-center text-sm md:text-base w-full text-gray-600 font-semibold">
            <p>Use phone or Email</p>
          </div>
        </div>
      </div>,
    desktop : 
      <div onClick={()=>setAuth('login')}>
      <div className="flex border border-1 border-gray-400 py-3 px-4 w-full my-2">
        <div className="justify-self-start"><Mobile /></div>
        <div className="flex justify-center items-center text-sm md:text-base w-full text-gray-600 font-semibold">
          <p>Use phone or Email</p>
        </div>
      </div>
    </div>
  }

  return (
    <div className="px-4 py-2 flex flex-col w-full items-center">
      {device === 'mobile' && <div onClick={close} className='flex w-full justify-end p-2'>
      <Close/>
   </div>}
      <div className="p-2 flex flex-col items-center">
        <h1 className="text-lg font-bold">Login to Hipi</h1>
        <p className="text-center text-gray-400 mt-2 text-sm">Like the video, manage your account and do much more</p>
      </div>
      <div className="socail flex flex-col w-full my-4">
       {chooseComp[device]}
        <GoogleButton loading={loading} type='login' />
        {/* <div className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
          <div className="justify-self-start"><Fb /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with facebook</p>
          </div>
        </div> */}
        {/* <div className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
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
        </div> */}
        {/* <div className="flex border border-1 border-gray-200 py-3 px-4 w-full my-2">
          <div className="justify-self-start"><Instagram /></div>
          <div className="flex justify-center w-full font-semibold">
            <p>Continue with Instagram</p>
          </div>
        </div> */}
      </div>
      <div className="my-2 text-xs md:text-base">
        <p>
          Don't have an account? 
          <span onClick={() => toggle('signup')} className="text-red-600 font-medium"> Sign Up</span>
        </p>
      </div>
    </div>
  );
}
