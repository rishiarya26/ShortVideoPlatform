
import { track } from "../index";
import { APP_NAME, LANGUAGE } from "../../constants";
import { getItem } from "../../utils/cookie"
import { localStorage, objectEntriesPoly } from "../../utils/storage";
import { getReffererPage, usePreviousRoute } from "../../utils/web";
import platform from "platform";

let adEvents = ['videoAdStarted', 'videoAdFirstQuartile', 'videoAdSecondQuartile', 'videoAdThirdQuartile', 'videoAdEnd', 'videoAdStartedFailure', 'videoAdFirstQuartileFailure', 'videoAdSecondQuartileFailure', 'videoAdThirdQuartileFailure', 'videoAdEndFailure'];

  const getIsMobile = ()=>{
    // let device = 'desktop';
    let isMobile;
  try{ 
    const device = getItem('device-type') || 'desktop'
    isMobile = (device === 'mobile') ?  true :  false
    }catch(e){
        console.log(e);
    }
    return isMobile;
  }

const getUtm = (payload) =>{
const urlSearchParams = new URLSearchParams(window.location.search);
const params = objectEntriesPoly(urlSearchParams.entries());
console.log("mix**",params)
payload['App UTM Source Last Touch'] = params?.utm_source || ''
payload['App UTM Medium Last Touch'] = params?.utm_medium || ''
payload['App UTM Campaign Last Touch'] = params?.utm_campaign || ''
payload['App UTM Term Last Touch'] = params?.utm_term || ''
payload['App UTM Content Last Touch'] = params?.utm_content || ''
}

export const commonEvents = ()=>{
    console.log("MIX**",window.location);
   
    let utmData = localStorage?.get('utm-data') || {}
    const deviceModal = localStorage?.get('device-modal');
    const device = getItem('device-type');
    const networkStrength = localStorage?.get('network-strength');
    const guestId = getItem('guest-token');
    const loggedInId = localStorage?.get('user-id') || null;
    const loggedInUserDetails = localStorage?.get('user-details') || null;
    const previousPage = window?.sessionStorage?.getItem('previous-page');
    const isInstalled = JSON.parse(localStorage?.get('isInstalled'));
  
    let payload = {}
    getUtm(payload);
    payload['unique ID'] = loggedInId || guestId;
    payload['isPWA'] = 'true';
    payload['isInstalled'] =  isInstalled;
    payload['Device'] = device;
    payload['User Type'] = loggedInId ? 'member' : 'guest';
    payload['User Handle'] = loggedInUserDetails?.userHandle ? loggedInUserDetails?.userHandle : 'NA'
    payload['Age'] = loggedInUserDetails?.age ? loggedInUserDetails?.age : 'NA';
    payload['Gender'] = loggedInUserDetails?.gender ? loggedInUserDetails?.gender : 'NA';
    // payload['New App Language'] = LANGUAGE;
    payload['Platform Section'] = APP_NAME;
    utmData?.utm_campaign && (payload['App UTM Campaign'] = utmData?.utm_campaign);
    utmData?.utm_medium && (payload['App UTM Medium'] = utmData?.utm_medium);
    utmData?.utm_term && (payload['App UTM Term'] = utmData?.utm_term);
    utmData?.utm_content && (payload['App UTM Content'] = utmData?.utm_content);
    utmData?.utm_source && (payload['App UTM Source'] = utmData?.utm_source);
    
    payload['Device Modal'] = deviceModal;
    payload['Network Strength'] = networkStrength;
    console.log("reff",document?.referrer);
    payload['Source'] = previousPage;
    payload['Browser Platform'] = platform ? platform?.name : null;
    // getReffererPage();
    // usePreviousRoute();
    // payload['Source'] = getPageName() || 'NA';
    return payload;
}


