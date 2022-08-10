import {  useStoryblokState } from "@storyblok/react"
import { getStoryblokData, getStoryblokPage } from "../../../src/sources/storyblok"; 
import Post from "../../../src/storyblokComponents/Post";
 
export default function NewsPost(props) {
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
      resp = await getStoryblokData({params: sbParams, parentSlug: "news", slug});
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
      const resp = await getStoryblokPage({params: {"version": "draft"}, category: "news"})
      paths = resp.data;
    }catch(e) {
      console.error(e);
    }
   
    return {
      paths: paths,
      fallback: false,
    };
  }