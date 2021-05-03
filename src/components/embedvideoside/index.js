import React from 'react';
import Like from '../commons/svgicons/like';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';

function EmbedVideoSidebar(props) {
  return (
    <div className="absolute right-0 text-white bottom-20">
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
      <div className="relative py-3  px-1 text-center flex flex-col items-center">
        <Like />
        <p className="text-sm">{props.likes}</p>
      </div>
      <div className="relative py-3  px-1 text-center flex flex-col items-center">
        <Comment />
        <p className="text-sm">{props.likes}</p>
      </div>
      <div className="relative py-3  px-1 text-center flex flex-col items-center">
        <Share />
      </div>

    </div>
  );
}

export default EmbedVideoSidebar;
