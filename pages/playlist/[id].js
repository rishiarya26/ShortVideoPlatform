import ChooseOnType from '../../src/components/choose-on-type';
import ProfilePlaylist from '../../src/components/profile-playlist';
import ProfilePlaylistIphone from '../../src/components/profile-playlist-iphone';

export default function Playlist() {
  
  return (
    <ChooseOnType android={<ProfilePlaylist/>} ios={<ProfilePlaylistIphone/>} />
  );
}