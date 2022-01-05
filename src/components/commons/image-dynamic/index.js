/*eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';

// TODO we need a proper default image url for blurDataURL
const DynamicImg = ({
  onClick,width, data, fallback="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1625388234/hipi/videos/c3d292e4-2932-4f7f-ad09-b974207b1bbe/c3d292e4-2932-4f7f-ad09-b974207b1bbe_00.webp", title = 'hipi'
}) => {
  let finalSrc = data;

  if(data){  
    finalSrc = width && data.replaceAll("w_297", width);
  }
    // const myLoader = ({ src, width,height }) => {
    //     return `${src}?w=${width}?h=${height}`
    //   }

  return (
    <>
      <img
        className={`
        position-relative overflow-hidden
        animate-appear bg-gray-500
        `}
        // loading={loading}
        src={finalSrc || fallback}
        alt={title}
        layout="fill"
        object-fit="cover"
        onClick={onClick}
        onKeyPress={() => true}
        // role="presentation"
        // loading="eager"
      // placeholder="blur"
      // blurDataURL={`data:image/jpeg;base64,
      // /9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj
      // /2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj
      // /wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf
      // /EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf
      // /aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==`}
      />
    </>
  );
};
export default DynamicImg;
