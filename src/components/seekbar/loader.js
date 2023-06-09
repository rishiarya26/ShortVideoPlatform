import React from 'react';

function Seekbar({type}) {
  const design = {
    onBottom : "bottom-0",
    aboveFooterMenu : "bottom-16"
  }
  return (
    <div className={`w-screen h-1 fixed ${design[type]}`}>
      <div className="w-400 h-1 bg-gray-600">
        <div className="relative w-40 h-1 bg-gray-300 animate-seekbar" />
      </div>
    </div>

  );
}

export default Seekbar;
