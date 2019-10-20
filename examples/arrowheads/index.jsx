import React from 'react';
import { Graph } from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle, Perp } from '@regraph/arrowheads';

const getBox = index => ({ x: 50 + index * 100, y: 40, width: 20, height: 20 });

export default () => (
  <Graph
    nodes={[
      { id: 'left', box: getBox(0) },
      { id: 'centre', box: getBox(1) },
      { id: 'right', box: getBox(2) },
    ]}
    connections={[
      { src: 'centre', dst: 'left' },
      { src: 'centre', dst: 'right' },
    ]}
    renderSvgNode={({ id, box }) => (
      <rect key={id} {...box} fill="#FFD86E" stroke="#EDBA39" />
    )}
    connectionDefaults={{
      type: Line,
      strokeWidth: 2,
      src: { marker: <Perp /> },
      dst: { marker: <Triangle /> },
    }}
  />
);
