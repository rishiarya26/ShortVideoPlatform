import React, { useState } from "react";
import { toTrackMixpanel } from "../../../analytics/mixpanel/events";
import { uploadImage2 } from "../../../analytics/s3Client";
import { S3_BUCKET_PROD, S3_BUCKET_STAGE } from "../../../constants";
import useDialog from "../../../hooks/use-dialog";
import useSnackbar from "../../../hooks/use-snackbar";
import { localStorage } from "../../../utils/storage";
import CheckRoundBlack from "../../commons/svgicons/check-round-black";
import UploadSvg from "../../commons/svgicons/upload";
import ClearDataPopup from "../data-clear-popup";
import styles from "../upload.module.css";

function FileUpload({ source, setSource, sets3Url, inputRef , resetVideoData}) {
  const { showSnackbar } = useSnackbar();
  const [videoLoader, setVideoLoader] = useState(false);
  const [progressBar, setPorgressBar] = useState(0);

  const {show:showDialog} = useDialog();

  let createS3Url = (filename = "") => {
    let url = "";
    try {
      if (
        process?.env?.APP_ENV === "development" ||
        process?.env?.NODE_ENV === "development"
      ) {
        url = `https://${S3_BUCKET_STAGE}.s3.ap-south-1.amazonaws.com/src/${filename}`;
      } else {
        url = `https://${S3_BUCKET_PROD}.s3.ap-south-1.amazonaws.com/src/${filename}`; //need to changee to prod
      }
      return url;
    } catch (e) {
      console.error("error while creating s3 url.");
    }
  };

  const updateProgressBar = (value, file, fileName) => {
    if (value === 100) {
      setVideoLoader(false);
      localStorage.set(
        "UPLOAD_API_TIMESTAMP_END",
        new Date()?.getTime() / 1000
      );

      showMessage({
        message: "video successfully uploaded.",
        type: "success",
      });

      let s3Url = createS3Url(fileName);
      if (s3Url) sets3Url(s3Url);

      const url = URL.createObjectURL(file);
      setSource({ ...source, url, name: fileName });
    }
    setPorgressBar(value);
  };

  const handleFileChange = async (event) => {
    try {
      const file = event?.target?.files[0] || {};

      //base condition
      if (!file.size) {
        showMessage({
          message: "Choose a file to upload first.",
          type: "error",
        });
        return false;
      }

      const { name } = file;
      setPorgressBar(0); //reset the progressbar

      localStorage.set("UPLOAD_API_TIMESTAMP_START", "");
      localStorage.set("UPLOAD_API_TIMESTAMP_END", "");

      toTrackMixpanel("uploadCTAClicked");
      const fileName = `${name.replace(".mp4", "")}${Date.now()}.mp4`;

      try {
        setVideoLoader(true);
        let res = await uploadImage2("src", file, fileName, updateProgressBar);

        if (res?.status === "failure") {
          setVideoLoader(false);
          showMessage({
            message: res?.message,
            type: "error",
          });
        }
      } catch (e) {
        setVideoLoader(false);
        showMessage({
          message: "facing issues while uploading video",
          type: "error",
        });
      }
    } catch (e) {
      setVideoLoader(false);
      showMessage({
        message: "facing issues while uploading video",
        type: "error",
      });
      console.error(e);
    }
  };

  const handleChoose = (event) => {
    event.preventDefault();
    inputRef?.current?.click();
  };

  const showMessage = ({ message, type }) => {
    showSnackbar({ message: message, type: type });
  };

  return (
    <>
      <div className="VideoInput">
        <input
          ref={inputRef}
          id="uploadVideo"
          className="hidden"
          type="file"
          onChange={handleFileChange}
          accept=".mov,.mp4"
        />
        {!source.url ? (
          <div className="relative">
            <div
              onClick={handleChoose}
              className={`${videoLoader && "bg-gray-300 opacity-70"}
          ${
            (videoLoader || source.url) &&
            "pointer-events-none cursor-not-allowed"
          }
          ${
            !videoLoader
              ? "hover:bg-gray-100 hover:border-red-400 cursor-pointer"
              : null
          } 
           relative w-72 py-16 flex flex-col justify-center items-center border-2
            rounded-md border-gray-300 border-dashed`}
            >
              <UploadSvg />
              <p className="text-lg font-semibold text-gray-600 mt-4">
                Select video to upload
              </p>
              <p className="text-base font-normal text-gray-400 mt-2">
                Or drag and drop a file
              </p>
              <span className="text-sm font-normal text-gray-400 mt-8">
                MP4 or WebM
              </span>
              <span className="text-sm font-normal text-gray-400 mt-4">
                720x1280 resolution or higher
              </span>
              <span className="text-sm font-normal text-gray-400 mt-4">
                Up to 10 minutes
              </span>
              <span className="text-sm font-normal text-gray-400 mt-4">
                Less than 2 GB
              </span>

              <div className="rounded text-sm font-semibold px-8 p-2 bg-hipired text-white mt-8">
                Select file
              </div>
            </div>
            {videoLoader && (
              <div
                className={`${
                  (videoLoader || source.url) &&
                  "pointer-events-none cursor-not-allowed"
                } 
                  ${
                    !videoLoader
                      ? "hover:bg-gray-100 hover:border-red-400 cursor-pointer"
                      : null
                  } 
                  absolute w-72 flex flex-col justify-center items-center z-10 ${
                    styles.top60
                  }`}
              >
                <div
                  className={`${styles.progressBarClass} ${styles.boxShadow}`}
                >
                  <div
                    style={{ width: `${progressBar}%` }}
                    className={`${styles.progress} transition-width duration-700 ease-in flex justify-center items-center relative`}
                  >
                    {progressBar > 0 && (
                      <span className="text-xs text-white">{progressBar}%</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : !videoLoader || progressBar === 100 ? (
          <>
            <div
              style={{ height: "464px" }}
              className="flex flex-col justify-center items-center  rounded-lg border-gray-300 cursor-pointer w-full"
            >
              <video
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
                controlsList="nodownload"
                className="VideoInput_video rounded-lg shadow-xl w-full h-full object-fill"
                width="100%"
                height="100vh"
                controls={false}
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
                objectfit="cover"
              >
                <source src={`${source.url}`} type="video/mp4" />
              </video>
            </div>
            <div className="mt-3 border border-gray-200 p-3 rounded-lg max-w-xs z-10 cursor-pointer" onClick={() => showDialog('', ClearDataPopup,'small', { clearData: resetVideoData })}>
              <div className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center">
                  <CheckRoundBlack />
                  <span className="truncate ml-1 w-28 text-10 text-gray-500 font-normal items-center inline-block">
                    {source?.name ? source?.name : null}
                  </span>
                </span>

                <div className="ml-2 text-gray-500 font-semibold text-10">
                  Change Video
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default FileUpload;
