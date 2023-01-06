/*eslint-disable react/display-name */
import { useEffect, useState } from "react";
import useDrawer from "../hooks/use-drawer";
import { getBrand } from "./web";
import { toTrackMixpanel } from "../analytics/mixpanel/events";
import dynamic from "next/dynamic";
import { toTrackClevertap } from "../analytics/clevertap/events";
const charmboardDrawer = dynamic (
  () => import('../components/charmboard'),
  {
    loading: () => <div />,
    ssr: false
  }
);

export default function SwipeEnabler ({ id, feed=false, adData, campaignId, pageName, tabName }) {
    const [idx, setIdx] = useState(0);
    const { show } = useDrawer();
    const labelThereOrNot = adData?.filter((data) => data?.card_labels).length > 0 ? true : false;


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
            toTrackMixpanel(
                "monetisationProductClick",
                { pageName: pageName, tabName: tabName },
                {
                  content_id: id,
                  productId: adData[idx]?.card_id,
                  productUrl: adData[idx]?.product_url,
                  brandName: getBrand(adData[idx]?.product_url),
                  campaignId
                }
              );
              toTrackClevertap(
                "monetisationProductClick",
                { pageName: pageName, tabName: tabName },
                {
                  content_id: id,
                  productId: adData[idx]?.card_id,
                  productUrl: adData[idx]?.product_url,
                  brandName: getBrand(adData[idx]?.product_url),
                  campaignId
                }
              );
              feed ? window.open(adData[idx]?.product_url) :  show("", charmboardDrawer, "big", {
                videoId: id,
                idToScroll: adData[idx],
              });
        } else {
            toTrackMixpanel(
                "monetisationProductClick",
                { pageName: pageName, tabName: tabName },
                {
                  content_id: id,
                  productId: adData[idx+1]?.card_id,
                  productUrl: adData[idx+1]?.product_url,
                  brandName: getBrand(adData[idx+1]?.product_url),
                  campaignId
                }
              );
              toTrackClevertap(
                "monetisationProductClick",
                { pageName: pageName, tabName: tabName },
                {
                  content_id: id,
                  productId: adData[idx+1]?.card_id,
                  productUrl: adData[idx+1]?.product_url,
                  brandName: getBrand(adData[idx+1]?.product_url),
                  campaignId
                }
              );
            feed ? window.open(adData[idx+1].product_url) : show("", charmboardDrawer, "big", {
                videoId: id,
                idToScroll: adData[idx+1],
              });;
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
            bottom: feed ? labelThereOrNot ? "130px" : "115px" : labelThereOrNot ? "65px" : "50px",
            right: "24px",
            zIndex: 10,
            display: "flex",
        }}
        >
            <div onClick={()=>onClickHandler("left")} style={{height: "100%", width: "50%"}}></div>
            <div onClick={()=>onClickHandler("right")} style={{height: "100%", width: "50%"}}></div>
        </div>
    );
};
