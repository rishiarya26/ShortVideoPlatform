/*eslint-disable @next/next/no-img-element */
import { storyblokEditable } from "@storyblok/react";
import Embedvideo from "../../storyblokComponents/theEdit/EmbedVideo";

const VisualContent = ({ blok = {}, primary=false }) => {
  console.log("debug", blok);
  const {
    type = "image",
    alt = "newsroom image",
    src = null,
    videoType = "video",
    imageSrc = {}
  } = blok;
  return (
    <div className="relative w-auto" {...storyblokEditable(blok)}>
      {type === "image" && imageSrc?.filename && (
        <img  className="h-full w-full object-cover" src={imageSrc.filename} alt={alt} />
      )}
      {type === "video" && src && <Embedvideo primary={primary} id={src} type={videoType} />}
    </div>
  );
};

export default VisualContent;
