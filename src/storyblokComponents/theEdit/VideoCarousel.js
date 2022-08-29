import Carousel from "./Carousel";
import { storyblokEditable } from "@storyblok/react";

export default function VideoCarousel({ blok = {} }) {
  const { videoURL = [] } = blok;
  return (
    <div className="mt-6" {...storyblokEditable(blok)}>
      {videoURL?.length > 0 && <Carousel videoURL={videoURL} />}
    </div>
  );
}
