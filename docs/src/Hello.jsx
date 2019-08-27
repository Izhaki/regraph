import React from 'react';
import { Graph } from '@regraph/graph';

const renderSvgNode = ({ id, box }) => (
  <rect key={id} {...box} fill="Chocolate" />
);

const renderConnection = ({ id, src, dst }) => (
  <line
    key={id}
    x1={src.x}
    y1={src.y}
    x2={dst.x}
    y2={dst.y}
    stroke={'black'}
    className="connection"
  />
);

export default () => (
  <Graph
    width={200}
    height={50}
    nodes={[{ id: 'ping' }, { id: 'pong' }]}
    boxes={{
      ping: { x: 10, y: 10, width: 20, height: 20 },
      pong: { x: 100, y: 10, width: 20, height: 20 },
    }}
    renderSvgNode={renderSvgNode}
    connections={[
      {
        id: 'ping->pong',
        src: { x: 20, y: 20 },
        dst: { x: 110, y: 20 },
      },
    ]}
    renderConnection={renderConnection}
  />
);
