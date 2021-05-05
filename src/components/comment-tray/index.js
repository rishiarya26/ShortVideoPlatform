import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getComments, clearComments, postComment } from '../../sources/social';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Comment from '../comment';
import Error from './error';
import Loader from './loader';
import Send from '../commons/svgicons/send';
import useTranslation from '../../hooks/use-translation';
import { getStatusSince } from '../../utils/date';


const Paginator = dynamic(
  () => import('../commons/paginator'),
  {
    loading: () => <div />,
    ssr: false
  }
);
let retry;
const ErrorComp = () => (<Error retry={retry} />);
const LoadComp = () => (<Loader />);

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
  const nextCursor = useRef(null);
  const [items, setItems] = useState([]);
  const dataFetcher = () => getComments({ socialId });
  const onDataFetched = data => {
    nextCursor.current = data.nextCursor;
    items.length === 0 ? setItems(data.data) : setItems([...items, ...data.data]);
  };
  const [fetchState, setRetry] = useFetcher(dataFetcher, onDataFetched);
  retry = setRetry;

  const loadMore = useCallback(
    async () => {
      try {
        const data = await getComments({ socialId, nextCursor: nextCursor.current });
        onDataFetched(data);
      } catch (e) {
        console.log('no more comments');
      }
    },
    [socialId, nextCursor.current]
  );

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
        <div className="flex flex-col overflow-y-auto h-4/5">
          <Paginator
            hasMore={nextCursor.current}
            loader={LoadComp()}
            loadFunction={loadMore}
          >
            {
              items && items.length > 0 ? items.map((item, index) => (
                <Comment
                  commentId={item.id}
                  profilePic={item.profilePic}
                  comment={item.comment}
                  likeCount={item.likes}
                  timeSince={getStatusSince(item.time, t)}
                  user={item.user}
                  key={index}
                />
              )) : (<div />)
            }
          </Paginator>
          <div className="fixed bottom-0 bg-white py-4 w-full flex">
            <input
              placeholder={t('ADD_COMMENT')}
              ref={refInputComment}
              className="text-sm w-10/12 border-0 focus:outline-none"
            />
            <Send onClick={() => {
              const comment = refInputComment.current.value;
              if (!comment) return;
              postComment({ text: comment, socialId });
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

