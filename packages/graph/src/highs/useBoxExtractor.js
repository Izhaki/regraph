import { useMemo } from 'react';
import update from './update';

// Nil is null or undefined. We do this so with { width, height, ...box } we don't
// override width & height with undefined.
const removeNils = obj => {
  Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
  return obj;
};

const getBox = ({ box, x, y, width, height }) =>
  box || (x && y && removeNils({ x, y, width, height }));

const boxReducer = (boxes, node) => {
  const box = getBox(node);
  if (box) {
    boxes[node.id] = box;
  }
  return boxes;
};

const getBoxes = nodes => nodes.reduce(boxReducer, {});

export default update(({ nodes, boxes }) => {
  const nodeBoxes = useMemo(() => getBoxes(nodes), [nodes]);
  return {
    boxes: useMemo(() => ({ ...nodeBoxes, ...boxes }), [nodeBoxes, boxes]),
  };
});
