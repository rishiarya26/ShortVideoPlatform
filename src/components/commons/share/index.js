import useDevice, { devices } from '../../../hooks/use-device';
import useDrawer from '../../../hooks/use-drawer';
import { share } from '../../../utils/app';
import Share from '../svgicons/share';

export const ShareComp = ({videoId}) => {
  const { show } = useDrawer();

  const type = { desktop: (() => show('Share', null, 'medium')), mobile: ()=>share(videoId) };

  const value = useDevice(devices, [type.desktop, type.mobile]);

  return (
    <div onClick={value}>
      {' '}
      <Share />
      <p className="text-sm text-center">Share</p>
    </div>
  );
};
