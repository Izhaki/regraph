import React from 'react';
import { Graph } from '@regraph/graph';
import { CurvedLine } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import { fromRect, toSvgProps } from '@regraph/geo/ellipse';
import layout from './layout';

const Circle = ({ box }) => <ellipse {...toSvgProps(fromRect(box))} />;

const toNode = (id, index) => ({
  id,
  type: Circle,
  box: { x: 50 + index * 100, y: 40, width: 30, height: 30 },
});

export default () => (
  <Graph
    layout={layout}
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
    connection={{
      type: CurvedLine,
      strokeWidth: 1,
      dst: { marker: <Triangle /> },
    }}
  />
);
