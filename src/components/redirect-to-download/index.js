import { useRouter, withRouter } from "next/router";
import { getItem } from "../../utils/cookie";

const Redirect = ({router})=>{
    const stores = {
        android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
        ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
      };

    // let router = useRouter();

  let device = 'android';

  if(device){
    try{ 
        device = getItem('device-info');
        router?.push(stores[device])
        // router && router.push(stores[device])
    
    }catch(e){
        // router && router.push(stores[device])
    
    }
  }    
    return null;
}

export default withRouter(Redirect);