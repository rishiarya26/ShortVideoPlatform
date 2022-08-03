import { getStoryblokApi, useStoryblokState } from "@storyblok/react"
import Post from "../../../src/storyblokComponents/Post";
 
export default function BusinessPost(props) {
  const story = useStoryblokState(props.story);
  return <Post story={story}/>
}
 
export async function getStaticProps({ params }) {
    let slug = params.id
   
    let sbParams = {
      version: "draft", // or 'published'
    };
   
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/business/${slug}`, sbParams);
   
    return {
      props: {
        story: data ? data.story : false,
        key: data ? data.story.id : false,
      },
      revalidate: 3600,
    };
  }
   
  export async function getStaticPaths() {
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get('cdn/links', {
        "version": "draft",
      });
      let paths = [];
      Object.keys(data.links).forEach((linkKey) => {
          if (data.links[linkKey].is_folder) {
              return;
            }
            const slug = data.links[linkKey].slug;
            let splittedSlug = slug.split("/");
            if(splittedSlug[0] === "business"){
                paths.push({ params: { id: splittedSlug[1] } });
            }
        });
   
    return {
      paths: paths,
      fallback: false,
    };
  }