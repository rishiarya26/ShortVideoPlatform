/*eslint-disable @next/next/no-img-element */
/*eslint-disable react/jsx-key*/
import { useEffect, useState } from "react"
import { fetchLeaderboardData } from "../../sources/leaderboard"
import LikeGoat from "../commons/svgicons/leaderboard/like"

export const Ranklist = () =>{
const [items, setItems] = useState([])   
const [state, setState] = useState('loading') 
const getRanklist = async() =>{
  try{
    const resp = await fetchLeaderboardData('love');
    setItems(resp?.data?.responseData?.leader);
    console.log("resp*",resp)
    setState('success')
  }catch(e){
    console.error("error in leaderboard data api",e);
    setState('error')
  }
}    

useEffect(()=>{
    getRanklist();
},[])

if(state === 'error') return <div className="flex flex-col w-full p- justify-center items-center min-h-32v">Something went wrong</div>
return(    
<div className='flex flex-col w-full items-center'>
  {/* <div className='flex bg-gray-200 rounded-full p-1 items-center mt-4'>
   <span className='p-2 px-4 font-semibold text-gray-700'>Winners</span>
   <span className='bg-white rounded-full p-2 px-4 font-semibold text-gray-700'>Ranklist</span>
</div> */}
<div className='flex flex-col LIST w-full p-4 items-center min-h-32v'>
   {state === 'loading' ? <>
   <div className='flex mb-3 box_shadow_2 border border-gray-100 rounded-full p-4 w-full md:w-1/2 justify-between items-center'>
       <div className='flex items-center'>
       <div className='flex bg-gray-200 ml-1 mr-3 w-6 h-6'>
           
       </div>
       <div className='w-12 h-12 rounded-full bg-gray-200  overflow-hidden'>
        
       </div>
           <div className='flex  bg-gray-200 w-24 h-6 mx-2'>
           
       </div>
       </div>
       <div className='flex'>
       <div className='flex items-center mx-2'>
            <span className='bg-gray-200 w-12 h-6'></span>
       </div>
      
       </div>
   </div>
   <div className='flex mb-3 box_shadow_2 border border-gray-100 rounded-full p-4 w-full md:w-1/2 justify-between items-center'>
       <div className='flex items-center'>
       <div className='flex bg-gray-200 ml-1 mr-3 w-6 h-6'>
           
       </div>
       <div className='w-12 h-12 rounded-full bg-gray-200  overflow-hidden'>
        
       </div>
           <div className='flex  bg-gray-200 w-24 h-6 mx-2'>
           
       </div>
       </div>
       <div className='flex'>
       <div className='flex items-center mx-2'>
            <span className='bg-gray-200 w-12 h-6'></span>
       </div>
      
       </div>
   </div>
   <div className='flex mb-3 box_shadow_2 border border-gray-100 rounded-full p-4 w-full md:w-1/2 justify-between items-center'>
       <div className='flex items-center'>
       <div className='flex bg-gray-200 ml-1 mr-3 w-6 h-6'>
           
       </div>
       <div className='w-12 h-12 rounded-full bg-gray-200  overflow-hidden'>
        
       </div>
           <div className='flex  bg-gray-200 w-24 h-6 mx-2'>
           
       </div>
       </div>
       <div className='flex'>
       <div className='flex items-center mx-2'>
            <span className='bg-gray-200 w-12 h-6'></span>
       </div>
       </div>
   </div>
   </>
   : state === 'success' && items?.length > 0 && items?.map((item,id)=>(
    <div key={id} className='flex mb-3 box_shadow_2 border border-gray-100 rounded-full p-4 w-full md:w-1/2 justify-between items-center'>
       <div className='flex items-center'>
       <div className='flex font-bold text-gray-800 pl-1 pr-3 text-lg'>
           {id+1}
       </div>
       <div className='w-12 h-12 rounded-full bg-gray-200  overflow-hidden'>
           <img src={item?.profilePicImgUrl}/>
       </div>
           <div className='flex font-semibold text-gray-800 px-2 max-w-38v md:max-w-28v line-clamp-2'>
           {item?.firstName || ''}{" "}{item?.lastName || ''}
       </div>
       </div>
       <div className='flex'>
       <div className='flex items-center px-2'>
            <span className='text-gray-500 pr-2'>{item?.likes}</span><LikeGoat/>
       </div>
       {/* <div className='flex items-center px-2'>
           <span className='text-gray-500'>100</span> <ShareGoat/>
       </div> */}
       </div>
   </div>
   ))
   }
   
</div>
</div>
)
}