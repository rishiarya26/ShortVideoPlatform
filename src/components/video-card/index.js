import Img from '../commons/image';

export default function VideoCard({ data, id }) {
  return (
    <div key={id} className="video-card relative">
      <Img data={data.thumbnailUrl} title={data.videoTitle} />
    </div>
  );
}
