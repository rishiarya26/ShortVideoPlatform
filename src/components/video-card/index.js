import Img from '../commons/image';

export default function VideoCard({ data, id }) {
  return (
    <div>
      <div key={id} className="p-0.5 m-px">
        <Img data={data.thumbnailUrl} title={data.videoTitle} width={120} height={170} />
      </div>
    </div>
  );
}
