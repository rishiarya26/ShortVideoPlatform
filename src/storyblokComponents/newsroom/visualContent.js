import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

const VisualContent = ({ blok = {} }) => {
  const { type = "image", alt = "image", src = null } = blok;
  return (
    <div className="relative my-3 w-auto" {...storyblokEditable(blok)}>
      {type === "image" && src && (
        <Image layout="fill" objectFit="contain" src={src} alt={alt} />
      )}
      {type === "video" && src && (
        // <blockquote className="hipi-media" cite="https://www.hipi.co.in/">
        <div
          id="embed-hipi"
          style={{
            position: "relative",
            margin: "0 auto",
            height: "850px",
            width: "350px",
            overflow: "hidden",
          }}
        >
          {" "}
          <iframe
            style={{ height: "100%", width: "100%" }}
            src={src}
            loading="lazy"
            title="hipi"
            name="hipi"
            frameBorder="0"
            marginWidth="0"
            marginHeight="0"
            scrolling="no"
          />{" "}
        </div>
        // </blockquote>
      )}
    </div>
  );
};

export default VisualContent;
