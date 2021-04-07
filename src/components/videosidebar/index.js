import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Like from '../commons/svgicons/like';
import Liked from '../commons/svgicons/liked';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import Shop from '../commons/svgicons/shop';
import { share } from '../../utils/app';
import { getDeviceType } from '../../hooks/use-device';
import useDrawer from '../../hooks/use-drawer';
import { postLike, deleteLike } from '../../sources/social';

const CommentTray = dynamic(
  () => import('../comment-tray'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const shareThis = async () => {
  if (getDeviceType() === 'desktop') {
    // show toast
    return;
  }
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
    className="relative py-3  px-1 text-center flex flex-col items-center"
  >
    <Share />
    <p className="text-sm">{shareCount}</p>
  </div>
);

function VideoSidebar(props) {
  const { show } = useDrawer();
  const [liked, setLiked] = useState(false);
  const { socialId } = props;

  return (
    <div className={`${props.type === 'feed' ? 'bottom-16' : 'bottom-36'} absolute right-0 text-white`}>
      <div className="relative py-3  px-1 text-center flex justify-center">
        <img
          alt="profile-pic"
          className="usrimg w-12 h-12 rounded-full"
          src={props.profilePic}
        />
        <div className="absolute bottom-0 left-1/3">
          <Follow />
        </div>
      </div>
      <div className="relative py-3  px-1 text-center">
        {liked ? (
          <div
            role="presentation"
            onClick={
              () => {
                deleteLike({ socialId });
                setLiked(false);
              }
            }
          >
            <Liked />
          </div>
        ) : (
          <div
            role="presentation"
            onClick={
              () => {
                postLike({ socialId });
                setLiked(true);
              }
            }
          >
            <Like />
          </div>
        )}
        <p className="text-sm">{props.likes}</p>
      </div>
      <div
        role="presentation"
        className="relative py-3  px-1 text-center flex flex-col items-center"
        onClick={() => show(` ${props.comment} comments`, CommentTray, 'md', props)}
      >
        <Comment />
        <p className="text-sm">{props.comment}</p>
      </div>

      <ShareComp shareCount={props.share} />

      <div className="relative py-3  px-1 text-center flex flex-col items-center">
        <Shop />
      </div>

    </div>
  );
}

export default VideoSidebar;
