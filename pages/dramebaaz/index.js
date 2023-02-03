/*eslint-disable @next/next/no-img-element*/
/*eslint-disable react/jsx-no-duplicate-props */
/*eslint-disable react/display-name */
import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import {faqStunner} from "../../src/utils/schema";
import { withBasePath } from '../../src/config'
import { toTrackMixpanel } from "../../src/analytics/mixpanel/events";
import { toTrackFirebase } from "../../src/analytics/firebase/events";
import { ToTrackFbEvents } from "../../src/analytics/fb-pixel/events";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import LipSync from "../../src/components/lipsync";
import { getCanonicalUrl } from "../../src/utils/web";

export default function Hipi() {
  useEffect(()=>{
    window.onunload = function () {
      window?.scrollTo(0, 0);
    }
  },[])

  const StaticFooter = dynamic(() => import('../../src/components/static-footer'),{
    loading: () => <div />,
    ssr: false
  });

  return (
  <>
   <SeoMeta
        data={{
          title: 'Hipi Lipsync Battle Contest | #HipiLipsyncBattle challenge',
          // image: item?.thumbnail,
          description: 'Hipi Lipsync battle is a challenge where each participant gets a chance to showcase their lipsync and acting skills to a nationwide audience. Read on to find out about the #HipiLipsyncBattle challenge.',
          canonical: getCanonicalUrl && getCanonicalUrl(),}}
          />
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStunner)}}
        />
<div className="w-screen h-screen relative">
     
    <LipSync/>

      <StaticFooter/>
     

    </div>

    
  </>
  )
}
