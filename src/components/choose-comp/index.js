import { useEffect, useState } from "react";
import { commonEvents } from "../../analytics/mixpanel/events";
import { getItem } from "../../utils/cookie";
// import Explore from "../explore";
// import Home from "../home";

export default function ChooseComp({desktop, mobile}) {
 const [device, setDevice] = useState('mobile');

   useEffect(()=>{
    const type = getItem('device-type');
    console.log(type)
    if(type){
      setDevice(type);
    }
   },[])
  
   
  const selectedComp = {
    'desktop' : desktop,
    'mobile' : mobile
  }
  
  console.log(device, selectedComp[device]);
  return (
    <>
    {selectedComp?.[device] && selectedComp[device]}
    </>
  );
}