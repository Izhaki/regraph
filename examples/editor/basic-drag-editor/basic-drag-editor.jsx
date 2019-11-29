import React from 'react';
import { graph } from '@regraph/graph';
import { withEditor } from '@regraph/editor';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import { fromRect, toSvgProps } from '@regraph/geo/ellipse';
import moveTool from './moveTool';
import reducer from './reducer';

const Circle = ({ box, isHtml, ...props }) => (
  <ellipse {...props} {...toSvgProps(fromRect(box))} />
);

const Graph = graph({
  interactive: true,
  layout: true,
  node: { type: Circle, 'data-target': 'node' },
  connection: {
    type: Line,
    strokeWidth: 1,
    dst: { anchor: 'chop-ellipse', marker: <Triangle /> },
    src: { anchor: 'chop-ellipse' },
  },
});

const GraphEditor = withEditor({
  tool: moveTool,
  reducer,
  initialState: {
    nodes: [{ id: 'ping' }, { id: 'pong' }],
    boxes: {
      ping: { x: 200 - 15, y: 100 - 15, width: 30, height: 30 },
      pong: { x: 400 - 15, y: 100 - 15, width: 30, height: 30 },
    },
    connections: [
      { id: 'ping->pong', src: { id: 'ping' }, dst: { id: 'pong' } },
    ],
  },
})(Graph);

export default () => {
  return <GraphEditor width={600} height={200} />;
};
