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
        <div>Popular Users</div>
        {loading ?
         <div>Loading....</div>
        : items?.map((item,id)=>(
            <div onClick={()=>pushToProfile(item?.userHandle)} className='flex flex-col' key={id}>
             <Img data={item?.profilepicimageurl} fallback={fallbackUsers?.src} />
             <div className="usrhvr relative hover:border-b border-black font-semibold text-base text-gray-700 cursor-pointer">
                      <div  className="font-bold flex items-center text-md text-gray-700 cursor-pointer">
                       {item?.userName} 
                      </div>
                     <div className='usrdeck absolute z-50 top-4 -left-16'>
                     <DeskHoverInfo id={item?.userName}/>
                     </div>  
            </div>
             <div> {`${item?.firstName || ''} ${item?.lastName || ''}`} </div>
            </div>
          ))}
        </>
    )
}

export default DeskPopularUsersList;