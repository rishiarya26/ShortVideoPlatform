import ChooseOnType from '../../src/components/choose-on-type';
import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';
import ProfileFeed from '../../src/components/profile-feed';
import ProfileFeedIphone from '../../src/components/profile-feed-iphone';

export default function Hipi() {
  return (
    <ChooseOnType android={<ProfileFeed/>} ios={<ProfileFeedIphone/>} />
  );
}
