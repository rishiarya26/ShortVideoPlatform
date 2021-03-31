import Comment from '../comment';
import Send from '../commons/svgicons/send';

function CommentTray() {
  return (
    <blockquote className="w-full h-full" cite="https://www.charmboard.com/">
      <div
        id="comment-widget"
      />
      <div className="flex flex-col overflow-scroll">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />

        <div className="fixed bottom-0 bg-white py-4 w-full flex">
          <input placeholder="Add a comment" className="text-sm w-10/12 border-0 focus:outline-none" />
          <Send />
        </div>
      </div>
    </blockquote>
  );
}

export default CommentTray;

