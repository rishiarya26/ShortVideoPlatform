import FooterMenu from '../footer-menu';

function Error({retry}) {
  return (
    <div className=" W-feed-vid pt-24 mt-24 relative flex w-full flex-col items-center justify-center py-12">
        <div>
          <svg enableBackground="new 0 0 24 24" height="80px" viewBox="0 0 24 24" width="80px" fill="#d6d6d6"><g><rect fill="none" height="24" width="24" y="0"/></g><g><path d="M20,9V7c0-1.1-0.9-2-2-2h-3c0-1.66-1.34-3-3-3S9,3.34,9,5H6C4.9,5,4,5.9,4,7v2c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3v4 c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-4c1.66,0,3-1.34,3-3C23,10.34,21.66,9,20,9z M7.5,11.5C7.5,10.67,8.17,10,9,10 s1.5,0.67,1.5,1.5S9.83,13,9,13S7.5,12.33,7.5,11.5z M16,17H8v-2h8V17z M15,13c-0.83,0-1.5-0.67-1.5-1.5S14.17,10,15,10 s1.5,0.67,1.5,1.5S15.83,13,15,13z"/></g></svg>
        </div>
        <p className='text-xl font-bold text-gray-600 mt-4'>Something went wrong</p>
        <p className='text-md  text-gray-400 mt-2'>Sorry about that! Please try again later</p>
        <div onClick={()=>retry(true)} className="rounded text-md font-semibold mt-12 px-6 p-2 border border-gray-400 text-gray-600 cursor-pointer">Refresh</div>
    </div>
  );
}

export default Error;
