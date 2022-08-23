import styles from "./carousel.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import VisualContent from "../newsroom/visualContent";

export default function Carousel({ videoURL = [], slug: type }) {
  const router = useRouter();

  // const filterPostArray = useCallback(() => {
  //     const currentPostSlug = router.query?.id;
  //     const filteredPostArray = stories?.filter((story) => story.slug != currentPostSlug);
  //     return filteredPostArray || [];
  // },[stories]);

  // const filteredPostArray = useMemo(() => filterPostArray(), [stories]);

  const attachEventListener = () => {
    if (videoURL?.length < 2) return;
    const carousel = document.querySelector(`.carousel${type}`);
    const slider = document.querySelector(`.slider${type}`);
    const slide = document.querySelectorAll(`.slide${type}`);
    const next = document.querySelector(`.next${type}`);
    const prev = document.querySelector(`.prev${type}`);
    slider.style.width = `${videoURL?.length * 100}%`;
    slide.forEach((item) => {
      item.style["flex-basis"] = `${100 / videoURL?.length}%`;
    });

    let direction;

    next.addEventListener("click", function () {
      direction = -1;
      carousel.style.justifyContent = "flex-start";
      slider.style.transform = `translate(-${100 / videoURL?.length}%)`;
    });

    prev.addEventListener("click", function () {
      if (direction === -1) {
        direction = 1;
        slider.appendChild(slider.firstElementChild);
      }
      carousel.style.justifyContent = "flex-end";
      slider.style.transform = `translate(${100 / videoURL?.length}%)`;
    });

    slider.addEventListener(
      "transitionend",
      function () {
        // get the last element and append it to the front

        if (direction === 1) {
          slider.prepend(slider.lastElementChild);
        } else {
          slider.appendChild(slider.firstElementChild);
        }

        slider.style.transition = "none";
        slider.style.transform = "translate(0)";
        setTimeout(() => {
          slider.style.transition = "all 0.5s";
        });
      },
      false
    );
  };

  const stopAnimation = () => {
    const carouselEle = document.querySelector(`.carousel${type}`);
    carouselEle.addEventListener("mouseenter", () => {
      carouselEle.style.animationPlayState = "paused";
      carouselEle.style["-webkit-mask"] = "none";
    });
  };

  useEffect(() => {
    if (document) {
      attachEventListener();
      stopAnimation();
    }
  }, [videoURL]);

  return (
    <div className={`${styles.container} carousel${type}`}>
      {videoURL?.length > 1 ? (
        <>
          <div className={`${styles.carousel} slider${type}`}>
            {videoURL?.map((url, index) => {
              return (
                <div className={`${styles.slide} slide${type}`} key={index}>
                  <blockquote
                    className="hipi-media"
                    cite="https://www.hipi.co.in/"
                  >
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
                      <iframe
                        style={{ height: "100%", width: "100%" }}
                        src={url.link.url}
                        loading="lazy"
                        title="hipi"
                        name="hipi"
                        frameBorder="0"
                        marginWidth="0"
                        marginHeight="0"
                        scrolling="no"
                      />
                    </div>
                  </blockquote>
                </div>
              );
            })}
          </div>
          <button
            className={`${styles.buttonPrev} ${styles.button} prev${type}`}
          >
            &#10132;
          </button>
          <button
            className={`${styles.buttonNext} ${styles.button} next${type}`}
          >
            &#10132;
          </button>
        </>
      ) : (
        videoURL.length > 0 && <VisualContent post={videoURL[0]} />
      )}
    </div>
  );
}
