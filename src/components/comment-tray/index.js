import { useState, useRef } from 'react';
import { getComments, clearComments, postComment } from '../../sources/social';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Comment from '../comment';
import Send from '../commons/svgicons/send';
import useTranslation from '../../hooks/use-translation';
import { getStatusSince } from '../../utils/date';

const ErrorComp = () => (<div>error</div>);
const LoadComp = () => (<div>loading</div>);

const optimisticUpdate = comment => (
  [{
    comment,
    likeCount: 0,
    time: Math.round((new Date().getTime() - 2000) / 1000),
    user: '',
    profilePic: ''
  }]
);

function CommentTray({ socialId }) {
  const { t } = useTranslation();
  const refInputComment = useRef('');
  const [items, setItems] = useState([]);
  const dataFetcher = () => getComments({ socialId });
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
                commentId={item.id}
                profilePic={item.profilePic}
                comment={item.comment}
                likeCount={item.likes}
                timeSince={getStatusSince(item.time, t)}
                user={item.user}
                key={index}
              />
            ))
          }
          <div className="fixed bottom-0 bg-white py-4 w-full flex">
            <input
              placeholder={t('ADD_COMMENT')}
              ref={refInputComment}
              className="text-sm w-10/12 border-0 focus:outline-none"
            />
            <Send onClick={() => {
              const comment = refInputComment.current.value;
              if (!comment) return;
              postComment(comment, socialId);
              clearComments();
              setItems([...optimisticUpdate(comment), ...items]);
              refInputComment.current.value = '';
            }}
            />
          </div>
        </div>
        <div>
          {(items.length === 0) && <div>{t('NO_COMMENTS')}</div>}
        </div>
      </blockquote>
    </ComponentStateHandler>
  );
}

export default CommentTray;

