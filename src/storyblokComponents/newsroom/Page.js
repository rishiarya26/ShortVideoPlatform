import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Page = ({ blok, date, blogType = "newsroom" }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent
        blok={nestedBlok}
        key={nestedBlok._uid}
        date={date}
        blogType={blogType}
      />
    ))}
  </main>
);

export default Page;
