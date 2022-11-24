/*eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import { withRouter } from "next/router";
import Video from "../video";
import Error from "./error";
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
import dynamic from "next/dynamic";
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
import PlaylistDrawer from "../playlist-drawer";


SwiperCore.use([Mousewheel]);

let retry;
const ErrorComp = () => <PlaylistUnavailable retry={retry} />
const LoadComp = () => <Loading />;

const detectDeviceModal = dynamic(() => import("../open-in-app"), {
  loading: () => <div />,
  ssr: false,
});

const searchVideo = ({ videoId = null, playlistArr = [] }) => {
  if (videoId && playlistArr.length > 0) {
    return playlistArr.findIndex((item) => item.content_id === videoId);
  }
};

function ProfilePlaylistIphone({ router }) {
  const creatorId = router?.query?.creatorId || null;
  const playListVideoId = router?.query?.videoId || null;
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
  const [playlistName, setPlaylistName] = useState("");
  const [offset, setOffset] = useState(5);
  const [showSwipeUp, setShowSwipeUp] = useState({ count: 0, value: false });
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [initialId, setInitialId] = useState(0);

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [noSound, setNoSound] = useState(false);

  // const [userDetails, setUserDetails] = useState({});
  // const [toInsertElements, setToInsertElements] = useState(4);
  const [toShowItems, setToShowItems] = useState([]);
  // const [deletedTill, setDeletedTill] = useState();

  const checkNoSound = () => {
    if (!items?.[videoActiveIndex]?.videoSound) {
      setNoSound(true);
      setTimeout(() => {
        setNoSound(false);
      }, 2000);
    }
  };

  const preVideoDurationDetails = usePreviousValue({ videoDurationDetails });
  // const preActiveVideoId = usePreviousValue({ videoActiveIndex });
  // const pretoInsertElemant = usePreviousValue({ toInsertElements });
  const { id: playlistid } = router?.query;
  const { show } = useDrawer();
  const pageName = "Profile Playlist Feed";
  const size = useWindowSize();
  const videoHeight = `${size.height}`;


  const addVideos = () => {
    const tempToShowItems = toShowItems;
    let tempOffset = offset;
    const n = items.length < 5 ? items.length : 5;
    // for(let i = 0;i < tempToShowItems.length; i++) { 
    //   tempToShowItems[i] = null;
    // }
    for(let i = 0;i < n; i++) { 
      console.log("debug1", n, i)
      tempToShowItems.push(items[tempOffset]);
      tempOffset++;
    }
    setOffset(tempOffset);
  }

  const addVideosFromBack = () => {
    const tempToShowItems = toShowItems;
    const tempOffset = offset;
    for(let i = offset;i > offset-5; i--) { 
      tempToShowItems[i] = null;
    }
    items.forEach((item) => {
      tempToShowItems.push(item[tempOffset-5]);
      tempOffset--;
    })
    setOffset(tempOffset);
  }

  useEffect(() => {
    console.log("debug", videoActiveIndex, offset);
    if(offset < items.length && videoActiveIndex >= offset - 2){
      addVideos();
    }
  }, [videoActiveIndex])

  useEffect(() => {
    if (playListVideoId && items.length > 0) {
      const id = searchVideo({ videoId: playListVideoId, playlistArr: items });
      if (id > -1 && id < items.length) {
        setInitialId(id);
        setActiveVideoId(playListVideoId);
      } else {
        //handling when passing invallid playlist id
        setInitialId(0);
        setActiveVideoId(items?.[0]?.content_id);
      }
      toTrackMixpanel("playlistPopUpLaunch", {popUpName:"playlist"});
      show('', PlaylistDrawer, 'medium', {data:items,  fetchMore:loadMoreItems, activeVideoId:playListVideoId, playlistName})
    }
  }, [items]);

  useEffect(() => {
    if (initialLoadComplete) {
      toTrackMixpanel(
        "impression",
        { pageName: pageName },
        items?.[videoActiveIndex]
      );
    }
  }, [initialLoadComplete]);

  useEffect(() => {
    setTimeout(() => {
      //inject(CHARMBOARD_PLUGIN_URL, null, loaded);
      setLoading(false);
      toTrackFirebase("screenView", { page: "Profile Feed" });
      ToTrackFbEvents("screenView");
      // fbq.event('Screen View')
      // trackEvent('Screen_View',{'Page Name' :'Profile Feed'})
      toTrackMixpanel("screenView", { pageName: pageName });
    }, 500);
  }, []);

  useEffect(() => {
    if (initialPlayStarted === true) {
      toTrackMixpanel(
        "play",
        { pageName: pageName },
        items?.[videoActiveIndex]
      );
      ToTrackFbEvents("play", {
        userId: items?.[videoActiveIndex]?.["userId"],
        content_id: items?.[videoActiveIndex]?.["content_id"],
        page: "Profile Feed",
      });
      toTrackFirebase("play", {
        userId: items?.[videoActiveIndex]?.["userId"],
        content_id: items?.[videoActiveIndex]?.["content_id"],
        page: "Profile Feed",
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
  }, [activeVideoId]);

  const dataFetcher = () =>
    getPlaylistDetails({ playlistid, offset: offset,  firstApiCall }).catch((err)=>{
      if(err?.message === "Playlist not found" && err?.status === 404) {  
        console.log("playlist not found");
      }
    });

  const onDataFetched = (data) => {
      const playlistVideos = data?.data || [];
      // if(playlistVideos.length === 0 ){
      //   setPlaylistNotfound(true);
      // };
      playlistVideos.length > 0 && setItems([...playlistVideos]);
      const playListName = data?.playlists?.[0]?.name || null;
      if(playlistVideos.length < 5) {
        setToShowItems([...playlistVideos]);
      } else {
        setToShowItems([...playlistVideos.slice(0,offset)]);
        setOffset(toShowItems.length + 5);
      }
      setInitialLoadComplete(true);
      setPlaylistName(playListName);
      if (!playListVideoId) {
        !activeVideoId &&
          data &&
          setActiveVideoId(playlistVideos?.[0]?.content_id);
      }
      //setToInsertElements(4);
      setFirstApiCall(false);
    
    
  };

  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;

  const loadMoreItems = async () => {
    // let videos = [...items];
    // try {
    //   const resp = await getPlaylistDetails({ playlistid, offset: offset });
    //   if (resp?.data?.length > 0) {
    //     console.log("innn", resp);
    //     videos = videos?.concat(resp?.data);
    //     console.log("concat", videos);
    //     setItems(videos);
    //     setOffset(offset + 1);
    //     return resp?.data;
    //   }
    // } catch (e) {
    //   console.log("data fetch error", e);
    // }
  };

  // useEffect(()=>{
  //   async function loadItems() 
  //   { 
  //    const toLoadMoreIndex = items.length-4;
  //     videoActiveIndex === toLoadMoreIndex && await loadMoreItems();
  //   }
  //   loadItems();
  //   checkNoSound();
  //  },[videoActiveIndex])

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
        },
        items?.[videoActiveIndex]
      );
      toTrackMixpanel(
        "replay",
        { pageName: pageName, duration: duration, durationWatchTime: duration },
        items?.[videoActiveIndex]
      );

      toTrackFirebase(
        "watchTime",
        {
          userId: items?.[videoActiveIndex]?.["userId"],
          content_id: items?.[videoActiveIndex]?.["content_id"],
          page: "Profile Feed",
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
          page: "Profile Feed",
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
          page: "Profile Feed",
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

  const handleBackClick = () => {
    router?.back();
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
        {/* <SeoMeta
        data={{
          title: `${userDetails?.firstName || ''} ${userDetails?.lastName || ''} on Hipi - Indian Short Video App`,
          // image: item?.thumbnail,
          description: `${userDetails?.firstName || ''} ${userDetails?.lastName || ''} (@${userDetails?.userHandle || ''}) on Hipi. Checkout latest trending videos from ${userDetails?.firstName || ''} ${userDetails?.lastName || ''} that you can enjoy and share with your friends.`,
          canonical: getCanonicalUrl && getCanonicalUrl(),        
        }}
     /> */}

        <div
          className="overflow-hidden relative"
          style={{ height: `${videoHeight}px` }}
        >
          <OpenAppStrip
            pageName={pageName}
            item={items?.[videoActiveIndex]}
            activeVideoId={activeVideoId}
            data={items}
            fetchMore={loadMoreItems}
            isPlaylistView
            //drawerOnClick={drawerOnClick}
          />
          <div
            onClick={handleBackClick}
            className="fixed z-10 w-full p-4 mt-4 w-1/2"
          >
            <Back />
          </div>
          <Swiper
            id="playlistFeedSwiper"
            initialSlide={initialId}
            className="max-h-full"
            direction="vertical"
            // onSwiper={() => {
            //   router?.replace(`/profile-feed/${id}`);
            //   setInitialPlayStarted(false);
            // }}
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
                { pageName: pageName },
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
                  },
                  items?.[videoActiveIndex]
                );
              ToTrackFbEvents(
                "watchTime",
                {
                  userId: items?.[videoActiveIndex]?.["userId"],
                  content_id: items?.[videoActiveIndex]?.["content_id"],
                  page: "Profile Feed",
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
                  page: "Profile Feed",
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
                  preVideoDurationDetails?.videoDurationDetails?.totalDuration,
              });

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
            // onSlidePrevTransitionEnd={() => {
            //   if(videoActiveIndex < offset-5) {

            //   }
            // }}
          >
            {validItemsLength &&
              toShowItems?.map((item, id) => (
                <SwiperSlide key={id} id={item?.content_id}>
                  {false ? (
                    <div></div>
                  ) : (
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
                    />)}
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

/**
  useEffect(() => {
    if (videoActiveIndex > preActiveVideoId?.videoActiveIndex) {
      //swipe-down
      if (toShowItems.length > 0 && toInsertElements === videoActiveIndex) {
        console.log(
          "increment called",
          "insertIndex Incremented to :",
          toInsertElements + 6
        );
        incrementShowItems();
        setToInsertElements(toInsertElements + 6);
      }
    } else {
      //swipe-up
      if (toShowItems.length > 0 && deletedTill === videoActiveIndex) {
        decrementingShowItems();
      }
    }
    checkNoSound();
  }, [videoActiveIndex]);

   const incrementShowItems = async () => {
    console.log("in increment");
    try {
      let updateShowItems = [...toShowItems];
      let deletedTill = pretoInsertElemant?.toInsertElements - 12;
      let dataItem = [...items];
      const arr = await loadMoreItems();
      arr && (dataItem = dataItem?.concat(arr));

      //add
      for (let i = 0; i <= 5; i++) {
        if (dataItem?.[videoActiveIndex + i + 2]) {
          updateShowItems.push(dataItem[videoActiveIndex + i + 2]);
        }
      }
      //delete
      if (videoActiveIndex >= 10) {
        for (
          let i = 0;
          i <= pretoInsertElemant?.toInsertElements - 6 - 1;
          i++
        ) {
          updateShowItems[i] && (updateShowItems[i] = null);
        }
      }
      deletedTill = pretoInsertElemant?.toInsertElements - 6 - 1;
      setDeletedTill(deletedTill);
      setMuted(true);
      show("", detectDeviceModal, "extraSmall", {
        text: "see more",
        setMuted: setMuted,
      });
      // setShowAppBanner(true);
      setToShowItems(updateShowItems);
    } catch (e) {
      console.log("errorree", e);
    }
  };

  const decrementingShowItems = async () => {
    let updateShowItems = [...toShowItems];
    const dataItem = [...items];
    for (let i = 0; i <= 5; i++) {
      updateShowItems[deletedTill - i] = dataItem[deletedTill - i];
    }
    setMuted(true);
    show("", detectDeviceModal, "extraSmall", {
      text: "see more",
      setMuted: setMuted,
    });
    // setShowAppBanner(true);
    setDeletedTill(deletedTill - 5);
    setToShowItems(updateShowItems);
  };

  */
