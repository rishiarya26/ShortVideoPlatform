/*eslint-disable react/display-name */
import dynamic from "next/dynamic";
import useDrawer from "../../hooks/use-drawer";

const login = dynamic(
    () => import('../auth-options'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

const LoginFollowing = () =>{
    const {show} = useDrawer();

    const showLoginOptions = () => {
        show('', login, 'medium');
      };
    
    return(
    //     <div className="h-screen bg-black  w-screen flex flex-col items-center justify-center">
    //     <div className="w-40 h-40 flex items-center justify-center bg-white rounded-full">
    //       <Door/>
    //     </div>
    //     <div className="text-lg text-white font-bold mt-8">
    //       Login to Follow Users
    //     </div>
    //     <div className="text-white mt-3">
    //       Kindly log in to start following other users
    //     </div>
    //     <div className="bg-red-600 rounded px-12 py-2 flex justify-center items-center text-white mt-8">
    //       Log In
    //     </div>
    //   </div>
      <div className='w-screen h-screen bg-black'>
          <button onClick={showLoginOptions} className='w-10 h-5 bg-white'>
              Login
          </button>
      </div>
    )
}

export default LoginFollowing;