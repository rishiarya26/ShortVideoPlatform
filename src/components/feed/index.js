import Video from '../video';

export default function Feed() {
  return (
    <div className="grid h-full">
      <div className="relative overflow-scroll w-full max-w-screen-sm Video_sheet">
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  );
}
