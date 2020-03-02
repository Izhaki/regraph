import React from 'react';
import { graph } from '@regraph/graph';
import {
  editor,
  connectGraph,
  multiTool,
  connectionTool,
  selectionTool,
  moveSelectionTool,
} from '@regraph/editor';
import { Line } from '@regraph/connections';
import Chip from '@regraph/nodes/html/Chip';
import { fader, lfo, filter } from './chips';
import { targetifyNode, targetifyConnection } from './targetify';
import Actions from './components/actions/Actions';
import getDomainTarget from './getDomainTarget';
import getEditPolicies from './editPolicies';

const eventMapper = (event, props) => ({
  target: getDomainTarget(event.target, props),
  delta: event.getDelta && event.getDelta(),
  position: event.getPosition(),
  shiftKey: event.shiftKey,
});

const Graph = graph({
  connector: connectGraph({ autoBox: true }),
  interactive: eventMapper,
  layout: true,
  autoBox: true,
  connection: {
    type: Line,
    strokeWidth: 1,
  },
  node: {
    type: Chip,
  },
});

const GraphEditor = editor({
  tools: [
    multiTool(multiTool(selectionTool, moveSelectionTool), connectionTool),
  ],
  getEditPolicies,
  initialState: {
    nodes: [
      { id: 'fader', ...fader },
      { id: 'lfo', ...lfo },
      { id: 'filter', ...filter },
    ].map(targetifyNode),
    boxes: {
      fader: { x: 50, y: 50.5 },
      lfo: { x: 200, y: 50.5 },
      filter: { x: 350, y: 50.5 },
    },
    connections: [
      {
        id: '1',
        src: { id: 'lfo', port: 'out', anchor: 'right' },
        dst: { id: 'filter', port: 'cutoff', anchor: 'left' },
      },
    ].map(targetifyConnection),
    selected: [],
  },
});

export default () => (
  <GraphEditor>
    <Graph width={480} height={200} nodeLayer="html" />
    <Actions />
  </GraphEditor>
);
