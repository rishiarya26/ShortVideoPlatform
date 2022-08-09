import { storyblokEditable } from "@storyblok/react";
import Image from 'next/image'; 

const VisualContent = ({ blok={} }) => {
  const { type="image", alt="image", imageSrc=null } = blok;
  return (
    <div style={{height: "400px", width: "auto"}} className="relative mt-2" {...storyblokEditable(blok)}>
      {imageSrc && <Image layout="fill" objectFit="contain" src={imageSrc} alt={alt}/>}
    </div>
  );
};
 
export default VisualContent;