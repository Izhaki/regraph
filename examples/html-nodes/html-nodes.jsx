import React from 'react';
import { graph } from '@regraph/graph';
import { Line } from '@regraph/connections';

const Rect = ({ box: { x: left, y: top, width, height } }) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height,
      backgroundColor: '#FFD86E',
      border: '1px solid #EDBA39',
    }}
  />
);

const Graph = graph({
  normalizeConnections: true,
  autoConnectionId: true,
  extractBoxesFromNodes: true,
  layout: true,
  autoViewportSize: true,
  defaults: {
    node: { type: Rect },
  },
});

export default () => (
  <Graph
    nodeLayer="html"
    nodes={[
      { id: 'ping', box: { x: 50, y: 40.5, width: 20, height: 20 } },
      { id: 'pong', box: { x: 150, y: 40.5, width: 20, height: 20 } },
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
