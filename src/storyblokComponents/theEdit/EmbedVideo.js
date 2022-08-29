/*eslint-disable @next/next/no-img-element*/
import { useState, useEffect } from "react";
import Error from "next/error";
import EmbedVideo from "../../components/embed-video";
import { getSingleFeed } from "../../sources/feed/embed";
import { supportedLanguages } from "../../hooks/use-translation";
import { getEffectiveVideoUrl } from "../../utils/content";
import { withBasePath } from "../../config";
import { useRouter } from "next/router";
import styles from "./embedVideo.module.css";

const languageCodes = Object.keys(supportedLanguages).map(
  (keyName) => supportedLanguages[keyName].code
);

const fetchVideoData = async (id) => {
  let data = {};
  try {
    data = await getSingleFeed({
      id,
    });
  } catch (e) {
    data = {
      status: e.status,
      errorCode: e.errorCode,
      "http-status": e["http-status"],
      message: e.message,
    };
  }
  return { ...data };
};

// TODO enable mock mode here
export default function Hipi({ id, type = "posterImage" }) {
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [item, setItem] = useState({});
  const [resp, setResp] = useState({
    status: "",
    errorCode: "",
    message: "",
    uri: "",
  });
  const router = useRouter();

  useEffect(async () => {
    const respData = await fetchVideoData(id);
    setItem({ ...respData?.data });
    setResp({
      status: respData?.status,
      errorCode: respData?.errorCode,
      message: respData?.message,
      uri: respData?.uri,
    });
  }, []);

  const canShop = item?.canShop?.status || "fail";
  const shopCards = item?.canShop?.data;
  const videoId = item?.content_id;
  const updateSeekbar = (percentage) => {
    setSeekedPercentage(percentage);
  };

  useEffect(() => {
    const videoUrl = getEffectiveVideoUrl(item.video_urls);
    setVideoUrl(videoUrl);
  }, []);

  if (resp.status === "fail") {
    return <Error message={resp.message} statusCode={resp.errorCode} />;
  }

  const posterOnClick = () => {
    router.push(`/feed/for-you?videoId=${videoId}`);
  };

  return (
    <>
      {type === "posterImage" ? (
        <div className={styles.posterWrapper}>
          <img objectFit="cover" src={item?.thumbnail} />
          <img
            onClick={posterOnClick}
            src={withBasePath("images/play.png")}
            className={styles.playButton}
            alt="playicon"
          />
        </div>
      ) : (
        <div id="embed-hipi" className={styles.videoWrapper}>
          <EmbedVideo
            updateSeekbar={updateSeekbar}
            socialId={item.getSocialId}
            url={videoUrl}
            id={item.content_id}
            comments={item.commentsCount}
            likes={item.likesCount}
            music={item.musicCoverTitle}
            musicTitle={item.music_title}
            profilePic={item.userProfilePicUrl}
            userName={item.userName}
            musicCoverTitle={item.musicCoverTitle}
            hashTags={item.hashTags}
            canShop={canShop}
            shopCards={shopCards}
            videoId={videoId}
            poster={item.thumbnail}
            seekedPercentage={seekedPercentage}
          />
        </div>
      )}
    </>
  );
}
