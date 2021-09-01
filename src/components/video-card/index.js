import { numberFormatter } from '../../utils/convert-to-K';
import Img from '../commons/image';
import Cart from '../commons/svgicons/cart';
import Play from '../commons/svgicons/play-outlined';

export default function VideoCard({ thumbnailUrl,videoTitle,viewCount,shoppable, id }) {
  const formattedViewCount =  numberFormatter(viewCount)
  return (
    <div key={id} className="video-card relative z-0">
     {shoppable && <div className="absolute top-2 right-2 z-10">
        <Cart/>
      </div>}
      <Img data={thumbnailUrl} title={videoTitle} />
      <div className="absolute bottom-2 left-2 z-10 text-white flex items-center">
        <Play/> {formattedViewCount}
      </div>
    </div>
  );
}
