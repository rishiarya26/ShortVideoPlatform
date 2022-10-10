import { StoryblokComponent } from "@storyblok/react";
import { newsroomArticleSchemma } from "../../utils/schema";
import { useState, useEffect } from "react";
import MainPage from "./MainPage";
import { richTextRenderer } from "../../utils/storyblokUtils";
import { useRouter } from "next/router";
import styles from "./description.module.css"

function getSchemaObject({story, url}) {
  const body = story?.content?.body || [];
  const header = body?.[0];
  const contentContainer = body?.[1];
  const headline = header?.heading;
  const description = richTextRenderer(contentContainer);
  return {
    datePublished: new Date(story?.first_published_at).toISOString().split('T')[0],
    url,
    headline,
    description,
  }
}

export default function Post({ story }) {
  const [schemaObj, setSchemaObj] = useState({});
  const router = useRouter();
  
  useEffect(() => {
    if (document && document?.location) {
      const resp = getSchemaObject({story, url: document.location.href});
      setSchemaObj({...resp});
    }
  }, []);

  return (
    <MainPage cards={false}>
      {story && story?.content ? (
        <>
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsroomArticleSchemma(schemaObj)) }}
          /> 
          <StoryblokComponent
            blok={story.content}
            date={story?.first_published_at}
          />
          {router.route === "/newsroom/business/[id]" && <div className={`cursor-pointer ${styles.link}`}><a onClick={()=>router.push("/ads")}>Get started with Hipi Ads today.</a></div>}
        </>
      ) : (
        <div>Data not available</div>
      )}
    </MainPage>
  );
}
