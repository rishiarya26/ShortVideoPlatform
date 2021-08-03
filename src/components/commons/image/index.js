import React from 'react';
import Image from 'next/image';

// TODO we need a proper default image url for blurDataURL
const Img = ({
  onClick, loading = 'lazy', data, title = 'hipi'
}) => {
  console.log('inimg', data);
  return (
    <>
      <Image
        className={`
        position-relative overflow-hidden
        animate-appear bg-gray-500
        `}
        loading={loading}
        src={data}
        alt={title}
        layout="fill"
        object-fit="cover"
        onClick={onClick}
        onKeyPress={() => true}
        role="presentation"
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
export default Img;
