import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { graph } from '@regraph/graph';
import connectionLayout from '@regraph/graph/layouts/connections';
import { editor, connectGraph } from '@regraph/editor';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import { fromRect, toSvgProps } from '@regraph/geo/ellipse';
import ToolsPane, { tools } from './ToolsPane';
import getEditPolicies from './editPolicies';

const Circle = ({ box, ...props }) => (
  <ellipse {...props} {...toSvgProps(fromRect(box))} />
);

const getDomainTarget = element => {
  const type = element.getAttribute('data-target');
  if (type === 'node') {
    return {
      type: element.getAttribute('data-target'),
      id: element.id,
    };
  }
  if (element.tagName.toLowerCase() === 'svg') {
    return {
      type: 'background',
    };
  }
  return {};
};

const eventMapper = event => ({
  target: getDomainTarget(event.target),
  delta: event.getDelta && event.getDelta(),
  position: event.getPosition(),
});

const Graph = graph({
  connector: connectGraph(),
  interactive: eventMapper,
});

const initialState = {
  nodes: [{ id: 'ping' }, { id: 'pong' }],
  boxes: {
    ping: { x: 200 - 15, y: 100 - 15, width: 30, height: 30 },
    pong: { x: 400 - 15, y: 100 - 15, width: 30, height: 30 },
  },
  connections: [{ id: 'ping->pong', src: { id: 'ping' }, dst: { id: 'pong' } }],
};

const GraphEditor = editor({
  tools: tools.map(({ tool }) => tool),
  getEditPolicies,
  looms: true,
  layout: connectionLayout,
  defaults: {
    node: { type: Circle, 'data-target': 'node' },
    connection: {
      type: Line,
      strokeWidth: 1,
      src: { anchor: 'chop-ellipse' },
      dst: { anchor: 'chop-ellipse', marker: <Triangle /> },
    },
  },
  initialState,
});

export default () => (
  <GraphEditor>
    <Box display="flex">
      <Box>
        <ToolsPane />
      </Box>
      <Box>
        <Divider orientation="vertical" />
      </Box>
      <Box flexGrow={1}>
        <Graph width={600} height={200} />
      </Box>
    </Box>
  </GraphEditor>
);
