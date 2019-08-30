import React from 'react';
import { Graph } from '@regraph/graph';
import { Line } from '@regraph/connections';

const renderSvgNode = ({ id, box }) => (
  <rect key={id} {...box} fill="Chocolate" />
);

const renderConnection = props => <Line key={props.id} {...props} />;

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
