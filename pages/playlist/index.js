import ChooseOnType from '../../src/components/choose-on-type';
 import ProfilePlaylist from '../../src/components/profile-feed';
import ProfileFeedIphone from '../../src/components/profile-feed-iphone';
// import ProfileFeed from '../../src/components/profile-feed';
// import ProfileFeedIphone from '../../src/components/profile-feed-iphone';

export default function Playlist() {

  return (
    <ChooseOnType android={<ProfilePlaylist/>} ios={<ProfilePlaylist/>} />
  );
}
