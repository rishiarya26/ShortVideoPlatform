import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChooseOnType from '../../src/components/choose-on-type';
import HashTagFeed from '../../src/components/hashtag-feed';
import HashTagFeedIphone from '../../src/components/hashtag-feed-iphone';
import { updateUtmData } from '../../src/utils/web';
 
export default function Hipi() {
  const router = useRouter();

  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
  },[]);

  return (
    <ChooseOnType android={<HashTagFeed/>} ios={<HashTagFeedIphone/>} />
  );
}
