import { useRouter } from 'next/router';
import useDialog from '../../hooks/use-dialog';
import useSnackbar from '../../hooks/use-snackbar';
import { removeItem } from '../../utils/cookie';

const LogoutPopup = () => {
const router = useRouter();
const {close} = useDialog();
const {showSnackbar} = useSnackbar();

  const logout = () => {
  try{
      const removed = removeItem('tokens');
      if(removed === true){
      close();
      router?.push('/feed/for-you');
      }else{
        showSnackbar({ message: 'Something went wrong' });
      }
    }
    catch(e){
        showSnackbar({ message: 'Something went wrong' });
        console.log('error',e);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col z-1">
        <p className=" my-4 break-all px-2"> Are you sure you want to logout?</p>
        <div className="flex justify-between px-6 w-1/2 py-4">
            <div onClick={logout} className="flex font-medium">Yes</div>
            <div onClick={()=>close()}>No</div>
        </div>
        
      </div>
    </>
  );
};

export default LogoutPopup;