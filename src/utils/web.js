import { ONE_TAP_DOWNLOAD } from "../constants";
import { getOneLink } from "../sources/social";
import { localStorage } from "./storage";

function CopyToClipBoard(value) {
  if (!value) return false;
  const tempInput = document.createElement('input');
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  return true;
}

function ScrollToTop(){

}

function updateUtmData(queryStrings){
  const utmData = localStorage?.get('utm-data') || {}
  console.log('ini',utmData)
  utmData.utm_source = queryStrings?.utm_source || utmData?.utm_source
  utmData.utm_medium = queryStrings?.utm_medium || utmData?.utm_medium
  utmData.utm_campaign = queryStrings?.utm_campaign || utmData?.utm_campaign
  utmData.utm_term = queryStrings?.utm_term || utmData?.utm_term
  utmData.utm_content = queryStrings?.utm_content || utmData?.utm_content
  console.log('final',utmData)
  localStorage.set('utm-data',utmData)
}

function updateCampaignId(queryStrings){
  const oldCampaignId = JSON.parse(window.sessionStorage.getItem('campaign_id')) || ''
  // const oldCampaignId = localStorage?.get('campaign_id') || ''
    let campaign_id = queryStrings?.campaign_id || oldCampaignId;
    // (campaign_id !== oldCampaignId) && localStorage.set('campaign_id',campaign_id);
    (campaign_id !== oldCampaignId) && window.sessionStorage.setItem('campaign_id',JSON.stringify(campaign_id));
}

function getHostname(){
  if(typeof window !== "undefined"){
    const url = document?.location?.href;
    let domain = (new URL(url));
    let hostname  = domain?.hostname || null;
    return hostname;
  }
}

function getUrl(){
  if(typeof window !== "undefined"){
    const url = document?.location?.href;
    return url;
  }
}

function getCanonicalUrl(orgUrl){
  // console.log('org',orgUrl);
  if(typeof window !== "undefined"){
    const url = orgUrl || (document &&  document?.location?.href);
    let domain = (new URL(url));
    let hostname  = domain?.hostname || null;
    let pathname  = domain?.pathname || '';
    let finalUrl = (hostname === 'hipi.co.in') ? `https://www.${hostname}${pathname}` : url
    return finalUrl;
  }
}

const getReffererPage = (reffereUrl) =>{
  const refferUrl = (typeof document != "undefined") ? document?.referrer : ''; 
  let pageName = null;
  console.log("reff**",document?.referrer,refferUrl,refferUrl?.includes('/explore'), typeof document != "undefined", typeof refferUrl,typeof refferUrl === 'string')
  if(refferUrl && typeof refferUrl === 'string'){
  console.log("reff__",refferUrl?.includes('/feed'))
    refferUrl?.includes('/feed') ? (pageName = 'Feed') : 
    refferUrl?.includes('/explore') ? (pageName = 'Discover') : ''
    refferUrl?.includes('/profile-feed') ? (pageName = 'Profile Feed') :
    refferUrl?.includes('/hashtag-feed') ? (pageName = 'Hashtag Feed') :
    refferUrl?.includes('/hashtag') ? (pageName = 'Hashtag Details'):
    refferUrl?.includes('/@') ? (pageName = 'Creator Profile'):
    refferUrl?.includes('/terms-conditions.html') ? (pageName = 'Terms of Use'):
    refferUrl?.includes('/community-guidelines.html') ? (pageName = 'Community Guidelines'):
    refferUrl?.includes('/privacy-policy.html') ? (pageName = 'Privacy Policy'):
    refferUrl?.includes('/login') ? (pageName = 'Login'):
    refferUrl?.includes('/signup') ? (pageName = 'Signup'):
    refferUrl?.includes('/search?term') && (pageName = 'Discover Search Results')
  }
  console.log("reff-pagename",pageName)
}

const onStoreRedirect = async ({videoId, afChannel='bottom_strip'})=>{

  let link = ONE_TAP_DOWNLOAD;
  try{  
    if(videoId){ 
      try{ const resp = await getOneLink({videoId : videoId, afChannel:afChannel});
      link = resp?.data;

      console.log("one link resp",resp);
      }
      catch(e){
        console.log('error android onelink',e)
      }
    }
  }
  catch(e){
  }
  window?.open(link);
}

 const isReffererGoogle = ()=>{
  const refferer = localStorage.get('refferer') || '';
  console.log("REFF *",refferer,refferer?.includes('google'))
  return refferer?.includes('google');
}

const getBrand =(url)=>{
  if(!url){
    return ''
  }else{
   const origin = url.split('//')[1];
   let finalOrigin = ''
   if(origin?.includes('www')){
     finalOrigin = origin.split('.')[1]
   }else{
     finalOrigin = origin.split('.')[0]
   }
   if(finalOrigin){
     return finalOrigin 
   }
  }
}
           
export {
  CopyToClipBoard,
  ScrollToTop,
  updateUtmData,
  updateCampaignId,
  getHostname,
  getUrl,
  getCanonicalUrl,
  getReffererPage,
  onStoreRedirect,
  isReffererGoogle,
  getBrand,
};

