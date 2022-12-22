/*eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import Image from 'next/image';
// import fallbackImg from '../../../../public/images/fallback-charms.png'


// TODO we need a proper default image url for blurDataURL
const ImgProfile = ({
  onClick, fallback="images/fallback-charms.png", data, title = 'hipi'
}) => {
  let finalSrc = data;

  if(data){  
    finalSrc = width && data.replaceAll("w_297", width);
  }
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
export default ImgProfile;
