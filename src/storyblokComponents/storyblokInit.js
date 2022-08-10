import { storyblokInit, apiPlugin } from '@storyblok/react';
import { STORYBLOK_TOKEN } from '../constants';
import Header from "./Header";
import VisualContent from "./visualContent";
import Page from "./Page";
import Description from "./Description";
import ContentContainer from "./ContentContainer";
import Heading from './Heading';

const components = {
    header: Header,
    visualContent: VisualContent,
    description: Description,
    contentContainer: ContentContainer,
    page: Page,
    heading: Heading,
  };
export const init =  () => storyblokInit({
    accessToken: STORYBLOK_TOKEN,
    use: [apiPlugin],
    components
  });