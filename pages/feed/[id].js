import { useRouter } from 'next/router';
import ChooseFeed from '../../src/components/choose-feed';
import { getItem } from '../../src/utils/cookie';

export default function Hipi() {
  const router = useRouter();
  const device = getItem('device-type')

  if(device === 'desktop'){
    router.push('/');
    return null;
  }

  return (
    <>
   <ChooseFeed/>
    </>
  );
}


