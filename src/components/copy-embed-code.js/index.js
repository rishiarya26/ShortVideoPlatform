import { CopyToClipBoard } from '../../utils/web';

const CopyEmbedCode = ({ videoId = '' }) => {
  console.log('v', videoId);
  const embedCode = `
    <blockquote className="hipi-media" cite="https://preprod.hipi.co.in/">
    <div
      id="embed-hipi"
      style={{
        position: 'relative',
        margin: '0 auto',
        height: '640px',
        width: '360px',
        overflow: 'hidden'
      }}
    >
      <iframe
        className="h-full w-full"
        src="https://preprod.hipi.co.in/embed/${videoId}"
        loading="lazy"
        title="hipi"
        name="hipi"
        frameBorder="0"
        marginWidth="0"
        marginHeight="0"
        scrolling="no"
      />
    </div>
  </blockquote>
  `;

  return (
    <>
      <div className="flex justify-center">
        <input readOnly type="text" value={embedCode} />
        <button onClick={() => CopyToClipBoard(embedCode)} className="w-20 h-20 border border-black">Copy</button>
      </div>
    </>
  );
};

export default CopyEmbedCode;
