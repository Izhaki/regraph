import React from 'react';
import { getCenter } from '@regraph/geo/rect';

export default ({ id, box, title }) => {
  const { x, y } = getCenter(box);
  return (
    <g key={id}>
      <rect {...box} fill="#FFD86E" stroke="#EDBA39" rx="2" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#604A0E">
        {title}
      </text>
    </g>
  );
};
