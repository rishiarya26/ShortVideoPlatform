import { useState } from "react";
import { getUsers } from "../../../sources/explore/users";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from "./loader";
import Error from "./error";
import { numberFormatter } from "../../../utils/convert-to-K";
import Img from "../../commons/image";
import { withRouter } from "next/router";
import { Back } from "../../commons/svgicons/back";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const Users = ({item, type = 'normal', router}) =>{
    const [items, setItems] = useState();
    const {ref = ''} = router?.query;
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
         <div  onClick={ ()=> router.back()} className="absolute left-2 h-16 top-0 flex items-center">
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
                 {items?.map((item, id)=>(
               <>
              
                  <div key={id} className="flex border-2 border-gray-200 p-2 min-w-3/5 mr-2">
                      <div className=" w-16.6v flex h-16.6v bg-gray-300 relative rounded-full" >
                          <Img data={item?.userIcon} alt="image"/>
                          </div>
                      <div className="flex flex-col justify-between pl-2 pb-2">
                        <p className="font-medium text-lg text-gray-700">{item?.userId} </p>
                        <p className="text- text-gray-400">{item?.userId}</p>
                        <p className="text- text-gray-400">{numberFormatter(item?.followers)} Followers</p>
                    </div>
                  </div>
                 {followButton[type]}
              </>
                 ))}
           </div>
           </ComponentStateHandler>
        </>
    )
}

export default withRouter(Users);