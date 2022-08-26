import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChooseOnType from '../../src/components/choose-on-type';
import Feed from '../../src/components/feed';
import FeedIphone from '../../src/components/feed-iphone';
import OneVideo from '../../src/components/one-video';
import { getItem } from '../../src/utils/cookie';
import { updateCampaignId, updateUtmData } from '../../src/utils/web';

export default function Hipi() {
    const router = useRouter();
  const device = getItem('device-type')
  // console.log('latest build')

  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
    updateCampaignId(queryStrings);
  },[])

  if(device === 'desktop'){ 
     router && router?.push('/');
    return null;
  }

  return (
    <>
   <OneVideo/>
    </>
  );
}