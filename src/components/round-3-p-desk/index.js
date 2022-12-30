/*eslint-disable @next/next/no-img-element*/
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { withBasePath } from '../../config';
import { getLeaderboardData } from '../../sources/leaderboard';
import Img from '../commons/image';
import Tabs from '../commons/tabs/leadership';
//import fallbackUsers from '../../../public/images/users.png';
function Round3ParticipantD() {
   const [data, setData] = useState(null);
   // const [selectedRound, setSelectedRound] = useState(0);
   const [first, setFirst] = useState(null);
   const [dates, setDates] = useState()
 
   const router = useRouter();
   const { type = 0 } = router?.query;
 
   const getData = async()=>{
    try{
     const response = await getLeaderboardData({round : 3});
     if(response?.data?.data){
       // const itemArray = response?.data?.data?.week2?.all?.splice(0,1);
       // const [first] = itemArray;
       // setFirst(first);
     }
     console.log(response.data)
     setData(response?.data?.data);
     setDates(response?.data?.dates);
    }catch(e){
      setData([])
    console.log('data error',e)
    }
   }
 
   useEffect(()=>{
         getData();
     // const convertedtype = typeof(type) === 'string' ? Number(type) : type
     // // console.log("type",type,"sR", selectedRound, 'gg',typeOfIndex)
     // setSelectedRound(convertedtype);
   },[])

return (
<div className='bg-gray-100 min-h-screen'>
   <div className=" headerbar w-full h-18 bg-red-600 flex items-center justify-start lg:px-10 px-4 py-2">
      <img className="w-16" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
   </div>
   <div className="flex justify-center">
      <div className="w-full flex flex-col max-w-60v">
         <div className="w-full  relative flex justify-center py-4">
            <p className="font-extrabold text-lg ">Round 3 Participants</p>
         </div>
         {/* <div className="w-full  relative flex justify-center py-2 mt-6">
            <p className="font-bold">{data?.week6?.all?.length > 0 && `Week 6 (${dates?.week6})`}</p>
         </div> */}
         <div className="w-full flex justify-center mt-6 flex-wrap">
         {data && data?.week6?.all?.length > 0 && data?.week6?.all?.map((item,id)=>(
         
         <div key={id} className="w-2/5 m-2 rounded-lg bg-white relative flex justify-between max-w-sm py-3 px-3 items-center">
               <div className="flex items-center"  >
               <div className="w-10 h-10 rounded-full overflow-hidden bg-gray">
                  <Img data={item?.profilepic} fallback={'/images/users.png'}/>
               </div>
            <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
            </div>
          { item?.rank && item?.winner === 'Yes' ? <div className="text-green-600 bg-gray-100 p-2 font-semibold text-sm">
         {`Grand Finale Winner`}
         </div> : 
         <div className="text-green-600 p-2 font-semibold">
         {item?.rank}
         </div>
         }
         </div>
         ))}
                {data && data?.week4?.all?.length > 0 &&  <div className="w-full  relative flex justify-center py-2 mt-6">
    <p className="font-bold">{`Week 4 Winner (${dates?.week4})`}</p>
</div>}
{data && data?.week4?.all?.length > 0 && data?.week4?.all?.map((item,id)=>(
  <div key={id} className="w-full flex justify-center mt-6">
  <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
      <div className="flex items-center"  >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Img data={item?.profilepic} fallback={'/images/users.png'}/>
        </div>
    <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
    </div>
    {/* <div className="text-green-600 bg-gray-100  p-2 font-semibold">
      Winner
    </div> */}
</div>
</div>
))}
       {data && data?.week3?.all?.length > 0 &&  <div className="w-full  relative flex justify-center py-2 mt-6">
    <p className="font-bold">{`Week 3 Winner (${dates?.week3})`}</p>
</div>}
{data && data?.week3?.all?.length > 0 && data?.week3?.all?.map((item,id)=>(
  <div key={id} className="w-full flex justify-center mt-6">
  <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
      <div className="flex items-center"  >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Img data={item?.profilepic} fallback={'/images/users.png'}/>
        </div>
    <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
    </div>
    {/* <div className="text-green-600 bg-gray-100  p-2 font-semibold">
      Winner
    </div> */}
</div>
</div>
))}

                {data && data?.week2?.all?.length > 0 &&  <div className="w-full  relative flex justify-center py-2 mt-6">
    <p className="font-bold">{`Week 2 Winner (${dates?.week2})`}</p>
</div>}
{data && data?.week2?.all?.length > 0 && data?.week2?.all?.map((item,id)=>(
  <div key={id} className="w-full flex justify-center mt-6">
  <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
      <div className="flex items-center"  >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Img data={item?.profilepic} fallback={'/images/users.png'}/>
        </div>
    <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
    </div>
    {/* <div className="text-green-600 bg-gray-100  p-2 font-semibold">
      Winner
    </div> */}
</div>
</div>
))}
       {data && data?.week1?.all?.length > 0 &&  <div className="w-full  relative flex justify-center py-2 mt-6">
    <p className="font-bold">{`Week 1 Winner (${dates?.week1})`}</p>
</div>}
{data && data?.week1?.all?.length > 0 && data?.week1?.all?.map((item,id)=>(
  <div key={id} className="w-full flex justify-center mt-6">
  <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
      <div className="flex items-center"  >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Img data={item?.profilepic} fallback={'/images/users.png'}/>
        </div>
    <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
    </div>
    {/* <div className="text-green-600 bg-gray-100  p-2 font-semibold">
      Winner
    </div> */}
</div>
</div>
))}
         {/* {data && data?.week6?.judges?.length > 0 && data?.week6?.judges?.map((item,id)=>(
         
         <div key={id} className="w-2/5 m-2 rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
               <div className="flex items-center"  >
               <div className="w-12 h-12 rounded-full overflow-hidden bg-gray">
                  <Img data={item?.profilepic} fallback={'/images/users.png'}/>
               </div>
            <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
            </div>
            {item?.judge === 'Yes' &&
       <div className="text-green-600 bg-gray-100 p-2 font-semibold text-sm">
       {`Judge's Pick`}
       </div>}
         </div>
         ))} */}
         
         </div>
       
         {/* <div className="w-full flex justify-center mt-6">
            <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
               <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden"><img className="
                     position-relative overflow-hidden
                     bg-gray-500
                     " src="https://akamaividz2.zee5.com/image/upload/v1642183142/hipi/assets/user/6d3609f7-eb7e-440b-862e-5f04330955b1/6d3609f7-eb7e-440b-862e-5f04330955b1.webp" alt="hipi" layout="fill" object-fit="cover" /></div>
                  <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">Abhishek Anil Sharma</p>
               </div>
               <div className="text-green-600 bg-gray-100  p-2 font-semibold">Winner</div>
            </div>
         </div>
         <div className="w-full flex justify-center mt-6">
            <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
               <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden"><img className="
                     position-relative overflow-hidden
                     bg-gray-500
                     " src="https://akamaividz2.zee5.com/image/upload/v1637738608/hipi/assets/user/1360657f-3f3b-4faa-a24d-f0a41b0c1ada/1360657f-3f3b-4faa-a24d-f0a41b0c1ada.webp" alt="hipi" layout="fill" object-fit="cover" /></div>
                  <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">chirag tomar</p>
               </div>
               <div className="text-green-600 bg-gray-100  p-2 font-semibold">Winner</div>
            </div>
         </div>
         <div className="w-full flex justify-center mt-6">
            <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
               <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden"><img className="
                     position-relative overflow-hidden
                     bg-gray-500
                     " src="https://akamaividz2.zee5.com/image/upload/v1641027294/hipi/assets/user/69d08ba3-c48e-416e-9002-2f3f8c688764/69d08ba3-c48e-416e-9002-2f3f8c688764.webp" alt="hipi" layout="fill" object-fit="cover" /></div>
                  <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">Nidhi sarolkar</p>
               </div>
               <div className="text-green-600 bg-gray-100  p-2 font-semibold">Winner</div>
            </div>
         </div>
         <div className="w-full flex justify-center mt-6">
            <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
               <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden"><img className="
                     position-relative overflow-hidden
                     bg-gray-500
                     " src="https://akamaividz2.zee5.com/image/upload/w_90/v1638260278/hipi/assets/user/28ba9f0f-cbf3-4cab-bc65-7ceeb4cb0e9c/28ba9f0f-cbf3-4cab-bc65-7ceeb4cb0e9c.jpg" alt="hipi" layout="fill" object-fit="cover"/></div>
                  <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">Shreya Sharma </p>
               </div>
               <div className="text-green-600 bg-gray-100  p-2 font-semibold">Winner</div>
            </div>
         </div> */}
      </div>
   </div>
</div>
);
}
export default Round3ParticipantD;