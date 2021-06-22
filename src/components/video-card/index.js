import Img from '../commons/image';

export default function VideoCard({ data, id }) {
  return (
    <div key={id} className="p-0.5 m-px w-60 h-1/3">
      <Img data={data.thumbnailUrl} title={data.videoTitle} />
    </div>
  );
}
