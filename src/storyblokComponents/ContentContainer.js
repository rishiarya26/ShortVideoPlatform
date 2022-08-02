import { storyblokEditable } from "@storyblok/react";
import Description from "./Description";
import VisualContent from './visualContent';
import Heading from "./Heading";
 
const ContentContainer = ({ blok }) => {
    return (
  <div {...storyblokEditable(blok)}>
    {
        blok.content.map((blocks) => {
            if(blocks.component === "description") {
                return (
                    <Description blok={blocks}/>
                )
            } else if(blocks.component === "heading") {
                return <Heading blok={blocks}/>
            } else {
                return (
                    <VisualContent blok={blocks}/>
                )
            }
        })
    }
  </div>
)};
 
export default ContentContainer;