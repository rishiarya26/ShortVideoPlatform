/*eslint-disable @next/next/no-img-element*/
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { withBasePath } from '../../config';
import { getLeaderboardData } from '../../sources/leaderboard';
import Img from '../commons/image';
import Tabs from '../commons/tabs/leadership';
import fallbackUsers from '../../../public/images/users.png';

function Round2WinnerD({round}) {
  const [data, setData] = useState(null);
  // const [selectedRound, setSelectedRound] = useState(0);
  const [first, setFirst] = useState(null);
  const [dates, setDates] = useState()

  const router = useRouter();
  const { type = 0 } = router?.query;

  const getData = async()=>{
   try{
    const response = await getLeaderboardData({round : round});
    if(response?.data?.data){
      const itemArray = response?.data?.data?.week2?.all?.splice(0,1);
      const [first] = itemArray;
      setFirst(first);
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

  // useEffect(()=>{
  //   setData(null);
  //   getData(selectedRound);
  // },[selectedRound])
  
 const links={
  facebook : 'https://www.facebook.com/HiPiOfficialApp',
  twitter : 'https://twitter.com/HiPiOfficialApp',
  instagram : 'https://www.instagram.com/hipiofficialapp/?hl=en'
}

const stores = {
  android: 'https://play.google.com/store/apps/details?id=com.zee5.hipi',
  ios: 'https://apps.apple.com/in/app/hipi-indian-short-video-app/id1561950008'
};

// const items = {
//  display : ['Round 1','Round 2', 'Round 3'],
//  defaultValue : selectedRound
// }

// const onTabChange = (round)=>{
//   setSelectedRound(round)
// }
 
// const onStoreRedirect =(device)=>{
//   device && (window.location.href = `${stores[device]}`);
// }

  return (
//     <div className='w-full h-screen'>
//    <div className=" headerbar w-full h-18 bg-red-600 flex items-center justify-start lg:px-10 px-4 py-2">
//       <img className="w-16" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
//    </div>
//    <div className="w-full flex flex-col justify-center h-5/6">
//       <h2 className='w-full text-center my-2 font-bold text-xl my-10'> Round 2 Winner</h2>
//       <div className='flex w-full justify-center'>
//          <div className='w-25v' >
//             <img src={withBasePath('images/goat/lb/desk/lb_desc_latest.jpg')} />
//          </div>
//          <div className='w-25v font-medium pl-10 py-20 pr-20 '>
//             <p>We thank you all for your overwhelming response to #HipiGOAT contest. We are happy to announce winner of Round 2 (Week 1 :13th Dec- 18th Dec).</p>
//             <p className='my-2  '>Congratulations to <a className="font-bold" >Himangi V</a>
//             </p>
//             <p>Upload your singing videos now and participate.
//                It’s still not late, you still have the chance to become the Greatest Of All Time!
//             </p>
//          </div>
//       </div>
//    </div>
// </div>
<div className='bg-gray-100 h-screen'>
<div className=" headerbar w-full h-18 bg-red-600 flex items-center justify-start lg:px-10 px-4 py-2">
<img className="w-16" src={withBasePath('images/logo_hipi.png')} alt="hipi logo" /> 
</div>
<div className="flex justify-center">
<div className='w-full flex flex-col max-w-60v'>
<div className="w-full  relative flex justify-center py-4">
    <p className="font-extrabold text-lg ">Round 2 Winners</p>

</div>
<div className="w-full  relative flex justify-center py-2">
    <p className="font-bold items-left">{`Week 2 (${dates?.week2})`}</p>
</div>
<div className="w-full flex justify-center mt-6">
{/* winner */}
<div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
      <div className="flex items-center"  >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Img data={first?.profilepic} fallback={fallbackUsers?.src}/>
        </div>
    <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${first?.firstName} ${first?.lastName}`}</p>
    </div>
    <div className="text-green-600 bg-gray-100  p-2 font-semibold">
      Winner
    </div>
</div>
</div>

<div className="Wlist w-full flex mt-6 flex-wrap justify-between items-between">
{/* normal count */}
{/* {data && data?.week2?.all?.map((item,id)=>(
 <div key={id} className=" w-25v mx-4 my-4  rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
 <div className="flex items-center"  >
   <div className="w-12 h-12 rounded-full overflow-hidden">
     <Img data={item?.profilepic} fallback={fallbackUsers?.src}/>
   </div>
<p className="text-gray-500 max-w-60v text-sm font-semibold pl-4 overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
</div>
<div className="text-green-600 p-2 font-semibold">
 {item?.position}
</div>
</div>
))} */}
{/* <div className="w-full  relative flex justify-center py-2 mt-2">
    <p className="font-bold">{`Judge's Pick`}</p>
</div>
{data && data?.week2?.judges?.map((item,id)=>(
  <div key={id} className="w-full flex justify-center mt-6">
  <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
      <div className="flex items-center"  >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Img data={item?.profilepic} fallback={fallbackUsers?.src}/>
        </div>
    <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
    </div>
    <div className="text-green-600  p-2 font-semibold">
      {/* Winner */}
    {/* </div>
</div>
</div>
))} */}
<div className="w-full  relative flex justify-center py-2 mt-6">
    <p className="font-bold">{`Week 1 (${dates?.week1})`}</p>
</div>
{data && data?.week1?.all?.map((item,id)=>(
  <div key={id} className="w-full flex justify-center mt-6">
  <div className="w-full rounded-lg bg-white relative flex justify-between max-w-sm py-4 px-4 items-center">
      <div className="flex items-center"  >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Img data={item?.profilepic} fallback={fallbackUsers?.src}/>
        </div>
    <p className="text-gray-500 max-w-60v text-sm pl-4 font-semibold overflow-hidden">{`${item?.firstName} ${item?.lastName}`}</p>
    </div>
    <div className="text-green-600 bg-gray-100  p-2 font-semibold">
      Winner
    </div>
</div>
</div>
))}
</div>
</div>
</div>
</div>
  );
}

export default Round2WinnerD;

