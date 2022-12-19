/*eslint-disable @next/next/no-img-element*/
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLeaderboardData } from '../../sources/leaderboard';
import Img from '../commons/image';
//import fallbackUsers from '../../../public/images/users.png';
function Round3ParticipantM() {
  const [data, setData] = useState(null);
  const [dates, setDates] = useState()
  // const [selectedRound, setSelectedRound] = useState(0);

  const router = useRouter();
  const { type = 'notInApp' } = router?.query;

  const getData = async()=>{
   try{
    //  console.log("round", round)
    const response = await getLeaderboardData({round : 3});
    console.log('leaderboard data',response?.data?.data, response?.data?.dates)
    // response.data.data.week4 = {
    //   "all": [
    //     {
    //       "id": 11,
    //       "round": 2,
    //       "week": 3,
    //       "position": 1,
    //       "rank": "",
    //       "winner": "Yes",
    //       "judge": "No",
    //       "creatorId": "69d08ba3-c48e-416e-9002-2f3f8c688764",
    //       "username": "Nidhi_sarolkar",
    //       "firstName": "Nidhi",
    //       "lastName": "sarolkar",
    //       "profilepic": "https://akamaividz2.zee5.com/image/upload/v1641027294/hipi/assets/user/69d08ba3-c48e-416e-9002-2f3f8c688764/69d08ba3-c48e-416e-9002-2f3f8c688764.webp",
    //       "createdTimeStamp": "2022-01-03T05:18:12.000Z"
    //     }
    //   ],
    //   "judges": []
    // }
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
    // // console.log("type",type,"sR", selectedRound)
    // setSelectedRound(convertedtype);
  },[])

  return (
      // <div className="w-full h-full ">
      //   <div className=" headerbar w-full h-18 bg-red-600 flex items-center justify-start lg:px-10 px-4 py-2">
      //       <img className="w-16" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
      //   </div>
      //   <div >
      //       <h2 className=' py-5 w-full text-center my-2 font-bold text-lg'> Round 2 Winner</h2>
      //       <div className='pb-5'>
      //         <img src={withBasePath('images/goat/lb/mob/lb_desc_latest.jpg')} />
      //       </div>
      //       <div className=' mx-3 p-2 justify-center'>
      //         <p>We thank you all for your overwhelming response to #HipiGOAT contest. We are happy to announce winner of Round 2 (Week 1 :13th Dec- 18th Dec).</p>
      //         <p className='my-2  '>Congratulations to <a className="font-bold" href="https://www.hipi.co.in/profile/6a908c4f-995c-4b64-b5f5-3cf967c64a10" target="_blank" rel="noreferrer">Himangi V</a>
      //         </p>
      //         <p>Upload your singing videos now and participate.
      //             It’s still not late, you still have the chance to become the Greatest Of All Time!
      //         </p>
      //       </div>
      //   </div>
      // </div>

      <div className='w-full flex flex-col'>
        <div className="w-full border-b-2 border-gray-300 relative flex justify-center py-4">
            <p className="font-extrabold text-lg ">Round 3 Participants</p>
             {/* <div onClick={()=>router?.back()} className="absolute top-6 left-4">
                <Back/>
            </div> */}
        </div>
     

        <div className="Wlist">
        {/* {data?.week6?.all?.length > 0 && <div className="w-full border-b-2 border-gray-300 relative flex py-2 px-4">
            <p className="font-bold">{`Week 6 (${dates?.week6 || ''})`}</p>
        </div>
        } */}
        {/* normal count */}
      {data?.week6?.all?.length > 0  && data.week6.all.map((item, id)=>(
         <div key={id} onClick={()=>(type === 'notInApp') &&  router && router?.push(`/@${item?.username}`)} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
         <div className="flex items-center"  >
           <div className="w-12 h-12 rounded-full overflow-hidden bg-gray">
             <Img data={item?.profilepic} fallback={'/images/users.png'}/>
           </div>
         <p className="text-black max-w-60v text-sm font-semibold pl-4 overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
         </div>
         {item?.rank && item?.winner === 'Yes' ? <div className="text-green-600 bg-gray-100 p-2 font-semibold text-sm">
         {`Grand Finale Winner`}
         </div> : 
         <div className="text-green-600 p-2 font-semibold">
         {item?.rank}
         </div>
         }

         {/* <div className={data?.week2?.all?.[0]?.position === 1 ? "text-green-600 bg-gray-100 p-2 font-semibold" : "text-green-600 p-2 font-semibold"}>
         {item?.position === 1 ? 'Winner' : data?.week2?.all?.[0]?.position}
         </div> */}
         </div>
      ))
       }
               {data && data?.week4?.all?.length > 0 && <div className="w-full border-b-2 border-gray-300 relative flex py-2 px-4">
            <p className="font-bold text-sm">{`Week 4 Winner(${dates?.week4 || ''})`}</p>
        </div>}
  {data && data?.week4?.all?.length > 0 && data?.week4?.all?.[0] && 
        <div onClick={()=>(type === 'notInApp') &&  router && router?.push(`/@${data?.week4?.all?.[0]?.username}`)} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
              <div className="flex items-center"  >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Img data={data?.week4?.all?.[0]?.profilepic} fallback={'/images/users.png'}/>
                </div>
            <p className="text-black max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${data?.week4?.all?.[0]?.firstName} ${data?.week4?.all?.[0]?.lastName}`}</p>
            </div>
            {/* <div className="text-green-600 bg-gray-100 p-2 font-semibold">
              Winner
            </div> */}
        </div>}
               {data && data?.week3?.all?.length > 0 && <div className="w-full border-b-2 border-gray-300 relative flex py-2 px-4">
            <p className="font-bold text-sm">{`Week 3 Winners(${dates?.week3 || ''})`}</p>
        </div>}
  {data && data?.week3?.all?.length > 0 && data?.week3?.all?.map((item,id)=>(
         <div key={id} onClick={()=>(type === 'notInApp') &&  router && router?.push(`/@${item?.username}`)} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
         <div className="flex items-center"  >
           <div className="w-12 h-12 rounded-full overflow-hidden">
             <Img data={item?.profilepic} fallback={'/images/users.png'}/>
           </div>
       <p className="text-black max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
       </div>
       {/* <div className="text-green-600 bg-gray-100 p-2 font-semibold">
         Winner
       </div> */}
   </div>
  ))
       }
               {data && data?.week2?.all?.length > 0 && <div className="w-full border-b-2 border-gray-300 relative flex py-2 px-4">
            <p className="font-bold text-sm">{`Week 2 Winner(${dates?.week2 || ''})`}</p>
        </div>}
  {data && data?.week2?.all?.length > 0 && data?.week2?.all?.[0] && 
        <div onClick={()=>(type === 'notInApp') &&  router && router?.push(`/@${data?.week2?.all?.[0]?.username}`)} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
              <div className="flex items-center"  >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Img data={data?.week2?.all?.[0]?.profilepic} fallback={'/images/users.png'}/>
                </div>
            <p className="text-black max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${data?.week2?.all?.[0]?.firstName} ${data?.week2?.all?.[0]?.lastName}`}</p>
            </div>
            {/* <div className="text-green-600 bg-gray-100 p-2 font-semibold">
              Winner
            </div> */}
        </div>}
             {data && data?.week1?.all?.length > 0 && <div className="w-full border-b-2 border-gray-300 relative flex py-2 px-4">
            <p className="font-bold text-sm">{`Week 1 Winner(${dates?.week1 || ''})`}</p>
        </div>}
  {data && data?.week1?.all?.length > 0 && data?.week1?.all?.[0] && 
        <div onClick={()=>(type === 'notInApp') &&  router && router?.push(`/@${data?.week1?.all?.[0]?.username}`)} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
              <div className="flex items-center"  >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Img data={data?.week1?.all?.[0]?.profilepic} fallback={'/images/users.png'}/>
                </div>
            <p className="text-black max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${data?.week1?.all?.[0]?.firstName} ${data?.week1?.all?.[0]?.lastName}`}</p>
            </div>
            {/* <div className="text-green-600 bg-gray-100 p-2 font-semibold">
              Winner
            </div> */}
        </div>}
{/* {data?.week6?.judges?.length > 0  && data.week6.judges.map((item, id)=>(
         <div key={id} onClick={()=>(type === 'notInApp') &&  router && router?.push(`/@${item?.username}`)} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
         <div className="flex items-center"  >
           <div className="w-12 h-12 rounded-full overflow-hidden bg-gray">
             <Img data={item?.profilepic} fallback={'/images/users.png'}/>
           </div>
         <p className="text-black max-w-60v text-sm font-semibold pl-4 overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
         </div>
         {item?.judge === 'Yes' &&
       <div className="text-green-600 bg-gray-100 p-2 font-semibold">
       {`Judge's Pick`}
       </div>}
         </div>
      ))
       }  */}

       
     
       
        {/* <div className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center"><div className="flex items-center"><div className="w-12 h-12 rounded-full overflow-hidden"><img className="
        position-relative overflow-hidden
        animate-appear bg-gray-500
        " src="https://akamaividz2.zee5.com/image/upload/v1642183142/hipi/assets/user/6d3609f7-eb7e-440b-862e-5f04330955b1/6d3609f7-eb7e-440b-862e-5f04330955b1.webp" alt="hipi" layout="fill" object-fit="cover" /></div><p className="text-black max-w-60v text-sm font-semibold pl-4 overflow-hidden">Abhishek Anil Sharma</p></div><div className="text-green-600 bg-gray-100 p-2 font-semibold">Winner</div></div><div className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center"><div className="flex items-center"><div className="w-12 h-12 rounded-full overflow-hidden"><img className="
        position-relative overflow-hidden
        animate-appear bg-gray-500
        " src="https://akamaividz2.zee5.com/image/upload/v1637738608/hipi/assets/user/1360657f-3f3b-4faa-a24d-f0a41b0c1ada/1360657f-3f3b-4faa-a24d-f0a41b0c1ada.webp" alt="hipi" layout="fill" object-fit="cover" /></div><p className="text-black max-w-60v text-sm font-semibold pl-4 overflow-hidden">chirag tomar</p></div><div className="text-green-600 bg-gray-100 p-2 font-semibold">Winner</div></div> */}
        </div>
      </div>
  )}

export default Round3ParticipantM;

