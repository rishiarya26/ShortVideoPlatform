/* eslint-disable react/no-unknown-property */
import dynamic from 'next/dynamic';
import { numberFormatter } from '../../utils/convert-to-K';
import Img from '../commons/image';
import Cart from '../commons/svgicons/cart';
import Play from '../commons/svgicons/play-outlined';
import fallbackVideo from '../../../public/images/video.png';
import Like from '../commons/svgicons/like-outlined';
import { memo, useEffect, useState } from 'react';

const DeskVideoCard = ({ thumbnailUrl,videoTitle,viewCount,shoppable,
   id, likesCount, videoUrl, activeHoverIndex, page,tag, status }) => {
  const formattedViewCount =  numberFormatter(viewCount);
  const [showLoader, setShowLoader] = useState(false);

  return (
    <div key={id} className="video-card h-full min-h-28 w-full relative z-0 cursor-pointer rounded overflow-hidden">
     {page === 'hashTag' && tag && <div className="bg-red-700 text-white py-1 px-2 absolute top-2 left-2 z-10 rounded-sm text-xs">{tag}</div>}
     {shoppable && <div className="absolute top-2 right-2 z-10">
        <Cart/>
      </div>}
      {activeHoverIndex !== id ?
      <Img data={thumbnailUrl} title={videoTitle} fallback={fallbackVideo?.src}/>
      :<>
      <video
        //  onLoadStart={()=>setShowLoader(true)}
        //  onCanPlay={()=>setShowLoader(false)}
         id={id}
         onContextMenu={(e)=>{
          e.preventDefault();
          return false}}
       controlsList="nodownload"
         playsInline
         muted={true}
         autoPlay
         preload="auto"
         webkit-playsinline = "true"
        //  onTimeUpdate={handleUpdateSeekbar}
         loop
        //  onClick={()=>updateActiveIndex(index)}
         // onClick={handleVideoPress}
         className="vdo_player_desk"
         poster={thumbnailUrl}
         objectfit="cover"
         key={videoUrl}
         src={videoUrl}
         >
         {/* <source
            src={url}
            type="video/mp4"
            /> */}
         </video>
         {showLoader && 
         <div 
         className='flex justify-center items-center absolute text-lg font-white'>
           Loading....
           </div>}
         </>
      }
      <div className="absolute bottom-8 left-2 z-10 text-white text-sm flex items-center">{status === 'PENDING' ? "Publishing in process" : "" }</div>
      <div className="absolute bottom-2 left-2 z-10 text-white text-xs flex items-center">
        <Play/> {formattedViewCount}
      </div>
      {/* <div className="absolute bottom-1 right-1 text-white flex text-xs items-center">
        <Like/>{numberFormatter(likesCount) || numberFormatter(likesCount)}
      </div> */}
    </div>
  );
}

export default memo(DeskVideoCard);
