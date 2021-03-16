import Marquee from '../commons/text-marquee';

function VideoFooter() {
  return (
    <div className="videoFooter relative flex bottom-24 text-white ml-5">
      <div className="videoFooter__text">
        <h3 className="font-bold">Username</h3>
        <p>Nature at its best #nature #green</p>
        <div>
          <svg
            className="float-left"
            width="24"
            height="24"
            viewBox="6 0 24 24"
            fill="none"
          >
            <path className="st0" fill="white" d="M12,3v10.6c-0.6-0.3-1.3-0.6-2-0.6c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4V7h4V3H12z" />
          </svg>
          <Marquee text="music title goes here" />
        </div>
      </div>
      <div
        className={`videoFooter__record flex 
          items-center justify-center 
          animate-spin-slow absolute w-12 h-12 
          bottom-0 right-8 rounded-full overflow-hidden 
          profile-bg bg-no-repeat bg-contain`}
      >
        <img
          className="w-3/5 rounded-full"
          src="https://tinyurl.com/yuc7zdc2"
          alt=""
        />
      </div>
    </div>
  );
}

export default VideoFooter;
