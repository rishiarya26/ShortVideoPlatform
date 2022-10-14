import React, { useRef, useState } from "react";
import useSnackbar from "../../hooks/use-snackbar";
import { uploadDeskVideo } from "../../sources/desk-upload";
import { localStorage } from "../../utils/storage";
import Header from "../desk-header";
import DeskCaption from "./desk-caption";
import FileUpload from "./file-upload";
import { languageCodes } from "../../../public/languages.json";
import styles from "./upload.module.css";
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import UpArrowBlack from "../commons/svgicons/up-arrow-black";
import DownArrowBlack from "../commons/svgicons/down-arrow-black";
import ClearDataPopup from "./data-clear-popup";
import useDialog from "../../hooks/use-dialog";

const AllowedPermissionList = ["Comment", "Like", "Duet", "saveToDevice"];
const AllowedUserList = ["Public", "Friends", "Private"];

const DeskUplaod = () => {
  //Refs
  const CaptionInputRef = useRef();
  const videoInputRef = useRef();

  const { showSnackbar } = useSnackbar();
  const [s3Url, setS3Url] = useState("");
  const [userViewPermission, setUserViewPermission] = useState("Public");
  const [language, setLanguage] = useState({ name: "", code: "" });
  const [showPermissionList, setShowPermissionList] = useState(false);
  const [showLanguageList, setShowLanguageList] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [source, setSource] = useState({ url: "", name: "" });
  const [allowUser, setAllowUser] = useState({
    Comment: false,
    Like: false,
    Duet: false,
    saveToDevice: false,
  });

  let userInfo = localStorage.get("user-details") ?? {};

  const {show:showDialog} = useDialog();

  const handleCheckBox = (e, item) => {
    let { checked } = e.target;
    if (checked) setAllowUser({ ...allowUser, [item]: true });
    else setAllowUser({ ...allowUser, [item]: false });
  };

  const resetFields = () => {
    CaptionInputRef.current.innerHTML = ""; // removing caption data
    videoInputRef.current.value = ""; // removing data from fileUpLOAD element
    setShowSuggestions(false);
    setUserViewPermission("Public");
    setShowPermissionList(false);
    setSource({ ...source, url: "", name: "" });
    setAllowUser({
      ...allowUser,
      Comment: false,
      Like: false,
      Duet: false,
      saveToDevice: false,
    });
    setLanguage({ name: "", code: "" });
    // setCopyRightCheck(false);
  };

  const resetVideoData = () => {
    videoInputRef.current.value = "";
    setSource({ ...source, url: "", name: "" });
    showMessage({
      message: "video has been removed successfully",
      type: "success",
    });
  }

  const closePopup = () => {
    setShowPermissionList(false);
  };

  const setS3UrlCb = (url) => {
    setS3Url(url);
  };

  const showMessage = ({ message, type }) => {
    showSnackbar({ message: message, type: type });
  };

  // const handleSwitch = (e) => {
  //   let { checked } = e.target;
  //   if (checked) setCopyRightCheck(true);
  //   else setCopyRightCheck(false);
  // };

  const submitVideoPost = async (e) => {
    e.preventDefault();
    let postData = {};
    let postVideoData = {};
    let videoOwnerObject = {};
    videoOwnerObject.id = userInfo?.id ?? null;
    videoOwnerObject.name = `${userInfo?.firstName} ${userInfo?.lastName}`;
    videoOwnerObject.profilePicImgUrl = userInfo?.profilePic;
    postVideoData.privacySettings = userViewPermission ?? null;
    postVideoData.allowComments = true;
    postVideoData.isDuet = false;
    postVideoData.allowLikeDislike = allowUser.Like ?? null;
    postVideoData.allowSharing = true;
    postVideoData.downloadable = true;
    postVideoData.allowDuet = allowUser.Duet ?? null;
    postVideoData.allowReact = allowUser.Like ?? null;
    postVideoData.allowduplicate = true;
    postData.sourceName = null;
    postData.sourcePage = null;
    postData.clipsCount = null;
    postData.selectedDuration = null;
    postData.clipsDurationBySpeed = null;
    postData.ugcCreationType = null;
    postData.musicTrimIn = null;
    postData.musicTrimOut = null;
    postData.sourceFile = source.name ?? null; //file name
    postData.sourceDraft = null;
    postData.uploadUrl = s3Url ?? null;
    postData.uploadTimeStamp = Date.now();
    postData.s3Url = s3Url ?? null;
    postData.thumbnailUrl = null;
    postData.getSocialId = null;
    postData.soundUrl = null;
    postData.zee5assetId = null;
    postData.downloadable = true;
    postData.allowComments = allowUser.Comment ?? null;
    postData.videoDuration = null;
    postData.allowLikeDislike = allowUser.Like ?? null;
    postData.allowSharing = true;
    postData.allowReact = allowUser.Duet ?? null;
    postData.allowDuet = allowUser.Duet ?? null;
    postData.advancedSettings = JSON.stringify(postVideoData) ?? null; // object
    postData.hashtags = null;
    postData.videoOwners = JSON.stringify(videoOwnerObject) ?? null; // {id, name, profileImaheUrl}
    postData.sound = null;
    postData.description =
      CaptionInputRef?.current?.innerText.toString() ?? null; //caption
    postData.videoTitle = "Post the video";
    postData.privacySettings = userViewPermission ?? null;
    postData.users = null;
    postData.videoOwnersId = userInfo?.id ?? null; // user id
    postData.preEmoji = null;
    postData.emoji = null;
    postData.preSticker = null;
    postData.sticker = null;
    postData.preFilter = null;
    postData.filter = null;
    postData.preEffect = null;
    postData.effect = null;
    postData.id = null;
    postData.uploaded = null;
    postData.duration = null;
    postData.isDraft = false;
    postData.beautymode = null;
    postData.speed = null;
    postData.allowDuplicate = true;
    postData.originalCreatorId = null;
    postData.mashupDetails = null;
    postData.language = language ?? { code: "hi", name: "Hindi" };
    postData.genre = null;

    console.log(postData, postVideoData, videoOwnerObject, "postVideoData");
    let startTime = localStorage.get("UPLOAD_API_TIMESTAMP_START");
    let endTime = localStorage.get("UPLOAD_API_TIMESTAMP_END");
    let totleTime = Math.floor(endTime - startTime);
    try {
      let response = await uploadDeskVideo({ postData });
      console.log("vidoe uploaded response: " + JSON.stringify(response));

      if (response.status === "success") {
        let { responseData } = response?.data || {};
        let { id = "", language = "" } = responseData || {};
        toTrackMixpanel(
          "shortPostResult",
          { type: "success", post_time_seconds: totleTime },
          { content_id: id, ugc_language: language?.name }
        );
      }
      resetFields(); // ?discarding the values from the component
      showMessage({
        message: "Video has been successfully posted.",
        type: "success",
      });
      console.log(response);
    } catch (e) {
      toTrackMixpanel("shortPostResult", {
        type: "failure",
        post_time_seconds: totleTime,
        failure_reason: e,
      });
      showMessage({
        message: "facing issues while uploading video",
        type: "error",
      });
      console.error(e);
    }
  };

  return (
    <div className="h-screen  w-screen flex flex-col justify-between">
      <Header />
      <div className="w-full flex justify-center items-center md:mt-16">
        <div className="flex w-feed box_shadow_1 my-8 bg-white py-8 px-10 flex-col">
          <h1 className="text-2xl font-semibold text-gray-800">Upload video</h1>
          <p className="text-md font-base text-gray-400 pt-2">
            Post a video to your account
          </p>
          <div className="flex items-start">
            {/* left section  */}
            <div className="flex w-1/3 my-8 bg-white py-8 px-10">
              <FileUpload
                inputRef={videoInputRef}
                sets3Url={setS3UrlCb}
                source={source}
                setSource={setSource}
                resetVideoData={resetVideoData}
              />
            </div>

            {/* right section  */}
            <div className="flex w-2/3 my-8 bg-white py-8 px-10">
              <div className="flex w-full flex-col px-8 flex-1">
                <DeskCaption
                  InputRefCaption={CaptionInputRef}
                  closePopup={closePopup}
                  showSuggestions={showSuggestions}
                  setShowSuggestions={setShowSuggestions}
                />

                <div className="flex flex-col max-w-xs relative transition duration-500 ease-in-out mb-4">
                  <p className="text-sm font-bold text-gray-600 py-2">
                    Languages
                  </p>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => {
                      setShowLanguageList((prev) => !prev);
                      setShowPermissionList(false);
                      setShowSuggestions(false);
                    }}
                  >
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={language.name}
                      placeholder="select language..."
                    ></input>
                    <span className="absolute right-3 top-2">
                      {showLanguageList ? <UpArrowBlack /> : <DownArrowBlack />}
                    </span>
                  </div>

                  {showLanguageList && (
                    <div
                      id="hastagList"
                      className="bg-white absolute left-0 top-20 min-w-full shadow-md rounded-lg overflow-y-scroll thin_bar flex flex-col max-h-72 z-1"
                    >
                      {languageCodes.map((item, idx) => {
                        return (
                          <span
                            key={idx}
                            className={`${
                              language.code === item.code && "bg-gray-100"
                            } p-2 cursor-pointer hover:bg-gray-100`}
                            onClick={(e) => {
                              setLanguage(item);
                              setShowLanguageList((prev) => !prev);
                            }}
                          >
                            {item.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex flex-col max-w-xs relative transition duration-500 ease-in-out mb-4">
                  <p className="text-sm font-bold text-gray-600 py-2">
                    Who can view this video
                  </p>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => {
                      setShowPermissionList((prev) => !prev);
                      setShowSuggestions(false);
                    }}
                  >
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={userViewPermission}
                    ></input>
                    <span className="absolute right-3 top-2">
                      {showPermissionList ? (
                        <UpArrowBlack />
                      ) : (
                        <DownArrowBlack />
                      )}
                    </span>
                  </div>

                  {showPermissionList && (
                    <div
                      id="hastagList"
                      className="bg-white absolute left-0 top-20 min-w-full shadow-md rounded-lg overflow-y-scroll thin_bar flex flex-col max-h-72 z-1"
                    >
                      {AllowedUserList.map((item, idx) => {
                        return (
                          <span
                            key={idx}
                            className={`${
                              userViewPermission === item && "bg-gray-100"
                            } p-2 cursor-pointer hover:bg-gray-100`}
                            onClick={(e) => {
                              setUserViewPermission(item);
                              setShowPermissionList((prev) => !prev);
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex flex-col w-full relative mb-4">
                  <p className="text-sm font-bold text-gray-600 py-2 mb-2">
                    Allow users to:
                  </p>
                  <div className="relative cursor-pointer flex justify-start items-center">
                    {AllowedPermissionList.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          // for={`${item}-checkbox`}
                          className="flex justify-center items-end text-sm font-medium text-gray-900 dark:text-gray-300 relative cursor-pointer"
                        >
                          <input
                            className={`${styles.styledCheckbox} h-5 w-5 border-2 rounded-sm border-hipired mr-2 cursor-pointer`}
                            id={`${item}-checkbox`}
                            checked={allowUser[item]}
                            onClick={(e) => handleCheckBox(e, item)}
                            type="checkbox"
                            // value="value1"
                          />

                          <label
                            className="mr-12 font-normal text-sm"
                            htmlFor={`${item}-checkbox`}
                          >
                            {item.toLowerCase() === "savetodevice"
                              ? "Save To Device"
                              : item}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* <div className="flex flex-col w-full relative mb-4">
                  <div className="flex items-center">
                    <p className="text-sm font-bold text-gray-600 pt-2 mb-2">
                      Run a copyright check
                    </p>
                    <label className="switch ml-4">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSwitch(e)}
                        checked={copyRightCheck}
                      />
                      <span className="slider_new round"></span>
                    </label>
                  </div>
                  {!copyRightCheck && (
                    <div className="text-xs font-light text-gray-600">
                      We'll check your video for potential copyright
                      infringements on used sounds. If infringements are found,
                      you can edit the video before posting.{" "}
                      <a>
                        <b className="cursor-pointer font-bold">Learn More</b>
                      </a>
                    </div>
                  )}
                  {copyRightCheck && (
                    <div className="flex items-center bg-gray-200 p-2 rounded-md">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 48 48"
                        fill="red"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM27 16C27 17.6569 25.6569 19 24 19C22.3431 19 21 17.6569 21 16C21 14.3431 22.3431 13 24 13C25.6569 13 27 14.3431 27 16ZM23 22C22.4477 22 22 22.4477 22 23V34C22 34.5523 22.4477 35 23 35H25C25.5523 35 26 34.5523 26 34V23C26 22.4477 25.5523 22 25 22H23Z"
                        ></path>
                      </svg>
                      &nbsp;
                      <div className="text-xs font-light text-gray-600">
                        Copyright check will not begin until your video is
                        uploaded.
                      </div>
                    </div>
                  )}
                </div> */}

                <div className="flex items-center">
                  <button
                    className="rounded-md text-sm font-semibold px-8 py-3 text-black mt-4 border border-gray-300 min-w-32"
                    onClick={()=> showDialog('', ClearDataPopup,'extraSmall', { clearData:resetFields })}
                  >
                    Discard
                  </button>

                  <button
                    className={`${
                      source.url === ""
                        ? "bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed"
                        : "text-white"
                    } rounded-md text-sm font-semibold px-8 py-3 bg-hipired  mt-4 ml-4 border min-w-32`}
                    disabled={!source.url}
                    onClick={(e) => submitVideoPost(e)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskUplaod;
