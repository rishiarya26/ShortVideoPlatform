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

export {
  CopyToClipBoard,
  ScrollToTop,
  updateUtmData
};

