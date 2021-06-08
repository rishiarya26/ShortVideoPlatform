import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import Shop from '../svgicons/shop';

const myLoader = ({ src, width }) => `${src}?w=${width}`;

function ImageComp({
  data, title, width, height
}) {
  // const [loaded, setLoaded] = useState(true);
  // const [error, setError] = useState(false)

  // const image = useRef()

  // useEffect(()=>{
  //   if (image.current.complete) setLoaded(true)
  // },[])
  const handleError = () => {
    // setLoaded(true)
    // setError(true)
  };

  const handleLoad = () => {
    // setLoaded(true)
  };
  return (
    <>
      <Image
        className="object-cover"
        onLoad={handleLoad}
        onError={handleError}
        loader={myLoader}
        src={data}
        alt={title}
        width={width}
        height={height}
      />
    </>
  );
}

export default ImageComp;
