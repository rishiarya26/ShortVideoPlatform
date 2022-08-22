import { trackEvent as track } from "./index";

export const commonEvents = ({ userId = 'NA', content_id = 'NA', page = 'NA' }) => {
  let payload = {}
  payload['Creator ID'] = userId;
  payload['UGC ID'] = content_id;
  payload['Page Name'] = page;
  return payload;
}

export const toTrackFirebase = (type, commonInfo = {}, value) => {
    const events = commonEvents(commonInfo);
    const toTrack = {
      'play' : () => track('UGC_Play', events),
      'share' : () => track('UGC_Share_Click', events),
      'replay' : () => track('UGC_Replayed', events),
      'watchTime' : () => {
        events['UGC Consumption Type'] = value?.watchTime || 'NA'
        events['UGC Duration'] = value?.duration || 'NA'
        events['UGC Watch Duration'] = value?.durationWatchTime || 'NA'
        track('UGC_Watch_Time',events)
      },
      'cta' : ()=>{
        events['Element'] = value?.name || 'NA'
        events['Button Type'] = value?.type || 'NA'
        track('CTAs', events)
      },
      'savelook' : ()=>{
        track('Save_Look', events)
      },
      'appDownloadPopup':()=> {
        track('App_Download_Popup');
      },
      'appDownloadCTA':()=>{
        track('App_Download_CTA');
      },
      'appOpenCTA':()=>{
        track('App_Open_CTA', events);
      },
      'screenView':()=>{
        track('Screen_View', events);
      },
      'creatorFormSubmitted' : ()=>{
        commonWithIds();
        track('Creator Form Submitted');
      },
      'videosCompleted5' : ()=>track('ugc_view_5'),
      'videosCompleted10' : ()=>track('ugc_view_10'),
      'videosCompleted15' : ()=>track('ugc_view_15'),
      'stunnerInstallClick' : ()=>track('app_install_stunner_footer_click',events)
    }
    type && toTrack?.[type] && toTrack?.[type]();
}