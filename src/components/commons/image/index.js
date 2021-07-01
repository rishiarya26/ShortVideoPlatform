import React from 'react';
import Image from 'next/image';

// TODO we need a proper default image url for blurDataURL
const Img = ({
  onClick, loading = 'lazy', data, title = 'hipi'
}) => (
  <>
    <Image
      className={`
        position-relative overflow-hidden
        animate-appear bg-gray-500
        `}
      // style={{ paddingBottom: `${aspectRatio}%` }}
      loading={loading}
      src={data}
      alt={title}
      layout="fill"
      object-fit="cover"
      // width={width}
      // height={height}
      onClick={onClick}
      onKeyPress={() => true}
      role="presentation"
    />
  </>
);
export default Img;
