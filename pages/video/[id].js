// import ChooseComp from "../src/components/choose-comp";
// import Explore from "../src/components/explore";
// import Home from "../src/components/home";

import { useRouter } from "next/router"
import { useEffect } from "react"
import { localStorage } from "../../src/utils/storage";
import { updateUtmData } from "../../src/utils/web";

export default function Hipi() {
  const router = useRouter();

  useEffect(()=>{
      if(router){
        const queryStrings = router?.query;
        updateUtmData(queryStrings);
        // console.log(queryStrings)
        const {id} = router?.query;
        id && router?.push(`/feed/for-you?videoId=${id}`);
      }

  },[])
    return (
  <>
  </>
  )
}
