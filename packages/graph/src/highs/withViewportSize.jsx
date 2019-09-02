import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { union, getRight, getBottom, isRect } from '@regraph/geo/rect';

const { values } = Object;
const { toString } = Object.prototype;
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
  if (toString.call(padding) === '[object Object]') {
    return padding;
  }
  return { right: 0, bottom: 0 };
};

const useSize = (boxes, { padding }) => {
  const box = useMemo(() => getViewportBox(boxes), [boxes]);
  return useMemo(() => {
    const [width, height] = [getRight(box), getBottom(box)];
    const { right, bottom } = getPadding(box, padding);
    return {
      width: width + right,
      height: height + bottom,
    };
  }, [box, padding]);
};

export default (options = {}) => {
  const withViewportSize = WrappedComponent => props => {
    // ESLint does not pick the propTypes below for some reason.
    // eslint-disable-next-line react/prop-types
    const { width, height } = useSize(props.boxes, options);
    return <WrappedComponent {...props} width={width} height={height} />;
  };

  withViewportSize.propTypes = {
    boxes: PropTypes.object.isRequired,
  };

  return withViewportSize;
};
