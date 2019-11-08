import React from 'react';
import { graph } from '@regraph/graph';
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

const Graph = graph({
  autoConnectionId: true,
  extractBoxesFromNodes: true,
  layout: true,
  autoViewportSize: true,
});

const full = { stroke: 'none', fill: 'inherent' };
const empty = { stroke: 'inherent', fill: 'none' };

const applyConnectionDefaults = connection => ({
  ...connection,
  type: Line,
  strokeWidth: 2,
});
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
].map(applyConnectionDefaults);

const firstWord = str => str.split(' ')[0];

const nodesReducer = (nodes, { src, dst }, index) => {
  const box = { y: index * 50 + 50, width: 150, height: 30 };
  nodes.push(
    {
      id: src.id,
      type: TextBox,
      title: firstWord(src.id),
      box: { x: 50, ...box },
    },
    {
      id: dst.id,
      type: TextBox,
      title: firstWord(dst.id),
      box: { x: 300, ...box },
    }
  );
  return nodes;
};

const nodes = connections.reduce(nodesReducer, []);

export default () => <Graph nodes={nodes} connections={connections} />;
