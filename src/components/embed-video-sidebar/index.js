/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/display-name*/
import React from 'react';
import dynamic from 'next/dynamic';
import Like from '../commons/svgicons/like';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import useDrawer from '../../hooks/use-drawer';

const detectDeviceModal = dynamic(
  //() => import('../download-app-widget'),
  () => import('../open-in-app'),
  {
    loading: () => <div />,
    ssr: false
  }
);


function EmbedVideoSidebar(props) {
  const { show } = useDrawer();

  const info = {
    single : 'bottom-36',
    embed : 'bottom-20'
  }

  return (
    <div className={`absolute right-0 text-white ${info[props.type]}`}>
      <div
        onClick={() => show('', detectDeviceModal, 'extraSmall',{text: "see profile"})}
        className="relative py-2 px-3 text-center flex justify-center"
      >
        <img
          alt="profile-pic"
          className="usrimg w-12 h-12 rounded-full"
          src={props.profilePic || "https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1625388234/hipi/videos/c3d292e4-2932-4f7f-ad09-b974207b1bbe/c3d292e4-2932-4f7f-ad09-b974207b1bbe_00.webp"}
        />
        <div
          onClick={() => show('', detectDeviceModal, 'extraSmall',{text: "follow"})}
          className="absolute bottom-0 left-1/3"
        >
          <Follow />
        </div>
      </div>
      <div
        onClick={() => show('', detectDeviceModal, 'extraSmall',{text: "like"})}
        className="relative py-2 px-3 text-center flex flex-col items-center"
      >
        <Like />
        <p className="text-sm">{props.likes}</p>
      </div>
      <div
        onClick={() => show('', detectDeviceModal, 'extraSmall',{text: "comment"})}
        className="relative py-2 px-3 text-center flex flex-col items-center"
      >
        <Comment />
        <p className="text-sm">{props.likes}</p>
      </div>
      <div
        onClick={() => show('', detectDeviceModal, 'extraSmall',{text: "share"})}
        className="relative py-2 px-3 text-center flex flex-col items-center"
      >
        <Share />
      </div>
    </div>
  );
}

export default EmbedVideoSidebar;
