import ImageComponent from '../commons/image-component';

export default function VideoCard({ data, id }) {
  return (
    <div>
      <div key={id} className="p-0.5 border border-black rounded-md m-px">
        <ImageComponent data={data.thumbnailUrl} videoTitle={data.videoTitle} />
      </div>
    </div>
  );
}
