import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';

function VideoFooter({
  userName,
  musicTitle,
  hashTags,
  canShop,
  saveLook,
  comp
}) {
  // TO-DO common classes
  const type = {
    profile: `${canShop === 'success' ? 'bottom-40' : 'bottom-12'} videoFooter absolute left-0  flex text-white ml-2`,
    feed: `${saveLook ? ' bottom-12 ' : ' bottom-40 '} videoFooter absolute left-0  flex text-white ml-2`,
    embed: 'bottom-8 videoFooter absolute left-0  flex text-white ml-2'
  };
  return (
    <div
      className={type[comp]}
    >
      <div className="videoFooter__text w-2/3">
        {/*
        {canShop === 'success' && (
          <div className="bg-opacity-50 bg-white py-1 px-2 text-black font-semibold max-w-max rounded-lg my-1 text-sm ">
            Shoppable
          </div>
        )} */}

        <h3 className=" mb-1 mt-1.5 font-semibold text-sm ">{userName}</h3>
        <div className="font-bold text-xs mb-3 mt-2">
          {hashTags
            && hashTags.map((data, id) => (
              <span key={id}>{`#${data.name}${' '}`}</span>
            ))}
        </div>
        {/* {musicCoverTitle}</p> */}
        <div className="w-8/12 my-1 xxs:text-sm xs:text-base">
          <Music />
          <span className=" my-1 xxs:text-sm xs:text-base w-4/12">
            <Marquee text={musicTitle} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
