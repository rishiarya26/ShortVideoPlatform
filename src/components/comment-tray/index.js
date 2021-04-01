import { useState } from 'react';
import { getComments } from '../../sources/social';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Comment from '../comment';
import Send from '../commons/svgicons/send';

const ErrorComp = () => (<div>error</div>);
const LoadComp = () => (<div>loading</div>);

function CommentTray() {
  const [items, setItems] = useState([]);
  const dataFetcher = () => getComments();
  const onDataFetched = data => {
    setItems(data.data);
  };
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={LoadComp}
      ErrorComp={ErrorComp}
    >
      <blockquote className="w-full h-full" cite="https://www.charmboard.com/">
        <div
          id="comment-widget"
        />
        <div className="flex flex-col overflow-scroll">
          {
            items.map((item, index) => (
              <Comment
                comment={item.comment}
                likeCount={item.likes}
                timeSince={item.time}
                user={item.user}
                key={index}
              />
            ))
          }
          <div className="fixed bottom-0 bg-white py-4 w-full flex">
            <input placeholder="Add a comment" className="text-sm w-10/12 border-0 focus:outline-none" />
            <Send />
          </div>
        </div>
      </blockquote>
    </ComponentStateHandler>
  );
}

export default CommentTray;

