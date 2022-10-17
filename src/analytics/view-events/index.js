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

  const searchEvents={
    "event": event, 
    "message": info?.message || 'NA', 
    "objectID": info?.objectID, 
    "position": info?.position, 
    "queryID": info?.queryID,
  }

  const toTrack={
    'search_event' : ()=>callRecoEvent(searchEvents),
    'search_result_click_event' : ()=>callRecoEvent(searchEvents)
  }

  event && toTrack?.[event] && toTrack?.[event]();
}  