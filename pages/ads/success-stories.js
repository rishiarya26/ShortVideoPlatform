import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import Advertisement from "../../src/components/business/advertise";
import SuccessStories from "../../src/components/business/success";
// import { getCanonicalUrl } from "../src/utils/web";

export default function Hipi() {
  
  return (
  <>
  <SeoMeta
        data={{
          title: 'Hipi Advertisement',
          description: '',
          // canonical: getCanonicalUrl && getCanonicalUrl(),
        }}
      />
    {/* <ChooseComp mobile={<Round3Mob/>} desktop={<Round3Desk/>}/> */}
<SuccessStories/>
  </>
  )
}
