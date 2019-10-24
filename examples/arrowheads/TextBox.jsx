import React from 'react';
import { getCenter } from '@regraph/geo/rect';

export default ({ id, box, title }) => {
  const { x, y } = getCenter(box);
  return (
    <g key={id}>
      <rect {...box} />
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
