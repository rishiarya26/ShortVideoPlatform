import { viewEvents } from "../../sources/social";

export const viewEventsCall = async(id, event, info)=>{
    // console.log("event to send", id, event)
  try{
      await viewEvents({id:id, event:event, duration:info?.duration?.toString() || '', timeSpent:info?.timeSpent?.toString() || ''});
    }catch(e){
      console.log('error in view event');
    }
  }

const callRecoEvent = async(payload)=>{
 try{
    console.log("reco event",payload)
  await viewEvents({payloads:payload});
 }catch(e){
   console.error("reco events",e)
 }
}  

export const toTrackReco = async(event, info) =>{
  const source = window?.sessionStorage?.getItem("previous-page");

  const searchEvents={
    "event": event, 
    "message": info?.message || 'NA', 
    "objectID": info?.objectID, 
    "position": info?.position, 
    "queryID": info?.queryID,
    "source": source || "NA",
    "page": info?.page || "NA",
    "tab": info?.tab || "NA",
  }

  const recoEvents = {
    "event": event,
    "source": source || "NA",
    "page": info?.page || "NA",
    "tab": info?.tab || "NA",
    ...(info?.user_id ? {"user_id": info.user_id} : {}),
    ...(info?.assetId ? {"assetId": info.assetId} : {}),
    ...(info?.correlation_id ? {"correlation_id": info.correlation_id} : {}),
    ...(info?.profile_id ? {"profile_id": info.profile_id} : {}),
    ...(info?.explain ? {"explain": info.explain} : {}),
    ...(info?.objectID ? {"objectID": info.objectID} : {}),
    ...(info?.objectType ? {"objectType": info.objectType} : {})
  };

  const toTrack={
    'search_event' : ()=>callRecoEvent(searchEvents),
    'search_result_click_event' : ()=>callRecoEvent(searchEvents),
    "follow": ()=>callRecoEvent(recoEvents),
    "unfollow": ()=>callRecoEvent(recoEvents),
    "click": ()=>callRecoEvent(recoEvents),
  }

  event && toTrack?.[event] && toTrack?.[event]();
}  