import GoatDesk from '../src/components/goat-desk';
import GoatMob from '../src/components/goat-mob';
import { getItem } from '../src/utils/cookie';

export default function Hipi() {
 const device = getItem('device-type') || 'desktop';
 console.log(device);

  const selectedComp = {
    'desktop' : <GoatDesk />,
    'mobile' : <GoatMob/>
  }
  return (
    <>
    {selectedComp[device]}
    </>
  );
}