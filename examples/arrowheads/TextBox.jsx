import React from 'react';
import { getCenter } from '@regraph/geo/rect';

export default ({ id, box, title }) => {
  const { x, y } = getCenter(box);
  return (
    <g key={id}>
      <rect {...box} fill="Chocolate" rx="6" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#eee">
        {title}
      </text>
    </g>
  );
};
