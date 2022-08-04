import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
 
const ContentContainer = ({ blok }) => {
    return (
  <div {...storyblokEditable(blok)}>
     {blok.content.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </div>
)};
 
export default ContentContainer;