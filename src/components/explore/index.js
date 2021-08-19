import { useState } from 'react';
import Hash from '../commons/svgicons/hash';
import Search from '../commons/svgicons/search-black';
import RightArrow from '../commons/svgicons/right-arrow';
import { getSearchData } from '../../sources/explore';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Error from './error';
import Loader from './loader';
import Img from '../commons/image';
import FooterMenu from '../footer-menu';
import Router from '../../../router';

const ErrorComp = () => (<Error />);
const LoadComp = () => (<Loader />);

function Explore() {
  const [data, setData] = useState([]);

  const onDataFetched = data => {
    setData(data?.data);
  };
  const dataFetcher = () => getSearchData();
  const [fetchState, retry] = useFetcher(dataFetcher, onDataFetched);
  const validateData = data?.length > 0;

  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <div className="h-screen  w-screen flex flex-col ">
        <div className="search_box p-4 w-full">
          <div className="relative">
            <input
              className=" w-full bg-gray-100 px-4 py-2 pl-8"
              type="text"
              name="Search"
              placeholder="Search"
            />
            <div className="absolute left-1 top-2">
              <Search />
            </div>
          </div>
          <div />
        </div>
        <div className="poster w-full" />

        {validateData && data?.map((content, id) => {
          return (
            content?.widgetContentType === 'Video' ? (
              <div key={id} className="p-2 tray">
                <div className="w-full flex mb-2 justify-between">
                  <div className="flex">
                    <div className="p-2 rounded-full border-2 border-gray-300 mr-2">
                      <Hash />
                    </div>
                    <div className="head flex flex-col">
                      <p className="text-base font-medium">{content?.widgetName}</p>
                      <p className="text-sm text-gray-400">trending</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <RightArrow />
                  </div>
                </div>

                <div className="flex min-w-full overflow-x-auto min-h-38 no_bar">
                  {content?.widgetList?.length > 0 && content.widgetList.map((d, id) => {
                    return (
                      <div onClick={()=>Router.pushState("profile-feed")} key={id} className="bg-gray-300 m-1 min-w-28 min-h-38 relative">
                        <Img data={d?.video?.thumbnailUrl} title={d?.videoTitle} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )
              : (
                <div key={id} className="p-2 circle_tray">
                  <div className="w-full flex justify-between">
                    <p className="text-base font-medium">{content?.widgetName}</p>
                    <div className="flex items-center justify-center">
                      <RightArrow />
                    </div>
                  </div>
                  <div className="flex min-w-full overflow-x-auto min-h-32 no_bar py-4">
                    
                      { content?.widgetList?.length > 0 && content.widgetList.map((d, id) => {
                        return (
                          <>
                    <div className="my-1 px-2 flex flex-col justify-center items-center">
                            <div key={id} className="bg-gray-300 min-w-1/6 overflow-hidden  min-h-1/6 rounded-full relative">
                              <Img data={d?.user?.profilePicImgUrl} title={d?.user?.userName} />
                            </div>
                            <p className="text-xs pt-2">{d?.user?.userName}</p>
                          
                    </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              ));
        })}
      </div>
      <FooterMenu/>
    </ComponentStateHandler>
  );
}
export default Explore;
