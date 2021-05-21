import ImageComp from '../commons/image';

export default function VideoCard({ data, id }) {
  return (
    <div>
      <div key={id} className="p-0.5 m-px">
        <ImageComp data={data.thumbnailUrl} title={data.videoTitle} />
      </div>
    </div>
  );
}
