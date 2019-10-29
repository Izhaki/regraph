import React from 'react';
import { Graph } from '@regraph/graph';
import { Line } from '@regraph/connections';

const Text = ({ box, id }) => (
  <text id={id} x={box.x} y={box.y} dominantBaseline="hanging">
    {id}
  </text>
);

export default () => (
  <Graph
    node={{ type: Text }}
    nodes={[
      { id: 'source', box: { x: 40, y: 40 } },
      { id: 'destination', box: { x: 40, y: 140 } },
    ]}
    connections={[
      {
        type: Line,
        src: 'source',
        dst: 'destination',
      },
    ]}
  />
);
