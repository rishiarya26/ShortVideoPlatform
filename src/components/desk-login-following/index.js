/*eslint-disable react/display-name */
import dynamic from "next/dynamic";
import { ONE_TAP_DOWNLOAD } from "../../constants";
import useAuth from "../../hooks/use-auth";
import useDrawer from "../../hooks/use-drawer";
import useSnackbar from "../../hooks/use-snackbar";
import { getOS } from "../../utils/device-details";
import Door from "../commons/svgicons/door-open";
import FooterMenu from "../footer-menu";

const login = dynamic(
    () => import('../auth-options'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

// const detectDeviceModal = dynamic(
//   () => import('../open-in-app'),
//   {
//     loading: () => <div />,
//     ssr: false
//   }
// );

const LoginFollowing = ({toTrackMixpanel, activeIndex}) =>{
    const {show} = useDrawer();

    // const stores = {
    //   android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
    //   ios: 'https://apps.apple.com/in/app/zee5-shows-live-tv-movies/id743691886'
    // };
    
    // const onStoreRedirect =()=>{
    //   toTrackMixpanel(activeIndex,'cta',{name: 'Download App', type: 'Link'})
    //   const device = getOS();
    //   device && (window.location.href = `${stores[device]}`);
    // }
  
       
    // const onStoreRedirect =()=>{
    //   toTrackMixpanel(activeIndex,'cta',{name: 'Download App', type: 'Link'})
    //   window.open(ONE_TAP_DOWNLOAD);
    // }

    const {showSnackbar} = useSnackbar();

    const showMessage=({message})=>{
       showSnackbar({message: message})
    }
    const showLoginOptions = () => {
        show('', login, 'big',{showMessage: showMessage});
      };

    return(
      <div className=" bg-black flex flex-col items-center justify-center">
        <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full">
          <Door/>
        </div>
        {/* <div className="text-lg text-white font-bold mt-8">
        Login app to see Following Users
        </div> */}
        <div className="text-md text-white font-semibold mt-3 text-wrap wrap w-full p-2 text-center">
        Log in to see videos from creators you follow
        </div>
        <button onClick={showLoginOptions} className='bg-hipired rounded px-12 py-2 flex justify-center items-center text-white mt-8'>
              Login
          </button>
        <div className="absolute left-0 bottom-0">
        </div>
      </div>
    )
}

export default LoginFollowing;