import dynamic from 'next/dynamic';
import ChooseOnType from '../../src/components/choose-on-type';


const Feed = dynamic(()=> import('../../src/components/profile-playlist'),{
  loading: () => <div />,
  ssr: false
});
const FeedIphone = dynamic(()=> import('../../src/components/profile-playlist-iphone'),{
  loading: () => <div />,
  ssr: false
});


export default function Playlist() {
  
  return (
    <ChooseOnType android={<Feed/>} ios={<FeedIphone/>} />
  );
}