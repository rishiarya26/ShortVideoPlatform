import { useRouter } from "next/router";
import { useEffect } from "react";
import ChooseComp from "../src/components/choose-comp";
import DeskFeed from "../src/components/desk-feed";
import Explore from "../src/components/explore";
import Home from "../src/components/home";
import { getItem } from "../src/utils/cookie";
import { updateCampaignId, updateUtmData } from "../src/utils/web";

export default function Hipi() {
  const router = useRouter();
  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
    updateCampaignId(queryStrings);
  },[])

  const device = getItem('device-type');
  if(device === 'desktop'){
    router.push('/feed/for-you');
  }
  return (
  <>
   {device === 'mobile' && <Explore/>}
  </>
  )
}
