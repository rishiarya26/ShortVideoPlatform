import Carousel from "./Carousel";

export default function VideoCarousel({ blok, slug }) {
  const { videoURL = [] } = blok;
  return (
    <div className="mt-6">
      {videoURL?.length > 0 && <Carousel videoURL={videoURL} slug={slug} />}
    </div>
  );
}
