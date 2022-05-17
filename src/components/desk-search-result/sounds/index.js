const Sounds = () =>{
    return (
        <div className="flex flex-col">
                <div  className="flex p-2 min-w-3/5 mr-2">
                        <div className=" w-16.6v flex h-16.6v bg-gray-300 relative " />
                        <div className="flex flex-col justify-between pl-2 pb-2">
                        {/* <audio src="#"} controls></audio> */}
                          <p className="font-medium text-lg text-gray-700"> musicTitle</p>
                          <p className="text- text-gray-400">musicArtistName</p>
                          <p className="text- text-gray-400">22:20</p>
                      </div>
                </div>
         </div>
    )
}

export default Sounds;