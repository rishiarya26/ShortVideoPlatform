import { storyblokInit, apiPlugin } from '@storyblok/react';
import { STORYBLOK_TOKEN } from '../constants';
import Header from "./newsroom/Header";
import VisualContent from "./newsroom/visualContent";
import Page from "./newsroom/Page";
import Description from "./newsroom/Description";
import ContentContainer from "./newsroom/ContentContainer";
import Heading from './newsroom/Heading';
import VideoCarousel from "./theEdit/VideoCarousel";

const components = {
  header: Header,
  visualContent: VisualContent,
  description: Description,
  contentContainer: ContentContainer,
  page: Page,
  heading: Heading,
  videoCarousel: VideoCarousel
};
  export const init =  () => storyblokInit({
    accessToken: "bKQtVS1rA2boGgJl29ZwMAtt",
    use: [apiPlugin],
    components
  });