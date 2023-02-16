/*eslint-disable react/no-unescaped-entities */
import Mobile from '../commons/svgicons/mobile';
import useDrawer from '../../hooks/use-drawer';
import {GoogleButton} from '../social-login/google'
import { useRouter } from 'next/router';
import Close from '../commons/svgicons/close-black';
import { getItem } from '../../utils/cookie';
import { useEffect } from 'react';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { toTrackClevertap } from '../../analytics/clevertap/events';

export default function Login({ loading, setAuth, pageName, tabName=null, toggleFlow }) {
  const { close } = useDrawer();
  const router = useRouter();
  const device = getItem('device-type')

  const privacyAndTermsOnClick = (page) => {
    let newPage = window.location.origin;
    if(page === "privacy") {
      newPage = `${newPage}/privacy-policy.html`;
      window.open(newPage, "_blank");
    } else {
      newPage = `${newPage}/terms-conditions.html`;
      window.open(newPage, "_blank");
    }
  }

  useEffect(()=>{
    toTrackMixpanel('popupLaunch',{pageName:pageName, tabName:(tabName && tabName) || '', name:'Login or Signup Screen'})
    toTrackClevertap('popupLaunch',{pageName:pageName, tabName:(tabName && tabName) || '', name:'Login or Signup Screen'})
  },[])

  useEffect(() => {
    window.sessionStorage.removeItem("data");
  }, [])

  const chooseComp = {
    mobile :   
       <div onClick={()=>{
        toTrackMixpanel('popupCta',{pageName:pageName, tabName:(tabName && tabName) || ''}, {name:'Login',ctaName:'Phone or Email', elemant:'Phone or Email'})
        toTrackClevertap('popupCta',{pageName:pageName, tabName:(tabName && tabName) || ''}, {name:'Login',ctaName:'Phone or Email', elemant:'Phone or Email'})
         router && router.push('/login/phone')}}>
        <div onClick={() => close()} className="flex border border-1 border-gray-400 py-3 px-4 w-full my-2">
          <div className="justify-self-start"><Mobile /></div>
          <div className="flex justify-center items-center text-sm md:text-base w-full text-gray-600 font-semibold">
            <p>Use Phone or Email</p>
          </div>
        </div>
      </div>,
    desktop : 
      <div className='cursor-pointer' onClick={()=>setAuth('login')}>
      <div className="flex border border-1 border-gray-400 py-3 px-4 w-full my-2">
        <div className="justify-self-start"><Mobile /></div>
        <div className="flex justify-center items-center text-sm md:text-base w-full text-gray-600 font-semibold">
          <p>Use Phone or Email</p>
        </div>
      </div>
    </div>
  }

  return (
    <div className="px-4 py-2 flex flex-col w-full items-center">
      {device === 'mobile' && <div onClick={close} className='flex w-full justify-end p-2'>
      <Close/>
   </div>}
      <div className="p-2 flex flex-col items-center mt-6">
        <h1 className="text-lg font-bold">Login or Signup</h1>
        <p className="text-center text-gray-400 mt-2 text-sm">Make your own videos, follow other accounts, comment on videos and more</p>
      </div>
      <div className="socail flex flex-col w-full my-4">
       {chooseComp[device]}
       {!navigator?.userAgent?.match(/FBAN|FBAV/i) && 
        (
          <GoogleButton
            loading={loading}
            type='login'
            toggleFlow={toggleFlow}
            setAuth={setAuth}
          />
        )}
      </div>
      <div>
        <p className="text-center text-gray-400 mt-2 text-sm">
          By continuing, you agree to Hipi's <span onClick={() => privacyAndTermsOnClick('terms')} className='font-semibold cursor-pointer text-gray-600'>Terms of Use</span> and confirm that you have read Hipi's <span onClick={() => privacyAndTermsOnClick('privacy')}className='font-semibold cursor-pointer text-gray-600'>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
