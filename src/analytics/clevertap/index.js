import { getItem } from "../../utils/cookie";
import { localStorage, sessionStorage } from "../../utils/storage";
import { APP_NAME, LANGUAGE } from "../../constants";

export const isLoaded = () => (window.clevertap);

export function track(event, payload) {
    if (isLoaded()) {
      console.log('CLEVERTAP - ',event, payload)
       window?.clevertap?.event?.push(event,payload);
    }
  }


  const extractHTML = (str, ele) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.querySelector(ele);
  }

  const appendWebPopup = (str) => {
    const helperDiv = document.createElement("div");
    helperDiv.style.width = '30%';
    helperDiv.style.display = 'block';
    helperDiv.style.overflow = 'hidden';
    helperDiv.style.position = 'fixed';
    helperDiv.style.zIndex = 2147483647;
    helperDiv.style.top = '5%';
    helperDiv.style.right = '5%';
    helperDiv.setAttribute("id", "wizParDiv0");
    const iframe = document.createElement("iframe");
    iframe.setAttribute("id", "wiz-iframe");
    iframe.style.zIndex = "2147483647";
    iframe.style.display = "block";
    iframe.style.height = "100px";
    iframe.style.width = "100% !important";
    iframe.style.border = '0px !important';
    helperDiv.appendChild(iframe);
    document.querySelector("body").appendChild(helperDiv);
    iframe.contentWindow.document.querySelector('body').appendChild(extractHTML(str, "div"));
    iframe.contentWindow.document.querySelector('head').appendChild(extractHTML(str, "style"));
    const closeBtn = iframe.contentWindow.document.querySelector(".wzrkClose");
    closeBtn.addEventListener("click", () => {
      helperDiv.remove();
    })
    return iframe;
  };

  export const webPopUp = () => {
    if(isLoaded) {
      window.clevertap.notificationCallback = function(msg){
        clevertap.raiseNotificationViewed();
        console.log('clevertap',msg);
        const popup = msg?.msgContent?.html;
        appendWebPopup(popup);
      };
    }
  }

  export const initClevertapUser = (prop) => {

    let utmData = localStorage?.get('utm-data') || {}
    // const deviceModal = localStorage?.get('device-modal');
    // const device = getItem('device-type');
    // const networkStrength = localStorage?.get('network-strength');
    let geoData = localStorage?.get('geo-info') || null;
    const guestId = getItem('guest-token');
    const loggedInId = localStorage?.get('user-id') || null;
    const loggedInUserDetails = localStorage?.get('user-details') || null;
    const userId = localStorage.get('user-id');

    if(isLoaded) {
      window.clevertap.onUserLogin.push({
        "Site": {
          "Name": prop?.name || "NA",
          "Unique ID": loggedInId || guestId,
          "Email": prop?.email || "NA",
          "Phone Number": prop?.phoneNumber || "NA",
          "Gender": oggedInUserDetails?.gender ? loggedInUserDetails?.gender : 'NA',
          "Age": loggedInUserDetails?.age ? loggedInUserDetails?.age : 'NA',
          "User Handle": loggedInUserDetails?.userHandle ? loggedInUserDetails?.userHandle : 'NA',
          "User Id": userId || "NA",
          "guest-token": guestId || "NA",
          "Advertisement ID": prop?.advertisementId || "NA",
          // "First App Launch Date": props?.firstAppLaunchDate || "NA",
          "User Type": loggedInId ? 'member' : 'guest',
          "Registering Country": prop?.registeringCountry || "NA",
          // "Appsflyer ID": prop?.appsflyerId || "NA",
          // "Appsflyer Campaign": prop?.appsflyerCampaign || "NA",
          // "Appsflyer Source": prop?.appsflyerSource || "NA",
          // "Appsflyer Medium": prop?.appsflyerMedium || "NA",
          // "App Source": prop?.appSource || "NA",
          // "App Campaign": prop?.appCampaign || "NA",
          "App UTM Source": utmData?.utm_source || "NA",
          "App UTM Medium": utmData?.utm_medium || "NA",
          "App UTM Campaign": utmData?.utm_campaign || "NA",
          "App UTM Content": utmData?.utm_content || "NA",
          "App UTM Term": utmData?.utm_term || "NA",
          // "App isRetargeting": prop?.appIsRetargeting || "NA",
          "Platform Name": "Hipi",
          "Platform Section": APP_NAME,
          // "App Version": prop?.appVersion || "NA",
          "City": geoData?.city || "NA",
          "State": geoData?.state_code || "NA",
          "Country": geoData?.country_code || "NA",
          "Latitude": geoData?.lat || "NA",
          "Longitude": geoData?.long || "NA",
          // "New App Language": LANGUAGE,
          // "New Content Language": prop?.newContentLanguage || "NA",
          "Page Name": prop?.pageName || "NA",
          "Source": prop?.source || "NA",
        }
       });
    }
  };

  export const webPush = () => {
    const isPopupShown = sessionStorage.get("clevertapWebpopup") || false;
    if(isLoaded && !isPopupShown) {
      clevertap.notifications.push({
        "titleText": "Would you like to receive Push Notifications?",
        "bodyText": "We promise to only send you relevant content and give you updates on your transactions",
        "okButtonText": "Yes",
        "rejectButtonText": "No",
        "askAgainTimeInSeconds": 5
      });
      sessionStorage.set("clevertapWebpopup", true);
    }
  }