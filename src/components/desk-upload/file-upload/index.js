import React, { useEffect, useState } from "react";
import { toTrackMixpanel } from "../../../analytics/mixpanel/events";
import { uploadImage2 } from "../../../analytics/s3Client";
import { S3_BUCKET_PROD, S3_BUCKET_STAGE } from "../../../constants";
import useSnackbar from "../../../hooks/use-snackbar";
import { localStorage } from "../../../utils/storage";
import UploadSvg from "../../commons/svgicons/upload";

import styles from "../upload.module.css";

// const UploadSvg = () => (
//   <svg
//     width="40"
//     height="29"
//     viewBox="0 0 40 29"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M21.5001 29H30.5C35.7467 29 40 24.7467 40 19.5C40 14.7115 36.4571 10.7504 31.8497 10.0951C30.937 4.37297 25.9792 0 20 0C13.3726 0 8 5.37258 8 12L8.00001 12.0145C3.53831 12.2733 0 15.9734 0 20.5C0 25.1944 3.80558 29 8.5 29H18.5001V17.1213L15.9143 19.7071C15.7191 19.9024 15.4025 19.9024 15.2072 19.7071L13.793 18.2929C13.5977 18.0976 13.5977 17.781 13.793 17.5858L18.9395 12.4393C19.5252 11.8536 20.475 11.8536 21.0608 12.4393L26.2072 17.5858C26.4025 17.781 26.4025 18.0976 26.2072 18.2929L24.793 19.7071C24.5977 19.9024 24.2812 19.9024 24.0859 19.7071L21.5001 17.1213V29Z"
//       fill="#161823"
//       fillOpacity="0.34"
//     />
//   </svg>
// );

// const CheckRoundBlack = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 16 16"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M7.99935 0.666626C5.97449 0.666626 4.14024 1.48817 2.8139 2.81451C1.48756 4.14085 0.666016 5.9751 0.666016 7.99996C0.666016 10.0248 1.48756 11.8591 2.8139 13.1854C4.14024 14.5118 5.97449 15.3333 7.99935 15.3333C10.0242 15.3333 11.8585 14.5118 13.1848 13.1854C14.5111 11.8591 15.3327 10.0248 15.3327 7.99996C15.3327 5.9751 14.5111 4.14085 13.1848 2.81451C11.8585 1.48817 10.0242 0.666626 7.99935 0.666626ZM3.75671 3.75732C4.84322 2.6708 6.34231 1.99996 7.99935 1.99996C9.65639 1.99996 11.1555 2.6708 12.242 3.75732C13.3285 4.84383 13.9993 6.34292 13.9993 7.99996C13.9993 9.657 13.3285 11.1561 12.242 12.2426C11.1555 13.3291 9.65639 14 7.99935 14C6.34231 14 4.84322 13.3291 3.75671 12.2426C2.67019 11.1561 1.99935 9.657 1.99935 7.99996C1.99935 6.34292 2.67019 4.84383 3.75671 3.75732ZM10.9484 6.71496C11.0163 6.64615 11.0163 6.53459 10.9484 6.46578L10.2102 5.71823C10.1423 5.64942 10.0321 5.64942 9.96417 5.71823L7.3034 8.41282L6.03453 7.12782C5.96658 7.05901 5.85642 7.05901 5.78847 7.12782L5.05031 7.87537C4.98236 7.94418 4.98236 8.05574 5.05031 8.12455L7.18037 10.2817C7.24832 10.3505 7.35848 10.3505 7.42643 10.2817L10.9484 6.71496Z"
//       fill="#161823"
//       fillOpacity="0.75"
//     />
//   </svg>
// );

// export default UploadSvg;

function FileUpload({ source, setSource, sets3Url, inputRef}) {
  const { showSnackbar } = useSnackbar();
  const [videoLoader, setVideoLoader] = useState(false);

  const [progressBar, setPorgressBar] = useState(0);

  let createS3Url = (filename = "") => {
    let url = "";
    try {
      if (
        process?.env?.APP_ENV === "development" ||
        process?.env?.NODE_ENV === "development"
      ) {
        url = `https://${S3_BUCKET_STAGE}.s3.ap-south-1.amazonaws.com/src/${filename}`;
      } else {
        url = `https://${S3_BUCKET_STAGE}.s3.ap-south-1.amazonaws.com/src/${filename}`; //need to changee to prod
      }
      return url;
    } catch (e) {
      console.error("error while creating s3 url.");
    }
  };

  const updateProgressBar = (value, file, fileName) => {
    if (value === 100) {
      localStorage.set("UPLOAD_API_TIMESTAMP_END", new Date()?.getTime() / 1000);
      showMessage({ message: "video successfully uploaded.", type: "success" });
      const url = URL.createObjectURL(file);
      setVideoLoader(false);
      let s3Url = createS3Url(fileName);
      if (s3Url) sets3Url(s3Url);
      setSource({ ...source, url, name: fileName });
    }
    setPorgressBar(value);
  };

  const handleFileChange = async (event) => {
    try {
      const file = event?.target?.files[0];
      const { name } = file;
      setPorgressBar(0);

      localStorage.set("UPLOAD_API_TIMESTAMP_START","")
      localStorage.set("UPLOAD_API_TIMESTAMP_END","")
      toTrackMixpanel('uploadCTAClicked');

      const fileName = `${name.replace(".mp4", "")}${Date.now()}.mp4`;

      setVideoLoader(true);

      try{
      let res =  await uploadImage2("src", file, fileName, updateProgressBar);
      
      if(res.status === 'failure'){
        setVideoLoader(false);
        showMessage({
          message: res?.message,
          type: "error",
        });
      }
      }catch(e){
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
          className="hidden"
          type="file"
          onChange={handleFileChange}
          accept=".mov,.mp4"
        />
        {!source.url ? (
          <div className="relative">
            <div
              onClick={handleChoose}
              className={`${
                videoLoader && "bg-gray-300 opacity-70"
              }
          ${
            (videoLoader || source.url) &&
            "pointer-events-none cursor-not-allowed"
          } relative ${
                !videoLoader
                  ? "hover:bg-gray-100 hover:border-red-400 cursor-pointer"
                  : null
              } w-72 py-16 flex flex-col justify-center items-center border-2 rounded-md border-gray-300 border-dashed`}
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
                  className={`${(videoLoader || source.url) && "pointer-events-none cursor-not-allowed"} 
                  ${!videoLoader ? "hover:bg-gray-100 hover:border-red-400 cursor-pointer" : null} 
                  absolute w-72 flex flex-col justify-center items-center z-10 ${styles.top60}`}
                >
                  <div
                    className={`${styles.progressBarClass} ${styles.boxShadow}`}
                  >
                    <div
                      style={{ width: `${progressBar}%` }}
                      className={`${styles.progress} transition-width duration-700 ease-in flex justify-center items-center relative`}
                    >
                      {progressBar > 0 && (
                        <span className="text-xs text-white">
                          {progressBar}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        ) : !videoLoader || progressBar === 100 ? (
          <>
            <div style={{height: "464px"}} className="flex flex-col justify-center items-center  rounded-lg border-gray-300 cursor-pointer w-full">
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
            {/* <div className="mt-3 border border-gray-200 p-3 rounded-lg max-w-xs">
              <div className="flex items-center justify-between">
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
            </div> */}
          </>
        ) : null}
      </div>
    </>
  );
}

export default FileUpload;
