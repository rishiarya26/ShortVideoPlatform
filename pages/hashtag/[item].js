import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DeskHashtag from '../../src/components/desk-hashtag';
import HashTag from '../../src/components/explore-hashtag';
import { getItem } from '../../src/utils/cookie';
import { updateCampaignId, updateUtmData } from '../../src/utils/web';

export default function Hipi() {
  const router = useRouter();
  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
    updateCampaignId(queryStrings);
  },[])

  const device = getItem('device-type')

  // if(device === 'desktop'){
  //   router?.push('/');
  //   return null;
  // }

  return (
    <>
      {device === 'mobile' ? <HashTag /> : 
       device === 'desktop' && <DeskHashtag/>}
    </>
  );
}

