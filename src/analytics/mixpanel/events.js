
import { track } from "../index";
import { APP_NAME, LANGUAGE } from "../../constants";
import { getItem } from "../../utils/cookie"
import { localStorage } from "../../utils/storage";
// import { getReffererPage } from "../../utils/web";

export const commonEvents = ()=>{
   
    const getIsMobile = ()=>{
        // let device = 'desktop';
        let isMobile;
       try{ 
         const device = getItem('device-type') || 'desktop'
         isMobile = (device === 'mobile') ?  true :  false
        }catch(e){
            console.log(e)
        }
        return isMobile;
    }

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
    // payload['Source'] = getReffererPage() || 'NA';
    return payload;
}

/* Func to send mixpanel event - 
type(event name), value(additional Info keys), item(obj containing info/Ids) */
export const toTrackMixpanel = (type, value, item) => {
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

    const commonWithIds = () =>{
        globalCommonEvents['Creator ID'] = item?.userId;
        globalCommonEvents['Creator Handle'] = `${item?.userName}`;
        addUgcId();
        addPageTabName();
        // isShopMonetize()
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

    const toTrack = {
      'impression' : ()=> track('UGC Impression', commonWithIds()),
      'screenView' : ()=> {
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
        eventsWithIds['UGC Duration'] = value?.duration
        eventsWithIds['UGC Watch Duration'] = value?.durationWatchTime
        track('UGC Skipped',eventsWithIds)
      }, 
      'watchTime' : () => {
        let eventsWithIds = commonWithIds()  
        eventsWithIds['UGC Consumption Type'] = value?.watchTime
        eventsWithIds['UGC Duration'] = value?.duration
        eventsWithIds['UGC Watch Duration'] = value?.durationWatchTime
        track('UGC Watch Time',eventsWithIds)
      },
      'cta' : ()=>{
        globalCommonEvents['Element'] = value?.name
        globalCommonEvents['Button Type'] = value?.type
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
        track('Shopping Product Impression', globalCommonEvents)
       },
       'shoppableProductClicked' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product ID'] = item?.productId;
        globalCommonEvents['Product Name'] = item?.productName;
        globalCommonEvents['Brand Name'] = item?.brandName;

        track('Shoppable Product Clicked', globalCommonEvents)
       },
       'monetisationProductImp' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product ID'] = item?.productId || 'NA';
        globalCommonEvents['Product Name'] = item?.productName || 'NA';
        globalCommonEvents['Brand Name'] = item?.brandName || 'NA';
        globalCommonEvents['Brand URL'] = item?.brandUrl || 'NA';

        track('Monetisation Product Impression', globalCommonEvents)
       },
       'monetisationProductClick' :  ()=>{
        addUgcId();
        addPageTabName();
        globalCommonEvents['Product ID'] = item?.productId || 'NA';
        globalCommonEvents['Product Name'] = item?.productName || 'NA';
        globalCommonEvents['Brand Name'] = item?.brandName || 'NA';
        globalCommonEvents['Brand URL'] = item?.brandUrl || 'NA';
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
       'signupResult' :  ()=>{
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
          addUgcId();
          commonWithIds();
          globalCommonEvents['Search Query'] = item?.query || 'NA';
          globalCommonEvents['Results Returned'] = item?.results || 'NA';
          globalCommonEvents['Hashtag ID']= item?.hashTagId || 'NA';
          globalCommonEvents['Hashtag Name']	= item?.hashtagName || 'NA';
          globalCommonEvents['Sound ID']	= item?.soundId || 'NA';
          globalCommonEvents['Sound Name']= item?.soundName || 'NA';
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
        // 'contentBucketSwipe' : ()=>{
        //   addUgcId();
        //   commonWithIds();
        //   globalCommonEvents['Search Query'] = item?.query || 'NA';
        //   globalCommonEvents['Results Returned'] = item?.results || 'NA';
        //   globalCommonEvents['Hashtag ID']= item?.hashTagId || 'NA';
        //   globalCommonEvents['Hashtag Name']	= item?.hashtagName || 'NA';
        //   globalCommonEvents['Horizonal Index']	= item?.horizontalIndex || 'NA';
        //   globalCommonEvents['Vertical Index']= item?.verticalIndex || 'NA';
        //   globalCommonEvents['Carousal ID'] = item?.carousalId;
        //   globalCommonEvents['Carousal Name'] = item?.carousalName;
        //   globalCommonEvents['Carousal Type'] = item?.carousalType;
        //   track('Content Bucket Swipe',globalCommonEvents);
        // },
        // 'contentBucketSwipe' : ()=>{
        //   addUgcId();
        //   commonWithIds();
        //   globalCommonEvents['Search Query'] = item?.query || 'NA';
        //   globalCommonEvents['Results Returned'] = item?.results || 'NA';
        //   globalCommonEvents['Hashtag ID']= item?.hashTagId || 'NA';
        //   globalCommonEvents['Hashtag Name']	= item?.hashtagName || 'NA';
        //   globalCommonEvents['Horizonal Index']	= item?.horizontalIndex || 'NA';
        //   globalCommonEvents['Vertical Index']= item?.verticalIndex || 'NA';
        //   globalCommonEvents['Carousal ID'] = item?.carousalId;
        //   globalCommonEvents['Carousal Name'] = item?.carousalName;
        //   globalCommonEvents['Carousal Type'] = item?.carousalType;
        //   track('Content Bucket Swipe',globalCommonEvents);
        // },
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
          globalCommonEvents['Creator Name']	= item?.creatorName || 'NA';
          globalCommonEvents['Horizonal Index']	= item?.horizontalIndex || 'NA';
          globalCommonEvents['Vertical Index']= item?.verticalIndex || 'NA';
          globalCommonEvents['Carousal ID'] = item?.carousalId;
          globalCommonEvents['Carousal Name'] = item?.carousalName;
          globalCommonEvents['Carousal Type'] = item?.carousalType;
          track('Thumbnail Click',globalCommonEvents);
        },
        'viewMoreSelected' : ()=>{
          commonWithIds();
          // globalCommonEvents['Horizonal Index']	= item?.horizontalIndex || 'NA';
          // globalCommonEvents['Vertical Index']= item?.verticalIndex || 'NA';
          globalCommonEvents['Carousal ID'] = item?.carousalId;
          globalCommonEvents['Carousal Name'] = item?.carousalName;
          globalCommonEvents['Carousal Type'] = item?.carousalType;
          track('View More Selected',globalCommonEvents);
        }
        
        
 //   'pause' : () => track('Pause', commonWithIds()),
//   'resume' : () => track('Resume', commonWithIds()),
      // 'downloadClick' : () => {
      //   mixpanelEvents['Popup Name'] = 'Download App',
      //   mixpanelEvents['Element'] = 'Download App',
      //   mixpanelEvents['Button Type'] = 'Link',
      //   track('Popup CTAs', mixpanelEvents)
      // }
    }

    // const hashTags = item?.hashtags?.map((data)=> data.name);

    // mixpanelEvents['Creator ID'] = item?.userId;
    // mixpanelEvents['Creator Handle'] = `${item?.userName}`;
    // mixpanelEvents['Creator Tag'] = item?.creatorTag || 'NA';
    // mixpanelEvents['UGC ID'] = item?.content_id;
    // mixpanelEvents['Short Post Date'] = 'NA';
    // mixpanelEvents['Tagged Handles'] = hashTags || 'NA';
    // mixpanelEvents['Hashtag'] = hashTags || 'NA';
    // mixpanelEvents['Audio Name'] = item?.music_title || 'NA';
    // mixpanelEvents['UGC Genre'] = item?.genre;
    // mixpanelEvents['UGC Description'] = item?.content_description;


    type && toTrack?.[type] && toTrack?.[type]();
  }