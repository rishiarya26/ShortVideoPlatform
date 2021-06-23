import React from 'react';
import Image from 'next/image';

// TODO we need a proper default image url for blurDataURL
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
        style={{ paddingBottom: `${aspectRatio}%` }}
        loading={loading}
        src={data}
        alt={title}
        width={width}
        height={height}
        onClick={onClick}
        onKeyPress={() => true}
        role="presentation"
      />
    </>
  );
};
export default Img;
