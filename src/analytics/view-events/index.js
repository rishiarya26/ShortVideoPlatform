import { viewEvents } from "../../sources/social";

export const viewEventsCall = async(id, event, info)=>{
    // console.log("event to send", id, event)
  try{
       await viewEvents({id:id, event:event, duration:info?.duration?.toString() || '', timeSpent:info?.timeSpent?.toString() || ''});
    }catch(e){
        console.log('error in view event');
    }
  }