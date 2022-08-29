import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import { useEffect } from "react";
import { commonEvents } from "../../src/analytics/mixpanel/events";
import { track } from "../../src/analytics";
import Business from "../../src/components/business";
// import { getCanonicalUrl } from "../src/utils/web";

export default function Hipi() {
  
  return (
  <>
  <SeoMeta
        data={{
          title: 'Brand Advertising on Hipi | Brand Marketing/Promotion on Hipi',
          description: 'Advertise or promote your brand on Hipi to create awareness & enagement with inspiring products & ideas. Hipi offfers right solution for all your marketing needs.',
          // canonical: getCanonicalUrl && getCanonicalUrl(),
        }}
      />
    {/* <ChooseComp mobile={<Round3Mob/>} desktop={<Round3Desk/>}/> */}
    {/* <Advertisement/> */}
    <Business/>
  </>
  )
}
