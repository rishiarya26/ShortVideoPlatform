import React, { useEffect, useRef, useState } from "react";
import useSnackbar from "../../hooks/use-snackbar";
import { uploadDeskVideo } from "../../sources/desk-upload";
import { localStorage } from "../../utils/storage";
import { toTrackMixpanel } from "../../analytics/mixpanel/events";
import { languageCodes } from "../../../public/languages.json";
import Header from "../desk-header";
import DeskCaption from "./desk-caption";
import FileUpload from "./file-upload";
import UpArrowBlack from "../commons/svgicons/up-arrow-black";
import DownArrowBlack from "../commons/svgicons/down-arrow-black";
import StaticFooter from "../static-footer";
import ClearDataPopup from "./data-clear-popup";
import useDialog from "../../hooks/use-dialog";
import styles from "./upload.module.css";
import CicularProgress from "../commons/svgicons/circular-progress";

const AllowedPermissionList = ["Comment", "Like", "Duet", "saveToDevice"];
const AllowedUserList = ["Public", "Friends", "Private"];

const DeskUplaod = () => {

  const { showSnackbar } = useSnackbar();
  const {show:showDialog} = useDialog();

  let userInfo = localStorage.get("user-details") ?? {};

  //Refs
  const CaptionInputRef = useRef();
  const videoInputRef = useRef();
  //states
  const [s3Url, setS3Url] = useState("");
  const [userViewPermission, setUserViewPermission] = useState("Public");
  const [language, setLanguage] = useState({ name: "", code: "" });

  const [showPermissionList, setShowPermissionList] = useState(false);
  const [showLanguageList, setShowLanguageList] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [source, setSource] = useState({ url: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [allowUser, setAllowUser] = useState({
    Comment: true,
    Like: true,
    Duet: true,
    saveToDevice: true,
  });

  const handleCheckBox = (e, item) => {
    let { checked } = e.target;
    if (checked) setAllowUser({ ...allowUser, [item]: true });
    else setAllowUser({ ...allowUser, [item]: false });
  };

  const closePopup = () => {
    setShowPermissionList(false);
  };

  const setS3UrlCb = (url) => {
    url !== "" && setS3Url(url);
  };

  const showMessage = ({ message, type }) => {
    showSnackbar({ message: message, type: type });
  };

  // ! reset permissions
  const resetFields = () => {
    CaptionInputRef.current.innerHTML = ""; // removing caption data
    videoInputRef.current.value = ""; // removing data from fileUpLOAD element
    setShowSuggestions(false);
    setUserViewPermission("Public");
    setShowPermissionList(false);
    setSource({ ...source, url: "", name: "" });
    setAllowUser({
      ...allowUser,
      Comment: true,
      Like: true,
      Duet: true,
      saveToDevice: true,
    });
    setLanguage({ name: "", code: "" });
  };

  const resetVideoData = () => {
    videoInputRef.current.value = "";
    setSource({ ...source, url: "", name: "" });
    showMessage({
      message: "video has been removed successfully",
      type: "success",
    });
  }

  const submitVideoPost = async (e) => {
    e.preventDefault();
    
    if(language.name === '' || language.code === ""){
        showMessage({
          message: "Please select video language",
          type: "waiting",
        });
        return false;
    }

    setLoading(true);

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
      setLoading(false);
      console.log(response);
    } catch (e) {
      setLoading(false);
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
        <div className="flex w-feed box_shadow_1 my-8 bg-white py-8 pb-12 px-12 flex-col">
          <h1 className="text-2xl font-semibold text-gray-800">Upload video</h1>
          <p className="text-md font-base text-gray-400 pt-2">
            Post a video to your account
          </p>
          <div className="flex items-start mt-4">
            {/* left section  */}
            <div className="flex w-3/12 mt-8 bg-white">
              <FileUpload
                inputRef={videoInputRef}
                sets3Url={setS3UrlCb}
                source={source}
                setSource={setSource}
                resetVideoData={resetVideoData}
                setUploadingStatus={setUploadingStatus}
              />
            </div>

            {/* right section  */}
            <div className="flex w-9/12  bg-white  pl-4">
              <div className="flex w-full flex-col px-8 flex-1">
                <DeskCaption
                  InputRefCaption={CaptionInputRef}
                  closePopup={closePopup}
                  showSuggestions={showSuggestions}
                  setShowSuggestions={setShowSuggestions}
                />

                <div className="flex flex-col max-w-xs relative transition duration-500 ease-in-out mb-4">
                  <p className="text-base font-medium text-gray-700 pb-2 pl-1 requiredField">
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
                      required
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={language.name}
                      placeholder="Select language..."
                    ></input>
                    <span className="absolute right-3 top-2">
                      {showLanguageList ? <UpArrowBlack /> : <DownArrowBlack />}
                    </span>
                  </div>

                  {showLanguageList && (
                    <div
                      id="LanguageList"
                      className="bg-white absolute left-0 top-20 min-w-full text-normal text-gray-600 shadow-md rounded-lg overflow-y-scroll thin_bar flex flex-col max-h-72 z-1"
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
                  <p className="text-base font-medium text-gray-700 pb-2 pl-1">
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
                      className="w-full border border-gray-300 text-gray-600 text-normal rounded-md px-3 py-2"
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
                      id="permissionList"
                      className="bg-white absolute left-0 top-20 text-normal text-gray-600 min-w-full shadow-md rounded-lg overflow-y-scroll thin_bar flex flex-col max-h-72 z-1"
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
                  <p className="text-base font-medium text-gray-700 pb-2 pl-1 mb-2">
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
                          />

                          <label
                            className="mr-8 font-normal text-sm flex items-center"
                            htmlFor={`${item}-checkbox`}
                          >
                            {item.toLowerCase() === "savetodevice"
                              ? "Save to device"
                              : item}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <button
                    className={`${loading || uploadingStatus ? "cursor-not-allowed" : null} rounded text-sm font-semibold px-6 py-2 text-gray-500 border border-gray-300 min-w-32`}
                    onClick={loading || uploadingStatus ? null : ()=> showDialog('', ClearDataPopup,'extraSmall', { clearData:resetFields })}
                  >
                    Discard
                  </button>

                  {loading && 
                    (<button disabled type="button" style={{backgroundColor:"#DF5A4E"}} className=" text-white rounded text-sm font-semibold px-6 py-2  border border-gray-300 min-w-32 ml-4 flex justify-evenly items-center cursor-not-allowed">
                     <CicularProgress />
                        Posting...
                    </button>)
                  }
                  
                  {!loading && 
                    (<button className={`${source.url === ""
                          ? "bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed"
                          : " text-white bg-hipired"
                      } rounded text-sm font-semibold px-6 py-2  border border-gray-300 min-w-32 ml-4`}
                      disabled={!source.url}
                      onClick={(e) => submitVideoPost(e)}
                    >
                      Post
                    </button>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StaticFooter/>
    </div>
  );
};

export default DeskUplaod;
