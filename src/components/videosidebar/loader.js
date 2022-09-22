import React from 'react';
import Like from '../commons/svgicons/like';
import Follow from '../commons/svgicons/follow';
import Comment from '../commons/svgicons/comment';
import Share from '../commons/svgicons/share';
import EmbedIcon from '../commons/svgicons/embedicon';

function VideoSidebar() {
  // TODO add useTranslation for alt tags as well
  return (
    <div className="bottom-28 videoFooter absolute right-0 flex-col  flex text-white ml-2">
      <div className="relative py-2 px-3 text-center justify-end flex">
        <div className="flex flex-col items-center">
          <div
            className="usrimg w-10 h-10 rounded-full bg-gray-500"
          />
          {/* <div className="absolute bottom-0">
            <Follow />
          </div> */}
        </div>
      </div>
      <div className="flex relative py-2 px-3 text-center justify-end items-end flex-col">
        <div role="presentation">
          <Like />
        </div>
        <p className="text-sm h-6" />
      </div>
      <div className="flex relative py-2  px-3 text-center items-end flex-col">
        <Comment />
        <p className="text-sm h-6" />
      </div>
      <div className="flex relative py-2  px-3 text-center items-end flex-col">
        <Share />
        <p className="text-sm h-6" />
      </div>
      <div className="flex relative py-2  px-3 text-center items-end flex-col mb-28">
        <EmbedIcon />
        <p className="text-sm h-6" />
      </div>
    </div>
  );
}

export default VideoSidebar;
