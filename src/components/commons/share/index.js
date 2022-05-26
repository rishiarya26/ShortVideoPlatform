import useDevice, { devices } from '../../../hooks/use-device';
import useDrawer from '../../../hooks/use-drawer';
import { share } from '../../../utils/app';
import Share from '../svgicons/share';
import ShareOutline from '../svgicons/share-outline';

export const ShareComp = ({ videoId, type='normal'}) => {
 
  // const { show } = useDrawer();

  // const type = { desktop: (() => show('Share', null, 'medium')), mobile: ()=>share(videoId) };

  // const value = useDevice(devices, [type.desktop, type.mobile]);

  return (
    <div className="flex flex-col justify-center items-center">
      {' '}
{ type === 'profile' ?  <ShareOutline/> :
      (
      <><Share />  
      <p className="text-xs mt-1 text-center">Share</p>
      </>)}
    </div>
  );
};
