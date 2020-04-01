import React from 'react';
import { graph } from '@regraph/graph';
import { Line } from '@regraph/connections';
import FilterChip from './FilterChip';
import LfoChip from './LfoChip';

const Graph = graph({
  extractBoxesFromNodes: true,
  layout: true,
  boxer: true,
  connection: {
    type: Line,
    strokeWidth: 1,
  },
});

export default () => (
  <Graph
    width={360}
    height={200}
    nodeLayer="html"
    nodes={[
      { id: 'lfo', x: 40, y: 40, type: LfoChip },
      { id: 'filter', x: 240, y: 40, type: FilterChip },
    ]}
    connections={[
      {
        id: '1',
        src: { id: 'lfo', port: 'out', anchor: 'right' },
        dst: { id: 'filter', port: 'cutoff', anchor: 'left' },
      },
    ]}
  />
);
