import { useMemo } from 'react';

const getBox = ({ box, x, y, width, height }) =>
  box || (x && y && { x, y, width, height });

const boxReducer = (boxes, node) => {
  const box = getBox(node);
  if (box) {
    boxes[node.id] = box;
  }
  return boxes;
};

const getBoxes = nodes => nodes.reduce(boxReducer, {});

const update = fn => props => ({ ...props, ...fn(props) });

export default update(({ nodes, boxes }) => {
  const nodeBoxes = useMemo(() => getBoxes(nodes), [nodes]);
  return {
    boxes: useMemo(() => ({ ...nodeBoxes, ...boxes }), [nodeBoxes, boxes]),
  };
});
