import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChooseOnType from '../../src/components/choose-on-type';
import DeskFeed from '../../src/components/desk-feed';
import Feed from '../../src/components/feed';
import FeedIphone from '../../src/components/feed-iphone';
import { getItem } from '../../src/utils/cookie';
import { updateUtmData } from '../../src/utils/web';

export default function Hipi() {
  const router = useRouter();
  const device = getItem('device-type')
  // console.log('latest build')

  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
  },[])

  return (
    <>
    {device === 'desktop' ?  <DeskFeed/> : 
    device === 'mobile' &&
    <ChooseOnType android={<Feed/>} ios={<FeedIphone/>}/>}
    </>
  );
}


