import CardSummary from "../../src/storyblokComponents/theEdit/CardSummary";
import { getStoryblokData } from "../../src/sources/storyblok";
import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import { getCanonicalUrl } from "../../src/utils/web";
import { useState, useEffect } from "react";

export default function All({ stories }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (document && document?.location) {
      setUrl(document.location.href);
    }
  }, []);
  return (
    <>
      <SeoMeta
        data={{
          title:
            "Latest Bollywood News | Celebrity Fashion & Style Trends | Hipi",
          description:
            "Follow Bollywood Celebrities with their latest fashion trends & news and discover what your favourite celebrities are wearing, from red carpet events to airport-style at Hipi - India short video app",
          canonical: url && getCanonicalUrl(url),
        }}
      />
      <CardSummary stories={stories} heading="Hipi Edit" />
    </>
  );
}

export async function getStaticProps() {
  // load the draft version
  let sbParams = {
    version: "published", // or 'draft'
    starts_with: "theedit/",
  };
  let resp;
  try {
    resp = await getStoryblokData({ params: sbParams });
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      stories: resp ? resp.data : false,
    },
    revalidate: 10, // revalidate every hour
  };
}