/* Func to send mixpanel event - 
type(event name), value(additional Info keys), item(obj containing info/Ids) */
export const toTrackMixpanel = (type, value, item) => {
  let adArr = localStorage.get('adArrMixPanel');
  if(adEvents.includes(type)){
    if(!adArr?.includes(type)){
      let arr = localStorage.get("adArrMixPanel");
      arr.push(type);
      localStorage.set("adArrMixPanel",arr);
    }else{
      return false;
    }
  }

    
    let globalCommonEvents = commonEvents(); 

    const addPageTabName = () =>{
        addTabName();
        globalCommonEvents['Page Name'] = value?.pageName || 'NA';
    }

    const addTabName=()=>{
        globalCommonEvents['Tab Name'] = value?.tabName || 'NA';
    }

    const addUgcId = ()=>{
        globalCommonEvents['UGC ID'] = item?.content_id;
    }

    // const isShopMonetize = ()=>{
    //   globalCommonEvents['Is Shoppable'] = value?.isShoppable || false;
    //   globalCommonEvents['Is Monetization']= value?.isMonetization || false;
    // }

    const isShopMonetizeAd = ()=>{
      globalCommonEvents['Is Shoppable'] = value?.isShoppable || false;
      globalCommonEvents['Is Monetization']= value?.isMonetization || false;
    }

    const commonWithIds = () =>{
       const userName = item?.userName?.replace('@','')
        globalCommonEvents['Creator ID'] = item?.userId;
        globalCommonEvents['Creator Handle'] = userName;
        addHashtagName();
        addUgcId();
        addPageTabName();
        // isShopMonetize()
        return globalCommonEvents;
    }

    const eventsForAds = () => {
      const userName = item?.userName?.replace('@','')
      globalCommonEvents['Creator ID'] = item?.userId;
      globalCommonEvents['Creator Handle'] = userName;
      globalCommonEvents['UGC ID'] = item?.content_id;
      globalCommonEvents['Tab Name'] = value?.tabName || 'NA';
      globalCommonEvents['Page Name'] = value?.pageName || 'NA';
      globalCommonEvents['Device Modal'] = 'NA';
      globalCommonEvents['Network Strength'] = 'NA';
      globalCommonEvents['Impression_timeStamp'] = value?.timeStamp || 'NA';
      isShopMonetizeAd()
      return globalCommonEvents
    }

    const eventsForPlaylist = () => {
      const userName = item?.userName?.replace('@','')
      globalCommonEvents['Creator ID'] = item?.userId;
      globalCommonEvents['Creator Handle'] = userName;
      globalCommonEvents['UGC ID'] = item?.content_id;
      globalCommonEvents['Tab Name'] = value?.tabName || 'NA';
      globalCommonEvents['Page Name'] = value?.pageName || 'NA';
      globalCommonEvents['playlist Name'] = value?.playlistName || 'NA';
      globalCommonEvents['playlist ID'] = value?.playlistId || 'NA';
      globalCommonEvents['Device Modal'] = 'NA';
      globalCommonEvents['Network Strength'] = 'NA';
      globalCommonEvents['Impression_timeStamp'] = value?.timeStamp || 'NA';
      globalCommonEvents['popup Name'] = value?.popUpName || 'NA';
      isShopMonetizeAd()
      return globalCommonEvents
    }

    const eventsForUpload = () =>{
      const videoUploadStatus = value?.type === 'success' ? true : false;
       globalCommonEvents['success'] = videoUploadStatus ?? 'N/A';
       globalCommonEvents["Post Time Seconds"] = value?.post_time_seconds ?? 'NA';
       globalCommonEvents['UGC Language'] = item?.ugc_language ?? 'N/A';
       if(!videoUploadStatus) globalCommonEvents['Failure Reason'] = value?.failure_reason ?? 'N/A';
       addUgcId();
       return globalCommonEvents;
    }


    const bannerType = {
      Hashtag: 'Hashtag',
      Sound:'Sound',
      User:'Creator Profile',
      Video:'Video'
    }

    const getBannerType = () =>{
      globalCommonEvents['Banner Type'] = bannerType[item?.bannerType];    }

    const addScreenDetails = ()=>{
      const userName = item?.userName?.replace('@','')
      globalCommonEvents['Creator ID'] = item?.userId || 'NA';
      globalCommonEvents['Creator Handle'] = userName || 'NA';
      addHashtagName();
    }   

    const addHashtagName = ()=>{
      globalCommonEvents['Hashtag Name']	= value?.hashtagName || 'NA';
    }
    const toTrack = {
      'enable': () => {
        track("Web Push Optin Accepted", globalCommonEvents);
      },
      'notNow': () => {
        track("Web Push Optin Declined", globalCommonEvents);
      },
      'webPushOptinPopupImpression' : () => {
        track("Web Push Optin Popup Impression", globalCommonEvents)
      },
      'playlistClickedProfile': () => {
        globalCommonEvents['playlist Name'] = value?.playlistName || 'NA';
        globalCommonEvents['playlist ID'] = value?.playlistId || 'NA';
        addPageTabName(); 
        track('Playlist Clicked - Profile', globalCommonEvents);
      },
      'playlistClickedVideo': () => {
        globalCommonEvents['playlist Name'] = value?.playlistName || 'NA';
        globalCommonEvents['playlist ID'] = value?.playlistId || 'NA';
        addPageTabName(); 
        track('Playlist Clicked - Video', globalCommonEvents);
      },
      'playlistShareClick': () => {
        globalCommonEvents['playlist Name'] = value?.playlistName || 'NA';
        globalCommonEvents['playlist ID'] = value?.playlistId || 'NA';
        addPageTabName(); 
        track('Playlist Share Clicked', globalCommonEvents);
      },
      'hashtagBannerClicked' : () => {
        globalCommonEvents['Page Name'] = value?.pageName || 'NA';
        globalCommonEvents['Hashtag ID'] = value?.hashtagId || 'NA';
        globalCommonEvents['Hashtag Name'] = value?.hashtagName || 'NA';
        track('Hashtag Banner Clicked', globalCommonEvents);
      },
      'impression' : () => {
        let eventsWithIds = commonWithIds();
        eventsWithIds['is Shoppable'] = value?.isShoppable || false;
        eventsWithIds['playlist Name'] = value?.playlistName || 'NA';
        eventsWithIds['playlist ID'] = value?.playlistId || 'NA';
        eventsWithIds['is Playlist'] = value?.isPlaylist || false;
        eventsWithIds['description'] = value?.description || 'NA';
        track('UGC Impression', eventsWithIds)},
      'screenView' : ()=> {
        addScreenDetails();
        addPageTabName();  
        track('Screen View', globalCommonEvents )},
      'tabView' : ()=>{
        addPageTabName();
        track('Tab View', globalCommonEvents)},
    //   'swipe' : ()=> {
    //     let eventsWithIds = commonWithIds()  
    //     eventsWithIds['UGC Duration'] = value?.duration
    //     eventsWithIds['UGC Watch Duration'] = value?.durationWatchTime
    //     track('UGC Swipe', eventsWithIds)
    //   },
      'play' : () => {
        let eventsWithIds = commonWithIds();
        eventsWithIds['is Shoppable'] = value?.isShoppable || false;
        eventsWithIds['playlist Name'] = value?.playlistName || 'NA';
        eventsWithIds['playlist ID'] = value?.playlistId || 'NA';
        eventsWithIds['is Playlist'] = value?.isPlaylist || false;
        eventsWithIds['description'] = value?.description || 'NA';
        track('UGC Play', eventsWithIds)},
      'share' : () =>{
        let eventsWithIds = commonWithIds();
        eventsWithIds['playlist Name'] = value?.playlistName || 'NA';
        eventsWithIds['playlist ID'] = value?.playlistId || 'NA';
        eventsWithIds['is Playlist'] = value?.isPlaylist || false;
        eventsWithIds['description'] = value?.description || 'NA';
        track('UGC Share Click', eventsWithIds)
      },
      'replay' : () => {
        let eventsWithIds = commonWithIds();
        eventsWithIds['is Shoppable'] = value?.isShoppable || false;
        eventsWithIds['playlist Name'] = value?.playlistName || 'NA';
        eventsWithIds['playlist ID'] = value?.playlistId || 'NA';
        eventsWithIds['is Playlist'] = value?.isPlaylist || false;
        eventsWithIds['description'] = value?.description || 'NA';
        track('UGC Replayed', eventsWithIds)},
      'skip' : () => {
        let eventsWithIds = commonWithIds()  
        eventsWithIds['UGC Consumption Type'] = value?.watchTime
        eventsWithIds['UGC Duration'] = value?.duration && Math.round(value.duration)
        eventsWithIds['UGC Watch Duration'] = value?.durationWatchTime && Math.round(value.durationWatchTime)
        track('UGC Skipped',eventsWithIds)
      }, 
      'watchTime' : () => {
        console.log("Watch Time", value);
        let eventsWithIds = commonWithIds()
        eventsWithIds['is Shoppable'] = value?.isShoppable || false;
        eventsWithIds['UGC Consumption Type'] = value?.watchTime
        eventsWithIds['UGC Duration'] =  value?.duration && Math.round(value.duration)
        eventsWithIds['UGC Watch Duration'] = value?.durationWatchTime && Math.round(value.durationWatchTime)
        eventsWithIds['playlist Name'] = value?.playlistName || 'NA';
        eventsWithIds['playlist ID'] = value?.playlistId || 'NA';
        eventsWithIds['is Playlist'] = value?.isPlaylist || false;
        eventsWithIds['description'] = value?.description || 'NA';
        track('UGC Watch Time',eventsWithIds)
      },
      'cta' : ()=>{
        addPageTabName(); 
        globalCommonEvents['Element'] = value?.name
        globalCommonEvents['Button Type'] = value?.type
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        globalCommonEvents['playlist Name'] = value?.playlistName || 'NA';
        globalCommonEvents['playlist ID'] = value?.playlistId || 'NA';
        track('CTAs', globalCommonEvents)
      },
      'saveLook' : ()=>{
        addUgcId();
        addPageTabName();
        track('Save Look', globalCommonEvents)},
      'like' : ()=>{
        let eventsWithIds = commonWithIds();
        eventsWithIds['playlist Name'] = value?.playlistName || 'NA';
        eventsWithIds['playlist ID'] = value?.playlistId || 'NA';
        eventsWithIds['is Playlist'] = value?.isPlaylist || false;
        eventsWithIds['description'] = value?.description || 'NA';
        track('UGC Liked', eventsWithIds);
      },
      'unLike' : ()=>{
        let eventsWithIds = commonWithIds();
        eventsWithIds['playlist Name'] = value?.playlistName || 'NA';
        eventsWithIds['playlist ID'] = value?.playlistId || 'NA';
        eventsWithIds['is Playlist'] = value?.isPlaylist || false;
        eventsWithIds['description'] = value?.description || 'NA';
         track('UGC Unliked', eventsWithIds)
        },
      'follow' : ()=> track('User Followed', commonWithIds()),
      'unFollow' : ()=> track('User Unfollowed', commonWithIds()),
  /**** Shop ****/     
      'shopPageImp' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        track('Shopping Page Impression', globalCommonEvents)
       },
      'shoppingPopUp' :  ()=>{
        addUgcId();
        addPageTabName();
        track('Shopping Popup', globalCommonEvents)
       },
       'shoppablePopupClicked' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product ID'] = item?.productId;
        globalCommonEvents['Product Name'] = item?.productName;
        globalCommonEvents['Brand Name'] = item?.brandName;
        globalCommonEvents['Brand URL'] = item?.branchUrl || 'NA';
        track('Shopping Popup Clicked', globalCommonEvents)
       },
       'shoppingProductImp' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product Id'] = item?.productId;
        globalCommonEvents['Product Name'] = item?.productName;
        globalCommonEvents['Product URL'] = item?.productUrl || 'NA';
        globalCommonEvents['Brand Name'] = item?.brandName;
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        globalCommonEvents['Shoppable Category'] = item?.category || 'NA';
        globalCommonEvents['Shoppable Main Category'] = item?.mainCategory || 'NA';
        globalCommonEvents['Shoppable Sub Category'] = item?.subCategory || 'NA';
        globalCommonEvents['Shoppable Sub Sub Category'] = item?.subSubCategory || 'NA';
        // globalCommonEvents['Is Monetization']= item?.isMonetization || false;
        globalCommonEvents['Advertiser Appsflyer Id']= item?.appsflyerId || 'NA';
        track('Shopping Product Impression', globalCommonEvents)
       },
       'shoppableProductClicked' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product Id'] = item?.productId;
        globalCommonEvents['Product Name'] = item?.productName;
        globalCommonEvents['Product URL'] = item?.productUrl || 'NA';
        globalCommonEvents['Brand Name'] = item?.brandName;
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        globalCommonEvents['Shoppable Category'] = item?.category || 'NA';
        globalCommonEvents['Shoppable Main Category'] = item?.mainCategory || 'NA';
        globalCommonEvents['Shoppable Sub Category'] = item?.subCategory || 'NA';
        globalCommonEvents['Shoppable Sub Sub Category'] = item?.subSubCategory || 'NA';
        // globalCommonEvents['Is Monetization']= item?.isMonetization || false;
        globalCommonEvents['Advertiser Appsflyer Id']= item?.appsflyerId || 'NA';
        track('Shoppable Product Clicked', globalCommonEvents)
       },
       'monetisationProductImp' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product Id'] = item?.productId || 'NA';
        globalCommonEvents['Product Name'] = item?.productName;
        globalCommonEvents['Product URL'] = item?.productUrl || 'NA';
        globalCommonEvents['Brand Name'] = item?.brandName || 'NA';
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        globalCommonEvents['Shoppable Category'] = item?.category || 'NA';
        globalCommonEvents['Shoppable Main Category'] = item?.mainCategory || 'NA';
        globalCommonEvents['Shoppable Sub Category'] = item?.subCategory || 'NA';
        globalCommonEvents['Shoppable Sub Sub Category'] = item?.subSubCategory || 'NA';
        // globalCommonEvents['Is Monetization']= item?.isMonetization || false;
        globalCommonEvents['Advertiser Appsflyer Id']= item?.appsflyerId || 'NA';
        track('Monetisation Product Impression', globalCommonEvents)
       },
       'monetisationProductClick' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product Id'] = item?.productId || 'NA';
        globalCommonEvents['Product Name'] = item?.productName;
        globalCommonEvents['Product URL'] = item?.productUrl || 'NA';
        globalCommonEvents['Brand Name'] = item?.brandName || 'NA';
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        globalCommonEvents['Shoppable Category'] = item?.category || 'NA';
        globalCommonEvents['Shoppable Main Category'] = item?.mainCategory || 'NA';
        globalCommonEvents['Shoppable Sub Category'] = item?.subCategory || 'NA';
        globalCommonEvents['Shoppable Sub Sub Category'] = item?.subSubCategory || 'NA';
        // globalCommonEvents['Is Monetization']= item?.isMonetization || false;
        globalCommonEvents['Advertiser Appsflyer Id']= item?.appsflyerId || 'NA';
        track('Monetisation Product Clicked', globalCommonEvents)
       },
  /**** Login ****/      
       'loginInitiated' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Login Initiated', globalCommonEvents)
       },
       'loginSuccess' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Login Success', globalCommonEvents)
       },
       'loginFailure' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Login Failure', globalCommonEvents)
       },
       'signupInitiated' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Signup Initiated', globalCommonEvents)
       },
       'signupSuccess' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Signup Success', globalCommonEvents)
       },
       'signupFailure' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Signup Failure', globalCommonEvents)
       },
       'logoutInitiated' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Logout Initiated', globalCommonEvents)
       },
       'logoutSuccess' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Logout Success', globalCommonEvents)
       },
       'logoutFailure' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Logout Failure', globalCommonEvents)
       },
       'registrationAgeEntered' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Registration Age Entered', globalCommonEvents)
       },
       'emailIdSubmitted' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Email Id Submitted', globalCommonEvents)
       },
       'phoneNumberSubmitted' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Phone Number Submitted', globalCommonEvents)
       },
       'signupFormSubmitted' :  ()=>{
        addPageTabName();
        globalCommonEvents['Method'] = value?.method;
        track('Signup Form Submitted', globalCommonEvents)
       },
       'popupLaunch' :  ()=>{
        addPageTabName();
        globalCommonEvents['Popup Name'] = value?.name;
        track('Popup Launch', globalCommonEvents);
       },
       'popupCta' :  ()=>{
        addPageTabName();
        globalCommonEvents['Popup Name'] = value?.name;
        globalCommonEvents['Popup CTAs'] = value?.ctaName;
        globalCommonEvents['element'] = value?.ctaName;
        value?.playlistName && (globalCommonEvents['playlist Name'] = value?.playlistName || 'NA');
        value?.playlistId && (globalCommonEvents['playlist ID'] = value?.playlistId || 'NA');
        track('Popup CTAs', globalCommonEvents);
       },
       'sessionStart' :  ()=>{
        track('Session Started', globalCommonEvents);
       },
       'sessionEnd' :  ()=>{
        track('Session End', globalCommonEvents);
       },
  /**** Explore ****/   
       'carousalBannerImp' : ()=>{
        addPageTabName();
        getBannerType();
         globalCommonEvents['Carousal ID'] = item?.carousalId;
         globalCommonEvents['Carousal Name'] = item?.carousalName;
         globalCommonEvents['Horizontal Index'] = item?.horizontalIndex;
        track('Carousal Banner Impression', globalCommonEvents);
       },
       'carousalBannerClick' : ()=>{
         addPageTabName();
         getBannerType();
        globalCommonEvents['Carousal ID'] = item?.carousalId;
        globalCommonEvents['Carousal Name'] = item?.carousalName;
        globalCommonEvents['Horizontal Index'] = item?.horizontalIndex;
       track('Carousal Banner Click', globalCommonEvents);
      },
        'searchInitiated' : ()=>{
          addPageTabName();
          track('Search Initiated',globalCommonEvents);
        },
        'searchBtnClicked' : ()=>{
          addPageTabName();
          globalCommonEvents['Search Query'] = item?.query;
          track('Search Button Click',globalCommonEvents);
        },
        'searchSuggLoaded' : ()=>{
          addPageTabName();
          globalCommonEvents['Search Query'] = item?.query;
          globalCommonEvents['Results Returned'] = item?.resultsLength;
          track('Search Suggestions Loaded',globalCommonEvents);
        },
        'searchSuggSelected' : ()=>{
          addPageTabName();
          globalCommonEvents['Search Query'] = item?.query;
          globalCommonEvents['Search Suggestion'] = item?.suggestionSelected
          track('Search Suggestion Selected',globalCommonEvents);
        },
        'searchExecuted' : ()=>{
          addPageTabName();
          globalCommonEvents['Search Query'] = item?.query;
          globalCommonEvents['Results Returned'] = item?.resultsLength;
          track('Search Executed',globalCommonEvents);
        },
        'searchResultClicked' : ()=>{
          addPageTabName();
          addUgcId();
          commonWithIds();
          globalCommonEvents['Search Query'] = item?.query || 'NA';
          globalCommonEvents['Results Returned'] = item?.results || 'NA';
          globalCommonEvents['Hashtag ID']= item?.hashTagId || 'NA';
          globalCommonEvents['Hashtag Name']	= item?.hashtagName || 'NA';
          // globalCommonEvents['Sound ID']	= item?.soundId || 'NA';
          // globalCommonEvents['Sound Name']= item?.soundName || 'NA';
          globalCommonEvents['Creator ID'] = item?.creatorId || 'NA'
          globalCommonEvents['Creator Handle'] = item?.creatorHandle || 'NA'
          globalCommonEvents['Object Type'] = item?.objType || 'NA'
          track('Search Result Clicked',globalCommonEvents);
        },
        'searchCancelled' : ()=>{          
          addPageTabName();
          globalCommonEvents['Search Query'] = item?.query || 'NA';
          track('Search Cancelled',globalCommonEvents);
        },
        'contentBucketSwipe' : ()=>{
          commonWithIds();
          globalCommonEvents['Hashtag ID']= item?.hashTagId || 'NA';
          globalCommonEvents['Hashtag Name']	= item?.hashtagName || 'NA';
          globalCommonEvents['Horizonal Index']	= item?.horizontalIndex || 'NA';
          globalCommonEvents['Vertical Index']= item?.verticalIndex || 'NA';
          globalCommonEvents['Carousal ID'] = item?.carousalId;
          globalCommonEvents['Carousal Name'] = item?.carousalName;
          globalCommonEvents['Carousal Type'] = item?.carousalType;
          track('Content Bucket Swipe',globalCommonEvents);
        },
        'thumbnailClick' : ()=>{
          addUgcId();
          commonWithIds();
          // globalCommonEvents['Hashtag ID']= item?.hashTagId || 'NA';
          // globalCommonEvents['Hashtag Name']	= item?.hashtagName || 'NA';
          globalCommonEvents['Creator ID']= item?.creatorId || 'NA';
          globalCommonEvents['Creator Handle']	= item?.creatorName || 'NA';
          globalCommonEvents['Horizonal Index']	= item?.horizontalIndex || 'NA';
          globalCommonEvents['Vertical Index']= item?.verticalIndex || 'NA';
          globalCommonEvents['Carousal ID'] = item?.carousalId;
          globalCommonEvents['Carousal Name'] = item?.carousalName;
          globalCommonEvents['Carousal Type'] = item?.carousalType;
          track('Thumbnail Click',globalCommonEvents);
        },
        'viewMoreSelected' : ()=>{
          commonWithIds();
          globalCommonEvents['Carousal ID'] = item?.carousalId;
          globalCommonEvents['Carousal Name'] = item?.carousalName;
          globalCommonEvents['Carousal Type'] = item?.carousalType;
          track('View More Selected',globalCommonEvents);
        },
        'creatorFormSubmitted' : ()=>{
          commonWithIds();
          track('Creator Form Submitted',globalCommonEvents);
        },
        'videosCompleted5' : ()=>track('ugc_view_5',globalCommonEvents),
        'videosCompleted10' : ()=>track('ugc_view_10',globalCommonEvents),
        'videosCompleted15' : ()=>track('ugc_view_15',globalCommonEvents),
        'stunnerInstallClick' : ()=>{
          addPageTabName();
          track('app_install_stunner_footer_click',globalCommonEvents)
        },
        'bussinessFormSubmitted' :()=>{
          commonWithIds();
          track('Business_page_form_submission',globalCommonEvents);
        },
        'videoAdStarted': () => track('Video Ad Start',eventsForAds()),
        'videoAdFirstQuartile': () => track('Video Ad First Quartile',eventsForAds()),
        'videoAdSecondQuartile': () => track('Video Ad Second Quartile',eventsForAds()),
        'videoAdThirdQuartile': () => track('Video Ad Third Quartile',eventsForAds()),
        'videoAdEnd': () => track('Video Ad End',eventsForAds()),
        'contentLanguagesImpression':()=>track('Content Languages Impression',globalCommonEvents),
        'contentLanguagesSubmitted':()=>{
          const languages = localStorage?.get('lang-codes-selected')?.lang
          globalCommonEvents['Method'] = value?.method;  
          globalCommonEvents['Languages'] = item?.lang;
  
          track('Content Languages Submitted',globalCommonEvents)
        },

        'videoAdStartedFailure': () => track('Video Ad Start Failure',eventsForAds()),
        'videoAdFirstQuartileFailure': () => track('Video Ad First Quartile Failure',eventsForAds()),
        'videoAdSecondQuartileFailure': () => track('Video Ad Second Quartile Failure',eventsForAds()),
        'videoAdThirdQuartileFailure': () => track('Video Ad Third Quartile Failure',eventsForAds()),
        'videoAdEndFailure': () => track('Video Ad End Failure',eventsForAds()),
        'videoAdCTAClicked': () => track('Video Ad Clicked',eventsForAds()),
        'playlistClicked': () => track('Playlist Clicked',eventsForPlaylist()),
        'playlistPopUpLaunch' :() => track('Popup launch',eventsForPlaylist()),
        'sharePlaylist':() => track('Share Playlist',eventsForPlaylist()),
        'uploadCTAClicked' : () => track('Upload Button Clicked',globalCommonEvents),
        'shortPostResult' : () => track('Short Post Result',eventsForUpload()),
        'appsflyerImpPixel' : ()=> {
            addUgcId();
            addPageTabName();
            globalCommonEvents['Product Id'] = item?.productId || 'NA';
            globalCommonEvents['Product URL'] = item?.productUrl || 'NA';
            globalCommonEvents['Brand Name'] = item?.brandName || 'NA';
            globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
            globalCommonEvents['Shoppable Category'] = item?.category || 'NA';
            globalCommonEvents['Shoppable Main Category'] = item?.mainCategory || 'NA';
            globalCommonEvents['Shoppable Sub Category'] = item?.subCategory || 'NA';
            globalCommonEvents['Shoppable Sub Sub Category'] = item?.subSubCategory || 'NA';
            // globalCommonEvents['Is Monetization']= item?.isMonetization || false;
            globalCommonEvents['Advertiser Appsflyer Id']= item?.appsflyerId || 'NA';
          
          track('Appsflyer Impression Pixel',globalCommonEvents)
        },
        'pwaInstallClickSuccess' : ()=>{
          addPageTabName();
          track('PWA Install Success',globalCommonEvents)
        },
        'pwaInstallClickError' : ()=>{ 
          addPageTabName();
          track('PWA Install Failure',globalCommonEvents)
        },
        'pwaInstallStripImpression' : ()=>{
          addPageTabName();
          globalCommonEvents["time taken"] = value?.timer;
          track('PWA Install Button Impression',globalCommonEvents)
        },
        'pwaInstallStripClicked' : ()=> {
          addPageTabName();
          track('PWA Install Button Clicked',globalCommonEvents)
        },
        'appsflyerLogs' : ()=> {
          addUgcId();
          addPageTabName();
          globalCommonEvents['Product Id'] = item?.productId || 'NA';
          globalCommonEvents['Product URL'] = item?.productUrl || 'NA';
          globalCommonEvents['Brand Name'] = item?.brandName || 'NA';
          globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
          globalCommonEvents['Shoppable Category'] = item?.category || 'NA';
          globalCommonEvents['Shoppable Main Category'] = item?.mainCategory || 'NA';
          globalCommonEvents['Shoppable Sub Category'] = item?.subCategory || 'NA';
          globalCommonEvents['Shoppable Sub Sub Category'] = item?.subSubCategory || 'NA';
          // globalCommonEvents['Is Monetization']= item?.isMonetization || false;
          globalCommonEvents['Advertiser Appsflyer Id']= item?.appsflyerId || 'NA';
          globalCommonEvents['Appsflyer Header'] = item?.response;
          globalCommonEvents['Appsflyer Id'] = item?.request;
        track('Appsflyer Logs',globalCommonEvents)
      },
      'sessionDuration' : ()=>{
        globalCommonEvents['Session Time'] = item?.sessionTime;
        track('Session Duration',globalCommonEvents)
      }
      
        //how to make sunrise in html?
        
 //   'pause' : () => track('Pause', commonWithIds()),
//   'resume' : () => track('Resume', commonWithIds()),
      // 'downloadClick' : () => {
      //   mixpanelEvents['Popup Name'] = 'Download App',
      //   mixpanelEvents['Element'] = 'Download App',
      //   mixpanelEvents['Button Type'] = 'Link',
      //   track('Popup CTAs', mixpanelEvents)
      // }
    }

    type && toTrack?.[type] && toTrack?.[type]();
  }