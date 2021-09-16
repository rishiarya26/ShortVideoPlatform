/*eslint-disable react/display-name */
import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';
import MusicBlack from '../commons/svgicons/music-black';
import useDrawer from '../../hooks/use-drawer';
import dynamic from 'next/dynamic';

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);


function VideoFooter({
  userName,
  musicTitle,
  hashTags,
  canShop,
  saveLook,
  comp
}) {
  // TO-DO common classes
  const type = {
    profile: `${canShop === 'success' ? 'bottom-28' : 'bottom-6'} videoFooter absolute left-0  flex text-white ml-2`,
    feed: `${saveLook ? ' bottom-16 ' : ' bottom-40 '} videoFooter absolute left-0  flex text-white ml-2 mb-2`,
    embed: `${canShop === 'success' ? 'bottom-28' : 'bottom-6'} videoFooter   flex`,
    single: `${canShop === 'success' ? 'bottom-36' : 'bottom-28'} videoFooter absolute left-0  flex text-white ml-2`,
  };
  const { show } = useDrawer();

  const music = {
    profile:    <Music />,
    feed:   <Music />,
    embed : <MusicBlack/>,
  }
  return (
    <div
      className={type[comp]}
    >
      <div className="videoFooter__text w-2/3">
        {/*
        {canShop === 'success' && (
          <div className="bg-opacity-50 bg-white py-1 px-2 text-black font-semibold max-w-max rounded-lg my-1 text-sm ">
            Shoppable
          </div>
        )} */}

        <h3 onClick={()=>show('', detectDeviceModal, 'extraSmall', {text: "profile"})} className=" mb-1 mt-1.5 font-semibold text-sm ">@{userName}</h3>
        <div className="font-bold text-xs mb-3 mt-2">
          {hashTags
            && hashTags.map((data, id) => (
              <span onClick={()=>show('', detectDeviceModal, 'extraSmall', {text: "profile"})} key={id}>{`#${data.name}${' '}`}</span>
            ))}
        </div>
        {/* {musicCoverTitle}</p> */}
        <div className="w-8/12 my-1 text-xs">
          {music[comp]}
          <span onClick={()=>show('', detectDeviceModal, 'extraSmall', {text: "profile"})} className=" my-1 text-xs w-4/12">
            <Marquee text={musicTitle} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
