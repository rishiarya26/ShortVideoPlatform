import Ticker from "react-ticker";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

function VideoFooter(props) {
  return (
    <div className="videoFooter relative flex bottom-40 text-white ml-5">
      <div className="videoFooter__text">
        <h3>Username</h3>
        <p>Nature at its best #nature #green</p>
        <div className="videoFooter__ticker ">
          <MusicNoteIcon className="videoFooter__icon" />
          <div  className="">
          <Ticker mode="smooth">
            {({ index }) => (
              <>
                <p>music tilte goes here</p>
              </>
            )}
          </Ticker>
          </div>
        </div>
      </div>
      <div 
        className="videoFooter__record flex items-center justify-center animate-spin-slow absolute w-12 h-12 bottom-0 right-8 rounded-full overflow-hidden profile-bg bg-no-repeat bg-contain" >
      <img className="w-3/5 rounded-full"
        src="https://assets2.charmboard.com/pro/images/104578166157776556785/1578291929591.jpeg?tr=w-200,h-200,z-0.75,fo-face,c-thumb,pr-true,q-70,g-face" alt=""
      />
      </div>
    </div>
  );
}

export default VideoFooter;