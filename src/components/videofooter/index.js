import Ticker from 'react-ticker';

function VideoFooter() {
  return (
    <div className="videoFooter relative flex bottom-32 text-white ml-5">
      <div className="videoFooter__text">
        <h3 className="font-bold">Username</h3>
        <p>Nature at its best </p>
        <p>#nature #green #hash #tags</p>
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
          <Ticker mode="smooth" className="">
            {() => (
              <>
                <p>music title goes here</p>
              </>
            )}
          </Ticker>
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
