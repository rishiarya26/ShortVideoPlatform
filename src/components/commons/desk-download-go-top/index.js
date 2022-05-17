/*eslint-disable react/display-name */
import dynamic from 'next/dynamic';
import useDrawer from '../../../hooks/use-drawer';
import Top from '../svgicons/top';

const DeskDownloadApp = dynamic(
    () => import('../../desk-download-app'),
    {
      loading: () => <div />,
      ssr: false
    }
  );

const DeskDownloadAppGoTop = () =>{
    const {show} = useDrawer();
    return (
        <>
            <div className='px-4 py-2 rounded-full border-gray-300 border text-gray-600 fixed right-4 cursor-pointer bottom-12 bg-white text-xs font-bold' 
            onClick={()=>show('Download App',DeskDownloadApp,'broad')}>Get App
            </div>
            <button onClick={()=>window?.scrollTo({ top: 0, behavior: 'smooth' })} className='fixed bottom-2 right-4 p-2 flex justify-center items-center rounded-full bg-hipired white'>
                <Top/>
            </button>
        </>
    )
}

export default DeskDownloadAppGoTop;