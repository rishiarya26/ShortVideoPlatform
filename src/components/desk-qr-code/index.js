/*eslint-disable @next/next/no-img-element */
import { withBasePath } from '../../config';

function DeskQr() {

  return (
    <>
    <div className=" flex justify-between pt-8 px-8">
      <div className='flex w-full flex-col justify-center items-center px-4'>
          <p className='text-medium text-gray-800 text-center pb-4 px-4'>Scan QR code to download Hipi</p>
          <div className='flex px-4  w-1/2'>
            <img className="cursor-pointer " src={withBasePath('icons/qrcode.png')} alt="hipi logo" />
          </div>
      </div>
     
      </div>
    </>
  )
}

export default DeskQr;

