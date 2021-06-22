import Img from '../commons/image';

export default function VideoCard({ data, id }) {
  return (
    <div key={id} className="p-0.5 m-px">
      <Img data={data.thumbnailUrl} title={data.videoTitle} height={170} width={120} />
    </div>
  );
}
