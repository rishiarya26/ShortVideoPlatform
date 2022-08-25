import styles from "./carousel.module.css";
import { useEffect, useRef } from "react";
import VisualContent from "../newsroom/visualContent";

export default function Carousel({ videoURL = [], slug: type }) {
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          entry.target
            .querySelectorAll(".video_iframe")
            .forEach((child, index) => {
              child.classList.toggle(
                index === 0
                  ? styles.videoWrapper
                  : index === 1
                  ? styles.videoWrapper2
                  : index == 2
                  ? styles.videoWrapper3
                  : styles.videoWrapper4,
                entry.isIntersecting
              );
            });
        });
      },
      { threshold: 0.75 }
    );
  }, []);

  useEffect(() => {
    const videoIframe = document.querySelectorAll(".swiper-container");
    if (observer.current) {
      videoIframe.forEach((item) => {
        observer.current.observe(item);
      });
    }
    return () => {
      videoIframe.forEach((item) => {
        observer.current.unobserve(item);
      });
    };
  }, []);

  return (
    <div className={`swiper-container ${styles.parentContainer}`}>
      {videoURL?.length > 1 &&
        videoURL?.map((url) => {
          const videoPostBlok = {
            type: "video",
            alt: "video",
            src: url?.link?.url,
            videoType: "posterImage",
          };
          return (
            <div key={url._uid} className={`video_iframe`}>
              <VisualContent blok={videoPostBlok} />
            </div>
          );
        })}
    </div>
  );
}
