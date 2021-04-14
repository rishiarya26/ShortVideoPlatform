import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Like from '../commons/svgicons/like';
import Liked from '../commons/svgicons/liked';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
// import Share from '../commons/svgicons/share';
// import Shop from '../commons/svgicons/shop';
// import { share } from '../../utils/app';
// import { CopyToClipBoard } from '../../utils/web';
// import { getCurrentUri } from '../../utils/location';
// import { getDeviceType } from '../../hooks/use-device';
import useDrawer from '../../hooks/use-drawer';
// import useSnackBar from '../../hooks/use-snackbar';
import { postLike, deleteLike } from '../../sources/social';

// const DummyComp = () => (<div />);
const CommentTray = dynamic(
  () => import('../comment-tray'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function VideoSidebar(props) {
  const { show } = useDrawer();
  // const { showSnackbar } = useSnackBar();
  const [liked, setLiked] = useState(false);
  const { socialId } = props;

  return (
    <div className={`${props.type === 'feed' ? 'bottom-16' : 'bottom-16'} absolute right-0 text-white`}>
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

      {/* <ShareComp
        show={showSnackbar}
        shareCount={props.share}
      />

      <div className="relative py-3  px-1 text-center flex flex-col items-center">
        <Shop />
      </div> */}

    </div>
  );
}

export default VideoSidebar;
