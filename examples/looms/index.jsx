import React from 'react';
import { graph } from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import { fromRect, toSvgProps } from '@regraph/geo/ellipse';

const Graph = graph({
  normalizeConnections: true,
  autoConnectionId: true,
  looms: true,
  extractBoxesFromNodes: true,
  layout: true,
  autoViewportSize: true,
  connection: {
    type: Line,
    strokeWidth: 1,
    dst: { anchor: 'chop-ellipse', marker: <Triangle /> },
    src: { anchor: 'chop-ellipse' },
  },
});

const Circle = ({ box }) => <ellipse {...toSvgProps(fromRect(box))} />;

const toNode = (id, index) => ({
  id,
  type: Circle,
  box: { x: 50 + index * 100, y: 40, width: 30, height: 30 },
});

export default () => (
  <Graph
    nodes={['1', '2', '3', '4'].map(toNode)}
    connections={[
      { src: '1', dst: '2' },
      { src: '1', dst: '2' },
      { src: '2', dst: '3' },
      { src: '2', dst: '3' },
      { src: '2', dst: '3' },
      { src: '3', dst: '4' },
      { src: '3', dst: '4' },
      { src: '3', dst: '4' },
      { src: '3', dst: '4' },
    ]}
  />
);
