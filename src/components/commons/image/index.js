import React from 'react';
import Image from 'next/image';

// TODO we need a proper default image url for blurDataURL
/* eslint-disable max-len */
const Img = ({
  onClick, loading = 'lazy', data, title = 'hipi', width, height
}) => {
  const aspectRatio = (height / width) * 100;
  return (
    <>
      <Image
        className={`
        position-relative overflow-hidden
        animate-appear
        `}
        //style={{ paddingBottom: `${aspectRatio}%` }}
        loading={loading}
        src={data}
        alt={title}
        width={width}
        height={height}
        // placeholder="blur"
        // blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        onClick={onClick}
        onKeyPress={() => true}
        role="presentation"
      />
    </>
  );
};
export default Img;
