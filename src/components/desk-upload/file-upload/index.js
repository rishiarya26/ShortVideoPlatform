import React, { useState } from 'react';
import { toTrackMixpanel } from '../../../analytics/mixpanel/events';
import { uploadImage2 } from '../../../analytics/s3Client';
import { S3_BUCKET_PROD, S3_BUCKET_STAGE } from '../../../constants';
import useDialog from '../../../hooks/use-dialog';
import useSnackbar from '../../../hooks/use-snackbar';
import { localStorage } from '../../../utils/storage';
import CheckRoundBlack from '../../commons/svgicons/check-round-black';
import UploadSvg from '../../commons/svgicons/upload';
import CustomPopUp from '../custom-popup';
import RoundProgressBar from '../round-progressbar';
import styles from '../upload.module.css';

function FileUpload({
  source,
  setSource,
  sets3Url,
  inputRef,
  resetVideoData,
  setUploadingStatus,
  videoFileName,
  setFileName
}) {
  const { showSnackbar } = useSnackbar();
  const [videoLoader, setVideoLoader] = useState(false);
  const [progressBar, setPorgressBar] = useState(0);


  const { show: showDialog } = useDialog();

  let createS3Url = (filename = '') => {
    let url = '';
    try {
      if (
        process?.env?.APP_ENV === 'development' ||
        process?.env?.NODE_ENV === 'development'
      ) {
        url = `https://${S3_BUCKET_STAGE}.s3.ap-south-1.amazonaws.com/src/${filename}`;
      } else {
        url = `https://${S3_BUCKET_PROD}.s3.ap-south-1.amazonaws.com/src/${filename}`; //need to changee to prod
      }
      return url;
    } catch (e) {
      console.error('error while creating s3 url.');
    }
  };

  const updateProgressBar = (value, file, fileName) => {
    if (value === 100) {
      setVideoLoader(false);
      localStorage.set(
        'UPLOAD_API_TIMESTAMP_END',
        new Date()?.getTime() / 1000
      );
      let s3Url = createS3Url(fileName);
      const url = URL.createObjectURL(file);
      if (s3Url) sets3Url(s3Url);
      console.log(document.getElementById('videoElement'));
      setSource({ ...source, url, name: fileName });
    }
    setPorgressBar(value);
  };

  const handleFileChange = async (event) => {
    try {
      const file = event?.target?.files[0] || {};
      if (!file.size) {
        showMessage({
          message: 'Choose a file to upload first.',
          type: 'error',
        });
        return false;
      }
      const { name } = file;

      setFileName(name);
      setPorgressBar(0);
      setUploadingStatus(true);

      localStorage.set('UPLOAD_API_TIMESTAMP_START', '');
      localStorage.set('UPLOAD_API_TIMESTAMP_END', '');

      toTrackMixpanel('uploadCTAClicked');
      const fileName = `${name.replace('.mp4', '')}${Date.now()}.mp4`;

      try {
        setVideoLoader(true);
        let res = await uploadImage2('src', file, fileName, updateProgressBar);

        if (res?.status === 'failure') {
          setVideoLoader(false);
          showMessage({
            message: res?.message,
            type: 'error',
          });
        }
        setUploadingStatus(false);
      } catch (e) {
        setVideoLoader(false);
        showMessage({
          message: 'facing issues while uploading video',
          type: 'error',
        });
      }
    } catch (e) {
      setVideoLoader(false);
      showMessage({
        message: 'facing issues while uploading video',
        type: 'error',
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
      <div className='VideoInput w-full'>
        <input
          ref={inputRef}
          id='uploadVideo'
          className='hidden'
          type='file'
          onChange={handleFileChange}
          accept='video/*'
        />
        {!source.url && !videoLoader ? (
          <div className='relative'>
            <div
              onClick={handleChoose}
              className={`${
                videoLoader || source.url
                  ? 'opacity-70 min-h-25 hover:border-red-400'
                  : ''
              }
              ${
                !videoLoader
                  ? 'hover:bg-gray-100 hover:border-red-400 cursor-pointer border-gray-300'
                  : ''
              }
              relative w-full py-20 flex flex-col justify-center items-center border-2 rounded-md border-dashed videoResponsiveWidth
              `}
            >
              <UploadSvg />
              <p className='text-lg font-medium text-gray-600 mt-4'>
                Select video to upload
              </p>
              <p className='text-sm font-normal text-gray-500 mt-2'>
                Or drag and drop a file
              </p>
              <span className='text-sm font-normal text-gray-400 mt-8'>
                MP4, WebM, Mkv, Avi & Mov
              </span>
              <span className='text-sm font-normal text-gray-400 mt-2'>
                720x1280 resolution or higher
              </span>
              <span className='text-sm font-normal text-gray-400 mt-2'>
                Up to 90 seconds
              </span>
              <span className='text-sm font-normal text-gray-400 mt-2'>
                Less than 1 GB
              </span>
              <div className='rounded text-sm font-semibold px-8 p-2 bg-hipired text-white mt-8'>
                Select file
              </div>
            </div>
          </div>
        ) : videoLoader ? (
          <div
            className={`${
              videoLoader || source.url
                ? 'opacity-70 min-h-25 hover:border-red-400'
                : ''
            } 
                relative w-72 py-20 flex flex-col justify-center items-center border-2 rounded-md border-dashed videoResponsiveWidth
                `}
          >
            <div
              className={`${
                (videoLoader || source.url) &&
                'pointer-events-none cursor-not-allowed'
              } 
                ${
                  !videoLoader
                    ? 'hover:bg-gray-100 hover:border-red-400 cursor-pointer'
                    : null
                } 
                absolute w-72 flex flex-col justify-center items-center z-10 ${
                  styles.top20
                }`}
            >
              <RoundProgressBar
                value={progressBar}
                stroke='#b9332f'
                max={100}
                text='UNAVAILABLE'
              />
              <br />
              {videoLoader && (
                <span className=' text-gray-500 font-normal'>Uploading</span>
              )}
              {videoLoader && progressBar > 0 && (
                <span className=' text-gray-500 font-normal text-center overflow-hidden whitespace-pre-wrap w-60 px-4'>
                  {videoFileName}
                </span>
              )}
              {/* <button className='py-2 border border-gray-200 text-black px-8 mt-6'>Cancel</button> */}
            </div>
          </div>
        ) : !videoLoader || progressBar === 100 ? (
          <>
            <div className='flex flex-col justify-center items-center  rounded-lg border-gray-300 cursor-pointer w-full relative videoResponsiveWidth'>
              <video
                id='videoElement'
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
                disablePictureInPicture
                controlsList='nodownload noremoteplayback'
                className={`VideoInput_video rounded-lg shadow-xl w-full h-full bg-hipidblue`}
                width='100%'
                height='100vh'
                controls={true}
                loop
                autoPlay
                muted
                playsInline
                preload='auto'
                objectfit='cover'
              >
                <source src={`${source.url}`} type='video/mp4' />
              </video>
            </div>
            <div
              className='mt-3 border border-gray-200 p-3 rounded-lg max-w-xs z-10 cursor-pointer'
              onClick={() =>
                showDialog('', CustomPopUp, 'xExtraSmall', {
                  type: 'replaceVideo',
                  clearData: resetVideoData,
                })
              }
            >
              <div className='flex items-center justify-between cursor-pointer'>
                <span className='flex items-center'>
                  <CheckRoundBlack />
                  <span className='truncate ml-1 w-28 text-10 text-gray-500 font-normal items-center inline-block'>
                    {source?.name ? source?.name : null}
                  </span>
                </span>

                <div
                  className={`ml-2 text-gray-500 font-bold text-10 ${styles.underlineClass}`}
                >
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
