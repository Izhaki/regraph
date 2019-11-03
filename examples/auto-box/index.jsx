import React from 'react';
import { graph, withPosition } from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';

const Text = withPosition(({ id }) => <div id={id}>{id}</div>);

const Graph = graph({
  extractBoxesFromNodes: true,
  layout: true,
  autoBox: true,
  hiddenFirstRender: true,
  node: { type: Text },
});

export default () => (
  <Graph
    width={170}
    height={200}
    nodeLayer="html"
    nodes={[
      { id: 'source', x: 40, y: 40 },
      { id: 'destination', x: 40, y: 140 },
    ]}
    connections={[
      {
        id: 'connection',
        type: Line,
        strokeWidth: 1,
        src: { id: 'source', padding: 5 },
        dst: { id: 'destination', padding: 5, marker: <Triangle /> },
      },
    ]}
  />
);
