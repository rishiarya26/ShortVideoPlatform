import CardSummary from "../../../src/storyblokComponents/CardSummary";
import { getStoryblokData } from "../../../src/sources/storyblok";
import { getCanonicalUrl } from "../../../src/utils/web";
import { useEffect, useState } from "react";
import { SeoMeta } from "../../../src/components/commons/head-meta/seo-meta"; 

export default function News({stories}) {
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
          title: 'news - Newsroom | Hipi',
          description: `From breaking news to the latest trends taking over Hipi, explore everything that's happening in the Hipi community.`,
          canonical: url && getCanonicalUrl(url),
        }}
      />
      <CardSummary stories={stories} heading="News"/>
    </>
  );
}
export async function getStaticProps() {
  // load the draft version
  let sbParams = {
    version: "draft", // or 'published'
    starts_with: "news"
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