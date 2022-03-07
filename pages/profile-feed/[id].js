import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChooseOnType from '../../src/components/choose-on-type';
import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';
import ProfileFeed from '../../src/components/profile-feed';
import ProfileFeedIphone from '../../src/components/profile-feed-iphone';
import { updateUtmData } from '../../src/utils/web';

export default function Hipi() {
  const router = useRouter();

  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
  },[])

  return (
    <ChooseOnType android={<ProfileFeed/>} ios={<ProfileFeedIphone/>} />
  );
}
