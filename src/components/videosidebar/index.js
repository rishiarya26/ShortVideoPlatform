import React, { useState } from 'react';
import Like from '../commons/svgicons/like';
import Liked from '../commons/svgicons/liked';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import Shop from '../commons/svgicons/shop';
import { share } from '../../utils/app';
import useDevice, { devices } from '../../hooks/use-device';
import Commenttray from '../commenttray';
import useDrawer from '../../hooks/use-drawer';

const DummyComp = () => (<div />);

const shareThis = async () => {
  try {
    await share();
  } catch (e) {
    console.error(e);
  }
};

const ShareComp = ({ shareCount }) => (
  <div
    role="presentation"
    onClick={shareThis}
    className="relative p-3 text-center flex flex-col items-center"
  >
    <Share />
    <p className="text-sm">{shareCount}</p>
  </div>
);

function VideoSidebar(props) {
  const { show } = useDrawer();
  const [liked, setLiked] = useState(false);
  const Comp = useDevice(devices, [ShareComp, DummyComp], DummyComp);
  return (
    <div className="absolute bottom-12 right-3 text-white">
      <div className="relative p-3 text-center flex justify-center">
        <img
          alt="profile-pic"
          className="usrimg w-12 h-12 rounded-full"
          src={props.profilePic}
        />
        <div className="absolute bottom-0 left-1/3">
          <Follow />
        </div>
      </div>
      <div className="relative p-3 text-center">
        {liked ? (
          <div role="presentation" onClick={() => setLiked(false)}>
            <Liked />
          </div>
        ) : (
          <div role="presentation" onClick={() => setLiked(true)}>
            <Like />
          </div>
        )}
        <p className="text-sm">{props.likes}</p>
      </div>
      <div className="relative p-3 text-center flex flex-col items-center" onClick={() => show(' 3 comments', Commenttray)}>
        <Comment />
        <p className="text-sm">{props.comment}</p>
      </div>

      <Comp shareCount={props.share} />

      <div className="relative p-3 text-center flex flex-col items-center">
        <Shop />
      </div>

    </div>
  );
}

export default VideoSidebar;
