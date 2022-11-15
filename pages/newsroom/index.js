import CardSummary from "../../src/storyblokComponents/newsroom/CardSummary";
import { getStoryblokData } from "../../src/sources/storyblok";
import { SeoMeta } from "../../src/components/commons/head-meta/seo-meta";
import { getCanonicalUrl } from "../../src/utils/web";
import { useEffect, useState } from "react";

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
          title: "Hipi Newsroom -Top Stories And Updates From Hipi | Hipi News",
          description: `Find the latest and trending social news on Hipi Newsroom, from an Hipi influencer updates to trending music videos know everything in that happens in Hipi`,
          canonical: url && getCanonicalUrl(url),
        }}
      />
      <CardSummary stories={stories} heading="Newsroom" />
    </>
  );
}

export async function getStaticProps() {
  // load the draft version
  let sbParams = {
    version: "published", // or 'draft'
    starts_with: "newsroom/",
    sort_by: "position:desc",
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
    revalidate: 10, // revalidate every 10s
  };
}
