import { useEffect, useState } from "react";
import { getUsers } from "../../../sources/explore/users";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from "./loader";
import Error from "./error";
import { numberFormatter } from "../../../utils/convert-to-K";
import Img from "../../commons/image";
import { withRouter } from "next/router";
import { Back } from "../../commons/svgicons/back";
import useTranslation from "../../../hooks/use-translation";
// import fallbackUsers from '../../../../public/images/users.png'
import LoadMore from "../../commons/button/load-more";
import DeskDownloadAppGoTop from "../../commons/desk-download-go-top";
import CircularLoaderSearch from "../../commons/circular-loader-search";
import { toTrackClevertap } from "../../../analytics/clevertap/events";
import { toTrackMixpanel } from "../../../analytics/mixpanel/events";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const Users = ({item, type = 'normal', router}) =>{
    const [items, setItems] = useState();
    const [showLoading, setShowLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const {ref = ''} = router?.query;

    useEffect(() => {
      toTrackClevertap('screenView', {pageName: DISCOVER_SEARCH_RESULTS, tabName: 'top'});
      toTrackMixpanel('screenView', {pageName: DISCOVER_SEARCH_RESULTS, tabName: 'top'});
    } ,[])

    const {t} = useTranslation();
    const onDataFetched=(data)=>{
      setItems(data?.data);
      setOffset(offset+1);
      if(data?.data?.length > 0){
        if(data?.data?.length === 18){
          setHasMore(true);
        }else{
          setHasMore(false);
        }
      }else{
        setHasMore(false);
      }
      }
     
     const info = {
         normal : ()=> item && getUsers({keyword: item , offset:offset}),
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

     const fetchMoreItems = async()=>{
       try{
         setShowLoading(true);
     const resp = await getUsers({keyword: item, offset:offset})
     console.log("resp",resp)
     if(resp?.data?.length > 0){
       let data = [...items];
       data = data?.concat(resp.data);
       setItems(data);
       if(resp?.data?.length === 18){
        setHasMore(true);
        }else{
          setHasMore(false);
        }
     }else{
       setHasMore(false);
     }
     setShowLoading(false);
     setOffset(offset+1);
       }catch(e){
        setHasMore(false);
        setShowLoading(false);
       }
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
           <div className="pt-6">
           {heading[type]}
                 {items?.length > 0 ? items.map((item, id)=>(
               <span key={item?.id}>
                  <div onClick={()=> router && router?.push(`/@${item?.userHandle}`)} key={id} className="flex border-b cursor-pointer border-gray-300 hover:bg-gray-100 py-4 pl-2 pr-4 mr-2">
                  <div className=" w-16 flex h-16 bg-gray-300 relative rounded-full overflow-hidden" >
                      <Img data={item?.userIcon} title="Hipi" fallback={'/images/users.png'}/>
                      </div>
                      <div className="flex flex-col justify-between pl-2 pb-2">
                        <p className="font-semibold text-base text-gray-700">{item?.userId}</p>
                        <p className="text-sm text-gray-400">{`${item?.firstName} ${item?.lastName}`}</p>
                        <p className="text-sm pt-1 text-gray-400">{numberFormatter(item?.followers)} Followers</p>
                    </div>
                  </div>
                 {followButton[type]}
              </span>
                 )): 
                 <div className="flex w-full h-36 justify-center items-center">{t('NO_ITEM_SEARCH_RESULTS')}</div>
                 }
              {showLoading ? <div className="flex w-full justify-center py-6"><CircularLoaderSearch/></div> : 
              offset > 1 && 
               <LoadMore onClick={fetchMoreItems} hasMore={hasMore}/>
              }
           </div>
           <DeskDownloadAppGoTop/>
           </ComponentStateHandler>
        </>
    )
}

export default withRouter(Users);