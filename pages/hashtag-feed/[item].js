import ChooseOnType from '../../src/components/choose-on-type';
import HashTagFeed from '../../src/components/hashtag-feed';
import HashTagFeedIphone from '../../src/components/hashtag-feed-iphone';
 
export default function Hipi() {
  return (
    <ChooseOnType android={<HashTagFeed/>} ios={<HashTagFeedIphone/>} />
  );
}
