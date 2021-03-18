import React, { useState } from 'react';
import Like from '../commons/svgicons/like';
import Liked from '../commons/svgicons/liked';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import Shop from '../commons/svgicons/shop';
import { share } from '../../utils/app';
import useTranslation from '../../hooks/use-translation';

function VideoSidebar(props) {
  const [liked, setLiked] = useState(false);
  const { t } = useTranslation(false);

  const shareThis = async () => {
    share(t('share-title', 'share-text'));
  };
  return (
    <div className="absolute bottom-16 right-3 text-white">
      <div className="relative p-3 text-center flex justify-center">
        <img
          alt="profile-pic"
          className="usrimg w-12 h-12 rounded-full"
          // eslint-disable-next-line max-len
          src="https://assets2.charmboard.com/pro/images/104578166157776556785/1578291929591.jpeg?tr=w-200,h-200,z-0.75,fo-face,c-thumb,pr-true,q-70,g-face"
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
      <div className="relative p-3 text-center flex flex-col items-center">
        <Comment />
        <p className="text-sm">{props.comment}</p>
      </div>
      <div
        role="presentation"
        onClick={shareThis}
        className="relative p-3 text-center flex flex-col items-center"
      >
        <Share />
        <p className="text-sm">{props.share}</p>
      </div>

      <div className="relative p-3 text-center flex flex-col items-center">
        <Shop />
      </div>

    </div>
  );
}

export default VideoSidebar;
