/*eslint-disable @next/next/no-img-element */
 /*eslint-disable @next/next/no-html-link-for-pages*/
 /*eslint-disable react/display-name */
import { withBasePath } from '../../config';
import { useRouter } from 'next/router';
import Qr from '../commons/svgicons/qr';
import dynamic from 'next/dynamic';
import useDrawer from '../../hooks/use-drawer';
import Youtube from '../commons/svgicons/youtube';
import FbW from '../commons/svgicons/facebook-white';
import InstagramW from '../commons/svgicons/instagram-white';
import TwitterW from '../commons/svgicons/twitter-white';

const DeskQr = dynamic(
    () => import('../desk-qr-code'),
    {
      loading: () => <div />,
      ssr: false
    }
  );


function StaticFooter() {

  const router = useRouter();

  const links={
    facebook : 'https://www.facebook.com/HiPiOfficialApp',
    twitter : 'https://twitter.com/HiPiOfficialApp',
    instagram : 'https://www.instagram.com/hipiofficialapp/?hl=en',
    youtube : 'https://www.youtube.com/channel/UCXEcEOyCcXzEU4UCLtBL6SQ'
  }
    //Desktop links
    const stores = {
      android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
      ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
    };
  
    // const {close} = useDrawer();
  
    const onStoreRedirect =(device)=>{
      device && (window?.open(`${stores[device]}`));
    }
    const {show} = useDrawer();
  return (
    <div className='flex w-full flex-col'>
    <div className="w-full static_footer bg-black flex py-3 justify-between flex-col px-10 text-gray-300 border-b border-gray-500">
        <div className='flex flex-col justify-center items-center'>
            <div className='text-xl font-semibold text-gray-100 pb-2 pt-4'>
              Download now
            </div>
           
<div className="flex justify-center md:w-1/2 items-center px-10 py-2 md:py-0 md:mt-6 md:mb-6">
        <div className='hidden md:flex px-4 py-1.5 border border-gray-300 hover:border-gray-200 cursor-pointer mx-4 items-center rounded' onClick={()=>show('Download App',DeskQr,'broad','medium')}> <Qr/> <p className='max-w-max ml-1 text-xs'>QR CODE</p></div>
            <div onClick={()=>onStoreRedirect('android')} className=" w-32 mx-4"> <img className="cursor-pointer " src={withBasePath('icons/play_store_1.png')} alt="hipi logo" /></div>
            <div onClick={()=> onStoreRedirect('ios')} className=" w-32 mx-2"><img src={withBasePath('icons/app_store_2.png')} className="cursor-pointer" alt="hipi logo" /> </div>
          </div>
        </div>
    </div>
    <div className="w-full static_footer bg-black flex py-3 justify-between flex-col px-10 text-gray-300">
        <div className="flex w-full text-xs justify-between flex-col md:flex-row py-4">
        <div className="flex flex-col">
          <div className="flex text-gray-400 flex-col md:flex-row">
          <div className="mx-2 cursor-pointer mb-2 hover:text-gray-200" onClick={()=>router?.push('/about')}>About</div>
          <p className="hidden md:flex text-xs leading-5 text-gray-500">|</p>
          <div className="mx-2 cursor-pointer mb-2 hover:text-gray-200" onClick={()=>router?.push('/terms-conditions.html')}>Terms of Use</div>
          <p className=" hidden md:flex text-xs leading-5 text-gray-500">|</p>
          <div className="mx-2 cursor-pointer mb-2 hover:text-gray-200" onClick={()=>router?.push('/community-guidelines.html')} >Community Guidelines</div>
          <p className="hidden md:flex text-xs leading-5 text-gray-500">|</p>
          <div className="mx-2 cursor-pointer mb-2 hover:text-gray-200" onClick={()=>router?.push('/privacy-policy.html')}>Privacy Policy</div>
          <p className="hidden md:flex text-xs leading-5 text-gray-500">|</p>
          <div className="mx-2 cursor-pointer mb-2 hover:text-gray-200" onClick={()=>router.push('/brand-assets')}>Brand Assets</div>
          </div> 
          <div className="flex w-full text-gray-400 text-xs items-center px-2 mt-2">
          <p>Copyright © 2022. All rights reserved.</p>
        </div>
        </div>
          <div className="flex md:justify-end py-2 md:py-0   items-center w-1/5">
             
            <a target="_blank" href={links.facebook} className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4" rel="noreferrer">
             <FbW/>
            </a>
            <a target="_blank" href={links.instagram} className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4" rel="noreferrer">
             <InstagramW/>
            </a>
            <a target="_blank" href={links.twitter} className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4" rel="noreferrer">
              <TwitterW/>
            </a>
            <a target="_blank" href={links.youtube} className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4" rel="noreferrer">
                <Youtube/>
            </a>
            {/* <a href="#" className="bg-gray-500 rounded-full p-2 bg-opacity-30 flex justify-center items-center mr-4">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="11">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 1.52588e-05H15.7748V10.9952H0V1.52588e-05Z" fill="white" />
                </mask>
                <g mask="url(#mask0)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.85188 7.94613V2.72945C7.52365 3.6019 9.18491 4.46819 10.867 5.3459C9.18994 6.21562 7.52823 7.07688 5.85188 7.94613ZM15.5022 1.76876C15.3093 0.929674 14.6231 0.310931 13.7968 0.218588C11.8411 7.39693e-05 9.86126 -0.00106889 7.89029 7.39674e-05C5.91886 -0.00106889 3.93897 7.39693e-05 1.98263 0.218588C1.1568 0.310931 0.471086 0.929903 0.278171 1.76876C0.00319999 2.96327 0 4.26773 0 5.49767C0 6.72762 0 8.03162 0.2752 9.22659C0.467886 10.0654 1.1536 10.6842 1.97966 10.7763C3.93577 10.995 5.91566 10.9962 7.88709 10.995C9.85851 10.9962 11.8379 10.995 13.7938 10.7763C14.6197 10.6842 15.3058 10.0654 15.4992 9.22659C15.7742 8.03185 15.7749 6.72762 15.7749 5.49767C15.7749 4.26773 15.7771 2.9635 15.5022 1.76876Z" fill="white" />
                </g>
              </svg>
            </a> */}

          </div>
        </div>
        

      </div>
      </div>
  );
}

export default StaticFooter;

