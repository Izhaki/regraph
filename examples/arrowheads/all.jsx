import React from 'react';
import {
  Graph,
  compose,
  withViewportSize,
  withLayout,
  connectionLayout,
  chopBox,
} from '@regraph/graph';
import { Line } from '@regraph/connections';
import { Triangle, Perp, Chevy } from '@regraph/arrowheads';
import TextBox from './TextBox';

const MyGraph = compose(
  withLayout(connectionLayout(chopBox)),
  withViewportSize()
)(Graph);

const connections = [
  {
    src: {
      id: 'Triangle (Full)',
      marker: <Triangle stroke="#777" fill="#777" />,
    },
    dst: {
      id: 'Triangle (Empty)',
      marker: <Triangle stroke="#777" fill="none" />,
    },
  },
  {
    src: { id: 'Perp', marker: <Perp /> },
    dst: { id: 'Chevy', marker: <Chevy /> },
  },
];

const connectionReducer = ({ nodes, boxes }, { src, dst }, index) => {
  nodes.push({ id: src.id, title: src.id }, { id: dst.id, title: dst.id });
  const box = { y: index * 50 + 50, width: 150, height: 30 };
  boxes[src.id] = { x: 50, ...box };
  boxes[dst.id] = { x: 300, ...box };
  return { nodes, boxes };
};

const { nodes, boxes } = connections.reduce(connectionReducer, {
  nodes: [],
  boxes: {},
});

export default () => (
  <MyGraph
    nodes={nodes}
    boxes={boxes}
    renderSvgNode={TextBox}
    connections={connections}
    renderConnection={props => (
      <Line key={props.id} {...props} strokeWidth={2} />
    )}
  />
);
