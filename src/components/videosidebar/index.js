/*eslint-disable react/no-unescaped-entities*/
/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/display-name */
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
import CopyEmbedCode from '../copy-embed-code.js';
import useSnackbar from '../../hooks/use-snackbar';

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

const detectDeviceModal = dynamic(
  () => import('../open-in-app'),
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
  const { showSnackbar } = useSnackbar();
  const { show: showDialog } = useDialog();
  const router = useRouter();
  // const { showSnackbar } = useSnackBar();

  const showLoginOptions = () => {
    show('', login, 'medium');
  };

  const like = () => show('', detectDeviceModal, 'extraSmall', {text: "like"});
  const comment = () => show('', detectDeviceModal, 'extraSmall', {text: "comment"});
  
  const selectedLike = useAuth(showLoginOptions, like);
  const selectedComment = useAuth(showLoginOptions, comment);

  const handleOperation = (e) => {
    const options = {
      like : selectedLike,
      comment : selectedComment
    }
    const operation = e.currentTarget.id;
    options?.[operation]();
  };

  const handleProfileClick = () => {
    router.push({
      pathname: '/users/[pid]',
      query: { pid: videoOwnersId }
    });
  };

  const onEmbedCopy = () => {
    showSnackbar({ message: 'Copied to Clipboard' });
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
            src={profilePic || "https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1625388234/hipi/videos/c3d292e4-2932-4f7f-ad09-b974207b1bbe/c3d292e4-2932-4f7f-ad09-b974207b1bbe_00.webp"}
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
        {/* {liked ? (
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
        ) : ( */}
          <div>
            <div
              id="like"
              role="presentation"
              onClick={handleOperation}
            >
              <Like />
            </div>
            <p className="text-sm text-center">{likes}</p>
          </div>
        {/* )} */}

      </div>
      <div
        className={`${
          type === 'feed' ? 'flex' : 'hidden'
        } "relative py-3  px-3 text-center items-end flex-col`}
      >
        <div 
           id="comment"
           role="presentation"
           onClick={handleOperation}
        >
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
        <div onClick={() => showDialog('Embed Code', CopyEmbedCode, { videoId, onEmbedCopy })}>
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
            } relative py-3 px-0 text-center flex flex-col items-center`}
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
