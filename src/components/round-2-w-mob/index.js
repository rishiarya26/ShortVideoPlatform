/*eslint-disable @next/next/no-img-element*/
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLeaderboardData } from '../../sources/leaderboard';
import Img from '../commons/image';
import fallbackUsers from '../../../public/images/users.png';
import { Back } from '../commons/svgicons/back';

function Round2WinnerM({round}) {
  const [data, setData] = useState(null);
  const [dates, setDates] = useState()
  // const [selectedRound, setSelectedRound] = useState(0);

  const router = useRouter();
  const { type = 'notInApp' } = router?.query;

  const getData = async()=>{
   try{
    //  console.log("round", round)
    const response = await getLeaderboardData({round : round});
    console.log('leaderboard data',response?.data?.data, response?.data?.dates)
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

  // useEffect(()=>{
  //   setData(null);
  //   getData();
  // },[selectedRound])
  
//  const links={
//   facebook : 'https://www.facebook.com/HiPiOfficialApp',
//   twitter : 'https://twitter.com/HiPiOfficialApp',
//   instagram : 'https://www.instagram.com/hipiofficialapp/?hl=en'
// }

// const stores = {
//   android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
//   ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
// };

// const items = {
//  display : ['Round 1','Round 2', 'Round 3'],
//  defaultValue : selectedRound
// }

// const onTabChange = (round)=>{
//   setSelectedRound(round)
// }



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
            <p className="font-extrabold text-lg ">Round 2 Winners</p>
            <div onClick={()=>router?.back()} className="absolute top-6 left-4">
                <Back/>
            </div>
        </div>
     

        <div className="Wlist">
          {/* winner */}

        <div className="w-full border-b-2 border-gray-300 relative flex py-2 px-4">
            <p className="font-bold">{`Week 2 (${dates?.week2 || ''})`}</p>
        </div>
        {/* normal count */}
      {data?.week2?.all?.[0] &&
          <div onClick={()=>(type === 'notInApp') && router?.push(`/@${data?.week2?.all?.[0]?.username}`)} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
          <div className="flex items-center"  >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Img data={data?.week2?.all?.[0]?.profilepic} fallback={fallbackUsers?.src}/>
            </div>
          <p className="text-black max-w-60v text-sm font-semibold pl-4 overflow-hidden">{`${data?.week2?.all?.[0]?.firstName} ${data?.week2?.all?.[0]?.lastName}`}</p>
          </div>
          <div className="text-green-600 bg-gray-100 p-2 font-semibold">
              Winner
            </div>
          {/* <div className={data?.week2?.all?.[0]?.position === 1 ? "text-green-600 bg-gray-100 p-2 font-semibold" : "text-green-600 p-2 font-semibold"}>
          {item?.position === 1 ? 'Winner' : data?.week2?.all?.[0]?.position}
          </div> */}
          </div>
       }
        {/* <div className="w-full border-b-2 border-gray-300 relative flex py-2 px-4">
            <p className="font-bold">{`Judge's Pick`}</p>
        </div>
        {data?.week2?.judges?.map((item, key)=>(
          <div onClick={()=>(type === 'notInApp') && router?.push(`/@${item?.username}`)} key={key} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
          <div className="flex items-center"  >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Img data={item?.profilepic} fallback={fallbackUsers?.src}/>
            </div>
          <p className="text-black max-w-60v text-sm font-semibold pl-4 overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
          </div>
          <div className="text-green-600 p-2 font-semibold">
          {/* {item?.position} */}
          {/* </div>
          </div>
       ))}  */}
            <div className="w-full border-b-2 border-gray-300 relative flex py-2 px-4">
            <p className="font-bold">{`Week 1 (${dates?.week1 || ''})`}</p>
        </div>
  {data && data?.week1?.all?.[0] && 
        <div onClick={()=>(type === 'notInApp') && router?.push(`/@${data?.week1?.all?.[0]?.username}`)} className="w-full border-b-2 border-gray-300 relative flex justify-between py-4 px-4 items-center">
              <div className="flex items-center"  >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Img data={data?.week1?.all?.[0]?.profilepic} fallback={fallbackUsers?.src}/>
                </div>
            <p className="text-black max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${data?.week1?.all?.[0]?.firstName} ${data?.week1?.all?.[0]?.lastName}`}</p>
            </div>
            <div className="text-green-600 bg-gray-100 p-2 font-semibold">
              Winner
            </div>
        </div>}
        </div>
      </div>
  )}

export default Round2WinnerM;

