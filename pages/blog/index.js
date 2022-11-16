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
            "Latest Hipi - Blogs Get Detailed Updates Here On Hipi Blogs",
          description:
            "Find the latest blog articles written especially for the Hipi community to deep dive into the topic discussed and get Informational insights on Hipi community",
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
    starts_with: "blog/",
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
