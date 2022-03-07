import { useRouter } from "next/router";
import { useEffect } from "react";
import ChooseComp from "../src/components/choose-comp";
import Explore from "../src/components/explore";
import Home from "../src/components/home";
import { updateUtmData } from "../src/utils/web";

export default function Hipi() {
  const router = useRouter();
  useEffect(()=>{
    const queryStrings = router?.query;
    updateUtmData(queryStrings);
  },[])
  return (
  <>
    <ChooseComp mobile={<Explore/>} desktop={<Home/>}/>
  </>
  )
}
