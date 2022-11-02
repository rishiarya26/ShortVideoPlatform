import { useStoryblokState } from "@storyblok/react";
import {
  getStoryblokData,
  getStoryblokPage,
} from "../../src/sources/storyblok";
import Post from "../../src/storyblokComponents/theEdit/Post";

export default function CreatorPost({ story: propStory }) {
  const story = useStoryblokState(propStory);

  return <Post story={story} />;
}

export async function getStaticProps({ params }) {
  let slug = params.id;

  let sbParams = {
    version: "published", // or 'draft'
  };

  let resp;
  try {
    resp = await getStoryblokData({
      params: sbParams,
      parentSlug: "theedit",
      slug,
    });
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      story: resp ? {...resp.data, primary: true} : false,
    },
    revalidate: 10, // revalidate every hour
  };
}

export async function getStaticPaths() {
  let paths = [];
  try {
    const resp = await getStoryblokPage({
      params: { version: "published" },
      blogType: "theedit",
    });
    paths = resp.data;
  } catch (e) {
    console.error(e);
  }

  return {
    paths: paths,
    fallback: false,
  };
}
