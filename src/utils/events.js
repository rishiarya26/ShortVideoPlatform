import { toTrackMixpanel } from "../analytics/mixpanel/events";

let videosCompleted = (typeof window !== "undefined" &&  parseInt(window.sessionStorage.getItem('videos-completed')) || 0);

const videoCompletedEvent = () =>{
    try{
      const vCompletedLive = parseInt(window.sessionStorage.getItem('videos-completed') || '0');
      if(videosCompleted < vCompletedLive){
      
        console.log("MIX**", window.sessionStorage.getItem('videos-completed'))
    
        if(vCompletedLive === 5){
           toTrackMixpanel('videosCompleted5')
        }
        if(vCompletedLive === 10){
          toTrackMixpanel('videosCompleted10')
        }
        if(vCompletedLive === 15){
        toTrackMixpanel('videosCompleted15')
        }
        videosCompleted = vCompletedLive;
       }
      }catch(e){
        console.error('mixpanel- complete videos',e)
      }
}

export default videoCompletedEvent;