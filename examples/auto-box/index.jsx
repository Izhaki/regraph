import React from 'react';
import { graph } from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';

const Text = ({ box, id }) => (
  <text id={id} x={box.x} y={box.y} dominantBaseline="hanging">
    {id}
  </text>
);

const Graph = graph({
  node: { type: Text },
  extractBoxesFromNodes: true,
  layout: true,
  autoBox: true,
  hiddenFirstRender: true,
});

export default () => (
  <Graph
    width={170}
    height={200}
    nodes={[
      { id: 'source', x: 40, y: 40 },
      { id: 'destination', x: 40, y: 140 },
    ]}
    connections={[
      {
        id: 'connection',
        type: Line,
        strokeWidth: 1,
        src: { id: 'source', padding: 5 },
        dst: { id: 'destination', padding: 5, marker: <Triangle /> },
      },
    ]}
  />
);
