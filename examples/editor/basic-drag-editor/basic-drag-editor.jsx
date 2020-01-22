import React from 'react';
import { graph } from '@regraph/graph';
import { editor, connectGraph, selectionTool } from '@regraph/editor';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import { fromRect, toSvgProps } from '@regraph/geo/ellipse';
import getEditPolicies from './editPolicies';

const Circle = ({ box, ...props }) => (
  <ellipse {...props} {...toSvgProps(fromRect(box))} />
);

const getDomainTarget = element => ({
  type: element.getAttribute('data-target'),
  id: element.id,
});

const eventMapper = event => ({
  target: getDomainTarget(event.target),
  delta: event.getDelta && event.getDelta(),
});

const Graph = graph({
  connector: connectGraph(),
  interactive: eventMapper,
  layout: true,
  node: { type: Circle, 'data-target': 'node' },
  connection: {
    type: Line,
    strokeWidth: 1,
    dst: { anchor: 'chop-ellipse', marker: <Triangle /> },
    src: { anchor: 'chop-ellipse' },
  },
});

const GraphEditor = editor({
  tool: selectionTool,
  getEditPolicies,
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
});

export default () => (
  <GraphEditor>
    <Graph width={600} height={200} />
  </GraphEditor>
);
