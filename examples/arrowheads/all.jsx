import React from 'react';
import { Graph } from '@regraph/graph';
import { Line } from '@regraph/connections';
import {
  Triangle,
  Perp,
  Chevy,
  Ellipse,
  Diamond,
  Barbed,
  Curly,
} from '@regraph/arrowheads';
import TextBox from './TextBox';

const full = { stroke: 'none', fill: '#777' };
const empty = { stroke: '#777', fill: 'none' };

const connections = [
  {
    src: { id: 'Perp', marker: <Perp /> },
    dst: { id: 'Chevy', marker: <Chevy /> },
  },
  {
    src: { id: 'Curly', marker: <Curly height={15} /> },
    dst: { id: 'Barbed', marker: <Barbed {...full} /> },
  },
  {
    src: { id: 'Triangle (Full)', marker: <Triangle {...full} /> },
    dst: { id: 'Triangle (Empty)', marker: <Triangle {...empty} /> },
  },
  {
    src: { id: 'Diamond (Full)', marker: <Diamond {...full} /> },
    dst: { id: 'Diamond (Empty)', marker: <Diamond {...empty} /> },
  },
  {
    src: { id: 'Ellipse (Full)', marker: <Ellipse {...full} /> },
    dst: { id: 'Ellipse (Empty)', marker: <Ellipse {...empty} /> },
  },
];

const firstWord = str => str.split(' ')[0];

const connectionReducer = ({ nodes, boxes }, { src, dst }, index) => {
  nodes.push(
    { id: src.id, title: firstWord(src.id) },
    { id: dst.id, title: firstWord(dst.id) }
  );
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
  <Graph
    nodes={nodes}
    boxes={boxes}
    renderSvgNode={TextBox}
    connections={connections}
    renderConnection={props => (
      <Line key={props.id} {...props} strokeWidth={2} />
    )}
  />
);
