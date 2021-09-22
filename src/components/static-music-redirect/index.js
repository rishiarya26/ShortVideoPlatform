import { withRouter } from "next/router";
import { getItem } from "../../utils/cookie";

 function StaticMusicRedirect({router}){
    let path = "";
    let final_url = "https://www.zee5.com/music-videos";
   try{ const device = getItem('device-type');
    const deviceInfo = getItem('device-info');

        const params = router?.pathname;
        var webHeaders = new Headers(); // Currently empty
        var HTTP_X_ZEE5RD=webHeaders.get('HTTP_X_ZEE5RD');
        
        if(HTTP_X_ZEE5RD){	
            path = HTTP_X_ZEE5RD;
        }
        if(params){
            final_url = final_url+"?"+params.trim();
            path = path+"?"+params.trim();
        }
        
        if(device === 'mobile' && deviceInfo === 'android'){
            final_url = "https://zee5.onelink.me/RlQq?pid=Shared%20url&c=Deeplink_Music_Shared_Url&af_android_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.graymatrix.did%26hl%3Den_IN%26gl%3DUS&af_web_dp="+encodeURI(final_url)+"&af_ios_url="+encodeURI(final_url)+"&af_dp=zee5internalmain%3A%2Fzee5internalmusic%3A%2Fmusic%2F"+encodeURI(path);
            router && router.push(final_url)
        }}
        catch(e){
         router && router.push(final_url && final_url)
        }
        
        return null
}

export default withRouter(StaticMusicRedirect)
