import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChooseOnType from '../../src/components/choose-on-type';
import ProfileFeed from '../../src/components/profile-feed';
import ProfileFeedIphone from '../../src/components/profile-feed-iphone';
import { updateCampaignId, updateUtmData } from '../../src/utils/web';

export default function Hipi() {
  const router = useRouter();

  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
    updateCampaignId(queryStrings);
  },[])

  return (
    <ChooseOnType android={<ProfileFeed/>} ios={<ProfileFeedIphone/>} />
  );
}
