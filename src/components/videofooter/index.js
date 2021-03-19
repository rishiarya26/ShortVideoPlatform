import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';

function VideoFooter({ userName, musicTitle, musicCoverTitle }) {
  return (
    <div className="videoFooter relative flex bottom-40 text-white ml-5">
      <div className="videoFooter__text">
        <div className="bg-opacity-50 bg-white py-1 px-3 text-black font-bold max-w-max rounded-lg my-.5">
          Shoppable
        </div>

        <h3 className=" my-.5 font-bold">{userName}</h3>
        <p className=" my-.5">{musicCoverTitle}</p>
        <div className=" my-.5">
          <Music />
          <Marquee text={musicTitle} />
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
