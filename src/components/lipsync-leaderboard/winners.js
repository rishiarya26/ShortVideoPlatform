/*eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchLeaderboardWinners } from "../../sources/leaderboard";
import { getMonthName } from "../../utils/date";

export const Winners = () =>{
    const [items, setItems] = useState([])   
    const [state, setState] = useState('loading') 
    const router = useRouter();
    const getRanklist = async() =>{
      try{
        const resp = await fetchLeaderboardWinners('lipsync');
        console.log("resp",resp)
        setItems(resp?.data?.responseData?.challenges);
        if(resp?.data?.responseData?.challenges?.length <= 1){
          if(resp?.data?.responseData?.challenges?.length === 1 && 
            resp?.data?.responseData?.challenges?.[0]?.winners?.length > 0){
              setState('success')
          }else{
            setState('error');
          }
        }else  if(resp?.data?.responseData?.challenges?.length > 1){
          setState('success')
        }
       
      }catch(e){
        console.error("error in leaderboard data api",e);
        setState('error')
      }
    }    
    
    useEffect(()=>{
        getRanklist();
    },[])

    const dynamicImgUrl = (url)=>{
      let imgUrl = url;
      imgUrl = url?.replace('upload','upload/w_190')
      return imgUrl
    }

if(state === 'error') return <div className="flex flex-col w-full items-center justify-center min-h-60">No data available. Please check after sometime.</div>    
return(
<div className='flex flex-col w-full items-center min-h-60'>

{/* <div className='flex bg-gray-200 rounded-full p-1 items-center mt-4'>
  <span className='bg-white rounded-full p-2 px-4 font-semibold text-gray-700'>Winners</span>
  <span className='p-2 px-4 font-semibold text-gray-700'>Ranklist</span>
</div> */}

  
 {state === 'loading' ? <>
 <div className="w-full flex flex-col items-center">
 <div className='flex  bg-gray-200 w-24 h-6 my-2'></div>
 <div className="flex w-full justify-center">
  <div className="flex flex-col justify-center m-2">
  <div className='w-24 h-24 rounded-full overflow-hidden bg-gray-200' >
  </div>
  <div className='flex  bg-gray-200 w-24 h-6 mt-2'>
    </div>
  </div>
  <div className="flex flex-col justify-center m-2">
  <div className='w-24 h-24 rounded-full overflow-hidden bg-gray-200' >
  </div>
  <div className='flex  bg-gray-200 w-24 h-6 mt-2'>
    </div>
  </div>
  </div>
 </div>
 </>
 : state === 'success' && items?.length > 0 && items.map((challenge, id)=>(
 challenge?.winners?.length > 0 && 
  <div className="flex w-full flex flex-col items-center" key={id}>
  <div className='text-xl font-semibold text-gray-800 py-4 text-center'> #{challenge?.hashtagNames?.[0]}</div>
  <div className='flex LIST w-full p-4 items-center justify-center flex-wrap'>
  {challenge?.winners?.map((item,id)=>(
  <div
  //  onClick={()=>router?.push(`/@${item?.winner?.userName}`)} 
   key={id} 
   className='flex flex-col ITEM mb-3 justify-between items-center cursor-pointer'>
      <div className='w-24 h-24 rounded-full bg-gray-200 overflow-hidden'>
          <img src={dynamicImgUrl(item?.winner?.profilePicImgUrl)}/>
      </div>
      <div className='flex justify-center font-semibold text-gray-800 px-2 w-32 truncate'>
          {item?.winner?.firstName || ''}{" "}{item?.winner?.lastName || ''}
      </div>
      <div className='flex font-semibold text-gray-400 px-2 justify-center'>
          {item?.createdTimeStamp ? `${getMonthName(new Date(item?.createdTimeStamp)?.getMonth())} ${new Date(item?.createdTimeStamp).getDate()}`  : ''}
      </div>
  </div>))}
  </div>
  </div>
 ))}

</div>)}