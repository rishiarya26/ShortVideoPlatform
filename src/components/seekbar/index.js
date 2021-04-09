
import React from 'react';

function Seekbar(props) {
  return (
    <div className="w-full h-1 fixed bottom-11">
      <div className="relative w-400 h-1 overflow-hidden z-10 bg-black">
        <span style={{ width: `${props.seekedPercentage}%` }} className="absolute top-0 left-0 h-1 bg-gray-100 " />
      </div>
    </div>
  );
}

export default Seekbar;
