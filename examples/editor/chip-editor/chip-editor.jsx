import React from 'react';
import { graph } from '@regraph/graph';
import { withEditor } from '@regraph/editor';
import { Line } from '@regraph/connections';
import Chip from '@regraph/nodes/html/Chip';
import connectionTool from './connectionTool';
import { fader, lfo, filter } from './chips';
import reducer from './reducer';

const markPorts = (ports, target) =>
  ports && ports.map(port => ({ ...port, 'data-target': target }));

const markTargets = node => ({
  ...node,
  inputs: markPorts(node.inputs, 'input'),
  outputs: markPorts(node.outputs, 'output'),
});

const Graph = graph({
  interactive: true,
  layout: true,
  autoBox: true,
  hiddenFirstRender: true,
  connection: {
    type: Line,
    strokeWidth: 1,
  },
  node: {
    type: Chip,
  },
});

const GraphEditor = withEditor({
  tool: connectionTool,
  reducer,
  initialState: {
    nodes: [
      { id: 'fader', ...fader },
      { id: 'lfo', ...lfo },
      { id: 'filter', ...filter },
    ].map(markTargets),
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
    ],
  },
})(Graph);

export default () => <GraphEditor width={480} height={200} nodeLayer="html" />;
