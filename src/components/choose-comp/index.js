import { useEffect } from "react";
import { getItem } from "../../utils/cookie";

export default function ChooseComp({mobile, desktop}) {
 
   const device = getItem('device-type')
  console.log(device);

  const selectedComp = {
    'desktop' : desktop,
    'mobile' : mobile
  }
  return (
    <>
    {selectedComp?.[device] && selectedComp[device]}
    </>
  );
}