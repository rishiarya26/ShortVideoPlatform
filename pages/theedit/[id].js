import { useStoryblokState, getStoryblokApi } from "@storyblok/react";
import {
  getStoryblokData,
  getStoryblokPage,
} from "../../src/sources/storyblok";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Post from "../../src/storyblokComponents/theEdit/Post";

export default function CreatorPost({ story: propStory }) {
  const router = useRouter();
  const story = useStoryblokState(propStory);
  const [postArray, setPostArray] = useState([story]);
  const currPostName = router?.query?.id;
  const [page, setPage] = useState(1);

  const getNewPost = async () => {
    let postToShow = [];
    try {
      const resp = await getStoryblokData({
        params: { version: "draft", page, per_page: 3, starts_with: "theedit" },
      });
      const stories = resp.data;
      postToShow = stories.filter((story) => story?.slug != currPostName);
      setPage((prev) => prev + 1);
      return postToShow;
    } catch (e) {
      return postToShow;
    }
  };

  const appendPost = async () => {
    const postToAppend = await getNewPost();
    if (!postToAppend || postToAppend.length < 1) return;
    setPostArray([...postArray, ...postToAppend]);
    console.log("observer postToAppend", postToAppend);
    console.log(
      "observer new name",
      postToAppend[postToAppend.length - 1].name
    );
  };

  const callObserver = () => {
    const postToObserve = postArray[postArray.length - 1];
    const post = document.getElementById(postToObserve.name);
    const observer = new IntersectionObserver(async (stories) => {
      const post = stories[0];
      if (post.intersectionRatio > 0) {
        observer.unobserve(post.target);
        appendPost();
      }
    });
    if (post) {
      observer.observe(post);
    }
  };

  useEffect(() => {
    if (document) {
      callObserver();
    }
  }, [postArray]);

  return <Post story={postArray} />;
}

export async function getStaticProps({ params }) {
  let slug = params.id;

  let sbParams = {
    version: "draft", // or 'published'
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
      story: resp ? resp.data : false,
    },
    revalidate: 10, // revalidate every hour
  };
}

export async function getStaticPaths() {
  let paths = [];
  try {
    const resp = await getStoryblokPage({
      params: { version: "draft" },
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
