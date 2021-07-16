import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Like from '../commons/svgicons/like';
import Liked from '../commons/svgicons/liked';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Shop from '../commons/svgicons/shop';
import EmbedIcon from '../commons/svgicons/embedicon';
// import { share } from '../../utils/app';
// import { CopyToClipBoard } from '../../utils/web';
// import { getCurrentUri } from '../../utils/location';
// import { getDeviceType } from '../../hooks/use-device';
import useDrawer from '../../hooks/use-drawer';
// import useSnackBar from '../../hooks/use-snackbar';
// import { postLike, deleteLike } from '../../sources/social';
import useAuth from '../../hooks/use-auth';
import { ShareComp } from '../commons/share';
import useDialog from '../../hooks/use-dialog';

// const DummyComp = () => (<div />);
// const CommentTray = dynamic(() => import('../comment-tray'), {
//   loading: () => <div />,
//   ssr: false
// });

const login = dynamic(
  () => import('../auth-options'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const copyEmbedUrl = dynamic(
  () => import('../copy-embed-code.js'),
  {
    loading: () => <div />,
    ssr: false
  }
);

function VideoSidebar({
  // socialId,
  type, profilePic, likes, videoOwnersId, handleSaveLook, saveLook, canShop, saved,
  profileFeed, videoId
}) {
  const { show } = useDrawer();
  const { show: showDialog } = useDialog();
  const router = useRouter();
  // const { showSnackbar } = useSnackBar();
  const [liked, setLiked] = useState(false);

  const showLoginOptions = () => {
    show('', login, 'medium');
  };

  const like = () => setLiked(true);
  const selected = useAuth(showLoginOptions, like);

  const handleLike = () => {
    selected();
    // postLike({ socialId });
  };

  const handleProfileClick = () => {
    router.push({
      pathname: '/users/[pid]',
      query: { pid: videoOwnersId }
    });
  };

  return (
    <div
      className={`${saveLook ? 'bottom-12 ' : 'bottom-40 '} videoFooter absolute right-0 flex-col  flex text-white ml-2`}
    >
      <div onClick={handleProfileClick} className="relative py-3 px-3 text-center justify-end flex">
        <div className="flex flex-col items-center">
          <img
            alt="profile-pic"
            className="usrimg w-10 h-10 rounded-full"
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
      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-3  px-3 text-center justify-end`}
      >
        {liked ? (
          <div>
            <div
              role="presentation"
              onClick={() => {
                // deleteLike({ socialId });
                setLiked(false);
              }}
            >
              <Liked />
            </div>

            <p className="text-sm text-center">{likes + 1}</p>
          </div>
        ) : (
          <div>
            <div
              role="presentation"
              onClick={handleLike}

            >
              <Like />
            </div>
            <p className="text-sm text-center">{likes}</p>
          </div>
        )}

      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-3  px-3 text-center items-end flex-col`}
      >
        <div>
          <Comment />
          <p className="text-sm text-center">0</p>
        </div>
      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-3  px-3 text-center items-end flex-col `}
      >
        <ShareComp />
      </div>
      <div className={`${
        type === 'feed' ? 'flex' : 'hidden'
      } "relative py-3  px-3 text-center items-end flex-col mb-8`}
      >
        <div onClick={() => showDialog('Embed Code', copyEmbedUrl, { videoId })}>
          <EmbedIcon />
          <p className="text-sm text-center">embed</p>
        </div>
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
        && saveLook
        && (
          <div
            className={`${
              type === 'feed' ? 'block' : 'hidden'
            } relative py-3 px-0 mt-8 text-center flex flex-col items-center`}
            onClick={handleSaveLook}
          >
            <Shop text={!saved ? 'SAVE LOOK' : 'SAVED'} />
          </div>
        )
      )}

    </div>
  );
}

export default VideoSidebar;
