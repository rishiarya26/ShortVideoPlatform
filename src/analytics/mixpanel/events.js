
import { track } from "../index";
import { APP_NAME, LANGUAGE } from "../../constants";
import { getItem } from "../../utils/cookie"
import { localStorage } from "../../utils/storage";
import { getReffererPage } from "../../utils/web";


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

export const commonEvents = ()=>{
   
    let utmData = localStorage?.get('utm-data') || {}
    const deviceModal = localStorage?.get('device-modal');
    const device = getItem('device-type');
    const networkStrength = localStorage?.get('network-strength');
    const guestId = getItem('guest-token');
    const loggedInId = localStorage?.get('user-id') || null;
    const loggedInUserDetails = localStorage?.get('user-details') || null;
  
    let payload = {}
    payload['unique ID'] = loggedInId || guestId;
    payload['isPWA'] = getIsMobile();
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
    // payload['Source'] = getReffererPage() || 'NA';
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

    const evnetsForUpload = () =>{
      const videoUploadStatus = value?.type === 'success' ? true : false;
       globalCommonEvents['success'] = videoUploadStatus ?? 'N/A';
       globalCommonEvents["Post Time Seconds"] = value?.post_time_seconds ?? 'NA';
       globalCommonEvents['UGC Language'] = item?.ugc_language ?? 'N/A';
       !videoUploadStatus ? globalCommonEvents['Failure Reason'] = value?.failure_reason ?? 'N/A': '';
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
      'impression' : ()=> track('UGC Impression', commonWithIds()),
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
      'play' : () => track('UGC Play', commonWithIds()),
      'share' : () => track('UGC Share Click', commonWithIds()),
      'replay' : () => track('UGC Replayed', commonWithIds()),
      'skip' : () => {
        let eventsWithIds = commonWithIds()  
        eventsWithIds['UGC Consumption Type'] = value?.watchTime
        eventsWithIds['UGC Duration'] = value?.duration && Math.round(value.duration)
        eventsWithIds['UGC Watch Duration'] = value?.durationWatchTime && Math.round(value.durationWatchTime)
        track('UGC Skipped',eventsWithIds)
      }, 
      'watchTime' : () => {
        let eventsWithIds = commonWithIds()  
        eventsWithIds['UGC Consumption Type'] = value?.watchTime
        eventsWithIds['UGC Duration'] =  value?.duration && Math.round(value.duration)
        eventsWithIds['UGC Watch Duration'] = value?.durationWatchTime && Math.round(value.durationWatchTime)
        track('UGC Watch Time',eventsWithIds)
      },
      'cta' : ()=>{
        addPageTabName(); 
        globalCommonEvents['Element'] = value?.name
        globalCommonEvents['Button Type'] = value?.type
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        track('CTAs', globalCommonEvents)
      },
      'saveLook' : ()=>{
        addUgcId();
        addPageTabName();
        track('Save Look', globalCommonEvents)},
      'like' : ()=> track('UGC Liked', commonWithIds()),
      'unLike' : ()=> track('UGC Unliked', commonWithIds()),
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
        globalCommonEvents['Product ID'] = item?.productId;
        globalCommonEvents['Product Name'] = item?.productName;
        globalCommonEvents['Brand Name'] = item?.brandName;
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        track('Shopping Product Impression', globalCommonEvents)
       },
       'shoppableProductClicked' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product ID'] = item?.productId;
        globalCommonEvents['Product Name'] = item?.productName;
        globalCommonEvents['Brand Name'] = item?.brandName;
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        track('Shoppable Product Clicked', globalCommonEvents)
       },
       'monetisationProductImp' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product ID'] = item?.productId || 'NA';
        globalCommonEvents['Product Url'] = item?.productUrl || 'NA';
        globalCommonEvents['Brand Name'] = item?.brandName || 'NA';
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
        track('Monetisation Product Impression', globalCommonEvents)
       },
       'monetisationProductClick' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product ID'] = item?.productId || 'NA';
        globalCommonEvents['Product URL'] = item?.productUrl || 'NA';
        globalCommonEvents['Brand Name'] = item?.brandName || 'NA';
        globalCommonEvents['Ad Campaign ID'] = item?.campaignId || 'NA';
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
        track('Logout Initiated', globalCommonEvents)
       },
       'logoutSuccess' :  ()=>{
        addPageTabName();
        track('Logout Success', globalCommonEvents)
       },
       'logoutFailure' :  ()=>{
        addPageTabName();
        track('Logout Failure', globalCommonEvents)
       },
       'popupLaunch' :  ()=>{
        addPageTabName();
        globalCommonEvents['Popup Name'] = item?.name;
        track('Popup Launch', globalCommonEvents);
       },
       'popupCta' :  ()=>{
        addPageTabName();
        globalCommonEvents['Popup Name'] = item?.name;
        globalCommonEvents['Popup CTAs'] = item?.ctaName;
        globalCommonEvents['elemant'] = item?.elemant;
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
        track('Carousal Banner Impression', globalCommonEvents);
       },
       'carousalBannerClick' : ()=>{
         addPageTabName();
         getBannerType();
        globalCommonEvents['Carousal ID'] = item?.carousalId;
        globalCommonEvents['Carousal Name'] = item?.carousalName;
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
        'uploadCTAClicked' : () => track('Upload Button Clicked',globalCommonEvents),
        'shortPostResult' : () => track('Short Post Result',evnetsForUpload()),
      
        
        
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