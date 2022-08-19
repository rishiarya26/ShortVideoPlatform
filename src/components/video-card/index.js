import dynamic from 'next/dynamic';
import { numberFormatter } from '../../utils/convert-to-K';
import Img from '../commons/image';
import Cart from '../commons/svgicons/cart';
import Play from '../commons/svgicons/play-outlined';
import fallbackVideo from '../../../public/images/video.png';

export default function VideoCard({ thumbnailUrl,videoTitle,viewCount,shoppable, id, likesCount, tag,page }) {
  const formattedViewCount =  numberFormatter(viewCount)
  return (
    <div key={id} className="video-card relative z-0">
    {page === 'hashTag' && tag && <div className="bg-red-700 text-white py-1 px-2 absolute top-2 left-2 z-10 rounded-sm text-xs">{tag}</div>}
     {shoppable && <div className="absolute top-2 right-2 z-10">
        <Cart/>
      </div>}
      <Img data={thumbnailUrl} title={videoTitle} fallback={fallbackVideo?.src}/>
      <div className="absolute bottom-2 left-2 z-10 text-white text-xs flex items-center">
        <Play/> {formattedViewCount}
      </div>
      {/* <div className="absolute bottom-1 right-1 text-white flex text-xs items-center">
        <Like/>{numberFormatter(likesCount) || numberFormatter(likesCount)}
      </div> */}
    </div>
  );
}
