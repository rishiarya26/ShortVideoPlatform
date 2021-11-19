import { useEffect } from "react";
import { getItem } from "../../utils/cookie";
import GoatDesk from "../goat-desk";
import GoatMob from "../goat-mob";


export default function ChooseGoat() {
 
   const device = getItem('device-type')
  console.log(device);

  const selectedComp = {
    'desktop' : <GoatDesk />,
    'mobile' : <GoatMob />
  }
  return (
    <>
    {selectedComp?.[device] && selectedComp[device]}
    </>
  );
}