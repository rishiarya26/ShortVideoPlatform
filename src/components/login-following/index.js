/*eslint-disable react/display-name */
import dynamic from "next/dynamic";
import useDrawer from "../../hooks/use-drawer";
import Door from "../commons/svgicons/door-open";
import FooterMenu from "../footer-menu";

// const login = dynamic(
//     () => import('../auth-options'),
//     {
//       loading: () => <div />,
//       ssr: false
//     }
//   );

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const LoginFollowing = () =>{
    const {show} = useDrawer();

    const showLoginOptions = () => {
        show('', detectDeviceModal, 'extraSmall');
      };
    
    return(
      <div className="h-screen bg-black  w-screen flex flex-col items-center justify-center">
        <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full">
          <Door/>
        </div>
        <div className="text-lg text-white font-bold mt-8">
          Download app to Follow Users
        </div>
        <div className="text-white mt-3 text-wrap wrap">
          Kindly download the app to start following other users
        </div>
        <button onClick={showLoginOptions} className='bg-red-400 rounded px-12 py-2 flex justify-center items-center text-white mt-8'>
              Download
          </button>
        <div className="absolute left-0 bottom-0">
        <FooterMenu
          type="noshop"
          selectedTab="home"
        />
        </div>
      </div>
    )
}

export default LoginFollowing;