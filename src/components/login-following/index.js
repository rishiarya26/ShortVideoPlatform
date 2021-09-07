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
      <div className='w-screen h-screen bg-black'>
          <button onClick={showLoginOptions} className='w-10 h-5 bg-white'>
              Login
          </button>
      </div>
    )
}

export default LoginFollowing;