import { useRouter } from 'next/router';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import useDialog from '../../hooks/use-dialog';
import useDrawer from '../../hooks/use-drawer';
import { getItem, removeItem } from '../../utils/cookie';
import { localStorage } from '../../utils/storage';

const LogoutPopup = ({showMessage}) => {
const router = useRouter();
const {close} = useDialog();
const {close:closePopUp} = useDrawer();
const device = getItem('device-type')

  const logout = () => {
  try{
    toTrackMixpanel('logoutInitiated')
    toTrackMixpanel('logoutInitiated')
      localStorage.remove('tokens');
      localStorage.remove('user-id');
      const langSelectedInfo = localStorage.get('lang-codes-selected') || null;
      langSelectedInfo?.type === 'profile' && localStorage.remove('lang-codes-selected')
      toTrackMixpanel('logoutSuccess')
      // if(device === 'desktop'){
      //   closePopUp();
      // }else if(device === 'mobile'){
        close();
        showMessage({ message: 'Logged Out Successfully' });
        window.location.href = '/feed/for-you'
        console.log("logged out *")
      // }
    }
    catch(e){
      toTrackMixpanel('logoutFailure')
      showMessage({ message: 'Something went wrong' });
        console.log('errorww',e);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col z-1">
        <p className="  my-4 text-center px-4 pt-14"> Are you sure you want to logout ?</p>
        <div className="flex justify-between px-6 py-4">
            <div onClick={logout} className="flex font-medium cursor-pointer text-gray-600 border shadow-md border-gray-200 px-6 mx-2 py-1">Yes</div>
            <div onClick={()=>close()} className="flex font-medium cursor-pointer text-gray-600 border shadow-md border-gray-200 px-6 mx-2 py-1">No</div>
        </div>
        
      </div>
    </>
  );
};

export default LogoutPopup;