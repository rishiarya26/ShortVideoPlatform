import Hash from '../../commons/svgicons/hash'
const Hashtags = () =>{
    return (
        <div className="flex flex-col w-full p-4">
                <div className="flex justify-between my-4">
                    <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-1 items-center mr-2">
                               <Hash/>
                             </div>
                               #nameofbla
                    </div>
                    <div className="text-sm text-gray-300 items-center">
                            2k views
                    </div>
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-1 items-center mr-2">
                               <Hash/>
                             </div>
                               #nameofbla
                    </div>
                    <div className="text-sm text-gray-300 items-center">
                            2k views
                    </div>
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex items-center">
                             <div className="flex rounded-full border-2 border-gray-200 p-1 items-center mr-2">
                               <Hash/>
                             </div>
                               #nameofbla
                    </div>
                    <div className="text-sm text-gray-300 items-center">
                            2k views
                    </div>
                </div>
        </div>
    )
}

export default Hashtags;