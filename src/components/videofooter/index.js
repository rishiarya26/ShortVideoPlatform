import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';

function VideoFooter({
  userName,
  musicTitle,
  hashTags,
  canShop,
  saveLook,
  profileFeed
}) {
  return (
    <div
    // TO-DO refine this check
      className={`${(!profileFeed
        ? saveLook ? ' bottom-12 ' : ' bottom-40 '
        : canShop === 'success' ? 'bottom-40' : 'bottom-12')} videoFooter absolute left-0  flex text-white ml-2`}
    >
      <div className="videoFooter__text w-2/3">

        {canShop === 'success' && (
          <div className="bg-opacity-50 bg-white py-1 px-2 text-black font-semibold max-w-max rounded-lg my-1 xxs:text-sm xs:text-base">
            Shoppable
          </div>
        )}

        <h3 className=" my-1 font-semibold xxs:text-sm xs:text-base">{userName}</h3>
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
