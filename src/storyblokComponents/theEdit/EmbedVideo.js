/*eslint-disable @next/next/no-img-element*/
import { useState, useEffect } from "react";
import Error from "next/error";
import EmbedVideo from "../../components/embed-video";
import { getSingleFeed } from "../../sources/feed/embed";
import { getEffectiveVideoUrl } from "../../utils/content";
import { withBasePath } from "../../config";
import { useRouter } from "next/router";
import styles from "./embedVideo.module.css";
import { theEditVideoSchema, videoSchema } from "../../utils/schema";

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

function getSchemaObj({videoDetails, url, id}){
  const description = videoDetails?.content_description;
  const uploadDate = new Date(videoDetails?.createdOn).toISOString();
  const nameSchema = videoSchema({
    name: `${videoDetails?.videoOwnersDetail?.firstName || ""} ${
      videoDetails?.videoOwnersDetail?.lastName || ""
    }`,
    videoId: videoDetails?.content_id,
    userThumnail: videoDetails?.firstFrame,
    desc: videoDetails?.content_description,
    createdOn: videoDetails?.createdOn,
  });
  const thumbnailUrl = videoDetails?.thumbnail;
  
  return{
    description,
    uploadDate,
    contentUrl: url,
    nameSchema,
    thumbnailUrl,
    embedUrl: `${location.origin}/embed/${id}`
  }
}

// TODO enable mock mode here
export default function Hipi({ id, type = "posterImage", primary }) {
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
  const [schemaObj, setSchemaObj] = useState({});

  useEffect(async () => {
    const respData = await fetchVideoData(id);
    setItem({ ...respData?.data });
    setResp({
      status: respData?.status,
      errorCode: respData?.errorCode,
      message: respData?.message,
      uri: respData?.uri,
    });
    const videoUrl = getEffectiveVideoUrl(respData?.data?.video_urls);
    setVideoUrl(videoUrl);
    if(type !== "posterImage"){
      const resp = getSchemaObj({videoDetails: respData?.data, url: videoUrl, id});
      setSchemaObj({...resp})
    }
  }, []);

  const canShop = item?.canShop?.status || "fail";
  const shopCards = item?.canShop?.data;
  const videoId = item?.content_id;
  const updateSeekbar = (percentage) => {
    setSeekedPercentage(percentage);
  };

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
        <>
          {
            Object.values(schemaObj).length > 0 && primary && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(theEditVideoSchema(schemaObj)),
                }}
              />
            )
          }
          <div id={`embed-hipi-${id}`} className={styles.videoWrapper}>
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
        </>
      )}
    </>
  );
}
