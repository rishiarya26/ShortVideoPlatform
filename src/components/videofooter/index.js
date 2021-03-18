import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';

function VideoFooter() {
  return (
    <div className="videoFooter relative flex bottom-32 text-white ml-5">
      <div className="videoFooter__text">
        <div className="bg-opacity-75 bg-white py-1 px-3 text-black font-bold max-w-max rounded-lg">
          Shoppable
        </div>
        <h3 className="font-bold">Username</h3>
        <p>Nature at its best </p>
        <p>#nature #green #hash #tags</p>
        <div>
          <Music />
          <Marquee text="music title goes here" />
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
