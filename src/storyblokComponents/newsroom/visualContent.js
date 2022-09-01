import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Embedvideo from "../../storyblokComponents/theEdit/EmbedVideo";

const VisualContent = ({ blok = {} }) => {
  const {
    type = "image",
    alt = "image",
    src = null,
    videoType = "video",
  } = blok;
  return (
    <div className="relative w-auto" {...storyblokEditable(blok)}>
      {type === "image" && src && (
        <Image layout="fill" objectFit="contain" src={src} alt={alt} />
      )}
      {type === "video" && src && <Embedvideo id={src} type={videoType} />}
    </div>
  );
};

export default VisualContent;
