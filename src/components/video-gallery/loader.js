import VideoCard from '../video-card/loader';

function Loader() {
  return (
    <div className="flex flex-wrap flex-row w-full space-x space-y relative h-screen scroll-snap-start bg-white ">
      <VideoCard />
    </div>
  );
}

export default Loader;

