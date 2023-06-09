/*eslint-disable @next/next/no-img-element */
import { storyblokEditable } from "@storyblok/react";
import Embedvideo from "../../storyblokComponents/theEdit/EmbedVideo";

const VisualContent = ({ blok = {}, primary=false }) => {
  const {
    type = "image",
    alt = "newsroom image",
    src = null,
    videoType = "video",
    imageSrc = {},
    mobileImageSrc = {},
  } = blok;
  return (
    <div className="relative w-auto" {...storyblokEditable(blok)}>
      {type === "image" && imageSrc?.filename && mobileImageSrc?.filename  && (
          <>
            <img  className="hidden md:flex h-full w-full object-cover" src={imageSrc.filename} alt={alt} />
            <img className="flex md:hidden h-full w-full object-cover" src={mobileImageSrc.filename} alt={alt}/>
          </>
      )}
      {type === "video" && src && <div className="mt-2"> <Embedvideo primary={primary} id={src} type={videoType} /> </div>}
    </div>
  );
};

export default VisualContent;
