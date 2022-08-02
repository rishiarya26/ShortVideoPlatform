import { getStoryblokApi, StoryblokComponent, useStoryblokState } from "@storyblok/react"
import Header from "../../../src/components/desk-header";
import Sidebar from "../../../src/storyblokComponents/SideBar";
 
export default function CreatorPost(props) {
  const story = useStoryblokState(props.story);
  return (
    <div className="flex flex-col">
        <Header />
      <div className="flex mt-24">
        <div className="w-1/5"><Sidebar /></div>
        <div className=" w-3/5"><StoryblokComponent blok={story.content} /></div>
        <div className=" w-1/5"></div>
      </div>
    </div>
  )
}
 
export async function getStaticProps({ params }) {
    let slug = params.id
   
    let sbParams = {
      version: "draft", // or 'published'
    };
   
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/creator/${slug}`, sbParams);
   
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
            if(splittedSlug[0] === "creator"){
                paths.push({ params: { id: splittedSlug[1] } });
            }
        });
   
    return {
      paths: paths,
      fallback: false,
    };
  }