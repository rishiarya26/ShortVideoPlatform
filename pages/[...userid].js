import { useRouter } from "next/router";
import { useEffect } from "react";
import VideoDetail from "../src/components/desk-video-detail/index.js";

export default function Username() {
  const router = useRouter();
  useEffect(()=>{
    if(router){
      // const queryStrings = router?.query;
      // updateUtmData(queryStrings);
      console.log('router',router)
      const {userid} = router?.query;
      const videoId = userid?.[2];
      videoId && router?.push(`/feed/for-you?videoId=${videoId}`);
    }

},[])
  return (
   <></>
  );
}
