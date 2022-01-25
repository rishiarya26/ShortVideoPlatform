import { APP_NAME, LANGUAGE } from "../../constants";
import { getItem } from "../../utils/cookie"
import { localStorage } from "../../utils/storage";

export const commonEvents = ()=>{
    const guestId = getItem('guest-token');
   
    const getDeviceInfo = ()=>{
        let device = 'desktop';
        let isMobile;
       try{ 
         device = getItem('device-type');
         isMobile = (device === 'mobile') ?  true :  false
    }catch(e){
        console.log(e)
    }
        return isMobile;
    }
    let utmData = localStorage?.get('utm-data') || {}
    const deviceModal = localStorage?.get('device-modal');
    const networkStrength = localStorage?.get('network-strength');
  
    let payload = {}
    payload['unique ID'] = guestId;
    payload['isPWA'] = getDeviceInfo();
    // payload['New App Language'] = LANGUAGE;
    payload['Platform Section'] = APP_NAME;
    utmData?.utm_campaign && (payload['App UTM Campaign'] = utmData?.utm_campaign);
    utmData?.utm_medium && (payload['App UTM Medium'] = utmData?.utm_medium);
    utmData?.utm_term && (payload['App UTM Term'] = utmData?.utm_term);
    utmData?.utm_content && (payload['App UTM Content'] = utmData?.utm_content);
    utmData?.utm_source && (payload['App UTM Source'] = utmData?.utm_source);
    payload['Device Modal'] = deviceModal;
    payload['Network Strength'] = networkStrength;

    return payload;
}