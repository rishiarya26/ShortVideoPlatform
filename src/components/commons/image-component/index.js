import Image from 'next/image'
import { useState } from 'react';

const myLoader = ({ src, width }) => {
    return `${src}?w=${width}`;
  }

function ImageComponent({data, videoTitle, fallbackImage}) {
    
   const [imageLoaded, setImageLoaded] = useState(true)
   const handleError=()=>{
    setImageLoaded(false)
   }
    return (
      <>
        <Image
          onError={handleError}
          loader={myLoader}
          src={imageLoaded ? data: fallbackImage}
          alt={videoTitle}
          width={100}
          height={100}
        />
      </>
    )
  }
  
  export default ImageComponent