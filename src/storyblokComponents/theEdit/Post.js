import { StoryblokComponent } from "@storyblok/react";
import MainPage from "../newsroom/MainPage";
import styles from "./post.module.css";
import { useRef, useEffect, useState } from "react";
import { getStoryblokData } from "../../sources/storyblok";
import { theEditArticleSchema, theEditOrganizationalSchema } from "../../utils/schema";
import { richTextRenderer } from "../../utils/storyblokUtils";

//todo: add loading spinner

function getSchemaObj({story, url}){
  const body = story?.content?.body;
  const header = body?.[0];
  const contentContainer = body?.[1];
  const author = header?.subheading?.split("By")[1].trim()
  const headline = header?.heading;
  const description = richTextRenderer(contentContainer);
  return{
    url,
    author,
    headline,
    datePublished: new Date(story?.first_published_at).toISOString().split('T')[0],
    description,
  }
}

export default function Post({ story }) {
  const [postArray, setPostArray] = useState([story]);
  const [schemaObj, setSchemaObj] = useState({});
  const currPostName = story.name;
  const page = useRef(1);
  const [total, setTotal] = useState(null);
  const observer = useRef(null);

  const getNewPost = async () => {
    let postToShow = [];
    try {
      const resp = await getStoryblokData({
        params: {
          version: "published",
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
      return postToShow;
    } catch (e) {
      console.log("debug error", e);
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
    if(document) {
      const resp = getSchemaObj({story,url: document.location.href});
      setSchemaObj({...resp});
    }
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
    <>
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(theEditArticleSchema(schemaObj)) }}
    />
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(theEditOrganizationalSchema) }}
    />
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
                      primary={item?.primary || false}
                    />
                  </div>
                </div>
            );
          })
        ) : (
          <div>Data not available</div>
        )}
      </div>
    </MainPage>
    </>
  );
}
