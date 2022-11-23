import { Back } from '../commons/svgicons/back';
import List from '../commons/svgicons/list';
import Terms from '../commons/svgicons/terms';
import PrivacyIco from '../commons/svgicons/privacy';
import Logout from '../commons/svgicons/logout';
import { useRouter } from 'next/router';
import { removeItem } from '../../utils/cookie';
import useDialog from '../../hooks/use-dialog';
import LogoutPopup from '../logout-popup';
import useSnackbar from '../../hooks/use-snackbar';

function ProfileMenu() {
const router = useRouter();
const {show : showDialog} = useDialog();
const {showSnackbar} = useSnackbar();
  return (
    <>
    <div className="headbar w-full flex h-16 shadow-md bg-white items-center p-4 justify-center">
        <div onClick={()=>router?.back()} className="absolute left-2 h-16 top-0 flex items-center">
          <Back />
        </div>
        <div className="font-bold">Settings & Privacy</div>
      </div>
<div className="flex flex-col p-4">
    <div className="flex flex-col">
      <div className="text-xs  py-3">ABOUT</div>
      <div onClick={()=>router && router.push('/community-guidelines.html')} className="flex items-center py-3">
        <List/>
        <p className="text-base px-3">Community Guidelines</p>
      </div>
      <div onClick={()=>router && router.push('/privacy-policy.html')} className="flex items-center py-3">
        <PrivacyIco/>
        <p className="text-base px-3">Privacy Policy</p>
      </div>
     
      <div onClick={()=>router && router.push('/terms-conditions.html')} className="flex items-center py-3">
        <Terms/>
        <p className="text-base px-3">Terms of Use</p>
      </div>
      <div onClick={()=>showDialog('Logout', LogoutPopup,'medium',{showMessage: showSnackbar})} className="flex items-center py-3">
        <Logout/>
        <p className="text-base px-3">Logout</p>
      </div>
    </div>
</div>
    </>
  );
}
export default ProfileMenu;
