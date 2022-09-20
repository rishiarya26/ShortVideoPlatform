import { useEffect, useState } from "react";

export default function SwipeEnabler ({ id, feed=false, adData }) {
    const [idx, setIdx] = useState(0);

    const touchEnable = () => {
        let touchstartX = 0;
        let touchendX = 0;
        let index = 0;
        const swiper = document.querySelector(`.swiper-mini-${id}`)?.swiper;
        const touchSurface = document.querySelector("#touchsurface");
        if (!touchSurface && !swiper) return;
        function checkDirection() {
            index = swiper.activeIndex;
            if (touchendX < touchstartX && adData.length-1 > index + 1) {
                swiper.slideNext();
                index += 1;
                setIdx(prev => prev+1);
            }
            if (touchendX > touchstartX && index > 0) {
                swiper.slidePrev();
                index -= 1;
                setIdx(prev => prev-1);
            }
        }

        touchSurface.addEventListener("touchstart", (e) => {
        touchstartX = e.changedTouches[0].screenX;
        });
        touchSurface.addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
        });
    };

    const onClickHandler = (dir) => {
        if(dir === "left") {
            window.open(adData[idx].product_url)
        } else {
            window.open(adData[idx+1].product_url)
        }
    }

    useEffect(() => {
        if (document) {
        touchEnable();
        }
    }, []);
    return (
        <div
        id="touchsurface"
        style={{
            position: "absolute",
            height: "70px",
            width: "105px",
            bottom: feed ? "115px" : "80px",
            right: "24px",
            zIndex: 10,
            display: "flex"
        }}
        >
            <div onClick={()=>onClickHandler("left")} style={{height: "100%", width: "50%"}}></div>
            <div onClick={()=>onClickHandler("right")} style={{height: "100%", width: "50%"}}></div>
        </div>
    );
};
