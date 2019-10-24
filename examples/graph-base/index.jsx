import React from 'react';
import { GraphBase } from '@regraph/graph';
import { Line } from '@regraph/connections';

const Rect = ({ box }) => <rect {...box} />;

export default () => (
  <GraphBase
    width={220}
    height={100}
    nodes={[{ id: 'ping', type: Rect }, { id: 'pong', type: Rect }]}
    boxes={{
      ping: { x: 50, y: 40, width: 20, height: 20 },
      pong: { x: 150, y: 40, width: 20, height: 20 },
    }}
    connections={[
      {
        id: 'ping->pong',
        type: Line,
        src: { x: 60, y: 50 },
        dst: { x: 160, y: 50 },
      },
    ]}
  />
);
