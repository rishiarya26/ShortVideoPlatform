import React from 'react';

function Seekbar() {
  return (
    <div className="w-screen h-1 fixed bottom-0">
      <div className="w-400 h-1 bg-gray-600">
        <div className="relative w-40 h-1 bg-gray-300 animate-seekbar" />
      </div>
    </div>

  );
}

export default Seekbar;
