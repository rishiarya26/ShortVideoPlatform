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

    let geoData = localStorage?.get('geo-info') || null;
    const guestId = getItem('guest-token');
    const loggedInId = localStorage?.get('user-id') || null;
    const loggedInUserDetails = localStorage?.get('user-details') || null;
    const userId = localStorage.get('user-id');

    if(isLoaded) {
      window.clevertap.onUserLogin.push({
        "Site": {
          "Name": loggedInUserDetails?.firstName || "NA",
          "Unique ID": loggedInId || guestId,
          "Email": prop?.email || "NA",
          "Phone Number": prop?.mobile || "NA",
          "Gender": loggedInUserDetails?.gender ? loggedInUserDetails?.gender : 'NA',
          "Age": loggedInUserDetails?.age ? loggedInUserDetails?.age : 'NA',
          "User Handle": loggedInUserDetails?.userHandle ? loggedInUserDetails?.userHandle : 'NA',
          "User Id": userId || "NA",
          "guest-token": guestId || "NA",
          "User Type": loggedInId ? 'member' : 'guest',
          "City": geoData?.city || "NA",
          "State": geoData?.state_code || "NA",
          "Country": geoData?.country_code || "NA"
        }
       });
    }
  };

  export const webPush = () => {
    const isPopupShown = sessionStorage.get("clevertapWebpopup") || false;
    if(isLoaded && !isPopupShown) {
      clevertap.notifications.push({
        "titleText": "Get notifications for trending videos from Hipi",
        "bodyText": "We promise to send you notifications for relevant content only",
        "okButtonText": "Enable",
        "rejectButtonText": "Not Now",
        "askAgainTimeInSeconds": 5,
        "serviceWorkerPath": "/sw.js"
      });
      sessionStorage.set("clevertapWebpopup", true);
    }
  }