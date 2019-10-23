import React from 'react';
import { Graph } from '@regraph/graph';
import { CurvedLine } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import layout from './layout';

const toNode = (id, index) => ({
  id,
  box: { x: 50 + index * 100, y: 40, width: 20, height: 20 },
});

const stampId = (connection, index) => ({ id: `${index}`, ...connection });

export default () => (
  <Graph
    layout={layout}
    nodes={['1', '2', '3', '4'].map(toNode)}
    connections={[
      { src: '1', dst: '2' },
      { src: '1', dst: '2' },
      { src: '2', dst: '3' },
      { src: '2', dst: '3' },
      { src: '2', dst: '3' },
      { src: '3', dst: '4' },
      { src: '3', dst: '4' },
      { src: '3', dst: '4' },
      { src: '3', dst: '4' },
    ].map(stampId)}
    renderSvgNode={({ id, box }) => (
      <rect key={id} {...box} fill="#FFD86E" stroke="#EDBA39" />
    )}
    connectionDefaults={{
      type: CurvedLine,
      strokeWidth: 1,
      dst: { marker: <Triangle /> },
    }}
  />
);
