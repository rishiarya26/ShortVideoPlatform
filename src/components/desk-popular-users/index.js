import { useEffect, useState } from "react"
import Img from "../commons/image"
import DeskHoverInfo from "../desk-hover-info"
import {getPopularUser} from "../../sources/users/profile"
import fallbackUsers from '../../../public/images/users.png';
import Verified from "../commons/svgicons/verified";

const DeskPopularUsersList = () =>{
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const pushToProfile =(userHandle)=>{
        window.location.href = `/${userHandle}`
      }

      const getPopProfiles = async()=>{
        try{
          const response = await getPopularUser();
          if(response?.status === 'success' && response?.data?.length > 0){
            setItems(response.data);
            setLoading(false);
          }
      }catch(e){
        console.log("error",e);
        setLoading(false);
      }
      }
      
      useEffect(()=>{
        setLoading(true);
        getPopProfiles();
      },[])  
 
    return(
        <>
        {items?.length>0 && <div className="flex items-center font-medium text-sm text-gray-600 mb-2 mt-4 sm-menu">Popular Users</div>}
        {loading ?
         <div>  
           <div  className="flex py-2 pl-2 pr-4 mr-2">
         <div className=" w-8 min-w-8 flex h-8 bg-gray-200 relative rounded-full overflow-hidden" >
         
         </div>
         <div className="flex flex-col justify-between pl-2 sm-menu">
         <p className="h-2 w-24 mt-2 bg-gray-200"></p>
           <p className="h-2 w-24 mt-2 bg-gray-200"></p>
       </div>
     </div></div>
        : items?.map((item,id)=>(
           id<9 && 
           <div onClick={()=>pushToProfile(item?.userHandle)} className='flex cursor-pointer items-center hover:bg-gray-100 py-2 pr-4 mr-2' key={id}>
             <div className=" w-8 min-w-8 flex h-8 bg-gray-300 relative rounded-full overflow-hidden"><Img data={item?.profilepicimageurl} fallback={fallbackUsers?.src} /></div>
             <div className="flex flex-col ml-2 sm-menu">
             <div className="flex flex-col relative font-semibold text-base text-gray-700 cursor-pointer">
                      <div  className="flex items-center text-sm text-gray-800 font-bold cursor-pointer">
                       {item?.userName} 
                       <span className='ml-1'>{item?.tag === 'Verified' ? <Verified/> : ''}</span>
                      </div>
                     {/* <div className='usrdeck absolute z-50 top-4 -left-16'>
                     <DeskHoverInfo id={item?.userName}/>
                     </div>   */}
            </div>
            <div className="flex items-center text-xs text-gray-600 cursor-pointer font-light"> {`${item?.firstName || ''} ${item?.lastName || ''}`} </div>
            </div>
          </div>
          ))}
        </>
    )
}

export default DeskPopularUsersList;