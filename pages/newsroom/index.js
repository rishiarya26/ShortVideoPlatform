import CardSummary from "../../src/storyblokComponents/CardSummary";
import { getStoryblokData } from "../../src/sources/storyblok";
import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';
import { getCanonicalUrl } from "../../src/utils/web"; 
import { useEffect, useState } from "react";

export default function All({stories}) {
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
          title: 'Hipi News and Top Stories | Hipi Newsroom',
          description: `From the latest news to the trends taking over Hipi, explore all that's happening in the Hipi community.Find out.`,
          canonical: url && getCanonicalUrl(url),
        }}
      />
    <CardSummary stories={stories} heading="Newsroom"/>
  </>)
}

export async function getStaticProps() {
    // load the draft version
    let sbParams = {
        version: "draft", // or 'published'
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