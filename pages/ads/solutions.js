import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import AdProducts from "../../src/components/business/ad-products";
// import { getCanonicalUrl } from "../src/utils/web";

export default function Hipi() {
  
  return (
  <>
  <SeoMeta
        data={{
          title: 'Hipi Advertisement | Brand Advertisement on Hipi',
          description: 'Boost your brand presence by being where users are on Hipi.',
          // canonical: getCanonicalUrl && getCanonicalUrl(),
        }}
      />
    {/* <ChooseComp mobile={<Round3Mob/>} desktop={<Round3Desk/>}/> */}
    <AdProducts/>
  </>
  )
}
