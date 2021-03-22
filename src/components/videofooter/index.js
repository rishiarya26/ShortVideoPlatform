import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';

function VideoFooter({ userName, musicTitle, musicCoverTitle }) {
  return (
    <div className="videoFooter absolute flex bottom-12 text-white ml-5">
      <div className="videoFooter__text">
        <div className="bg-opacity-50 bg-white py-1 px-2 text-black font-semibold max-w-max rounded-lg my-1 xxs:text-sm xs:text-base">
          Shoppable
        </div>

        <h3 className=" my-1 font-semibold xxs:text-sm xs:text-base">{userName}</h3>
        <p className=" my-1 xxs:text-sm xs:text-base">{musicCoverTitle}</p>
        <div className=" my-1 xxs:text-sm xs:text-base">
          <Music />
          <Marquee text={musicTitle} />
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
