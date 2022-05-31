import { useEffect, useState } from "react"
import Img from "../commons/image"
import DeskHoverInfo from "../desk-hover-info"
import {getPopularUser} from "../../sources/users/profile"
import fallbackUsers from '../../../public/images/users.png';

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
        <div className="flex items-center font-medium text-sm text-gray-600 my-2">Popular Users</div>
        {loading ?
         <div>Loading....</div>
        : items?.map((item,id)=>(
            <div onClick={()=>pushToProfile(item?.userHandle)} className='flex cursor-pointer items-center hover:bg-gray-100 py-2 pr-4 mr-2' key={id}>
             <div className=" w-8 flex h-8 bg-gray-300 relative rounded-full overflow-hidden"><Img data={item?.profilepicimageurl} fallback={fallbackUsers?.src} /></div>
             <div className="flex flex-col ml-2">
             <div className="usrhvr flex flex-col relative hover:border-b border-black font-semibold text-base text-gray-700 cursor-pointer">
                      <div  className="flex items-center text-sm text-gray-800 font-semibold cursor-pointer">
                       {item?.userName} 
                      </div>
                     <div className='usrdeck absolute z-50 top-4 -left-16'>
                     <DeskHoverInfo id={item?.userName}/>
                     </div>  
            </div>
            <div className="flex items-center text-xs text-gray-600 cursor-pointer font-light"> {`${item?.firstName || ''} ${item?.lastName || ''}`} </div>
            </div>
          </div>
          ))}
        </>
    )
}

export default DeskPopularUsersList;