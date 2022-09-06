import CardSummary from "../../../src/storyblokComponents/newsroom/CardSummary";
import { getStoryblokData } from "../../../src/sources/storyblok";
import { getCanonicalUrl } from "../../../src/utils/web";
import { useEffect, useState } from "react";
import { SeoMeta } from "../../../src/components/commons/head-meta/seo-meta";

export default function Business({ stories }) {
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
          title: "Business - Newsroom | Hipi",
          description: `Get the official business post and catch up on everything Hipi has to offer.`,
          canonical: url && getCanonicalUrl(url),
        }}
      />
      <CardSummary stories={stories} heading="Business" />
    </>
  );
}

export async function getStaticProps() {
  // load the draft version
  let sbParams = {
    version: "published", // or 'draft'
    starts_with: "newsroom/business",
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
