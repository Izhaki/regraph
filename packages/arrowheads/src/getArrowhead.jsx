import React from 'react';
import { toSvgViewBox } from '@regraph/geo/rect';

export default (arrowhead, strokeWidth) => {
  const {
    width,
    height,
    viewBox,
    anchor,
    trim,
  } = arrowhead.type.getMarkerProps(arrowhead.props);

  const marker = (
    <marker
      markerWidth={width}
      markerHeight={height}
      viewBox={toSvgViewBox(viewBox)}
      refX={anchor.x}
      refY={anchor.y}
      markerUnits="strokeWidth"
      orient="auto">
      {arrowhead}
    </marker>
  );

  return {
    marker,
    trim: trim * strokeWidth,
  };
};
