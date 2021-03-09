import React, { useState } from 'react';
import Like from '../commons/svgicons/like';
import Liked from '../commons/svgicons/liked';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';

function VideoSidebar(props) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="absolute bottom-28 right-3 text-white">
      <div className="relative p-3 text-center flex justify-center">
        <img className="usrimg w-12 h-12 rounded-full bg-gray-500" src={props.usrimg} />
        <div className="absolute bottom-0 left-1/3">
          <Follow/>
        </div>
      </div>
      <div className="relative p-3 text-center">
        {liked ? (
          <div onClick={e => setLiked(false)}>
          <Liked/>
          </div>
        ) : (
          <div  onClick={e => setLiked(true)} >
          <Like/>
          </div>
        )}
        <p className="text-sm">{props.likes}</p>
      </div>
      <div className="relative p-3 text-center flex flex-col items-center">
        <Comment/>
        <p className="text-sm">{props.comment}</p>
      </div>
      <div className="relative p-3 text-center flex flex-col items-center">
        <Share/>
        <p className="text-sm">{props.share}</p>
      </div>
    </div>
  );
}

export default VideoSidebar;
