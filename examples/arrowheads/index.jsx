import React from 'react';
import {
  Graph,
  compose,
  withViewportSize,
  withLayout,
  connectionLayout,
  chopBox,
} from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle, Perp } from '@regraph/arrowheads';

const MyGraph = compose(
  withLayout(connectionLayout(chopBox)),
  withViewportSize()
)(Graph);

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
        src: { id: 'ping' },
        dst: { id: 'pong' },
      },
    ]}
    renderConnection={props => (
      <Line
        key={props.id}
        {...props}
        strokeWidth={2}
        markerStart={<Perp />}
        markerEnd={<Triangle />}
      />
    )}
  />
);
