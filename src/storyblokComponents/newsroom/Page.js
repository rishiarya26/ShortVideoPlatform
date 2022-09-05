import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Page = ({ blok, date, blogType = "newsroom", primary=false }) => (
<main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent
        blok={nestedBlok}
        key={nestedBlok._uid}
        date={date}
        blogType={blogType}
        primary={primary}
      />
    ))}
  </main>
);

export default Page;
