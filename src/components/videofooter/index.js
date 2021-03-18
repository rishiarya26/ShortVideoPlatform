import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';

function VideoFooter({ userName, musicTitle, musicCoverTitle }) {
  return (
    <div className="videoFooter relative flex bottom-32 text-white ml-5">
      <div className="videoFooter__text">
        <h3 className="font-bold">{userName}</h3>
        <p>{musicCoverTitle}</p>
        <div>
          <Music />
          <Marquee text={musicTitle} />
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
