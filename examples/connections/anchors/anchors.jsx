import React from 'react';
import { graph } from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import { fromRect, toSvgProps } from '@regraph/geo/ellipse';

const style = { fill: 'none' };

const Rect = ({ box }) => <rect {...box} style={style} />;
const Circle = ({ box }) => (
  <ellipse {...toSvgProps(fromRect(box))} style={style} />
);

const Graph = graph({
  normalizeConnections: true,
  autoConnectionId: true,
  extractBoxesFromNodes: true,
  layout: true,
  autoViewportSize: true,
  node: { type: Rect },
  connection: {
    type: Line,
    strokeWidth: 1,
    src: { marker: <Triangle /> },
    dst: { marker: <Triangle /> },
  },
});

export default () => (
  <Graph
    nodes={[
      { id: 'a', box: { x: 100, y: 50, width: 20, height: 20 } },
      { id: 'b', box: { x: 150, y: 100, width: 20, height: 20 } },
      { id: 'c', box: { x: 50, y: 100, width: 20, height: 20 }, type: Circle },
    ]}
    connections={[
      {
        src: { x: 110, y: 25, marker: null },
        dst: { id: 'a', anchor: 'center' },
      },
      { src: { id: 'a', anchor: 'right' }, dst: { id: 'b', anchor: 'top' } },
      { src: 'a', dst: 'b' },
      { src: { id: 'a', anchor: 'bottom' }, dst: { id: 'b', anchor: 'left' } },
      {
        src: { id: 'a' },
        dst: { id: 'c', anchor: 'chop-ellipse' },
      },
    ]}
  />
);
