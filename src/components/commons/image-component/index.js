import Image from 'next/image'
import { useState } from 'react';
import Shop from '../../commons/svgicons/shop'

const myLoader = ({ src, width }) => {
    return `${src}?w=${width}`;
  }

function ImageComponent({data, videoTitle}) {

   const [imageLoaded, setImageLoaded] = useState(true)
   const handleError=()=>{
    setImageLoaded(false)
   }
    return (
      <>
        <Image
          onError={handleError}
          loader={myLoader}
          src={imageLoaded ? data : Shop}
          alt={videoTitle}
          width={100}
          height={100}
        />
      </>
    )
  }
  
  export default ImageComponent