import { CopyToClipBoard } from '../../utils/web';

const CopyEmbedCode = ({ videoId = '' }) => {
  console.log('v', videoId);
  const embedCode = `<blockquote className="hipi-media" cite="https://preprod.hipi.co.in/"><div id="embed-hipi" style={{position: 'relative',margin: '0 auto',height: '640px',width: '360px',overflow: 'hidden'}} > <iframe className="h-full w-full" src="https://preprod.hipi.co.in/embed/${videoId}" loading="lazy" title="hipi" name="hipi" frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no" /> </div> </blockquote>`;

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <textarea readOnly="" rows="7" className="w-full my-4 break-all px-2" readOnly value={embedCode} />
        <p className="text-xs text-center text-gray-500 my-4">By embedding this video, you confirm that you agree to our Terms of Service and acknowledge you have read and understood our Privacy Policy.</p>

        <div onClick={() => CopyToClipBoard(embedCode)} className="flex justify-center border-2 border-gray-200 py-3 px-4 w-full my-2 font-medium">Copy code</div>
      </div>
    </>
  );
};

export default CopyEmbedCode;
