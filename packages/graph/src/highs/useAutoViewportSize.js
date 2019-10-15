import { useMemo } from 'react';
import { isObject, isNumber } from '@regraph/core';
import { union, getRight, getBottom, isRect } from '@regraph/geo/rect';

const { values } = Object;
const isEmpty = arr => arr.length === 0;
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

const usePadding = (box, padding, disabled) =>
  useMemo(() => {
    if (disabled) {
      return {};
    }
    const [width, height] = [getRight(box), getBottom(box)];
    const { right, bottom } = getPadding(box, padding);
    return {
      width: width + right,
      height: height + bottom,
    };
  }, [box, disabled, padding]);

export default ({ padding } = {}) => props => {
  const disabled = isNumber(props.width) && isNumber(props.height);
  const { boxes } = props;
  const box = useMemo(() => (disabled ? null : getViewportBox(boxes)), [
    boxes,
    disabled,
  ]);
  const { width, height } = usePadding(box, padding, disabled);
  return disabled
    ? props
    : {
        width,
        height,
        ...props,
      };
};
