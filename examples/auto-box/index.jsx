import React from 'react';
import { graph, withPosition } from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle } from '@regraph/arrowheads';
import styles from './styles';

const Rect = withPosition(({ id }) => (
  <div id={id} style={styles.rect}>
    {id}
  </div>
));

const Graph = graph({
  autoBox: true,
  extractBoxesFromNodes: true,
  layout: true,
  hiddenFirstRender: true,
  node: { type: Rect },
});

export default () => (
  <Graph
    width={186}
    height={220}
    nodeLayer="html"
    nodes={[
      { id: 'Source', x: 40, y: 40 },
      { id: 'Destination', x: 40, y: 140 },
    ]}
    connections={[
      {
        id: 'connection',
        type: Line,
        strokeWidth: 1,
        src: { id: 'Source', padding: 5 },
        dst: { id: 'Destination', padding: 5, marker: <Triangle /> },
      },
    ]}
  />
);
