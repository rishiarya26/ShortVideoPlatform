/*eslint-disable react/no-unescaped-entities */
import Save from '../commons/svgicons/save';
import { Back } from '../commons/svgicons/back';
import { withRouter } from 'next/router';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Error from './error';
import Loading from './loader';
import { useState } from 'react';
import { getHashTagVideos } from '../../sources/explore/hashtags-videos';
import VideoGallery from '../video-gallery';
import Img from '../commons/image';

let setRetry;
const ErrorComp = () => (<Error retry={setRetry} />);
const LoadComp = () => (<Loading />);

function HashTag({router}) {
  const [items,setItems] = useState([]);
  const [details, setDetails] = useState({})
  const {item = ''} = router?.query;

  const onDataFetched = data => {
      setDetails(data?.details);
      setItems(data?.data);
  }

  const dataFetcher = () => item && getHashTagVideos({ keyword:  item });
  let [fetchState, retry, data] = useFetcher(dataFetcher, onDataFetched);

  return (
    <ComponentStateHandler
    state={fetchState}
    Loader={LoadComp}
    ErrorComp={ErrorComp}
  >
    <div>
      <div onClick={()=>router.back()} className="headbar w-full flex h-16 shadow-md bg-white items-center p-4">
        <Back />
      </div>
      <div className="w-full flex flex-col p-4">
        <div className="flex w-full">
          <div className="min-w-25 flex min-h-25 bg-gray-300 relative rounded-full" >
            <Img data={details?.hashTagImage} alt='img'/>
          </div>
          <div className="flex flex-col px-4 justify-between">
            <div className="flex flex-col">
              <p className="font-medium text-lg">{details?.hashtagName}</p>
              <p className="text-sm text-gray-400">{details?.hashTagVideoCount}</p>
            </div>
            <div className="flex  border-2 border-gray-300 p-2">
              <Save />
              <p className="pl-2 font-medium">Add to favorites</p>
            </div>
          </div>
        </div>
        <div className="flex text-sm text-gray-400 py-2">
          <p>
            {details?.hashTagDesc}
            {/* <span className="font-medium text-gray-500">#hashtag</span> */}
         </p>
        </div>
      </div>
      <VideoGallery
        items={items}
        status={fetchState}
        retry={retry && retry}
        hashTag={item}
        page='hashTag'
      />
    </div>
    </ComponentStateHandler>
  );
}
export default withRouter(HashTag);
