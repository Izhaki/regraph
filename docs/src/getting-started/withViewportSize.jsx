import React from 'react';
import { Graph, withViewportSize } from '@regraph/graph';
import { Line } from '@regraph/connections';

const MyGraph = withViewportSize({
  padding: ({ x, y }) => ({ right: x, bottom: y }),
})(Graph);

export default () => (
  <MyGraph
    nodes={[{ id: 'ping' }, { id: 'pong' }]}
    boxes={{
      ping: { x: 50, y: 40, width: 20, height: 20 },
      pong: { x: 150, y: 40, width: 20, height: 20 },
    }}
    renderSvgNode={({ id, box }) => <rect key={id} {...box} fill="Chocolate" />}
    connections={[
      {
        id: 'ping->pong',
        src: { x: 60, y: 50 },
        dst: { x: 160, y: 50 },
      },
    ]}
    renderConnection={props => <Line key={props.id} {...props} />}
  />
);
