import React from 'react';
import { Graph } from '@regraph/graph';
import { CurvedLine } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import layout from './layout';

const toNode = (id, index) => ({
  id,
  box: { x: 50 + index * 100, y: 40, width: 20, height: 20 },
});

export default () => (
  <Graph
    layout={layout}
    nodes={['left', 'right'].map(toNode)}
    connections={[
      { src: 'left', dst: 'right', bend: 10 },
      { src: 'right', dst: 'left', bend: 10 },
    ]}
    renderSvgNode={({ id, box }) => (
      <rect key={id} {...box} fill="#FFD86E" stroke="#EDBA39" />
    )}
    connectionDefaults={{
      type: CurvedLine,
      strokeWidth: 2,
      dst: { marker: <Triangle /> },
    }}
  />
);
