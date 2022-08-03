import { getStoryblokApi } from "@storyblok/react";
import CardSummary from "../../src/storyblokComponents/CardSummary";
 
export default function All({stories}) {
  return <CardSummary stories={stories} heading="Newsletter"/>
}

export async function getStaticProps() {
    // load the draft version
    let sbParams = {
        version: "draft", // or 'published'
    };
    
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/`,sbParams);
 
  return {
    props: {
      stories: data ? data.stories : false,
    },
    revalidate: 3600, // revalidate every hour
  };
}