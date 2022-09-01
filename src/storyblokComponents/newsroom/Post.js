import { StoryblokComponent } from "@storyblok/react";
import { newsroomArticleSchemma } from "../../utils/schema";
import { useState, useEffect } from "react";
import MainPage from "./MainPage";

function richTextRenderer(description){
  const { content = [] } = description;
  let result = "";
  if(content.length > 0) {
    content.forEach((item) => {
      const childContent = item?.content || [];
      if(childContent.length > 1) {
        childContent.forEach((childItem) => {
          result += childItem.text;
        })
      } else if(childContent.length > 0){
        result += childContent[0].text;
      }
    })
    return result;
  }
}

function getSchemaObject({story, url}) {
  const body = story?.content?.body || [];
  const header = body?.[0];
  const contentContainer = body?.[1];
  const headline = header?.heading;
  const description = richTextRenderer(contentContainer?.content?.[0]?.text);
  return {
    datePublished: new Date(story?.first_published_at).toISOString().split('T')[0],
    url,
    headline,
    description,
  }
}

export default function Post({ story }) {
  const [schemaObj, setSchemaObj] = useState({});
  
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
        </>
      ) : (
        <div>Data not available</div>
      )}
    </MainPage>
  );
}
