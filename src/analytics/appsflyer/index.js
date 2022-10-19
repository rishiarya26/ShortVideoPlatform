import { SITE_ID } from "../../constants"
import { appsflyerPixelClick, appsflyerPixelImp } from "../../sources/appsflyer-pixel";

export const appsflyerPixel = ({type, appId, advertiser,uri}) =>{
    const encodedUTF8Uri = uri && (encodeURIComponent(uri) || null);
    console.log('APPFLY',type,appId,advertiser,encodedUTF8Uri)
    let toExecute;
    switch (type) {
        case 'impression': toExecute =()=> appsflyerPixelImp({appId, advertiser})
        case 'click' : toExecute = ()=> appsflyerPixelClick({appId, advertiser, encodedUTF8Uri})    
    }

    console.log("toExecute",toExecute);
    toExecute && toExecute();
}