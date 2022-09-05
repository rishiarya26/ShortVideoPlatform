import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
 
const ContentContainer = ({ blok, primary = false }) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.content.map((nestedBlok) => (
        <StoryblokComponent
          primary={primary}
          blok={nestedBlok}
          key={nestedBlok._uid}
        />
      ))}
    </div>
  );
};

 
export default ContentContainer;