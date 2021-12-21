import { useRouter } from 'next/router';
import ChooseOnType from '../../src/components/choose-on-type';
import Feed from '../../src/components/feed';
import FeedIphone from '../../src/components/feed-iphone';
import { getItem } from '../../src/utils/cookie';

export default function Hipi() {
  const router = useRouter();
  const device = getItem('device-type')
  // console.log('latest build')

  if(device === 'desktop'){
    router?.push('/');
    return null;
  }

  return (
    <>
     <ChooseOnType android={<Feed/>} ios={<FeedIphone/>}/>
    </>
  );
}


