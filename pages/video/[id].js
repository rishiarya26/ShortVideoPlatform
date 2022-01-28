// import ChooseComp from "../src/components/choose-comp";
// import Explore from "../src/components/explore";
// import Home from "../src/components/home";

import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Hipi() {
  const router = useRouter();
  useEffect(()=>{
      if(router){
        const {id} = router?.query;
        id && router.push(`/feed/for-you?videoId=${id}`)
      }

  },[])
    return (
  <>
  </>
  )
}
