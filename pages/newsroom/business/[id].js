import { useStoryblokState } from "@storyblok/react"
import { getStoryblokData, getStoryblokPage } from "../../../src/sources/storyblok";
import Post from "../../../src/storyblokComponents/newsroom/Post";
 
export default function BusinessPost(props) {
  const story = useStoryblokState(props.story);
  return <Post story={story}/>
}

export async function getStaticProps({ params }) {
  let slug = params.id
  
  let sbParams = {
    version: "draft", // or 'published'
  };
  
  let resp;
  try{
    resp = await getStoryblokData({params: sbParams, parentSlug: "newsroom/business", slug});
  } catch(e) {
    console.error(e);
  }

  return {
  props: {
    story: resp ? resp.data : false,
  },
  revalidate: 10, // revalidate every hour
  };
  }
   
  export async function getStaticPaths() {
    let paths = [];
    try{
      const resp = await getStoryblokPage({params: {"version": "draft"}, category: "business", blogType: "newsroom"})
      paths = resp.data;
    }catch(e) {
      console.error(e);
    }
   
    return {
      paths: paths,
      fallback: false,
    };
  }