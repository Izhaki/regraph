const isGraphElement = element => element.hasAttribute('data-regraph-graph');

const traverseAncestors = ({ element, getNext, shouldAdd }) => {
  let current = getNext(element);
  const ancestors = [];
  while (current && !isGraphElement(current)) {
    if (shouldAdd(current)) {
      ancestors.push(current);
    }
    current = getNext(current);
  }
  return ancestors;
};

const getOffsetParents = element =>
  traverseAncestors({
    element,
    getNext: current => current.offsetParent,
    shouldAdd: () => true,
  });

const getPositionalParents = element => {
  const offsetParents = getOffsetParents(element);
  return traverseAncestors({
    element,
    getNext: current => current.parentElement,
    shouldAdd: current => offsetParents.includes(current),
  });
};

const offsetReducer = (offset, { offsetLeft: x, offsetTop: y }) => {
  offset.x += x;
  offset.y += y;
  return offset;
};

export default element => {
  const parents = getPositionalParents(element);
  const offset = parents.reduce(offsetReducer, { x: 0, y: 0 });
  return offset;
};
