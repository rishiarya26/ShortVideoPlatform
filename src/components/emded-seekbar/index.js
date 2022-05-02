
/* eslint-disable */

import React from 'react';

function EmbedSeekbar({type, seekedPercentage }) {
  const bottom ={
    embed:'bottom-0',
    single: 'bottom-16 fixed',
    desk:'bottom-4 px-4 absolute'
  }
  const bg ={
    embed:'bg-black',
    single: 'bg-black',
    desk:'bg-deskseekbar'
  }

  return (
    <div className={`w-full h-1 ${bottom[type]} seekbar`}>
      <div className= {`relative w-400 h-1 ${bg[type]} `}>
        <span style={{ width: `${seekedPercentage || 0}%` }} className="absolute top-0 left-0 h-1 bg-gray-100 " />
      </div>
    </div>
  );
}

export default EmbedSeekbar;
