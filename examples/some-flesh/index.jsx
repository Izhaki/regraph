import React from 'react';
import {
  Graph,
  compose,
  withViewportSize,
  withLayout,
  connectionLayout,
} from '@regraph/graph';
import { Line } from '@regraph/connections';

const MyGraph = compose(
  withLayout(connectionLayout()),
  withViewportSize()
)(Graph);

export default () => (
  <MyGraph
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
        id: 'ping->pong',
        src: 'ping',
        dst: 'pong',
      },
    ]}
    renderConnection={props => <Line key={props.id} {...props} />}
  />
);
