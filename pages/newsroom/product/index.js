import CardSummary from "../../../src/storyblokComponents/CardSummary";
import { getStoryblokData } from "../../../src/sources/storyblok";
import { getCanonicalUrl } from "../../../src/utils/web";
import { useEffect, useState } from "react";
import { SeoMeta } from "../../../src/components/commons/head-meta/seo-meta";

export default function Product({stories}) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if(document && document?.location) {
      setUrl(document.location.href);
    }
  },[])
  return (
    <>
      <SeoMeta
        data={{
          title: 'Product - Newsroom | Hipi',
          description: `From official product news to the newest app updates, catch up on everything Hipi has to offer.`,
          canonical: url && getCanonicalUrl(url),
        }}
      />
      <CardSummary stories={stories} heading="Product"/>
    </>
  );
}
 
export async function getStaticProps() {
  // load the draft version
  let sbParams = {
    version: "draft", // or 'published'
    starts_with: "product"
  };
 
  let resp;
    try{
      resp = await getStoryblokData({params: sbParams});
    } catch(e) {
      console.error(e);
    }
 
  return {
    props: {
      stories: resp ? resp.data : false,
    },
    revalidate: 10, // revalidate every hour
  };
}