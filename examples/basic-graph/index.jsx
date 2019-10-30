import React from 'react';
import { graph } from '@regraph/graph';
import { Line } from '@regraph/connections';

const Rect = ({ box }) => <rect {...box} />;

const Graph = graph({
  node: { type: Rect },
  normalizeConnections: true,
  autoConnectionId: true,
  extractBoxesFromNodes: true,
  layout: true,
  autoViewportSize: true,
});

export default () => (
  <Graph
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
