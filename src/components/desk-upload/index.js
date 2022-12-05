import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useSnackbar from '../../hooks/use-snackbar';
import Header from '../desk-header';
import DeskCaption from './desk-caption';
import FileUpload from './file-upload';
import StaticFooter from '../static-footer';
import CustomPopUp from './custom-popup';
import useDialog from '../../hooks/use-dialog';
import CicularProgress from '../commons/svgicons/circular-progress';
import CustomSelect from './custom-select';
import styles from './upload.module.css';
import { uploadDeskVideo } from '../../sources/desk-upload';
import { localStorage } from '../../utils/storage';
import { toTrackMixpanel } from '../../analytics/mixpanel/events';
import { languageCodes } from '../../../public/languages.json';

const AllowedPermissionList = ['Comment', 'Like', 'Duet', 'saveToDevice'];
const AllowedUserList = ['Public', 'Friends', 'Private'];

const DeskUplaod = () => {
  const { showSnackbar } = useSnackbar();
  const { show: showDialog } = useDialog();
  const router = useRouter();

  const userId = localStorage.get('user-id') || null;
  const userInfo = localStorage.get('user-details') ?? {};

  //Refs
  const CaptionInputRef = useRef();
  const videoInputRef = useRef();
  //states
  const [s3Url, setS3Url] = useState('');
  const [userViewPermission, setUserViewPermission] = useState('Public');
  const [language, setLanguage] = useState({ name: '', code: '' });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [source, setSource] = useState({ url: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [videoFileName, setFileName] = useState('');
  const [allowUser, setAllowUser] = useState({
    Comment: true,
    Like: true,
    Duet: true,
    saveToDevice: true,
  });
  const [discard, setDiscard] = useState(false);

  function setVideoFileName(value){
    setFileName(value)
  }

  const handleCheckBox = (e, item) => {
    let { checked } = e.target;
    if (checked) setAllowUser({ ...allowUser, [item]: true });
    else setAllowUser({ ...allowUser, [item]: false });
  };

  const setS3UrlCb = (url) => {
    url !== '' && setS3Url(url);
  };

  const showMessage = ({ message, type }) => {
    showSnackbar({ message: message, type: type });
  };

  // ! reset permissions
  const resetFields = () => {
    CaptionInputRef.current.innerHTML = ''; // removing caption data
    videoInputRef.current.value = ''; // removing data from fileUpLOAD element
    setShowSuggestions(false);
    setUserViewPermission('Public');
    setSource({ ...source, url: '', name: '' });
    setAllowUser({
      ...allowUser,
      Comment: true,
      Like: true,
      Duet: true,
      saveToDevice: true,
    });
    setLanguage({ name: '', code: '' });
    setDiscard(true)
  };

  const resetVideoData = () => {
    videoInputRef.current.value = '';
    setSource({ ...source, url: '', name: '' });
  };

  const submitVideoPost = async (e) => {
    e.preventDefault();

    if (language.name === '' || language.code === '') {
      showMessage({
        message: 'Please select video language',
        type: 'waiting',
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
    postData.videoTitle = 'Post the video';
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
    postData.language = language ?? { code: 'hi', name: 'Hindi' };
    postData.genre = null;

    let startTime = localStorage.get('UPLOAD_API_TIMESTAMP_START');
    let endTime = localStorage.get('UPLOAD_API_TIMESTAMP_END');
    let totleTime = Math.floor(endTime - startTime);

    try {
      let response = await uploadDeskVideo({ postData });
      console.log('vidoe uploaded response: ' + JSON.stringify(response));

      if (response.status === 'success') {
        let { responseData } = response?.data || {};
        let { id = '', language = '' } = responseData || {};
        toTrackMixpanel(
          'shortPostResult',
          { type: 'success', post_time_seconds: totleTime },
          { content_id: id, ugc_language: language?.name }
        );
      }
      resetFields(); // ?? discarding the values from the component
      showDialog('', CustomPopUp, 'xExtraSmall', {type:"videoCompletion",clearData: resetFields, viewProfile: ()=> userId && router.push(`/${userId}`)})
      // showMessage({
      //   message: 'Video has been successfully posted.',
      //   type: 'success',
      // });
      setLoading(false);
      console.log(response);
    } catch (e) {
      setLoading(false);
      toTrackMixpanel('shortPostResult', {
        type: 'failure',
        post_time_seconds: totleTime,
        failure_reason: e,
      });
      showMessage({
        message: 'facing issues while uploading video',
        type: 'error',
      });
      console.error(e);
    }
  };

  return (
    <div className='h-screen w-screen flex flex-col justify-between'>
      <Header />
      <div
        className={`w-full flex justify-center items-center md:mt-16 ${styles.backgroundGry}`}
      >
        <div className='flex w-feed box_shadow_2 my-4 mb-12 py-8 pb-12 px-12 flex-col rounded-md'>
          <h1 className='text-2xl font-semibold text-gray-800'>Upload video</h1>
          <p className='text-md font-base text-gray-400 pt-2'>
            Post a video to your account
          </p>
          <div className='flex items-start mt-4'>

            {/* left section  */}
              <div tabIndex={0} className='flex w-3/12 mt-8 bg-white'>
                <FileUpload
                  inputRef={videoInputRef}
                  sets3Url={setS3UrlCb}
                  source={source}
                  setSource={setSource}
                  resetVideoData={resetVideoData}
                  setUploadingStatus={setUploadingStatus}
                  videoFileName={videoFileName}
                  setFileName={setVideoFileName}
                />
              </div>

              {/* right section  */}
              <div className='flex w-9/12  bg-white pl-4'>
                <div className='flex w-full flex-col px-2 flex-1'>
                  <DeskCaption
                    tabIndex={1}
                    InputRefCaption={CaptionInputRef}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                    uploadingStatus={uploadingStatus}
                    videoFileName={videoFileName}
                    discard={discard}
                    setDiscard={setDiscard}
                  />
                  <CustomSelect
                    tabIndex={2}
                    type='language'
                    caption='Language'
                    data={languageCodes}
                    value={language}
                    setValue={setLanguage}
                    setShowSuggestions={setShowSuggestions}
                  />
                  <CustomSelect
                    tabIndex={3}
                    type='viewPermission'
                    caption='Who can view this video'
                    data={AllowedUserList}
                    value={userViewPermission}
                    setValue={setUserViewPermission}
                    setShowSuggestions={setShowSuggestions}
                  />
                  <CustomSelect
                    tabIndex={4}
                    type='editPermissions'
                    caption='Allow users to'
                    data={AllowedPermissionList}
                    value={allowUser}
                    setValue={handleCheckBox}
                  />
                  <div className='flex items-center mt-4'>
                    <button
                      tabIndex={5}
                      className={`${
                        loading || uploadingStatus ? 'cursor-not-allowed' : null
                      } rounded text-sm font-semibold px-14 py-3 text-gray-500 border border-gray-300 min-w-32`}
                      onClick={
                        loading || uploadingStatus
                          ? null
                          : () => {
                            showDialog('', CustomPopUp, 'xExtraSmall', {type:"discard",clearData: resetFields});
                          } 
                      }
                    >
                      Discard
                    </button>

                    {loading ? (
                      <button
                        disabled
                        type='button'
                        style={{ backgroundColor: '#DF5A4E' }}
                        className=' text-white rounded text-sm font-semibold px-14 py-3
                        border border-gray-300 min-w-32 ml-4 flex justify-evenly
                        items-center cursor-not-allowed'
                      >
                        <CicularProgress />
                        Posting...
                      </button>
                    ) : (
                      <button
                        tabIndex={6}
                        className={`${
                          source.url === ''
                            ? 'bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed'
                            : ' text-white bg-hipired'
                        } rounded text-sm font-semibold px-14 py-3 border border-gray-300 min-w-32 ml-4`}
                        disabled={!source.url}
                        onClick={(e) => submitVideoPost(e)}
                      >
                        Post
                      </button>
                    )}
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
      <StaticFooter />
    </div>
  );
};

export default DeskUplaod;