import { toTrackMixpanel } from "../analytics/mixpanel/events";

// let videosCompleted = (typeof window !== "undefined" &&  JSON.parse(window.sessionStorage.getItem('videos-completed')) || 0);

// const videoCompletedEvent = () =>{
//     try{
//       const vCompletedLive = JSON.parse(window.sessionStorage.getItem('videos-completed') || '0');
//       if(videosCompleted < vCompletedLive){
      
//         console.log("MIX**", window.sessionStorage.getItem('videos-completed'))
    
//         if(vCompletedLive === 5){
//            toTrackMixpanel('videosCompleted5')
//         }
//         if(vCompletedLive === 10){
//           toTrackMixpanel('videosCompleted10')
//         }
//         if(vCompletedLive === 15){
//         toTrackMixpanel('videosCompleted15')
//         }
//         videosCompleted = vCompletedLive;
//        }
//       }catch(e){
//         console.error('mixpanel- complete videos',e)
//       }
// }
// let videosViewedCompleted = (typeof window !== "undefined" &&  parseInt(window.sessionStorage.getItem('videos-viewed')) || 0);

/*************  checking a value from inital value & comapring & incrementing older value ***************/
// export const videoViewedEvent = () =>{
    // try{
    //   const vViewedLive = parseInt(window.sessionStorage.getItem('videos-viewed') || '0');
    //   if(videosViewedCompleted.value < vViewedLive.value){
      
    //     console.log("MIX**", window.sessionStorage.getItem('videos-viewed'))
    
    //     if(vViewedLive.value === 5){
    //        toTrackMixpanel('videosCompleted5')
    //     }
    //     if(vViewedLive.value === 10){
    //       toTrackMixpanel('videosCompleted10')
    //     }
    //     if(vViewedLive.value === 15){
    //     toTrackMixpanel('videosCompleted15')
    //     }
    //     videosViewedCompleted.value = vViewedLive.value;
    //    }
    //   }catch(e){
    //     console.error('mixpanel- complete videos',e)
    //   }
// }

const callViewEvent = (videosViewed)=>{
  console.log("MIX- checking...", videosViewed)
  if(videosViewed === 5){
    toTrackMixpanel('videosCompleted5')
    }
    if(videosViewed === 10){
      toTrackMixpanel('videosCompleted10')
    }
    if(videosViewed === 15){
    toTrackMixpanel('videosCompleted15')
    }
}

export const incrementCountVideoView = (id)=>{
  try{
    /* mixpanel - view event tracker (videos completed) */
    const videosCompleted = JSON.parse(window.sessionStorage.getItem('videos-completed')) ||{ ids:[], value: 0};
    if(videosCompleted?.ids?.findIndex((item)=>item === id) === -1)
    { 
      // console.log('MIX-count ++',videosCompleted, " ** incre ** ", videosCompleted.value+1)
      videosCompleted.ids.push(id);
      const updateValue = parseInt(videosCompleted.value)+1
      const updateData = {ids:videosCompleted.ids, value:updateValue}
       window.sessionStorage.setItem('videos-completed',JSON.stringify(updateData));
       callViewEvent(updateData.value);
    }
   }catch(e){
     console.error('error in video increment fn',e)
   }
}