import React from 'react';
import PropTypes from 'prop-types';
import { PointPropTypes, RectPropTypes } from '@regraph/core';
import { toSvgViewBox } from '@regraph/geo/rect';

const Marker = ({ id, width, height, viewBox, anchor, children }) => (
  <marker
    id={id}
    markerWidth={width}
    markerHeight={height}
    viewBox={toSvgViewBox(viewBox)}
    refX={anchor.x}
    refY={anchor.y}
    markerUnits="strokeWidth"
    orient="auto">
    {children}
  </marker>
);

Marker.propTypes = {
  anchor: PointPropTypes,
  children: PropTypes.element.isRequired,
  height: PropTypes.number,
  id: PropTypes.string.isRequired,
  viewBox: RectPropTypes,
  width: PropTypes.number,
};

export default Marker;
