import { StoryblokComponent } from "@storyblok/react";
import MainPage from "../newsroom/MainPage";
import styles from "./post.module.css";
import { useRef, useEffect, useState } from "react";
import { getStoryblokData } from "../../sources/storyblok";

export default function Post({ story }) {
  const [postArray, setPostArray] = useState([story]);
  const currPostName = story.name;
  const page = useRef(1);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);

  const getNewPost = async () => {
    let postToShow = [];
    // setLoading(true);
    try {
      const resp = await getStoryblokData({
        params: {
          version: "draft",
          page: page.current,
          per_page: 1,
          starts_with: "theedit",
          filter_query: {
            name: {
              not_in: story?.name,
            },
          },
        },
      });
      const stories = resp.data;
      postToShow = stories.filter((story) => story?.slug != currPostName);
      page.current = page.current + 1;
      if (!total) {
        setTotal(resp?.total);
      }
      // setLoading(false);
      return postToShow;
    } catch (e) {
      console.log("debug error", e);
      // setLoading(false);
      return postToShow;
    }
  };

  const appendPost = async () => {
    let postToShow = await getNewPost();
    if (postToShow?.length > 0) {
      setPostArray((prev) => [...prev, ...postToShow]);
    }
  };

  function infiniteLoading(entries) {
    const lastChildEntry = entries[0];
    if (lastChildEntry.isIntersecting) {
      appendPost();
      observer.current.unobserve(lastChildEntry.target);
    }
  }

  useEffect(() => {
    observer.current = new IntersectionObserver(infiniteLoading, {
      threshold: 0.25,
    });
  }, []);

  useEffect(() => {
    const lastChildTarget = document
      ?.querySelector(`.${postArray[postArray.length - 1].slug}`)
      ?.querySelector(".swiper-container");
    if (lastChildTarget && observer.current) {
      observer.current.observe(lastChildTarget);
    }
    return () => {
      if (lastChildTarget) {
        observer.current.unobserve(lastChildTarget);
      }
    };
  }, [postArray]);

  return (
    <MainPage blogType="theedit">
      <div className={styles.parentContainer}>
        {postArray && postArray.length > 0 ? (
          postArray.map((item) => {
            return (
              <div key={item.uuid} className={item.slug}>
                <div>
                  <StoryblokComponent
                    blok={item.content}
                    date={item?.created_at}
                    blogType="theedit"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div>Data not available</div>
        )}
        {loading && <div>Loading....</div>}
      </div>
    </MainPage>
  );
}
