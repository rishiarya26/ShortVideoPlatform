import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
 
const Page = ({ blok, date, slug }) =>(
  <main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} date={date} slug={slug} />
    ))}
  </main>
);
 
export default Page;