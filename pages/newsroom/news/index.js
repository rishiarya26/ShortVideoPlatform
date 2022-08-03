import { getStoryblokApi } from "@storyblok/react";
import CardSummary from "../../../src/storyblokComponents/CardSummary";

export default function News({story: stories}) {
  return <CardSummary stories={stories} heading="News"/>
}
export async function getStaticProps() {
  // load the draft version
  let sbParams = {
    version: "draft", // or 'published'
    starts_with: "news"
  };
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/`, sbParams);
 
  return {
    props: {
      story: data ? data.stories : false,
    },
    revalidate: 3600, // revalidate every hour
  };
}