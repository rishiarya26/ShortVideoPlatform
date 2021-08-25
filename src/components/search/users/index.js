import { useState } from "react";
import { getUsers } from "../../../sources/explore/users";
import ComponentStateHandler, { useFetcher } from "../../commons/component-state-handler";
import Loader from "./loader";
import Error from "./error";
import { numberFormatter } from "../../../utils/convert-to-K";
import Img from "../../commons/image";

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loader />);

const Users = ({item}) =>{
    const [items, setItems] = useState();

    const onDataFetched=(data)=>{
      console.log("hashtags",data)
      setItems(data?.data);
      }
     
     const dataFetcher = ()=> item && getUsers({keyword: item})
     const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);

     setRetry = retry && retry;
    return (
        <>
               <ComponentStateHandler
                state={fetchState}
                Loader={LoadComp}
                ErrorComp={ErrorComp}
            >
           <div className="flex flex-col">
                 {items?.map((item, id)=>(
                  <div key={id} className=" p-2 min-w-3/5 mr-2">
                      <div className=" w-16.6v flex h-16.6v bg-gray-300 relative rounded-full" >
                          <Img data={item?.userIcon} alt="image"/>
                          </div>
                      <div className="flex flex-col justify-between pl-2 pb-2">
                        <p className="font-medium text-lg text-gray-700">{item?.userId} </p>
                        <p className="text- text-gray-400">{item?.userId}</p>
                        <p className="text- text-gray-400">{numberFormatter(item?.followers)} Followers</p>
                    </div>
                  </div>
                 ))}
           </div>
           </ComponentStateHandler>
        </>
    )
}

export default Users;