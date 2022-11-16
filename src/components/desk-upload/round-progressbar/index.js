import React from 'react'

const RoundProgressBar = ({size, strokeWidth, value, max, stroke }) => {
  // const size = size;
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * value / max;
  const percentage = (value / max * 100).toFixed();
  return (
    <svg
      width = {size}
      height = {size}
      viewBox = {viewBox}
    >
      <circle
        fill = {'none'}
        stroke = {'#ddd'}
        cx = { size / 2 }
        cy = { size / 2 }
        r = { radius }
        strokeWidth = {`${strokeWidth}px`} />
      <circle
        fill = {'none'}
        stroke = {stroke}
        strokeLinecap = "round"
        strokeLinejoin = "round"
        strokeDasharray = {dashArray}
        strokeDashoffset = {dashOffset}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="65%"
        y="50%"
        dy="0.4rem"
        textAnchor="end"
        fill={stroke}
        style={{
          fontSize:'1rem',
          fontWeight: 'bold',
        }}
      >
         {`${percentage}%`}
      </text>
    </svg>
  );
}

RoundProgressBar.defaultProps = {
  size: 100,
  value: 25,
  max: 100,
  strokeWidth: 5,
  stroke: 'red',
  text: ""
}


export default RoundProgressBar;