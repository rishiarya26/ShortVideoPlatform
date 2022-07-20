import { trackEvent } from "./index";

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
      'play' : () => trackEvent('UGC_Play', events),
      'share' : () => trackEvent('UGC_Share_Click', events),
      'replay' : () => trackEvent('UGC_Replayed', events),
      'watchTime' : () => {
        events['UGC Consumption Type'] = value?.watchTime || 'NA'
        events['UGC Duration'] = value?.duration || 'NA'
        events['UGC Watch Duration'] = value?.durationWatchTime || 'NA'
        trackEvent('UGC_Watch_Time',events)
      },
      'cta' : ()=>{
        events['Element'] = value?.name || 'NA'
        events['Button Type'] = value?.type || 'NA'
        trackEvent('CTAs', events)
      },
      'savelook' : ()=>{
        trackEvent('Save_Look', events)
      }
    }
    type && toTrack?.[type] && toTrack?.[type]();
}