import { storyblokEditable } from "@storyblok/react";
import Image from 'next/image'; 

const VisualContent = ({ blok }) => {
  const { type, alt, content: {filename}, imageSrc } = blok;
  return (
    <div style={{height: "400px", width: "auto"}} className="relative mt-2" {...storyblokEditable(blok)}>
      <Image layout="fill" objectFit="contain" src={filename} alt={alt}/>
      {/* <img src={imageSrc} alt={alt} object-fit="contain"/> */}
    </div>
  );
};
 
export default VisualContent;