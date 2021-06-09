import React, { useState } from 'react';
import { withRouter } from 'next/router';
import Like from '../commons/svgicons/like';
import Liked from '../commons/svgicons/liked';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import Shop from '../commons/svgicons/shop';
// import { share } from '../../utils/app';
// import { CopyToClipBoard } from '../../utils/web';
// import { getCurrentUri } from '../../utils/location';
// import { getDeviceType } from '../../hooks/use-device';
// import useDrawer from '../../hooks/use-drawer';
// import useSnackBar from '../../hooks/use-snackbar';
import { postLike, deleteLike } from '../../sources/social';

// const DummyComp = () => (<div />);
// const CommentTray = dynamic(() => import('../comment-tray'), {
//   loading: () => <div />,
//   ssr: false
// });

function VideoSidebar({
  socialId, type, profilePic, likes, router, videoOwnersId, handleSaveLook, saveLook, canShop, saved,
  profileFeed
}) {
  // const { show } = useDrawer();
  // const { showSnackbar } = useSnackBar();
  const [liked, setLiked] = useState(false);

  const handleProfileClick = () => {
    router.push({
      pathname: '/users/[pid]',
      query: { pid: videoOwnersId }
    });
  };

  return (
    <div
      className={`${
        type === 'feed' ? 'bottom' : 'bottom'
      } text-white`}
    >
      <div onClick={handleProfileClick} className="relative py-3  px-1 text-center flex justify-center">
        <img
          alt="profile-pic"
          className="usrimg w-12 h-12 rounded-full"
          src={profilePic}
        />
        <div
          className={`${
            type === 'feed' ? 'block' : 'hidden'
          } absolute bottom-0`}
        >
          <Follow />
        </div>
      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-3  px-1 text-center justify-center`}
      >
        {liked ? (
          <div>
            <div
              role="presentation"
              onClick={() => {
                deleteLike({ socialId });
                setLiked(false);
              }}
            >
              <Liked />
            </div>

            <p className="text-sm">{likes + 1}</p>
          </div>
        ) : (
          <div>
            <div
              role="presentation"
              onClick={() => {
                postLike({ socialId });
                setLiked(true);
              }}
            >
              <Like />
            </div>
            <p className="text-sm">{likes}</p>
          </div>
        )}
      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-3  px-1 text-center items-center flex-col`}
      >
        <Comment />
        <p className="text-sm">0</p>
      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-3  px-1 text-center items-center flex-col`}
      >
        <Share />

        <p className="text-sm">Share</p>
      </div>
      {/* <div
        role="presentation"
        className={`${
          props.type === 'feed' ? 'block' : 'hidden'
        } relative py-3  px-1 text-center flex flex-col items-center`}
        onClick={() => show(` ${props.comment} comments`, CommentTray, 'md', props)}
      >
        <Comment />
        <p className="text-sm">{props.comment}</p>
      </div> */}
      {/* <div className={`${props.type === 'feed' ? 'block' : 'hidden'}`}>
       <ShareComp
        show={showSnackbar}
        shareCount={props.share}
      />
      </div> */}

      {canShop === 'success' && (!profileFeed
        ? saveLook
        && (
          <div
            className={`${
              type === 'feed' ? 'block' : 'hidden'
            } relative py-3 px-0 mt-8 text-center flex flex-col items-center`}
            onClick={handleSaveLook}
          >
            <Shop text={!saved ? 'save look' : 'saved'} />
          </div>
        )
        : (
          <div
            className={`${
              type === 'feed' ? 'block' : 'hidden'
            } relative py-3 px-0 mt-8 text-center flex flex-col items-center`}
            onClick={handleSaveLook}
          >
            <Shop text={!saved ? 'save look' : 'saved'} />
          </div>
        )
      )}
    </div>
  );
}

export default withRouter(VideoSidebar);
