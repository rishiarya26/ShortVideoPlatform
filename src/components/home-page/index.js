import {  withRouter } from "next/router";
import { getItem } from "../../utils/cookie";
import DeskFeed from "../desk-feed";
import Home from "../home"

const HomePage =({router})=>{

const device = getItem('device-type');

const type = router?.query?.type;
const id = type && (router?.query?.id || router?.query?.contentId);

// console.log("router",router);

// if(id?.length >0){
//     console.log("id",id, id.length);
//   router?.push({pathname : `/video/${id}`});
//   return null;
// }

if(device){
    if(id?.length >0){
        console.log("id",id, id.length);
      // router?.push({pathname : `/video/${id}`});
      router?.push({pathname : `/feed/for-you?videoId=${id}`});
      return null;
    }
    router?.push({pathname: '/feed/[pid]',query: { pid: 'for-you' }})
    return null;
}

return(
   <></>
)
}

export default withRouter(HomePage);