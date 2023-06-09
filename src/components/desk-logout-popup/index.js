import { useRouter } from 'next/router';
import useDialog from '../../hooks/use-dialog';
import useDrawer from '../../hooks/use-drawer';
import { getItem, removeItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';

const LogoutPopup = ({page, showMessage}) => {
const router = useRouter();
const {close} = useDialog();
const {close:closePopUp} = useDrawer();
const device = getItem('device-type')

  const logout = () => {
  try{
      localStorage.remove('tokens');
      localStorage.remove('user-id');
      localStorage.remove('user-details');
      closePopUp();
      showMessage({message: 'Logged Out Successfully'});
      router?.asPath && (window.location.href=router.asPath);
    }
    catch(e){
        showMessage({ message: 'Something went wrong' });
        console.log('errorww',e);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col z-1">
        <p className="  my-4 text-center px-4 pt-10"> Are you sure you want to logout ?</p>
        <div className="flex justify-between px-6 w-1/2 py-4">
            <div onClick={logout} className="flex font-medium cursor-pointer text-gray-600 border shadow-md border-gray-200 px-6 py-1">Yes</div>
            <div onClick={()=>{closePopUp()}} className='cursor-pointer text-gray-600 border shadow-md border-gray-200 px-6 py-1'>No</div>
        </div>
        
      </div>
    </>
  );
};

export default LogoutPopup;