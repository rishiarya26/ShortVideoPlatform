import React from 'react';
import Like from '../commons/svgicons/like';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Shop from '../commons/svgicons/shop';

function VideoSidebar() {
  // TODO add useTranslation for alt tags as well
  return (
    <div className="absolute bottom-16 right-3 text-white">
      <div className="relative p-3 text-center flex justify-center">
        <div
          className="usrimg w-12 h-12 rounded-full bg-gray-500"
        />
        <div className="absolute bottom-0 left-1/3">
          <Follow />
        </div>
      </div>
      <div className="relative p-3 text-center">

        <div role="presentation">
          <Like />
        </div>
        <p className="text-sm h-8" />
      </div>
      <div className="relative p-3 text-center flex flex-col items-center">
        <Comment />
        <p className="text-sm h-8" />
      </div>
      <div className="relative p-3 text-center flex flex-col items-center">
        <Shop />
      </div>
    </div>
  );
}

export default VideoSidebar;
