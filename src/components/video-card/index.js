import Img from '../commons/image';
import Cart from '../commons/svgicons/cart';
import Play from '../commons/svgicons/play-outlined';

export default function VideoCard({ data, id }) {
  return (
    <div key={id} className="video-card relative">
      <div className="absolute top-2 right-2 z-10">
        <Cart/>
      </div>
      <Img data={data.thumbnailUrl} title={data.videoTitle} />
      <div className="absolute bottom-2 left-2 z-10 text-white flex items-center">
        <Play/> 2.2K
      </div>
    </div>
  );
}
