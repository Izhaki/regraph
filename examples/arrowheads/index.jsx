import React from 'react';
import { Graph } from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle, Perp } from '@regraph/arrowheads';

export default () => (
  <Graph
    nodes={[
      { id: 'ping', box: { x: 50, y: 40, width: 20, height: 20 } },
      { id: 'pong', box: { x: 150, y: 40, width: 20, height: 20 } },
    ]}
    connections={[
      {
        src: { id: 'ping', marker: <Perp /> },
        dst: { id: 'pong', marker: <Triangle /> },
      },
    ]}
    renderSvgNode={({ id, box }) => (
      <rect key={id} {...box} fill="#FFD86E" stroke="#EDBA39" />
    )}
    renderConnection={props => (
      <Line key={props.id} {...props} strokeWidth={2} />
    )}
  />
);
