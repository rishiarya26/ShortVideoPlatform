import { StoryblokComponent } from "@storyblok/react"
import MainPage from "./MainPage";
 
export default function Post({story}) {
  return (<MainPage cards={false}><StoryblokComponent blok={story.content} /></MainPage>)
}