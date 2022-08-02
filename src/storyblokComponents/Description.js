import { storyblokEditable } from "@storyblok/react";
import { generateUUID } from "../utils/app";
 
function extractLink(dataObj){
  const {attrs: {href}} = dataObj.marks[0];
  return href;
}
function checkLinkOrText(dataObj){
  if(Object.keys(dataObj).includes("marks")) return true;
  return false;
}
const Description = ({ blok }) => {
  const { text:{content} } = blok;
  
  return (<div className="mt-3"  {...storyblokEditable(blok)}>
    {content[0].content.map((data)=>{
      const uuid = generateUUID(false);
      if(!checkLinkOrText(data)){
        return <span key={uuid}>{data.text}</span>;
      }
      return <a key={uuid} href={extractLink(data)} className=" text-cyan-400">{data.text}</a>
    })}
  </div>);
};
 
export default Description;