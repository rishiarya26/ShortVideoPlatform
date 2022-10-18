import { SITE_ID } from "../../constants"

export const appsflyerPixel = ({type, appId, advertiser,uri}) =>{
    const encodedUTF8Uri = uri && (encodeURIComponent(uri) || null);
    console.log('APPFLY',type,appId,advertiser,encodedUTF8Uri)
    switch (type) {
        case 'impression': return `https://impression.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}`
        case 'click' : return `https://app.appsflyer.com/${appId}?pid=hipi_int&Advertiser=${advertiser}&af_siteid=${SITE_ID}&af_web_dp=${encodedUTF8Uri}`    
    }
}