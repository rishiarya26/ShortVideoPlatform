import CardSummary from "../../src/storyblokComponents/CardSummary";
import { getStoryblokData } from "../../src/sources/storyblok";
import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';

export default function All({stories}) {
  return (
  <>
    <SeoMeta
        data={{
          title: 'Hipi News and Top Stories | Hipi Newsroom',
          description: `From the latest news to the trends taking over Hipi, explore all that's happening in the Hipi community.Find out.`,
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