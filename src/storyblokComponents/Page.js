import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
 
const Page = ({ blok, date }) =>(
  <main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} date={date} />
    ))}
  </main>
);
 
export default Page;