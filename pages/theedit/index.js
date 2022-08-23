import CardSummary from "../../src/storyblokComponents/theEdit/CardSummary";
import { getStoryblokData } from "../../src/sources/storyblok";

export default function All({stories}) {
  return (
  <>
    <CardSummary stories={stories} heading="Newsroom"/>
  </>)
}

export async function getStaticProps() {
    // load the draft version
    let sbParams = {
        version: "draft", // or 'published'
        starts_with: "theedit/"
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