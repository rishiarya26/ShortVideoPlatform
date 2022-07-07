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
  const oldCampaignId = localStorage?.get('campaign_id') || ''
    let campaign_id = queryStrings?.campaign_id || oldCampaignId;
    (campaign_id !== oldCampaignId) && localStorage.set('campaign_id',campaign_id);
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
  console.log("**&&",refferUrl?.includes('/feed'), typeof document != "undefined", typeof refferUrl === 'string')
  if(refferUrl && typeof refferUrl === 'string'){

    reffereUrl?.includes('/feed') ? (pageName = 'Feed'):''
    reffereUrl?.includes('/explore') && (pageName = 'Discover')
    reffereUrl?.includes('/profile-feed') && (pageName = 'Profile Feed')
    reffereUrl?.includes('/hashtag-feed') && (pageName = 'Hashtag Feed')
    reffereUrl?.includes('/hashtag') && (pageName = 'Hashtag Details')
    reffereUrl?.includes('/@') && (pageName = 'Creator Profile')
    reffereUrl?.includes('/terms-conditions.html') && (pageName = 'Terms of Use')
    reffereUrl?.includes('/community-guidelines.html') && (pageName = 'Community Guidelines')
    reffereUrl?.includes('/privacy-policy.html') && (pageName = 'Privacy Policy')
    reffereUrl?.includes('/login') && (pageName = 'Login')
    reffereUrl?.includes('/signup') && (pageName = 'Signup')
    reffereUrl?.includes('/search?term') && (pageName = 'Discover Search Results')
  }
  console.log("**&&**",pageName)
  return pageName;
}
           
export {
  CopyToClipBoard,
  ScrollToTop,
  updateUtmData,
  updateCampaignId,
  getHostname,
  getUrl,
  getCanonicalUrl,
  getReffererPage
};

