
import React from 'react';

function Seekbar({seekedPercentage, type}) {

  const design = {
    onBottom : "bottom-0",
    aboveFooterMenu : "bottom-12"
  }
  return (
    <div className={`w-full h-1 fixed ${design[type]} seekbar`}>
      <div className="relative w-400 h-2 bg-black">
        <span style={{ width: `${seekedPercentage}%` }} className="absolute top-0 left-0 h-1 bg-gray-100 " />
      </div>
    </div>
  );
}

export default Seekbar;
