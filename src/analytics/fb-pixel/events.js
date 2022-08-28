import { trackEvent } from "./index";
import * as fbq from './index'

export const commonEvents = ({ userId = 'NA', content_id = 'NA', page = '' }) => {
  let payload = {}
  payload['Creator ID'] = userId;
  payload['UGC ID'] = content_id;
  payload['Page Name'] = page;
  return payload;
}

export const ToTrackFbEvents = (type, commonInfo = {}, value) => {
    const fbEvents = commonEvents(commonInfo);
    const toTrack = {
      'impression' : ()=>  fbq.event('UGC Impression', fbEvents),
      'swipe' : ()=> {
        fbEvents['UGC Duration'] = value?.duration
        fbEvents['UGC Watch Duration'] = value?.durationWatchTime
        fbq.event('UGC Swipe', fbEvents)
      },
      'play' : () => fbq.event('UGC Play', fbEvents),
      'pause' : () => fbq.event('Pause', fbEvents),
      'resume' : () => fbq.event('Resume', fbEvents),
      'share' : () => fbq.event('UGC Share Click', fbEvents),
      'replay' : () => fbq.event('UGC Replayed', fbEvents),
      'watchTime' : () => {
        fbEvents['UGC Consumption Type'] = value?.watchTime
        fbEvents['UGC Duration'] = value?.duration
        fbEvents['UGC Watch Duration'] = value?.durationWatchTime
        fbq.event('UGC Watch Time',fbEvents)
      },
      'cta' : ()=>{
        fbEvents['Element'] = value?.name
        fbEvents['Button Type'] = value?.type
        fbq.event('CTAs', fbEvents)
      },
      'savelook' : ()=>{
        fbq.event('Save Look', fbEvents)
      },
      'appDownloadPopup':()=> {
        fbq.event('App Download Popup');
      },
      'appDownloadCTA':()=>{
        fbq.event('App Download CTA');
      },
      'appOpenCTA':()=>{
        fbq.event('App Open CTA')
      },
      'screenView':()=>{
        fbq.event('Screen View');
      },
      'ugcUploadComplete':()=>{
        fbq.event('UGC_Played_Complete');
      },
      'ugcPlayedComplete':()=>{
        fbq.event("UGC_Played_Complete");
      },
      'creatorFormSubmitted' : ()=>{
        fbq.event('Creator Form Submitted',fbEvents);
      },
      'videosCompleted5' : ()=>fbq.event('ugc_view_5'),
      'videosCompleted10' : ()=>fbq.event('ugc_view_10'),
      'videosCompleted15' : ()=>fbq.event('ugc_view_15'),
      'stunnerInstallClick' : ()=>fbq.event('app_install_stunner_footer_click',fbEvents)
    }
    type && toTrack?.[type] && toTrack?.[type]();
}