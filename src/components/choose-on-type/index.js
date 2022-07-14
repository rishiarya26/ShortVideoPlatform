import { useEffect } from "react";
import { useState } from "react";
import { getItem } from "../../utils/cookie"

export default function ChooseOnType({android, ios}) {
  const [device, setDevice] = useState('');
 
    useEffect(()=>{
     const type = getItem('device-info');
     console.log(type)
     if(type){
       setDevice(type);
     }
    },[])
   
   const selectedComp = {
     'android' : android,
     'ios' : ios
   }
   
   // console.log(device, selectedComp[device]);
   return (
     <>
     {device && selectedComp?.[device] && selectedComp[device]}
     </>
   );
 }
