
import React from 'react';
import Image from 'next/image';

// TODO we need a proper default image url for blurDataURL

const myLoader = ({ src, width }) => `${src}?w=${width}`;
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
        loader={myLoader}
        src={data}
        alt={title}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL="/image/upload/w_261,h_147,c_scale,f_webp,q_auto:eco/resources/0-6-2645/list/junglebook1170x658withlogo.jpg"
        onClick={onClick}
        onKeyPress={() => true}
        role="presentation"
      />
    </>
  );
};
export default Img;
