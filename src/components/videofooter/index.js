import Marquee from '../commons/text-marquee';
import Music from '../commons/svgicons/music';

function VideoFooter({
  userName,
  musicTitle,
  musicCoverTitle,
  type,
  hashTags,
  dataShopVerification
}) {
  return (
    <div
      className={`${
        type === 'feed' ? 'bottom-16' : 'bottom-16'
      } videoFooter absolute flex text-white ml-2`}
    >
      <div className="videoFooter__text w-2/3">
      {dataShopVerification ? <div className="bg-opacity-50 bg-white py-1 px-2 text-black font-semibold max-w-max rounded-lg my-1 xxs:text-sm xs:text-base">
           Shoppable 
        </div>: ""}

        <h3 className=" my-1 font-semibold xxs:text-sm xs:text-base">{`@${userName}`}</h3>
        <div className="font-normal text-xs mb-3 mt-2">
          {hashTags &&
            hashTags.map((data, id) => (
              <span key={id}>{`#${data.name}${" "}`}</span>
            ))}
        </div>
        {/* <p className=" my-1 xxs:text-sm xs:text-base">{musicCoverTitle}</p> */}
        <div className=" my-1 xxs:text-sm xs:text-base">
          <Music />
          <Marquee text={musicTitle} />
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
