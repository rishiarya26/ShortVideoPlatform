import { useState } from "react";
import { getUsers } from "../../../sources/explore/users";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from "./loader";
import Error from "./error";
import { numberFormatter } from "../../../utils/convert-to-K";
import Img from "../../commons/image";
import { withRouter } from "next/router";
import { Back } from "../../commons/svgicons/back";
import useTranslation from "../../../hooks/use-translation";
import fallbackUsers from '../../../../public/images/users.png'
import { toTrackMixpanel } from "../../../analytics/mixpanel/events";
import { toTrackReco } from "../../../analytics/view-events";
import { CREATOR_PROFILE, DISCOVER_SEARCH_RESULTS } from "../../../constants";
import { toTrackClevertap } from "../../../analytics/clevertap/events";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const Users = ({item, type = 'normal', router}) =>{
    const [items, setItems] = useState();
    const {ref = ''} = router?.query;

    const searchTerm = item;

    const {t} = useTranslation();
    const onDataFetched=(data)=>{
      setItems(data?.data);
      }
     
     const info = {
         normal : ()=> item && getUsers({keyword: item}),
         withFollow : ()=> ref && getUsers({keyword: `${ref}`})
     }

     const followButton = {
        normal :  '',
        withFollow : <div className='w-6 h-2'>Follow</div>
     }

     const heading = {
         normal : '',
         withFollow : <div className="headbar w-full flex h-16 shadow-md bg-white items-center p-4 justify-center">
         <div  onClick={ ()=> router?.back()} className="absolute left-2 h-16 top-0 flex items-center">
           <Back/>
         </div>
         <div className="font-bold">{ref}</div>
       </div>
     }

     const dataFetcher = info[type];
     const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);

     setRetry = retry && retry;
  
    return (
        <>
            <ComponentStateHandler
                state={fetchState}
                Loader={LoadComp}
                ErrorComp={ErrorComp}
            >
           <div>
           {heading[type]}
                 {items?.length > 0 ? items.map((item, id)=>(
               <span key={item?.id}>
                  <div onClick={()=>{
                      try{
                        toTrackMixpanel('searchResultClicked',{pageName:DISCOVER_SEARCH_RESULTS, tabName:'Users'},{creatorId:item?.id,creatorHandle:item?.userHandle,objType:CREATOR_PROFILE,query:searchTerm})
                        toTrackClevertap('searchResultClicked',{pageName:DISCOVER_SEARCH_RESULTS, tabName:'Users'},{creatorId:item?.id,creatorHandle:item?.userHandle,objType:CREATOR_PROFILE,query:searchTerm})
                        toTrackReco('search_result_click_event',{"objectID": item?.id || item?.objectID, "position": item?.clickPosition, "queryID": item?.correlation_id, pageName:DISCOVER_SEARCH_RESULTS, tabName:'Users'})
                       }catch(e){
                         console.error('search result click',e)
                       }
                     router && router?.push(`/@${item?.userHandle}`)}} key={id} className="flex p-2 min-w-3/5 mr-2">
                      <div className=" w-15v flex h-15v bg-gray-300 relative rounded-full overflow-hidden" >
                          <Img data={item?.userIcon} title="Hipi" fallback={fallbackUsers?.src}/>
                          </div>
                      <div className="flex flex-col justify-between pl-2 pb-2">
                        <p className="font-medium text-sm text-gray-700">{`${item?.firstName} ${item?.lastName}`} </p>
                        <p className="text-xs text-gray-400">{item?.userId}</p>
                        <p className="text-xs text-gray-400">{numberFormatter(item?.followers)} Followers</p>
                    </div>
                  </div>
                 {followButton[type]}
              </span>
                 )): 
                 <div className="flex w-full h-1/3 justify-center items-center">{t('NO_ITEM_SEARCH_RESULTS')}</div>
                 }
           </div>
           </ComponentStateHandler>
        </>
    )
}

export default withRouter(Users);