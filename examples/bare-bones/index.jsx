import React from 'react';
import { Graph } from '@regraph/graph';
import { Line } from '@regraph/connections';

export default () => (
  <Graph
    width={220}
    height={100}
    nodes={[{ id: 'ping' }, { id: 'pong' }]}
    boxes={{
      ping: { x: 50, y: 40, width: 20, height: 20 },
      pong: { x: 150, y: 40, width: 20, height: 20 },
    }}
    renderSvgNode={({ id, box }) => (
      <rect key={id} {...box} fill="#FFD86E" stroke="#EDBA39" />
    )}
    connections={[
      {
        src: { x: 60, y: 50 },
        dst: { x: 160, y: 50 },
      },
    ]}
    renderConnection={props => <Line key={props.id} {...props} />}
  />
);
