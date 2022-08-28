import {  withRouter } from "next/router";
import { getItem } from "../../utils/cookie";

const HomePage =({router})=>{

const device = getItem('device-type');

const type = router?.query?.type;
const id = type && (router?.query?.id || router?.query?.contentId);

if(device){
    if(id?.length >0){
       router && router?.push({pathname : `/feed/for-you?videoId=${id}`});
      return null;
    }
     router && router?.push({pathname: '/feed/[pid]',query: { pid: 'for-you' }})
    return null;
}

return(
   <></>
)
}

export default withRouter(HomePage);