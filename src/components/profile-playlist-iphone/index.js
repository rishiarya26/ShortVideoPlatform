/*eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import { withRouter } from "next/router";
import Video from "../video";
import Loading from "./loader";
import ComponentStateHandler, {
  useFetcher,
} from "../commons/component-state-handler";
import Seekbar from "../seekbar";
import SeekbarLoading from "../seekbar/loader.js";
import { canShop } from "../../sources/can-shop";
import { Back } from "../commons/svgicons/back_white";
import useWindowSize from "../../hooks/use-window-size";
import Mute from "../commons/svgicons/mute";
import CircularProgress from "../commons/circular-loader";
import usePreviousValue from "../../hooks/use-previous";
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import useDrawer from "../../hooks/use-drawer";
import SwipeUp from "../commons/svgicons/swipe-up";
import { viewEventsCall } from "../../analytics/view-events";
import { getBrand } from "../../utils/web";
import { toTrackFirebase } from "../../analytics/firebase/events";
import { ToTrackFbEvents } from "../../analytics/fb-pixel/events";
import Landscape from "../landscape";
import { incrementCountVideoView } from "../../utils/events";
import OpenAppStrip from "../commons/user-experience";
import SnackCenter from "../commons/snack-bar-center";
import { getPlaylistDetails } from "../../sources/playlist";
import PlaylistUnavailable from "../playlist-unavailable";
import playListModal from "../playlist-drawer";

SwiperCore.use([Mousewheel]);

let retry;
const ErrorComp = () => <PlaylistUnavailable retry={retry} />;
const LoadComp = () => <Loading />;

const searchVideo = ({ videoId = null, playlistArr = [] }) => {
  if (videoId && playlistArr.length > 0) {
    return playlistArr.findIndex((item) => item.content_id === videoId);
  }
};

function ProfilePlaylistIphone({ router }) {
  const playListVideoId = router?.query?.videoId || null;
  const utmVal = router?.query?.utm_source || null;
  const [seekedPercentage, setSeekedPercentage] = useState(0);
  const [items, setItems] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [videoActiveIndex, setVideoActiveIndex] = useState(0);
  const [saveLook, setsaveLook] = useState(true);
  const [shop, setShop] = useState({ isShoppable: "pending" });
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [initialPlayStarted, setInitialPlayStarted] = useState(false);
  const [videoDurationDetails, setVideoDurationDetails] = useState({
    totalDuration: null,
    currentT: 0,
  });
  const [playListName, setPlayListName] = useState("");
  const [offset, setOffset] = useState(5);
  const [showSwipeUp, setShowSwipeUp] = useState({ count: 0, value: false });
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [initialId, setInitialId] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [noSound, setNoSound] = useState(false);
  const [toShowItems, setToShowItems] = useState([]);
  // const [toInsertElements, setToInsertElements] = useState(3);
  const [deletedTill, setDeletedTill] = useState();

  const checkNoSound = () => {
    if (!items?.[videoActiveIndex]?.videoSound) {
      setNoSound(true);
      setTimeout(() => {
        setNoSound(false);
      }, 2000);
    }
  };

  const preVideoDurationDetails = usePreviousValue({ videoDurationDetails });
  const preActiveVideoId = usePreviousValue({ videoActiveIndex });
  // const pretoInsertElemant = usePreviousValue({ toInsertElements });

  const { id: playlistid } = router?.query;
  const { show } = useDrawer();
  const pageName = "Playlist Video Detail";
  const size = useWindowSize();
  const videoHeight = `${size.height}`;

  const incrementShowItems = async () => {
    console.log("in increment");
    try {
      let updateShowItems = [...toShowItems];
      let dataItem = [...items];

      // slice from main array: start= videoActiveIndex+1 , end= videoActiveIndex + offset
      updateShowItems = [
        ...updateShowItems,
        ...dataItem.slice(videoActiveIndex + 1, videoActiveIndex + 5 + 1),
      ];
      setToShowItems(updateShowItems);
      setMuted(true);
    } catch (e) {
      console.log("errorree", e);
    }
  };

  useEffect(() => {
    if (videoActiveIndex > preActiveVideoId?.videoActiveIndex) {
      //swipe-down || forwardSwipe
      if (toShowItems.length && videoActiveIndex === toShowItems.length - 1) {
        // add new set
        incrementShowItems();
      } else {
        let updateShowItems = [...toShowItems];
        // remove items from "toShowItems" array by keeping at least one item before the current index
        if (updateShowItems.length > 5) {
          for (let i = 0; i <= videoActiveIndex - 2; i++) {
            updateShowItems[i] && (updateShowItems[i] = null);
          }
        }
        setToShowItems(updateShowItems);
      }
    } else {
      //swipe-up || backwardSwipe
      let updateShowItems = [...toShowItems];
      let dataItem = [...items];
      // remove items from "toShowItems" array by keeping at least one item before the current index
      if (
        updateShowItems.length > 5 &&
        updateShowItems[videoActiveIndex - 1] === null
      ) {
        for (let i = toShowItems.length - 1; i > videoActiveIndex + 1; i--) {
          updateShowItems.splice(i, 1);
        }
        for (let i = videoActiveIndex - 1; i >= videoActiveIndex - 5; i--) {
          if(dataItem[i]){
            updateShowItems[i] = dataItem[i];
          }
        }
        setMuted(true);
        setToShowItems(updateShowItems);
      }
    }
    checkNoSound();
  }, [videoActiveIndex]);

  useEffect(() => {
    if (initialLoadComplete) {
      toTrackMixpanel(
        "impression",
        { playlistId: playlistid, playlistName: playListName, isPlaylist: !!playlistid, description: items?.[videoActiveIndex]?.content_description },
        items?.[videoActiveIndex]
      );
    }
  }, [initialLoadComplete]);

  useEffect(() => {
    setTimeout(() => {
      //inject(CHARMBOARD_PLUGIN_URL, null, loaded);
      setLoading(false);
      toTrackFirebase("screenView", { page: "Playlist Feed" });
      ToTrackFbEvents("screenView");
      // fbq.event('Screen View')
      // trackEvent('Screen_View',{'Page Name' :'Playlist Feed'})
      toTrackMixpanel("screenView", { pageName: pageName });
    }, 500);
  }, []);

  useEffect(() => {
    if (initialPlayStarted === true) {
      toTrackMixpanel(
        "play",
        { pageName: pageName, playlistId: playlistid, playlistName: playListName, isPlaylist: !!playlistid, description: items?.[videoActiveIndex]?.content_description },
        items?.[videoActiveIndex]
      );
      ToTrackFbEvents("play", {
        userId: items?.[videoActiveIndex]?.["userId"],
        content_id: items?.[videoActiveIndex]?.["content_id"],
        page: "Playlist Feed",
      });
      toTrackFirebase("play", {
        userId: items?.[videoActiveIndex]?.["userId"],
        content_id: items?.[videoActiveIndex]?.["content_id"],
        page: "Playlist Feed",
      });

      viewEventsCall(activeVideoId, "user_video_start");
      checkNoSound();
    }
  }, [initialPlayStarted]);

  /* mixpanel - monetization cards impression */
  useEffect(() => {
    // console.log("aAAAADDD",shop?.adData)
    shop?.adData?.monitisation &&
      shop?.adData?.monitisationCardArray?.length > 0 &&
      shop?.adData?.monitisationCardArray?.map((data) => {
        toTrackMixpanel(
          "monetisationProductImp",
          { pageName: pageName },
          {
            content_id: items?.[videoActiveIndex]?.content_id,
            productId: data?.card_id,
            productUrl: data?.product_url,
            brandName: getBrand(data?.product_url),
            campaignId: shop?.campaignId,
            category: data?.category,
            subCategory: data?.sub_category,
            subSubCategory: data?.subsub_category,
            mainCategory: data?.main_category,
          }
        );
      });
  }, [shop]);
  /************************ */

  useEffect(() => {
    setShop({});
    items?.[videoActiveIndex]?.shoppable && getCanShop();
    setsaveLook(true);
  }, [videoActiveIndex, activeVideoId]);

  const dataFetcher = () =>
    getPlaylistDetails({ playlistid, offset: offset, firstApiCall }).catch(
      (err) => {
        if (err?.message === "Playlist not found" && err?.status === 404) {
          console.log("playlist not found");
        }
      }
    );

  const onDataFetched = (data) => {
    const playlistVideos = data?.data || [];
    playlistVideos.length > 0 && setItems([...playlistVideos]);
    const playListName = data?.playlists?.[0]?.name || null;
    setPlayListName(playListName);
    let playlistVideoIndex = null;
    if (playListVideoId) {
      playlistVideoIndex = searchVideo({
        playlistArr: playlistVideos,
        videoId: playListVideoId,
      });
      setActiveVideoId(playlistVideos?.[playlistVideoIndex]?.content_id);
      setVideoActiveIndex(playlistVideoIndex);
      setInitialId(playlistVideoIndex);
    }
    if (playlistVideos.length < 6) {
      setToShowItems([...playlistVideos]);
    } else if (playlistVideos.length > 0) {
      if (playListVideoId) {
        if (playlistVideoIndex === 0) {
          setToShowItems([...playlistVideos.slice(0, 5)]);
        }
        if (playlistVideoIndex === playlistVideos.length - 1) {
          let tempArr = [];
          for (let i = 0; i < playlistVideoIndex; i++) {
            tempArr[i] = null;
          }

          let lastFiveItems = playlistVideos.slice(Math.max(items.length - 5, 0));
          for (
            let i = playlistVideoIndex, j = lastFiveItems.length - 1;
            i >= playlistVideoIndex - 5, j >= 0;
            i--, j--
          ) {
            tempArr[i] = lastFiveItems[j];
          }
          setToShowItems(tempArr);
          setVideoActiveIndex(playlistVideoIndex);
        }

        let tempArr = [];
        for (let i = 0; i < playlistVideoIndex - 1; i++) {
          tempArr[i] = null;
        }
        tempArr[playlistVideoIndex - 1] =
          playlistVideos[playlistVideoIndex - 1];
        tempArr[playlistVideoIndex] = playlistVideos[playlistVideoIndex];
        tempArr[playlistVideoIndex + 1] =
          playlistVideos[playlistVideoIndex + 1];
        setToShowItems(tempArr);
        show("", playListModal, "medium", {
          data: playlistVideos,
          fetchMore: () => {},
          activeVideoId: playlistVideos[playlistVideoIndex]?.content_id,
          playlistName: playListName,
          hideOverLay: true,
          playlistId: playlistid
        });
      } else {
        setToShowItems([...playlistVideos.slice(0, offset)]);
      }
     
    }

    //setOffset(playlistVideos.length < 6? playlistVideos.length - 1 : playlistVideoIndex ? playlistVideoIndex - 1 : 6);
    setInitialLoadComplete(true);
    if (!playListVideoId) {
      !activeVideoId &&
        data &&
        setActiveVideoId(playlistVideos?.[0]?.content_id);
    }
    //setToInsertElements(4);
    setFirstApiCall(false);
  };

  useEffect(() => {
    const playlistDrawerChilds = document.querySelectorAll(`[id^="episode_"]`);
    const backButton = document.getElementById("backButton");
    playlistDrawerChilds.forEach((item, index) => {
      item.onclick = function () {
        handleDrawerClick(index);
      };
    });
    backButton && (backButton.onClick = handleBackClick);
  }, [items]);

  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;

  const validItemsLength = items?.length > 0;

  const updateSeekbar = (percentage, currentTime, duration) => {
    if (percentage > 0) {
      setInitialPlayStarted(true);
    }
    const videoDurationDetail = {
      currentT: currentTime,
      totalDuration: duration,
    };
    if (currentTime > 6.8 && currentTime < 7.1) {
      viewEventsCall(activeVideoId, "view");
    }
    setVideoDurationDetails(videoDurationDetail);
    setSeekedPercentage(percentage);
    /********** Mixpanel ***********/
    if (currentTime >= duration - 0.2) {
      toTrackMixpanel(
        "watchTime",
        {
          pageName: pageName,
          watchTime: "Complete",
          duration: duration,
          durationWatchTime: duration,
          playlistId: playlistid, playlistName: playListName,
          isPlaylist: !!playlistid, description: items?.[videoActiveIndex]?.content_description
        },
        items?.[videoActiveIndex]
      );
      toTrackMixpanel(
        "replay",
        { pageName: pageName, duration: duration, durationWatchTime: duration, playlistId: playlistid, playlistName: playListName, isPlaylist: !!playlistid, description: items?.[videoActiveIndex]?.content_description },
        items?.[videoActiveIndex]
      );

      toTrackFirebase(
        "watchTime",
        {
          userId: items?.[videoActiveIndex]?.["userId"],
          content_id: items?.[videoActiveIndex]?.["content_id"],
          page: "Playlist Feed",
        },
        {
          watchTime: "Complete",
          duration: duration,
          durationWatchTime: duration,
        }
      );
      toTrackFirebase(
        "replay",
        {
          userId: items?.[videoActiveIndex]?.["userId"],
          content_id: items?.[videoActiveIndex]?.["content_id"],
          page: "Playlist Feed",
        },
        { duration: duration, durationWatchTime: duration }
      );
      /*** view events ***/
      ToTrackFbEvents("ugcPlayedComplete");
      //fbq.event('UGC_Played_Complete')
      ToTrackFbEvents(
        "replay",
        {
          userId: items?.[videoActiveIndex]?.["userId"],
          content_id: items?.[videoActiveIndex]?.["content_id"],
          page: "Playlist Feed",
        },
        { duration: duration, durationWatchTime: duration }
      );

      // viewEventsCall(activeVideoId, 'completed');
      viewEventsCall(activeVideoId, "user_video_start");
      if (showSwipeUp.count < 1 && activeVideoId === items[0].content_id) {
        setShowSwipeUp({ count: 1, value: true });
      }

      // try{
      //   const videosCompleted = parseInt(window.sessionStorage.getItem('videos-completed'));
      //   window.sessionStorage.setItem('videos-completed',videosCompleted+1);
      //  }catch(e){
      //    console.error('error in video comp increment',e)
      //  }
    }
    /******************************/
    if (currentTime >= duration - 0.4) {
      if (showSwipeUp.count === 0 && activeVideoId === items[0].content_id) {
        setShowSwipeUp({ count: 1, value: true });
      }
    }
    /******************************/
  };

  const handleBackClick = async () => {
    //HIPI-5340
    const overlayContainer = document?.querySelector(
      `[data-testid="dt-overlay"]`
    );
    if ([...overlayContainer?.classList]?.includes("visible")) {
      return false;
    } else {
      let fallbackURL = `/feed/for-you`;
      if (typeof window !== "undefined" && +window?.history?.state?.idx > 0) {
        await router.back();
      } else {
        window.location.href = fallbackURL;
      }
    }
  };

  const getCanShop = async () => {
    const shopContent = { ...shop };
    shopContent.isShoppable = "fail";
    try {
      const response = await canShop({ videoId: activeVideoId });
      response?.isShoppable
        ? (shopContent.isShoppable = "success")
        : (shopContent.isShoppable = "fail");
      shopContent.data = response?.data;
      shopContent.type = response?.type;
      shopContent.adData = response?.adData;
      shopContent.campaignId = response?.campaignId;
    } catch (e) {
      console.log("error in canShop");
    }
    setShop(shopContent);
  };

  function handleDrawerClick(index) {
    const swiper = document.querySelector("#playlistFeedSwiper");
    if (!!toShowItems[index]) {
      //if index already present in toshowItems array
      swiper.swiper.slideTo(index);
    } else {
      let playlistVideoIndex = null;
      playlistVideoIndex = searchVideo({
        playlistArr: items,
        videoId: items[index].content_id,
      });
      setActiveVideoId(items?.[playlistVideoIndex]?.content_id);
      setInitialId(playlistVideoIndex);

      if (index === items.length - 1) {
        let tempArr = [];
        for (let i = 0; i <= playlistVideoIndex; i++) {
          tempArr[i] = null;
        }
        let lastFiveItems = items.slice(Math.max(items.length - 5, 0));
        for (
          let i = playlistVideoIndex, j = lastFiveItems.length - 1;
          i >= playlistVideoIndex - 5, j >= 0;
          i--, j--
        ) {
          tempArr[i] = lastFiveItems[j];
        }
        setToShowItems(tempArr);
      } else {
        let tempArr = [];
        for (let i = 0; i < playlistVideoIndex - 1; i++) {
          tempArr[i] = null;
        }
        tempArr[playlistVideoIndex - 1] = items[playlistVideoIndex - 1];
        tempArr[playlistVideoIndex] = items[playlistVideoIndex];
        tempArr[playlistVideoIndex + 1] = items[playlistVideoIndex + 1];
        setToShowItems(tempArr);
      }
      setTimeout(() => {
        swiper.swiper.slideTo(playlistVideoIndex);
      }, 0);
    }
    setVideoActiveIndex(index);
  }

  const handleSaveLook = () => {
    const data = [...items];
    data.forEach((item) => {
      if (item.content_id === activeVideoId) item.saveLook = true;
    });
    setItems(data);
    setsaveLook(!saveLook);
  };

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <>
        <div
          className="overflow-hidden relative"
          style={{ height: `${videoHeight}px` }}
        >
          <OpenAppStrip
            pageName={pageName}
            item={items?.[videoActiveIndex]}
            activeVideoId={activeVideoId}
            data={items}
            {...(activeVideoId === playListVideoId
              ? { videoId: playListVideoId }
              : {})}
            //fetchMore={loadMoreItems}
            isPlaylistView
            playlistName={playListName}
            callbackForIos={handleDrawerClick}
            piD={playlistid}
            //drawerOnClick={drawerOnClick}
          />
          <div
            onClick={handleBackClick}
            className="fixed z-10 p-4 mt-4 w-1/2"
            id="backButton"
          >
            <Back />
          </div>
          <div className="font-semibold text-center text-white absolute top-0 right-1/2 mt-4 z-20 items-center flex justify-center p-4 transform translate-x-1/2 w-3/4 px-6">
            {playListName ? playListName: null}
          </div>
          <Swiper
            id="playlistFeedSwiper"
            initialSlide={initialId}
            className="max-h-full"
            direction="vertical"
            draggable="true"
            spaceBetween={0}
            calculateheight="true"
            mousewheel
            scrollbar={{ draggable: true }}
            onSlideChange={(swiperCore) => {
              const { activeIndex, slides } = swiperCore;
              setVideoDurationDetails({ totalDuration: null, currentT: 0 });
              setSeekedPercentage(0);
              setInitialPlayStarted(false);
              setShowSwipeUp({ count: 1, value: false });
              toTrackMixpanel(
                "impression",
                { pageName: pageName, playlistId: playlistid, playlistName: playListName, isPlaylist: !!playlistid, description: items?.[videoActiveIndex]?.content_description },
                items?.[videoActiveIndex]
              );
              // toTrackMixpanel(videoActiveIndex, 'swipe',{durationWatchTime : preVideoDurationDetails?.videoDurationDetails?.currentT, duration: preVideoDurationDetails?.videoDurationDetails?.totalDuration});
              preVideoDurationDetails?.videoDurationDetails?.currentT > 0 &&
                toTrackMixpanel(
                  "watchTime",
                  {
                    pageName: pageName,
                    durationWatchTime:
                      preVideoDurationDetails?.videoDurationDetails?.currentT,
                    watchTime: "Partial",
                    duration:
                      preVideoDurationDetails?.videoDurationDetails
                        ?.totalDuration,
                    playlistId: playlistid, playlistName: playListName,
                    isPlaylist: !!playlistid, description: items?.[videoActiveIndex]?.content_description
                  },
                  items?.[videoActiveIndex]
                );
              ToTrackFbEvents(
                "watchTime",
                {
                  userId: items?.[videoActiveIndex]?.["userId"],
                  content_id: items?.[videoActiveIndex]?.["content_id"],
                  page: "Playlist Feed",
                },
                {
                  durationWatchTime:
                    preVideoDurationDetails?.videoDurationDetails?.currentT,
                  watchTime: "Partial",
                  duration:
                    preVideoDurationDetails?.videoDurationDetails
                      ?.totalDuration,
                }
              );
              toTrackFirebase(
                "watchTime",
                {
                  userId: items?.[videoActiveIndex]?.["userId"],
                  content_id: items?.[videoActiveIndex]?.["content_id"],
                  page: "Playlist Feed",
                },
                {
                  durationWatchTime:
                    preVideoDurationDetails?.videoDurationDetails?.currentT,
                  watchTime: "Partial",
                  duration:
                    preVideoDurationDetails?.videoDurationDetails
                      ?.totalDuration,
                }
              );

              /** Mixpanel - increment view count **/
              preVideoDurationDetails?.videoDurationDetails?.currentT > 0 &&
                incrementCountVideoView(items?.[videoActiveIndex]?.content_id);

              /*** video events ***/
              if (preVideoDurationDetails?.videoDurationDetails?.currentT < 3) {
                toTrackMixpanel(
                  "skip",
                  {
                    pageName: pageName,
                    durationWatchTime:
                      preVideoDurationDetails?.videoDurationDetails?.currentT,
                    watchTime: "Partial",
                    duration:
                      preVideoDurationDetails?.videoDurationDetails
                        ?.totalDuration,
                  },
                  items?.[videoActiveIndex]
                );
                viewEventsCall(activeVideoId, "skip");
              } else if (
                preVideoDurationDetails?.videoDurationDetails?.currentT < 7
              ) {
                viewEventsCall(activeVideoId, "no decision");
              }
              viewEventsCall(activeVideoId, "user_video_end", {
                timeSpent:
                  preVideoDurationDetails?.videoDurationDetails?.currentT,
                duration:
                  toShowItems?.[videoActiveIndex]?.videoDuration
              });
              // preVideoDurationDetails?.videoDurationDetails?.totalDuration,

              /***************/

              if (
                slides[activeIndex]?.firstChild?.firstChild?.currentTime > 0
              ) {
                slides[activeIndex].firstChild.firstChild.currentTime = 0;
              }
              const activeId = slides[activeIndex]?.id;
              setVideoActiveIndex(activeIndex);
              setActiveVideoId(activeId);
            }}
          >
            {toShowItems?.map((item, id) => (
              <SwiperSlide key={id} id={item?.content_id}>
                {!!item?.content_id ? (
                  <Video
                    updateSeekbar={updateSeekbar}
                    socialId={item?.getSocialId}
                    url={item?.video_url}
                    id={item?.content_id}
                    comments={item?.commentsCount}
                    likes={item?.likesCount}
                    music={item?.musicCoverTitle}
                    musicTitle={item?.music_title}
                    profilePic={item?.userProfilePicUrl}
                    userName={item?.userName}
                    musicCoverTitle={item?.musicCoverTitle}
                    videoid={item?.content_id}
                    hashTags={item?.hashTags}
                    videoOwnersId={item?.videoOwnersId}
                    thumbnail={item?.firstFrame}
                    canShop={shop?.isShoppable === "success" || false}
                    shopCards={shop?.data}
                    shopType={shop?.type}
                    handleSaveLook={handleSaveLook}
                    saveLook={saveLook}
                    saved={item?.saveLook}
                    activeVideoId={activeVideoId}
                    comp="profile"
                    profileFeed
                    loading={loading}
                    muted={
                      item?.[videoActiveIndex]?.videoSound === false
                        ? true
                        : muted
                    }
                    firstFrame={item?.firstFrame}
                    player={"multi-player-muted"}
                    description={item?.content_description}
                    pageName={pageName}
                    adData={shop?.adData}
                    userVerified={item?.verified}
                    videoSound={item?.videoSound}
                    campaignId={shop?.campaignId}
                    setMuted={setMuted}
                    // showBanner={showBanner}
                  />
                ) : (
                  <div></div>
                )}
              </SwiperSlide>
            ))}
            <div
              className="absolute top-1/2 justify-center w-screen flex"
              style={{
                display:
                  validItemsLength && seekedPercentage > 0
                    ? "none"
                    : "flex text-white",
              }}
            >
              <CircularProgress />
            </div>
            {!items?.[videoActiveIndex]?.videoSound && initialPlayStarted && (
              <SnackCenter showSnackbar={noSound} />
            )}
            {items.length > 1 && (
              <div
                onClick={() => setShowSwipeUp({ count: 1, value: false })}
                id="swipe_up"
                className={
                  showSwipeUp.value
                    ? "absolute flex flex-col justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full"
                    : "absolute hidden justify-center items-center top-0 left-0 bg-black bg-opacity-30 h-full z-9 w-full"
                }
              >
                <div className="p-1 relative">
                  <SwipeUp />
                  <div className="w-4 h-16 bg-white bg-opacity-20 rounded-full absolute top-1 left-1"></div>
                </div>
                <div className="flex py-2 px-4 bg-gray text-white font-medium mt-12">
                  Swipe up for next video
                </div>
              </div>
            )}
            {
              <div
                onClick={() => setMuted(false)}
                className="absolute top-0 right-4  mt-4 items-center flex justify-center p-4"
                style={{
                  display:
                    initialPlayStarted &&
                    items?.[videoActiveIndex]?.videoSound &&
                    muted
                      ? "flex"
                      : "none",
                }}
              >
                <div className="stretch-y">
                  <div className="stretch-z"></div>
                </div>
                <div className="z-9">
                  <Mute />
                </div>
              </div>
            }
          </Swiper>
          {validItemsLength ? (
            seekedPercentage ? (
              <Seekbar seekedPercentage={seekedPercentage} type={"onBottom"} />
            ) : (
              <SeekbarLoading type={"onBottom"} />
            )
          ) : (
            ""
          )}
          <div id="cb_tg_d_wrapper">
            <div className="playkit-player" />
          </div>
        </div>
      </>
      {/* {ShowAppBanner ? <AppBanner notNowClick={notNowClick} videoId={activeVideoId}/>:''} */}
      <Landscape />
    </ComponentStateHandler>
  );
}

export default withRouter(ProfilePlaylistIphone);
