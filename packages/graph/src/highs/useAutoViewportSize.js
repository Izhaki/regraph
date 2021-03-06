import { useMemo } from 'react';
import { isObject, isEmpty } from '@regraph/core';
import { union, getRight, getBottom, isRect } from '@regraph/geo/rect';
import update from './update';

const { values } = Object;
const nullBox = { x: 0, y: 0, width: 0, height: 0 };
const ensureRect = box => (isRect(box) ? box : { ...nullBox, ...box });

export const getViewportBox = boxes => {
  const rects = values(boxes).map(ensureRect);
  if (isEmpty(rects)) {
    return { width: 0, height: 0 };
  }
  return union(rects);
};

const getPadding = (viewportBox, padding) => {
  if (typeof padding === 'function') {
    return padding(viewportBox);
  }
  if (isObject(padding)) {
    return padding;
  }
  // Same gap between top-left to top-bottom
  const { x, y } = viewportBox;
  return { right: x, bottom: y };
};

const usePadding = (box, padding) =>
  useMemo(() => {
    const [width, height] = [getRight(box), getBottom(box)];
    const { right, bottom } = getPadding(box, padding);
    return {
      width: width + right,
      height: height + bottom,
    };
  }, [box, padding]);

export default padding =>
  update(({ boxes }) => {
    const box = useMemo(() => getViewportBox(boxes), [boxes]);
    return usePadding(box, padding);
  });
