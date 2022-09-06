import { useStoryblokState } from "@storyblok/react"
import { getStoryblokData, getStoryblokPage } from "../../../src/sources/storyblok";
import Post from "../../../src/storyblokComponents/newsroom/Post";
 
export default function ProductPost(props) {
  const story = useStoryblokState(props.story);
  return <Post story={story}/>
}
 
export async function getStaticProps({ params }) {
    let slug = params.id
   
    let sbParams = {
      version: "published", // or 'draft'
    };
   
    let resp;
    try{
      resp = await getStoryblokData({params: sbParams, parentSlug: "newsroom/product", slug});
    } catch(e) {
      console.error(e);
    }

    return {
    props: {
      story: resp ? resp.data : false,
    },
    revalidate: 10, // revalidate every 10s
    };
  }
   
  export async function getStaticPaths() {
    let paths = [];
    try{
      const resp = await getStoryblokPage({params: {"version": "draft"}, category: "product", blogType: "newsroom"})
      paths = resp.data;
    }catch(e) {
      console.error(e);
    }
   
    return {
      paths: paths,
      fallback: false,
    };
  }