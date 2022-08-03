import { StoryblokComponent } from "@storyblok/react";
// import { useEffect } from "react";
// import { localStorage } from "../utils/storage";
import MainPage from "./MainPage";
 
export default function Post({story}) {
  // useEffect(() => {
  //   localStorage.set("storyblok_date", story?.created_at);
  // },[]);
  return (
    <MainPage cards={false}>
      <StoryblokComponent blok={story.content}/>
    </MainPage>
  );
}