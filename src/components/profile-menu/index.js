import { Back } from '../commons/svgicons/back';
import List from '../commons/svgicons/list';
import Terms from '../commons/svgicons/terms';
import PrivacyIco from '../commons/svgicons/privacy';
import Logout from '../commons/svgicons/logout';

function ProfMenu() {

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
      <div className="flex items-center py-3">
        <List/>
        <p className="text-base px-3">Community Guidelines</p>
      </div>
      <div className="flex items-center py-3">
        <PrivacyIco/>
        <p className="text-base px-3">Privacy Policy</p>
      </div>
     
      <div className="flex items-center py-3">
        <Terms/>
        <p className="text-base px-3">Terms of Use</p>
      </div>
      <div className="flex items-center py-3">
        <Logout/>
        <p className="text-base px-3">Logout</p>
      </div>
    </div>
</div>

      

    </>
  );
}
export default ProfMenu;
