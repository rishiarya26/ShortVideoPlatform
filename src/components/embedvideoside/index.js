import React from 'react';
import dynamic from 'next/dynamic';
import Like from '../commons/svgicons/like';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import { getMobileOperatingSystem } from '../../utils/get-mobile-operating-system';
import useDrawer from '../../hooks/use-drawer';

const DetectOperatingSystemModal = dynamic(
  () => import('../detect-operating-system-modal'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function EmbedVideoSidebar(props) {
  const { show } = useDrawer();

  const handleOperatingsystem = () => {
    const operatingSys = getMobileOperatingSystem();
    return operatingSys;
  };

  return (
    <div className="absolute right-0 text-white bottom-20">
      <div
        onClick={() => show('', DetectOperatingSystemModal, 'md',
          { handleOperatingsystem })}
        className="relative py-3  px-1 text-center flex justify-center"
      >
        <img
          alt="profile-pic"
          className="usrimg w-12 h-12 rounded-full"
          src={props.profilePic}
        />
        <div
          onClick={() => show('', DetectOperatingSystemModal, 'md',
            { handleOperatingsystem })}
          className="absolute bottom-0 left-1/3"
        >
          <Follow />
        </div>
      </div>
      <div
        onClick={() => show('', DetectOperatingSystemModal, 'md',
          { handleOperatingsystem })}
        className="relative py-3  px-1 text-center flex flex-col items-center"
      >
        <Like />
        <p className="text-sm">{props.likes}</p>
      </div>
      <div
        onClick={() => show('', DetectOperatingSystemModal, 'md',
          { handleOperatingsystem })}
        className="relative py-3  px-1 text-center flex flex-col items-center"
      >
        <Comment />
        <p className="text-sm">{props.likes}</p>
      </div>
      <div
        onClick={() => show('', DetectOperatingSystemModal, 'md',
          { handleOperatingsystem })}
        className="relative py-3  px-1 text-center flex flex-col items-center"
      >
        <Share />
      </div>
    </div>
  );
}

export default EmbedVideoSidebar;
