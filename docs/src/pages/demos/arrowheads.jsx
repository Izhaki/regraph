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
import { Triangle, Perp, withMarker } from '@regraph/arrowheads';

const MyGraph = compose(
  withLayout(connectionLayout(chopBox)),
  withViewportSize({ padding: ({ x, y }) => ({ right: x, bottom: y }) })
)(Graph);

const PerpMarker = withMarker(Perp);
const TriangleMarker = withMarker(Triangle);

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
        src: 'ping',
        dst: 'pong',
      },
    ]}
    renderConnection={props => (
      <Line
        key={props.id}
        {...props}
        markerStart={<PerpMarker width={6} height={6} flip />}
        markerEnd={<TriangleMarker width={6} height={6} />}
      />
    )}
  />
);