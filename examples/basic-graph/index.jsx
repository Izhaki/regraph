import React from 'react';
import { Graph } from '@regraph/graph';
import { Line } from '@regraph/connections';

const Rect = ({ box }) => <rect {...box} fill="#FFD86E" stroke="#EDBA39" />;

export default () => (
  <Graph
    node={{ type: Rect }}
    nodes={[
      { id: 'ping', box: { x: 50, y: 40, width: 20, height: 20 } },
      { id: 'pong', box: { x: 150, y: 40, width: 20, height: 20 } },
    ]}
    connections={[
      {
        type: Line,
        src: 'ping',
        dst: 'pong',
      },
    ]}
  />
);
