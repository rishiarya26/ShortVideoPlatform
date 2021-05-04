export default function VideoCard({ data, id }) {
  return (
    <div>
      <div key={id} className="p-10 border border-black rounded-md m-px">
        <img src={data.videoThumbnail} alt="PR" />
      </div>
    </div>
  );
}
