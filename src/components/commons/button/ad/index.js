import React, { memo, useEffect, useState } from "react";
import { pushAdService } from "../../../../sources/ad-service";
import Img from "../../image";
import RightArrow from "../../svgicons/right-arrow";
import fallbackUser from "../../../../../public/images/users.png";
import Verified from "../../svgicons/verified";

const BUTTON_SHOW_DELAY = 3000;
const BUTTON_COLOR_SHOW_DELAY = 1500;

function AdButton({
  id,
  vmaxAd,
  noShow = false,
  setMuted,
  ctaText,
  ctaColor,
  ctaPath,
  activeVideoId,
  ctaTrackers,
  profilePic,
  userName,
  userVerified,
  adBtnClickCb,
}) {
  const [btnColor, setBtnColor] = useState("#8e8e97");
  const [show, setShow] = useState(false);

  // !! Keep this useEffect always on top
  useEffect(() => {
    if (!vmaxAd) return false; //safe check from vmaxAd condition
    if (vmaxAd && id === activeVideoId){
      setTimeout(() => {
        setShow(true);
        setTimeout(() => setBtnColor(ctaColor), BUTTON_COLOR_SHOW_DELAY);
      }, BUTTON_SHOW_DELAY);
      // else {
      //   setBtnColor(ctaColor)
      // }
    }
  }, [activeVideoId]);

  const type = {
    bottom: `bottom-16 absolute left-0  flex text-white ml-2 w-full pr-4 animateBottom flex-col`,
  };

  if (!noShow) return false;

  const callTrackers = async () => {
    if (ctaTrackers?.length > 0) {
      try {
        ctaTrackers.map(
          async (url) => await pushAdService({ url }).then((res) => res)
        );
      } catch (err) {
        console.log(err, "pushAdService error");
      }
    }
  };

  let optProfilePic = profilePic;
  if (optProfilePic?.match("upload/w_300")) {
    optProfilePic = optProfilePic?.replaceAll("upload/w_300", "upload/w_100");
  } else {
    optProfilePic = optProfilePic?.replaceAll("upload", "upload/w_100");
  }

  return (
    <>
      <div className={type["bottom"]}>
        <div className={`${!show && vmaxAd ? "mb-3" : null} flex items-center`}>
          <div
            className="usrimg w-10 h-10 overflow-hidden rounded-full"
            onClick={() => router && router?.push(`/@${userName}`)}
          >
            <Img
              title="Hipi"
              data={optProfilePic}
              fallback={fallbackUser?.src}
            />
          </div>
          <div className="font-medium dark:text-white ml-1">
            <div className=" text-white dark:text-gray-400">
              <h3
                onClick={() => router && router?.push(`/@${userName}`)}
                style={{ lineHeight: "1rem" }}
                className="font-semibold text-sm flex items-center"
              >
                @{userName}{" "}
                {userVerified === "verified" ? (
                  <div className="ml-2">
                    <Verified />
                  </div>
                ) : (
                  ""
                )}
              </h3>
            </div>
            <div className="text-xs text-white dark:text-gray-400">
              Sponsored
            </div>
          </div>
        </div>

        {vmaxAd && show && (
          <div
            className="pb-4 pt-2 pr-4 bottom-16 w-full z-50 box-border animateBottom"
            onClick={() => {
              setMuted && setMuted(true);
              adBtnClickCb && adBtnClickCb?.();
              callTrackers();
              window.open(ctaPath);
            }}
          >
            <a
              href={void 0}
              style={{ backgroundColor: btnColor }}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-2 text-white rounded-md flex items-center justify-between text-sm font-semibold transition ease-linear delay-1000"
            >
              {ctaText}
              <span>
                <RightArrow value="#fff" />
              </span>
            </a>
          </div>
        )}
        {!vmaxAd && (
          <div
            className="pb-4 pt-2 pr-4 bottom-16 w-full z-50 box-border animateBottom"
            onClick={() => {
              setMuted && setMuted(true);
              adBtnClickCb && adBtnClickCb?.();
              callTrackers();
              window.open(ctaPath);
            }}
          >
            <a
              href={void 0}
              style={{ backgroundColor: btnColor }}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-2 text-white rounded-md flex items-center justify-between text-sm font-semibold transition ease-linear delay-1000"
            >
              {ctaText}
              <span>
                <RightArrow value="#fff" />
              </span>
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default AdButton;
