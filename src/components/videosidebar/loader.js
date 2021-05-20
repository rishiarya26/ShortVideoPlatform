import React from 'react';
import Like from '../commons/svgicons/like';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import Shop from '../commons/svgicons/shop';

function VideoSidebar() {
  // TODO add useTranslation for alt tags as well
  return (
    <div className="absolute bottom-16 right-0 text-white">
      <div className="relative p-3 text-center flex justify-center">
        <div
          className="usrimg w-12 h-12 rounded-full bg-gray-500"
        />
        <div className="absolute bottom-0 ">
          <Follow />
        </div>
      </div>
      <div className="relative p-2 text-center flex flex-col items-center">

        <div role="presentation">
          <Like />
        </div>
        <p className="text-sm h-6" />
      </div>
      <div className="relative p-2 text-center flex flex-col items-center">
        <Comment />
        <p className="text-sm h-6" />
      </div>
      <div className="relative p-2 text-center flex flex-col items-center">
        <Share />
        <p className="text-sm h-6" />
      </div>
      <div className="relative py-3 mt-8 text-center flex flex-col items-center">
        <Shop />
      </div>
    </div>
  );
}

export default VideoSidebar;
