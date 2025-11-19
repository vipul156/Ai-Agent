import React from 'react';

const ConnectionLine = ({ fromX, fromY, toX, toY }) => {
  return (
    <g>
      <path
        fill="none"
        stroke={'black'}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={"black"}
        strokeWidth={1.5}
      />
    </g>
  )
}

export default ConnectionLine
