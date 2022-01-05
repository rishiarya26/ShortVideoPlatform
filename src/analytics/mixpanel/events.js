import { APP_NAME, LANGUAGE } from "../../constants";
import { getItem } from "../../utils/cookie"

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

    let payload = {}
    payload['unique ID'] = guestId;
    payload['isPWA'] = getDeviceInfo();
    payload['New App Language'] = LANGUAGE;
    payload['Platform Section'] = APP_NAME;

    return payload;
}