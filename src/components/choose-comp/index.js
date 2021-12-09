import { useEffect } from "react";
import { getItem } from "../../utils/cookie";
import Explore from "../explore";
import Home from "../home";

export default function ChooseComp() {
 
   let device = 'mobile'
   const type = getItem('device-type');
   if(type){
     device = type;
   }
   
  const selectedComp = {
    'desktop' : <Home/>,
    'mobile' : <Explore/>
  }
  
  console.log(device, selectedComp[device]);
  return (
    <>
    {selectedComp?.[device] && selectedComp[device]}
    </>
  );
}